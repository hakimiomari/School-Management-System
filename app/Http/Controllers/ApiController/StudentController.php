<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRegisterRequest;
use App\Http\Requests\StudentUpdateRequest;
use App\Models\Student;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    public function index()
    {
        $data = Student::with('students')->paginate(5);
        return response()->json($data);
    }
    public function store(StudentRegisterRequest $request)
    {
        $filterData = $request->except('photo');
        $filterData = $request->except('grade_level');
        $related_path = $request->photo->store('student_images', 'public');
        $student = Student::create($filterData);
        $student->update(['photo' => $related_path]);
        return response()->json('Success');
    }

    // delete
    public function delete($id)
    {
        $student = Student::find($id);
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }
        $student->delete();
        return response()->json('success');
    }

    // get student info
    public function getStudentData($id)
    {
        $student = Student::with('students')->find($id);
        return response()->json($student);
    }

    // update student
    public function update(StudentUpdateRequest $request)
    {
        $data = $request->all();
        $student = Student::find($request->id);
        $data = $request->except('photo');
        $data = $request->except('id');
        $student->update($data);
        if ($request->photo) {
            $previousImagePath = $student->photo;
            if ($previousImagePath) {
                Storage::disk('public')->delete($previousImagePath);
            }
            $related_path = $request->photo->store('student_images', 'public');
            $student->photo = $related_path;
            $student->save();
        }
        return response()->json('sucesss');
    }
}