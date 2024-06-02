<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeacherRegisterRequest;
use App\Http\Requests\TeacherUpdateRequest;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::with('teacher')->paginate(10);
        return response()->json($teachers);
    }

    // store teacher
    public function store(TeacherRegisterRequest $request)
    {
        $related_path = $request->photo->store('userImages', 'public');
        $user_table = [
            'name' => $request->name,
            'email' => $request->email,
            'profession' => 'Teacher',
            'bio' => $request->bio,
            'password' => Hash::make('1234')
        ];
        $user = User::create($user_table)->assignRole('Teacher');
        $user->image = $related_path;
        $user->save();

        $teacher_table = [
            'user_id' => $user->id,
            'father_name' => $request->father_name,
            'degree' => $request->degree,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'address' => $request->address,
            'contact' => $request->contact
        ];
        Teacher::create($teacher_table);
        return response()->json('success');
    }

    // delete
    public function delete($id)
    {
        $teacher = Teacher::find($id);
        $user = User::find($teacher->user_id);
        if ($user->image) {
            Storage::disk('public')->delete($user->image);
        }
        $user->delete();
        $teacher->delete();
        return response()->json('success');
    }

    // get teacher info
    public function getInfo($id)
    {
        $teacher = Teacher::find($id);
        $teacher->teacher;
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
        $user = User::find($request->user_id);
        $data = $request->except('photo');
        $data = $request->except('id');
        $data = $request->except('bio');
        $data = $request->except('email');
        $data = $request->except('name');
        $teacher->update($data);

        if ($request->photo) {
            $previousImagePath = $user->image;
            if ($previousImagePath) {
                Storage::disk('public')->delete($previousImagePath);
            }
            $related_path = $request->photo->store('userImages', 'public');
            $user->image = $related_path;
            $user->save();
        }
        $user->update([
            'name' => $request->name,
            'bio' => $request->bio,
            'email' => $request->email
        ]);
        return response()->json('sucesss');
    }
}