<?php

namespace App\Http\Controllers;

use App\Models\FcmToken;
use App\Models\Laporan;
use App\Models\Prescriptions;
use Google\Client;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Notifications;

class FcmTokenController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required|string|unique:fcm_tokens,token',
            ]);

            $user = Auth::user();
            FcmToken::create([
                'user_id' => $user->id,
                'token' => $request->token,
            ]);

            return response()->json(['message' => 'Success store fcm token'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 200);
        }
    }

    private function getAccessToken()
    {
        $googleCredentialsPath = public_path('storage/app/fcm.json');
        // dd($googleCredentialsPath);
        $client = new Client();
        $client->setAuthConfig($googleCredentialsPath);
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
        return $client->fetchAccessTokenWithAssertion();
    }

    private function sendNotification($tokens, $title, $body)
    {
        $accessToken = $this->getAccessToken();
        $client = new GuzzleClient();
        $data = [
            'message' => [
                'token' => "ddeC75Q4v8se_azPfUYwhW:APA91bGemYgATAWF8Bh2qb8TkvHcJTrXbZSr7B1acusDNcYt1CF0re5Cy8G4sLvb4xtiX-r40081eI8wHzFpd3-wbsKnwzyT_hhYWb81Iw4GimOX1r_075o", // Token perangkat
                'notification' => [
                    'title' => $title,
                    'body' => $body,
                ],
            ]
        ];

        // Kirim permintaan POST ke FCM
        try {
            $response = $client->post('https://fcm.googleapis.com/v1/projects/reminder-minum-obat-d1a97/messages:send', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken['access_token'], // Pastikan format token benar
                    'Content-Type' => 'application/json',
                ],
                'json' => $data,
            ]);

            return json_decode($response->getBody()->getContents());
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            // Tangani error
            echo 'Error: ' . $e->getMessage();
            if ($e->hasResponse()) {
                echo 'Response: ' . $e->getResponse()->getBody()->getContents();
            }
        }
    }

    public function broadcastNotification()
    {
        $users = [];
        $prescriptions = Prescriptions::with('details:id,prescription_id,created_at,aturan_konsumsi,total_konsumsi', 'pasien:id')
            ->whereIn('id', function ($query) {
                $query->select(DB::raw('MAX(id)')) // Ambil ID terbesar (terbaru) untuk setiap pasien
                    ->from('prescriptions')
                    ->groupBy('pasien_id');
            })
            ->get();

        foreach ($prescriptions as $prescription) {
            $totalProgress = 0;
            $detailCount = $prescription->details->count();

            foreach ($prescription->details as $detail) {
                $reported_konsumsi = Laporan::where('prescription_detail_id', $detail->id)
                    ->count();


                $laporan = Laporan::where('prescription_detail_id', $detail->id)
                    ->whereIn('id', function ($query) {
                        $query->select(DB::raw('MAX(id)')) // Ambil ID terbesar (terbaru) untuk setiap pasien
                            ->from('laporans')
                            ->groupBy('prescription_detail_id');
                    })->get();

                if ($laporan && $laporan[0]->status !== 'sembuh') {
                    $detail->progress = $detail->total_konsumsi > 0
                        ? ($reported_konsumsi / $detail->total_konsumsi) * 100
                        : 0;

                    $totalProgress += $detail->progress;
                    $users[] = $prescription->pasien_id;
                } else {
                    $detail->progress = $detail->total_konsumsi > 0
                        ? ($detail->total_konsumsi / $detail->total_konsumsi) * 100
                        : 0;

                    $totalProgress += $detail->progress;
                }
            }
            $prescription->progress = $detailCount > 0 ? $totalProgress / $detailCount : 0;
            if ($prescription->progress < 100) {
                if (!in_array($prescription->pasien_id, $users)) {
                    $users[] = $prescription->pasien_id;
                }
            }
        }

        $broadcastUsers = array_unique($users);
        foreach($broadcastUsers as $user) {
            Notifications::create([
                'user_id' => $user,
                'title' => 'Pengingat konsumsi obat',
                'description' => 'Halo! Saatnya minum obat ya, biar cepat pulih 😊',
                'is_read' => false,
            ]);
        }

        $fcmToken = FcmToken::whereIn('user_id', $users)->get();
        $tokens = $fcmToken->pluck('token')->toArray();
        foreach ($tokens as $token) {
            $title = 'Reminder';
            $body = 'Jangan lupa minum obat ya!';
            $this->sendNotification($token, $title, $body);
        }
    }
}
