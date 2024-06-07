<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetFeesRequest;
use App\Models\Fee;
use Illuminate\Http\Request;

class FeesController extends Controller
{
    public function getClassMonthlyInfo(GetFeesRequest $request)
    {
        $students = Fee::where('class_id', $request->class_id)->where('months', $request->month)->get();

        return response()->json($students);
    }
}