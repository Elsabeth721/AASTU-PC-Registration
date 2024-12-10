<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Import the User model

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create a few users for testing
        User::create([
            'username' => 'admin',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'email' => 'admin@example.com',
            'phoneNumber' => '1234567890',
            'profile_picture' => null, // or provide a default image path
        ]);
        
    }
}
