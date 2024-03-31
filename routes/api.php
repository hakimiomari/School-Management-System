<?php

use App\Http\Controllers\ApiController\ClassController;
use App\Http\Controllers\ApiController\UserController;
use Illuminate\Http\Request;
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
});
