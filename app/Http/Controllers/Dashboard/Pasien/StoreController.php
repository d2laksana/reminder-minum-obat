<?php

namespace App\Http\Controllers\Dashboard\Pasien;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Models\ItemType;
use App\Models\Inventory;
use App\Models\User;

class StoreController extends Controller
{
  public function index()
  {
		$items = Item::with('type')->get();
		$types = ItemType::all();

		return Inertia::render('Dashboard/Store/Index', [
			'title' => 'Store',
			'items' => $items,
			'types' => $types,
		]);
	}

	public function purchase(Request $request)
	{
		$request->validate([
			'item_id' => 'required|exists:items,id',
		]);

		$item = Item::find($request->item_id);
		$user = User::find(Auth::id());

		if ($user->coins < $item->price) {
			return redirect()->back()->withErrors('Koin anda tidak cukup.');
		}

		// check if user already has the item
		$inventory = Inventory::where('item_id', $item->id)->where('user_id', $user->id)->first();
		if ($inventory) {
			return redirect()->back()->withErrors('Anda sudah memiliki item ini.');
		}
		
		$user->coins -= $item->price;
		$user->save();

		Inventory::create([
			'item_id' => $item->id,
			'user_id' => $user->id,
			'equipped' => false,
		]);

		return redirect()->back()->with('success', 'Item berhasil dibeli.');
	}
}
