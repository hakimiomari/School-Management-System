<?php

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
Route::post('/login',[UserController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout',[UserController::class,'logout']);
    Route::get('/user',[UserController::class,'userInfo']);

});