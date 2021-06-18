<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('user/login',[UserAuthController::class,'login'])->name('user-login');
Route::post('user-register',[UserAuthController::class,'register'])->name('user-register');

Route::prefix('user')->middleware('auth:sanctum')->group(function () {
    Route::delete('/',[UserAuthController::class,'profile'])->name('user-profile');
    Route::delete('/{id}',[UserAuthController::class,'logout'])->name('user-logout');
});