<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'teacher_id', 'today'];
    protected $casts = [
        'Hamal' => 'json',
        'Sour' => 'json',
        'Joza' => 'json',
        'Saratan' => 'json',
        'Asad' => 'json',
        'Sunbulah' => 'json',
        'Mezan' => 'json',
        'Aqrab' => 'json',
        'Qous' => 'json',
        'Jadi' => 'json',
        'Dalwa' => 'json',
        'Hout' => 'json',
        'summary' => 'json',
    ];
}
