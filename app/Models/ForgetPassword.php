<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ForgetPassword extends Model
{
    protected $table = 'forget_password';
    protected $fillable = ['email', 'token', 'expired_at', 'used_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }
}
