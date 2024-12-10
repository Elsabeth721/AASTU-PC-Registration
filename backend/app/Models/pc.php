<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PC extends Model
{
    use HasFactory;

    protected $table = 'pcs';
    
    protected $primaryKey = 'pc_id';

    protected $fillable = [
        'serial_number',
        'owner_id',
        'pc_brand',
        'pc_color',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'owner_id');
    }

    // public function qrCodeScans()
    // {
    //     return $this->hasMany(QRCodeScan::class, 'pc_id');
    // }
}