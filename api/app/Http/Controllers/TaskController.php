<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use Carbon\Carbon;

class TaskController extends Controller
{
    //
    public function store(Request $request)
    {
        $task = Task::create($request->all());
        $task->due = Carbon::createFromFormat('d/m/Y H:i:s', $task->due)->diffForHumans();
        return response()->json(['task'=>$task]);
    }

    public function update(Request $request,$id)
    {
        $updated = Task::find($id)->update($request->all());
        return response()->json(['updated'=>$updated]);
    }

    public function delete($id)
    {
        $updated = Task::find($id)->delete();
        return response()->json(['deleted'=>$updated]);
    }

   
}
