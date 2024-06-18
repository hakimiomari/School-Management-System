<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Teacher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Morilog\Jalali\Jalalian;

class AttendanceController extends Controller
{
    public function getClassStudent(Request $request)
    {
        $students = Student::where('class', $request->class['id'])->get();
        date_default_timezone_set('Asia/Kabul');
        $morningStartTime = Carbon::createFromFormat('H:i', '8:00');
        $morningEndTime = Carbon::createFromFormat('H:i', '8:15');
        foreach ($students as $student) {
            $attendance = Attendance::where('student_id', $student->id)->whereBetween('created_at', [$morningStartTime, $morningEndTime])->first();
            if ($attendance) {
                $student['attendance'] = $attendance->in;
            } else {
                $student['attendance'] = 'Present';
            }
        }
        return response()->json($students);
    }

    public function takeAttendance(Request $request)
    {
        date_default_timezone_set('Asia/Kabul');
        $currentTime = Carbon::now();
        $persianYear = Jalalian::forge($currentTime);

        $morningStartTime = Carbon::createFromFormat('H:i', '4:55');
        $morningEndTime = Carbon::createFromFormat('H:i', '8:15');
        $noonStartTime = Carbon::createFromFormat('H:i', '13:00');
        $noonEndTime = Carbon::createFromFormat('H:i', '13:15');
        if ($currentTime->between($morningStartTime, $morningEndTime)) {
            foreach ($request->all() as $student) {
                $checkStudent = Attendance::where('student_id', $student['id'])->whereBetween('created_at', [$morningStartTime, $morningEndTime])->first();
                if ($checkStudent) {
                    return response()->json('error', 405);
                }
                Attendance::create([
                    'student_id' => $student['id'],
                    'class_id' => $student['class'],
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
                        'class_id' => $student['class'],
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
    public function getClassDailyReport()
    {
        date_default_timezone_set('Asia/Kabul');
        $currentTime = Carbon::now();
        $persianYear = Jalalian::forge($currentTime);
        $month =  $persianYear->getMonth();
        $year =  $persianYear->getYear();
        $startDate = "$year/$month/1";

        $attendance = Attendance::where('class_id', 10)->whereBetween('persainYear', [$startDate, $persianYear])->get();
        return response()->json($attendance);
    }

    // getDataForDashboard
    public function getDataForDashboard()
    {
        $teachers = Teacher::count();
        $students = Student::count();
        date_default_timezone_set('Asia/Kabul');
        $morningStartTime = Carbon::createFromFormat('H:i', '8:00');
        $morningEndTime = Carbon::createFromFormat('H:i', '8:15');
        $noonStartTime = Carbon::createFromFormat('H:i', '12:15');
        $noonEndTime = Carbon::createFromFormat('H:i', '24:00');

        $presentStudent = 0;
        $obsentStudent = 0;
        $currentTime = Carbon::now();

        if ($currentTime->between($morningStartTime, $morningEndTime)) {
            $presentStudent = Attendance::where('in', 'Present')->whereBetween('created_at', [$morningStartTime, $morningEndTime])->count();
            $obsentStudent = Attendance::whereIn('in', ['Obsent', 'Leave'])->whereBetween('created_at', [$morningStartTime, $morningEndTime])->count();
        }

        if ($currentTime->between($noonStartTime, $noonEndTime)) {
            $presentStudent = Attendance::where('out', 'Present')->whereBetween('created_at', [$morningStartTime, $morningEndTime])->count();
            $obsentStudent = Attendance::whereIn('out', ['Obsent', 'Leave'])->whereBetween('created_at', [$morningStartTime, $morningEndTime])->count();
        }

        return response()->json(['teachers' => $teachers, 'students' => $students, 'presentStudent' => $presentStudent, 'obsentStudent' => $obsentStudent]);
    }
}
