<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'father_name', 'email', 'degree', 'date_of_birth', 'gender', 'address', 'contact', 'photo'];
}
