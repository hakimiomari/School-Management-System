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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('father_name');
            $table->enum('degree', ['Bikloria', 'Bachelor', 'Master']);
            $table->date('date_of_birth');
            $table->enum('gender', ['Male', 'Female'])->default('Male');
            $table->text('address');
            $table->string('contact');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};