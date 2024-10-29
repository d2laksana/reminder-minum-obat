<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoinsLog extends Model
{
    protected $table = 'coins_log';
    protected $fillable = ['user_id', 'title', 'coins'];
}
