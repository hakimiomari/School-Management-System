<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetFeesRequest;
use App\Http\Requests\TakeFeesRequest;
use App\Http\Requests\TakeRemainRequest;
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

    // /takeFees
    public function takeFees(TakeFeesRequest $request)
    {
        $carbon = Carbon::parse($request->date);
        $month = $carbon->format('m');
        $fee = Fee::where('student_id', $request->id)->whereMonth('created_at', $month)->first();
        if ($request->fee <= $fee->fee) {
            $remain = $fee->remain  - $request->fee;
            $fee->update([
                'payed' => $request->fee,
                'remain' => $remain
            ]);
        } else {
            $fee = (string)$fee->fee;
            return response()->json(['errors' => ['fee' => ['The Fee Should be less than or equal to ' . $fee]]], 422);
        }
        return response()->json('success');
    }

    // takeRemain
    public function takeRemain(TakeRemainRequest $request)
    {
        $carbon = Carbon::parse($request->date);
        $month = $carbon->format('m');
        $fee = Fee::where('student_id', $request->id)->whereMonth('created_at', $month)->first();
        if ($request->remain <= $fee->remain) {
            $remain = $fee->remain  - $request->remain;
            $payed = $fee->payed + $request->remain;
            $fee->update([
                'payed' => $payed,
                'remain' => $remain
            ]);
        } else {
            $remain = (string)$fee->remain;
            return response()->json(['errors' => ['remain' => ['The Remain Should be less than or equal to ' . $remain]]], 422);
        }
        return response()->json('success');
    }
    // getStudentFee
    public function getStudentFee($id)
    {
        $fees = Fee::where('student_id', $id)->get();
        foreach ($fees as $fee) {
            $createdAt = Carbon::parse($fee->created_at);
            $fee['year'] = $createdAt->format('Y');
            $fee['month'] = $createdAt->format('F');
        }
        return response()->json($fees);
    }
    // monthly report for fee
    public function getMonthlyFeeReport()
    {
        $fee = 0;
        $i = 0;
        $fees = [];
        $label = [];
        $now = Carbon::now();
        $start = $now->startOfYear();
        $endDate = Carbon::now();
        $end = $endDate->endOfYear();

        $transactions = Fee::whereBetween('created_at', [$start, $end])
            ->orderBy('created_at', 'asc')
            ->get()
            ->groupBy(function ($fee) {
                return Carbon::parse($fee->created_at)->format('F');
            });

        $data = $transactions->map(function ($monthTransactions, $monthName) {
            return [
                'month' => $monthName,
                'transactions' => $monthTransactions,
            ];
        })->values();

        foreach ($data as $monthlyData) {
            $label[$i] = $monthlyData['month'];
            $fees[$i] = 0;
            foreach ($monthlyData['transactions'] as $transaction) {
                $fees[$i] += $transaction->payed;
            }
            $i++;
        }
        return response()->json(['label' => $label, 'fees' => $fees]);
    }
}
