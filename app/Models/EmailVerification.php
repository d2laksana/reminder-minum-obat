<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailVerification extends Model
{
    protected $table = 'email_verifications';
    protected $fillable = ['email', 'pin', 'expired_at', 'used_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }
}
