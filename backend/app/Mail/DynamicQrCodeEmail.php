<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DynamicQrCodeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $qrCodePath;

    public function __construct($qrCodePath)
    {
        $this->qrCodePath = $qrCodePath;
    }

    public function build()
    {
        return $this->view('emails.dynamic_qr_code')
                    ->attach($this->qrCodePath, [
                        'as' => 'QRCode.png',
                        'mime' => 'image/png',
                    ]);
    }
}
