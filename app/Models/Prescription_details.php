<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prescription_details extends Model
{
    //
    protected $fillable = [
        'prescription_id',
        'medicine',
        'quantity',
        'dosage',
        'instructions',
        'status',
        'time_before_after_meal'
    ];
}
