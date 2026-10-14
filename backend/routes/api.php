<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\Route;

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // User complaint routes
    Route::post('/complaints', [ComplaintController::class, 'store']);
    Route::get('/my-complaints', [ComplaintController::class, 'userReports']);
    
    // Admin routes (in a real app, you'd add admin middleware)
    Route::get('/reports', [ComplaintController::class, 'index']);
    Route::put('/report/{id}', [ComplaintController::class, 'update']);
});
