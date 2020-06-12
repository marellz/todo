<?php

namespace App\Http\Controllers;

use App\Task;
use App\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    //
    public function index()
    {
        $tasks = TodoList::all();
        return response()->json(['tasks' => $tasks]);
    }

    public function show($id)
    {
        $task = TodoList::find($id);
        return response()->json(['task' => $task]);
    }

    public function store(Request $request)
    {
        $created = TodoList::create($request->all());
        return response()->json(['created' => $created]);
    }

    public function update(Request $request, $id)
    {
        $updated = TodoList::find($id)->update($request->all());
        return response()->json(['updated' => $updated]);
    }

    public function delete($id)
    {        
        $deleted = TodoList::find($id)->delete() && Task::where('todolist_id',$id)->delete();
        return response()->json(['deleted' => $deleted]);
    }
}
