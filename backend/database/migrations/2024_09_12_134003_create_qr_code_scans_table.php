<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQrCodeScansTable extends Migration
{
    public function up()
    {
        Schema::create('qr_code_scans', function (Blueprint $table) {
            $table->id('scan_id'); // Primary key
            $table->string('admin_id'); // Match the type in admins table
            $table->string('student_id'); // Match the type in students table
            $table->unsignedBigInteger('pc_id'); // Assuming pc_id is an unsigned big integer
            $table->timestamp('scan_time')->useCurrent(); // Default to current timestamp

            // Foreign key constraints
            $table->foreign('admin_id')->references('admin_id')->on('admins')->onDelete('cascade');
            $table->foreign('student_id')->references('student_id')->on('students')->onDelete('cascade');
            $table->foreign('pc_id')->references('pc_id')->on('pcs')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('qr_code_scans');
    }
}
