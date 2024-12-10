<?php

use App\Mail\DynamicQrCodeEmail; // Make sure to import the Mailable
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PcController;
use App\Http\Controllers\AdminController;
// use App\Http\Controllers\QrController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\StudentController;

/*
|---------------------------------------------------------------------------
| API Routes
|---------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Authenticated user route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Group routes for all controllers
Route::group(['prefix' => 'api'], function () {
    
    // Student routes
    Route::post('/students/register', [StudentController::class, 'register']);
    Route::get('/students/{id}', [StudentController::class, 'show']);
    Route::get('/students', [StudentController::class, 'showAll']);
    Route::get('/students/search', [StudentController::class, 'index']);
    Route::put('/students/{id}', [StudentController::class, 'update']);
    Route::delete('/students/{id}', [StudentController::class, 'delete']);
    Route::get('/students/serial/{serial_number}', [StudentController::class, 'showBySerialNumber']);

    // Admin routes
    Route::post('/admin/login', [AdminController::class, 'login']);
    Route::get('/admins', [AdminController::class, 'index']);
    Route::get('/admins/search', [AdminController::class, 'search']);
    Route::get('/admins/{id}', [AdminController::class, 'show']);
    Route::post('/admins/register', [AdminController::class, 'store']);
    Route::put('/admins/{id}', [AdminController::class, 'update']);
    Route::delete('/admins/{id}', [AdminController::class, 'destroy']);

    // PC routes
    Route::get('/pcs', [PcController::class, 'index']);
    Route::get('/pcs/{id}', [PcController::class, 'show']);
    Route::post('/pcs', [PcController::class, 'store']);
    Route::put('/pcs/{id}', [PcController::class, 'update']);
    Route::delete('/pcs/{id}', [PcController::class, 'delete']);
    Route::get('/chart-data', [PcController::class, 'getChartData']);

    // QR Code routes
    Route::get('/qrcode/generate/{serial_number}', [QrCodeController::class, 'generateQrCode']);
    Route::get('/qrcode/image/{serial_number}', [QrCodeController::class, 'getQRCode']);
    Route::get('/students/qrcode/{id}', [StudentController::class, 'QrcodeGenerate']);
    Route::post('/qrcode/scan', [QrCodeController::class, 'scanQrCode']);
// In api.php
// Update this route to use the serial number instead of studentId
 Route::post('/send-qr-code/{serial_number}', [QrCodeController::class, 'sendQrCodeToEmail']);

    // Route::post('/test-qr-reader', [QrCodeController::class, 'testQrReader']);
// In api.php
// Route::get('/test-email', function () {
//     $email = 'Asayemax1921@gmail.com';
//     $qrCodeUrl = 'http://127.0.0.1:8000/api/qrcode/image/212121';
//     try {
//         Mail::to($email)->send(new DynamicQrCodeEmail($qrCodeUrl));
//         return 'Email sent!';
//     } catch (\Exception $e) {
//         \Log::error('Test Email Sending Error: ' . $e->getMessage());
//         return response()->json(['error' => 'Failed to send email', 'details' => $e->getMessage()], 500);
//     }
// });

    // Other QR code related routes (if needed)
    // Route::post('/qrcodes/scan', [QrController::class, 'scan']);
});
