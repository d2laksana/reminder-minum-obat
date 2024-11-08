<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Notifications;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cosmetic' => Auth::check() ? User::where('id', $request->user()->id)->with('border')->first() : null,
            'notifications' => Auth::check() ? Notifications::where('user_id', $request->user()->id)->where('is_read', 0)->orderBy('created_at', 'desc')->get() : null,
        ];
    }
}
