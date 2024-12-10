<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create a super admin
        DB::table('admins')->insert([
            'admin_id' => 'superadmin123',
            'username' => 'Super Admin',
            'email' => 'superadmin@example.com', 
            'password' => bcrypt('password123'), 
            'role' => 'super_admin', 
            'phoneNumber' => '0900000000',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
