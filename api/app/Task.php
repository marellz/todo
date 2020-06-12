<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    protected $fillable = ['todolist_id','name','complete','due'];

    public function list()
    {
        return $this->belongsTo('App\TodoList');
    }
}
