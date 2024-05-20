<?php

use App\Http\Controllers\ApiController\ClassController;
use App\Http\Controllers\ApiController\GradeController;
use App\Http\Controllers\ApiController\StudentController;
use App\Http\Controllers\ApiController\TeacherController;
use App\Http\Controllers\ApiController\UserController;
use App\Models\Student;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum', 'role:Admin|Student|Teacher|Parent')->group(function () {
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'userInfo']);
    Route::get('/user/role', [UserController::class, 'getUserRole']);
    Route::post('/user/update', [UserController::class, 'updateProfile']);
    Route::post('/user/change/password', [UserController::class, 'changePassword']);
    Route::post('/class/store', [ClassController::class, 'store']);
    Route::get('/class/index', [ClassController::class, 'index']);
    Route::patch('/class/update/status', [ClassController::class, 'changeStatus']);
    Route::delete('/class/delete/{id}', [ClassController::class, 'delteClass']);
    Route::get('/grade/class/{grade}', [ClassController::class, 'selectGradeClass']);
    Route::get('/grade/all', [ClassController::class, 'getAllGrades']);
    Route::post('/student/add-new-student', [StudentController::class, 'store']);
    Route::get('/students/index', [StudentController::class, 'index']);
    Route::get('/students/index', [StudentController::class, 'index']);
    Route::delete('/student/delete/{id}', [StudentController::class, 'delete']);
    Route::get('/student/inof/{id}', [StudentController::class, 'getStudentData']);
    Route::post('/student/update', [StudentController::class, 'update']);
    Route::get('/student/attendance', [StudentController::class, 'getClassStudent']);

    Route::get('/teachers/index', [TeacherController::class, 'index']);
    Route::post('/teacher/add', [TeacherController::class, 'store']);
    Route::delete('/teacher/delete/{id}', [TeacherController::class, 'delete']);
    Route::get('/teacher/get/info/{id}', [TeacherController::class, 'getInfo']);
    Route::get('/teachers/all', [TeacherController::class, 'allTeachers']);
    Route::post('/teacher/update', [TeacherController::class, 'update']);
});