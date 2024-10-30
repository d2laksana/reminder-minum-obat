<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'name',
        'item_type_id',
        'price',
        'description',
        'image'
    ];

    public function type()
    {
        return $this->belongsTo(ItemType::class, 'item_type_id');
    }
}
