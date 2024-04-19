<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_name',
        'date_of_birth',
        'gender',
        'grade_level',
        'class',
        'contact_number',
        'address',
        'email',
        'photo'
    ];

    public function students()
    {
        return $this->belongsTo(Classes::class, 'class', 'id');
    }
}
