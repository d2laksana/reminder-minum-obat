<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instansi extends Model
{
    /** @use HasFactory<\Database\Factories\InstansiFactory> */
    use HasFactory;
    protected $fillable = ['name', 'address'];
}
