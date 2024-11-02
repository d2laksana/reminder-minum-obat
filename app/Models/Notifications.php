<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    protected $table = 'notifications';
    protected $fillable = ['user_id', 'title', 'description', 'is_read'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
