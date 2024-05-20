<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id');
            $table->integer('teacher_id');
            $table->enum('Hamal', ['0,0,0']);
            $table->enum('Sour', ['0,0,0']);
            $table->enum('Joza', ['0,0,0']);
            $table->enum('Saratan', ['0,0,0']);
            $table->enum('Asad', ['0,0,0']);
            $table->enum('Sunbulah', ['0,0,0']);
            $table->enum('Mezan', ['0,0,0']);
            $table->enum('Aqrab', ['0,0,0']);
            $table->enum('Qous', ['0,0,0']);
            $table->enum('Jadi', ['0,0,0']);
            $table->enum('Dalwa', ['0,0,0']);
            $table->enum('Hout', ['0,0,0']);
            $table->enum('today', ['Present', 'Obsent', 'Leave']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
