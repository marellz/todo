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
        $lists = TodoList::all();
        return response()->json(['lists' => $lists]);
    }

    public function show($id)
    {
        $list = TodoList::find($id);
        return response()->json(['list' => $list]);
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
