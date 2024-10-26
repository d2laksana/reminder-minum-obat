<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prescriptions extends Model
{
    //
    protected $fillable = ['pasien_id', 'nakes_id', 'diagnosis'];
}
