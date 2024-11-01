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

		// add is_owned attribute to items
		$user = User::find(Auth::id());
		foreach ($items as $item) {
			$inventory = Inventory::where('item_id', $item->id)->where('user_id', $user->id)->first();
			$item->is_owned = $inventory ? true : false;
		}

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

	public function equip(Request $request)
	{
		$request->validate([
			'item_id' => 'required|exists:items,id',
		]);

		$item = Item::find($request->item_id);
		$user = User::find(Auth::id());

		// check if user has the item
		$inventory = Inventory::where('item_id', $item->id)->where('user_id', $user->id)->first();
		if (!$inventory) {
			return redirect()->back()->withErrors('Anda tidak memiliki item ini.');
		}

		// unequip all other items of the same type from items table using column item_type_id
		$items = Inventory::where('user_id', $user->id)->whereHas('item', function ($query) use ($item) {
			$query->where('item_type_id', $item->type->id);
		})->get();

		foreach ($items as $i) {
			$i->equipped = 0;
			$i->save();
		}

		$inventory->equipped = 1;
		$inventory->save();

		return redirect()->back()->with('success', 'Item berhasil dipasang.');
	}
}
