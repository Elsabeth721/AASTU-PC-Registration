<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    public function up()
    {
        // Create the admins table
        Schema::create('admins', function (Blueprint $table) {
            $table->id(); 
            $table->string('admin_id')->unique(); 
            $table->string('username'); 
            $table->string('password'); 
            $table->enum('role', ['super_admin', 'admin']);
            $table->string('email')->unique()->nullable(); 
            $table->string('profile_picture')->nullable(); 
            $table->string('phoneNumber')->nullable();
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('admins');
    }
}

