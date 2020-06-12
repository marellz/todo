<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    //

    protected $fillable = ['title','bg'];

    public function tasks()
    {
        return $this->hasMany('App\Task','todolist_id');
    }


}
