<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeacherRegisterRequest;
use App\Models\Teacher;
use Illuminate\Http\Request;

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
        $data = $request->all();
        Teacher::create($request->all());
        return response()->json('success');
    }
}
