<?php

use Illuminate\Support\Facades\Route;
use App\Mail\QrCodeEmail;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route to handle signup form submission
Route::post('/signup', [AuthController::class, 'signup']); // Adjust according to your AuthController


// Route::get('/send-qrcode-email', function () {
//     // Generate a sample QR code content
//     $qrCodeContent = 'Sample PC Information';
    
//     // Send the email
//     Mail::to('Asayemax@gmail.com')->send(new QrCodeEmail($qrCodeContent));
// //edenzewdu434
//     return 'QR Code email sent!';
// });
