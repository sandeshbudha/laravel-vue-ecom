<?php

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
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


Route::apiResource('products', ProductController::class);
Route::get('/categories/tree', [CategoryController::class, 'getAsTree']);
Route::post('/initiate-payment',[PaymentController::class, 'initiatePayment']);

Route::post('/login',[AuthController::class,'login']);

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
    Route::post('/user-register', 'userRegister');
});

Route::group(['middleware' => 'auth:sanctum'], function () {
   Route::controller(OrderController::class)->group(function () {
       Route::post('/order', 'order');
   });
});
