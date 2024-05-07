<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeacherRegisterRequest;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::paginate(10);
        return response()->json($teachers);
    }

    // store teacher
    public function store(TeacherRegisterRequest $request)
    {
        $teacher = Teacher::create($request->all());
        $related_path = $request->photo->store('teacher_images', 'public');
        $teacher->photo = $related_path;
        $teacher->save();
        return response()->json('success');
    }
}
