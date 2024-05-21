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
            $table->json('Hamal')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Sour')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Joza')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Saratan')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Asad')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Sunbulah')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Mezan')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Aqrab')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Qous')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Jadi')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Dalwa')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->json('Hout')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
            $table->enum('today', ['Present', 'Obsent', 'Leave'])->default('Present');
            $table->json('summary')->default('{"present"=>0,"obsent"=>0,"leave"=>0}');
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
