<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    //
    protected $fillable = [
        'prescription_detail_id',
        'status',
        'photo',
        'description'
    ];

    public function prescriptionDetail()
    {
        return $this->belongsTo(Prescription_details::class);
    }
}
