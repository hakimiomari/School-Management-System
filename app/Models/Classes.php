<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;

    protected $fillable = [
        'grade',
        'class',
        'teacher',
        'status'
    ];

    public function teacherInfo()
    {
        return $this->belongsTo(Teacher::class, 'teacher', 'id');
    }
}