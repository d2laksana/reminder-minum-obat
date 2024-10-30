<?php

namespace App\Http\Controllers;

use App\Models\FcmToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
