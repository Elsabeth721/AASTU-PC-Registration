<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    public function up()
    {
         //no need to define the primary key because it's id
         
        Schema::create('students', function (Blueprint $table) {
            $table->id();// auto incrementing id column
            $table->string('student_id')->unique(); 
            $table->string('student_name');  
            $table->string('email')->unique();          
            $table->string('phoneNumber')->nullable();
            $table->string('pc_brand');
            $table->string('serial_number')->unique();
            $table->string('pc_color');
            $table->text('qr_code')->nullable();
            $table->enum('status', ['in', 'out']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
}
