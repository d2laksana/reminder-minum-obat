<?php

namespace App\Http\Controllers\Dashboard\Pasien;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Notifications;
use Illuminate\Support\Facades\Auth;
use App\Models\CoinsLog;

class NotificationController extends Controller
{
  public function read()
  {
		Notifications::where('user_id', Auth::user()->id)
			->update(['is_read' => 1]);

		return redirect()->back();
	}
}
