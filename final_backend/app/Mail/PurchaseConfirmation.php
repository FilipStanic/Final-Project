<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PurchaseConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $cartItems;

    public function __construct($user, $cartItems)
    {
        $this->user = $user;
        $this->cartItems = $cartItems;
    }

    public function build()
    {
        return $this->view('emails.purchase_confirmation')
            ->subject('Your Purchase Confirmation')
            ->with([
                'user' => $this->user,
                'cartItems' => $this->cartItems,
            ]);
    }
}
