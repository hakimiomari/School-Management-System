<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'father_name', 'degree', 'date_of_birth', 'gender', 'address', 'contact',];


    public function teacher()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}