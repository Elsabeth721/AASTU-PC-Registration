<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $primaryKey = 'admin_id'; // Set admin_id as the primary key

    public $incrementing = false; // Disable auto-incrementing for the primary key

    protected $fillable = [
        'admin_id',
        'username',
        'password',
        'role', // 'super_admin' or 'admin'
        'email',
        'profile_picture',
        'phoneNumber',
    ];

    protected $hidden = ['password']; // Hide password when returning admin data
}