<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class QrCodeEmail extends Mailable
{
    public $qrCodeImage;

    public function __construct($qrCodeImage)
    {
        $this->qrCodeImage = $qrCodeImage;
    }

    public function build()
    {
        return $this->view('emails.qr_code')
                    ->with(['qrCodeImage' => $this->qrCodeImage]);
    }
}
