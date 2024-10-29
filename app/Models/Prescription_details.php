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
        'time_before_after_meal',
        'aturan_konsumsi',
        'total_konsumsi'
    ];

    public function Laporan()
    {
        return $this->hasMany(Laporan::class, 'prescription_detail_id');
    }
}
