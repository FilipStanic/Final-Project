<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'status'];

    /**
     * Get the user that owns the checkout.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
