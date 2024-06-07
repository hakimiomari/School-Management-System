<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory;
    protected $fillable = ['student_id', 'class_id', 'fee', 'payed', 'remain'];

    public function studentInfo()
    {
        return $this->hasOne(Student::class, 'id', 'student_id');
    }
}