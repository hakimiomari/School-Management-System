<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Morilog\Jalali\Jalalian;

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

        $persianYear = Jalalian::forge($currentTime);

        $morningStartTime = Carbon::createFromFormat('H:i', '8:00');
        $morningEndTime = Carbon::createFromFormat('H:i', '20:45');
        $noonStartTime = Carbon::createFromFormat('H:i', '21:20');
        $noonEndTime = Carbon::createFromFormat('H:i', '23:50');
        if ($currentTime->between($morningStartTime, $morningEndTime)) {
            foreach ($request->all() as $student) {
                $checkStudent = Attendance::where('student_id', $student['id'])->whereBetween('created_at', [$morningStartTime, $morningEndTime])->first();
                if ($checkStudent) {
                    return response()->json('error', 405);
                }
                Attendance::create([
                    'student_id' => $student['id'],
                    'in' => $student['attendance'],
                    'persainYear' => $persianYear
                ]);
            }
        }
        if ($currentTime->between($noonStartTime, $noonEndTime)) {
            foreach ($request->all() as $student) {
                $checkStudent = Attendance::where('student_id', $student['id'])->whereBetween('created_at', [$noonStartTime, $noonEndTime])->first();
                if ($checkStudent) {
                    return response()->json('error', 405);
                }
                $attendance = Attendance::where('student_id', $student['id'])->latest('id')->first();
                if (!$attendance) {
                    $attendance = Attendance::create([
                        'student_id' => $student['id'],
                        'in' => 'Obsent',
                        'persainYear' => $persianYear
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

    // get class monthly report
    
}