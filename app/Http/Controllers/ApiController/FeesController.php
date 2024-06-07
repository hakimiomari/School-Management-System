<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetFeesRequest;
use App\Models\Fee;
use Carbon\Carbon;

class FeesController extends Controller
{
    public function getClassMonthlyInfo(GetFeesRequest $request)
    {
        $carbon = Carbon::parse($request->date);
        $month = $carbon->format('m');
        $year = $carbon->format('Y');
        $students = Fee::with('studentInfo')->where('class_id', $request->class_id)->WhereYear('created_at', $year)->whereMonth('created_at', $month)->get();

        return response()->json($students);
    }
}