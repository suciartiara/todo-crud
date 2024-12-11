<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    // Tentukan kolom yang dapat diisi
    protected $fillable = ['title', 'completed'];

    // Casting tipe data agar kolom `completed` selalu menjadi boolean
    protected $casts = [
        'completed' => 'boolean',
    ];
}
