<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['user_id', 'task', 'is_completed'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
