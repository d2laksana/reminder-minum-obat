<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prescriptions extends Model
{
    //
    protected $fillable = ['pasien_id', 'nakes_id', 'diagnosis'];

    public function pasien()
    {
        return $this->belongsTo(User::class, 'pasien_id');
    }

    public function nakes()
    {
        return $this->belongsTo(Nakes::class, 'nakes_id');
    }
}
