<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

  //no need to define the primary key because it's id

    protected $fillable = [
        'student_id',
        'student_name',
        'phoneNumber',
        'email',
        'pc_brand',
        'serial_number',
        'pc_color',
        'qr_code',
        'status',
        'pc_id'
    
    ];


     // Relationship: A student has one PC
     public function pc()
     {
         return $this->hasOne(PC::class, 'owner_id', 'student_id'); //owner id in pc refers to student id in student
     }
    

}