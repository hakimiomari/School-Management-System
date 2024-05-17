<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeacherRegisterRequest;
use App\Http\Requests\TeacherUpdateRequest;
use App\Models\Teacher;
use Illuminate\Support\Facades\Storage;

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

    // delete
    public function delete($id)
    {
        $teacher = Teacher::find($id);
        if ($teacher->photo) {
            Storage::disk('public')->delete($teacher->photo);
        }
        $teacher->delete();
        return response()->json('success');
    }

    // get teacher info
    public function getInfo($id)
    {
        $teacher = Teacher::find($id);
        return response()->json($teacher);
    }
    // get teacher info
    public function allTeachers()
    {
        $teacher = Teacher::all();
        return response()->json($teacher);
    }

    // update teacher
    public function update(TeacherUpdateRequest $request)
    {
        $data = $request->all();
        $teacher = Teacher::find($request->id);
        $data = $request->except('photo');
        $data = $request->except('id');
        $teacher->update($data);
        if ($request->photo) {
            $previousImagePath = $teacher->photo;
            if ($previousImagePath) {
                Storage::disk('public')->delete($previousImagePath);
            }
            $related_path = $request->photo->store('teacher_images', 'public');
            $teacher->photo = $related_path;
            $teacher->save();
        }
        return response()->json('sucesss');
    }
}