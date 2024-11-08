<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'address',
        'phone',
        'birth_date',
        'gender',
        'avatar',
        'role',
        'coins',
        'bpjs_number',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function FcmToken()
    {
        return $this->hasOne(FcmToken::class);
    }

    public function border()
    {
        return $this->hasOne(Inventory::class)
            ->where('equipped', 1) 
            ->with(['item' => function ($query) {
                $query->whereHas('type', function ($query) {
                    $query->where('name', 'Border');
                });
            }]);
    }

    public function notifications()
    {
        return $this->hasMany(Notifications::class);
    }
}
