<?php

namespace App\Http\Controllers;

use App\Task;
use App\TodoList;
use Carbon\Carbon;
use Illuminate\Http\Request;

trait actions {
    public function getDiff($tasks)
    {       
        foreach ($tasks as $task) {
            $due = Carbon::createFromFormat('d/m/Y H:i:s', $task->due)->diffForHumans();
            $task->due = $due;
        }
    }
}

class TodoListController extends Controller
{
    use actions;
    //
    public function index()
    {
        $lists = TodoList::all();
        foreach ($lists as $list) {
            $list->tasks = TodoList::find($list->id)->tasks;
        }
        return response()->json(['lists' => $lists]);
    }

    public function show($id)
    {
        $list = TodoList::find($id);
        if($list){
            $list->tasks = $this->getDiff($list->tasks);
            $response = ['list' => $list];
        } else {
            $response = ['list'=>'404'];
        }
        return response()->json($response);
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
        $deleted = TodoList::find($id)->delete();
        $deleted_tasks = Task::where('todolist_id', $id)->delete();
        return response()->json(['deleted' => $deleted, 'deleted_tasks' => $deleted_tasks]);
    }
}
