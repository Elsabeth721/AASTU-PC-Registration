<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QRCodeScan extends Model
{
    use HasFactory;

    protected $primaryKey = 'scan_id';

    protected $fillable = [
        'admin_id',
        'student_id',
        'pc_id',
        'scan_time',
    ];

    // Relationship: A QR code scan belongs to an admin
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    // Relationship: A QR code scan belongs to a student
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

     // Relationship: A QR code scan belongs to a PC
    public function pc()
    {
        return $this->belongsTo(PC::class, 'pc_id');
    }
}