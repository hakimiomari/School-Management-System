<?php

namespace App\Console;

use App\Models\Classes;
use App\Models\Fee;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->command('inspire')->everyTwoMinutes();
        // $schedule->command('schedule:run')->everyTwoMinutes();
        // $schedule->call(function () {
        //     app(FeeController::class)->monthlyFeesServices();
        // })->monthly()->on('1st');

        $schedule->call(function () {
            $this->monthlyFeesServices();
        })->everyTwoMinutes();

        // $schedule->call(function () {
        //     app(FeeController::class)->monthlyFeesServices();
        // })->everyTwoMinutes();
    }

    protected function monthlyFeesServices()
    {
        $students = Student::all();
        $month = Carbon::now()->format('m');
        $year = Carbon::now()->format('Y');

        foreach ($students as $student) {
            $class = Classes::find($student->class);
            Fee::create([
                'student_id' => $student->id,
                'class_id' => $student->class,
                'year' => $year,
                'months' => $month,
                'fee' => $class->fee,
                'payed' => 0,
                'remaind' => $class->fee,
            ]);
        }

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}