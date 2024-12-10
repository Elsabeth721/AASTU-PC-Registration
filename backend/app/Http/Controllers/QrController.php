<?php

namespace App\Http\Controllers;
//api/app/http/controlles/qrcontroller
use App\Models\PC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Mail\QrCodeEmail; 

class QrController extends Controller
{
    // Generate a QR code for a given PC
    public function generate(Request $request)
    {
        $request->validate([
            'serial_number' => 'required|string|exists:pcs,serial_number',
        ]);

        // Generate QR code as an image
        $qrCode = $this->createQRCode($request->serial_number);

        // send the QR code via email
        $user = $request->user();
    if (!$user) {
    return response()->json(['message' => 'Unauthenticated'], 401);
   }

// Proceed to generate QR code and send email
Mail::to($user->email)->send(new QrCodeEmail($qrCode));

         Mail::to($request->user()->email)->send(new QrCodeEmail($qrCode));

        return response()->json(['qr_code' => $qrCode], 201);
    }

    // Create a QR code
    private function createQRCode($data)
    {
        // Generate QR code as an image
        $qrCodeImage = QrCode::format('png')->size(300)->generate($data);

        // Store the QR code image in storage
        $filePath = 'qrcodes/' . uniqid() . '.png';
        \Storage::put($filePath, $qrCodeImage);

        return asset($filePath); // Return URL to the stored QR code
    }

    // Scan a QR code and retrieve PC information
    public function scan(Request $request)
    {
        // Validate request input
        $request->validate([
            'qr_code' => 'required|string',
        ]);

        // Retrieve PC information based on QR code (serial number)
        $pc = PC::where('serial_number', $request->qr_code)->first();

        if (!$pc) {
            return response()->json(['message' => 'PC not found'], 404);
        }

        return response()->json($pc, 200);
    }
}