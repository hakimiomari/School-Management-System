<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRegisterRequest;
use App\Models\Student;

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
        $student->status = 'Inactive';
        $student->save();
        return response()->json('success');
    }
}
