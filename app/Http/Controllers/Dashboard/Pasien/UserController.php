<?php

namespace App\Http\Controllers\Dashboard\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Prescriptions;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
  public function index($id)
  {
		$user = User::where('id', $id)->with('border')->first();

		return Inertia::render('Dashboard/User/Index', [
			'title' => 'Users',
			'user' => $user,
		]);
	}

	public function list()
	{
		// get all users with their equipped from table inventories and then from the equipped, get the item from table items
		$users = User::where('role', 'pasien')->with('border')->get();

		return Inertia::render('Dashboard/User/List', [
			'title' => 'Users',
			'users' => $users,
		]);
	}
}
