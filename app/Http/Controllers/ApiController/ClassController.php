<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClassRequest;
use App\Models\Classes;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    // index
    public function index()
    {
        $classes = Classes::paginate(5);
        foreach ($classes as $class) {
            $class->teacherInfo;
        }
        return response()->json($classes);
    }

    // store classes
    public function store(ClassRequest $request)
    {
        Classes::create($request->all());
        return response()->json('success');
    }
    // changeStatus
    public function changeStatus(Request $request)
    {
        $class = Classes::find($request->id);
        $class->update($request->all());
        return response()->json('success');
    }
    // delteClass
    public function delteClass($id)
    {
        $class = Classes::find($id);
        if ($class) {
            $class->delete();
            return response()->json("success");
        } else {
            return response()->json(['message' => 'Class not found'], 422);
        }
    }
    //  selectGradeClass
    public function selectGradeClass($grade)
    {
        $classes = Classes::where('status', 'Active')->where('grade', $grade)->get();
        return response()->json($classes);
    }

    public function getAllGrades()
    {
        $grades = Classes::where('status', 'Active')->distinct()->pluck('grade');
        return response()->json($grades);
    }
}
