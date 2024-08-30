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
    public $orderId;


    public function __construct($user, $cartItems, $orderId)
    {
        $this->user = $user;
        $this->cartItems = $cartItems;
        $this->orderId = $orderId;
    }

    public function build()
    {
        return $this->markdown('emails.purchase_confirmation')
            ->subject('Purchase Confirmation')
            ->with([
                'user' => $this->user,
                'cartItems' => $this->cartItems,
                'orderId' => $this->orderId,
            ]);
    }
}
