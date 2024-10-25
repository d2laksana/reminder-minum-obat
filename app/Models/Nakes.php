<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nakes extends Model
{
    /** @use HasFactory<\Database\Factories\NakesFactory> */
    use HasFactory;
    protected $fillable = ['user_id', 'instansi_id'];
}
