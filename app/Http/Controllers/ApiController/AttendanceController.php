<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function getClassStudent()
    {
        $students = Student::where('class', 10)->get();
        foreach ($students as $student) {
            $student['attendance'] = 'Present';
        }
        return response()->json($students);
    }

    public function takeAttendance(Request $request)
    {
        date_default_timezone_set('Asia/Kabul');
        $currentTime = Carbon::now();

        $morningStartTime = Carbon::createFromFormat('H:i', '8:00');
        $morningEndTime = Carbon::createFromFormat('H:i', '18:45');
        $noonStartTime = Carbon::createFromFormat('H:i', '15:20');
        $noonEndTime = Carbon::createFromFormat('H:i', '18:50');
        if ($currentTime->between($morningStartTime, $morningEndTime)) {
            foreach ($request->all() as $student) {
                $data = $student['attendance'];
                Attendance::create([
                    'student_id' => $student['id'],
                    'in' => $student['attendance'],
                ]);
            }
        }
        if ($currentTime->between($noonStartTime, $noonEndTime)) {
            foreach ($request->all() as $student) {
                $attendance = Attendance::where('student_id', $student['id'])->latest('id')->first();
                if (!$attendance) {
                    $attendance = Attendance::create([
                        'student_id' => $student['id'],
                        'in' => 'Obsent',
                    ]);
                }
                $attendance->out = $student['attendance'];
                $attendance->save();
            }
        }
        if (!$currentTime->between($morningStartTime, $morningEndTime) && !$currentTime->between($noonStartTime, $noonEndTime)) {
            return response()->json('error', 403);
        }
        return response()->json('success');
    }
}