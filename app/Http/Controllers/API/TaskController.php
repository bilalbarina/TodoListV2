<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function get(Task $task)
    {
        return response()->json($task);
    }

    public function getAll()
    {
        $tasks = Task::all();

        return response()->json($tasks);
    }

    public function create(Request $request)
    {
        $task = new Task();
        $task->title = $request->get('title');
        $task->description = $request->get('description');
        $task->save();

        return response()->json([
            'status' => 'Task created.'
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $task->title = $request->get('title');
        $task->description = $request->get('description');
        $task->status = $request->get('status', 0);
        $task->save();
        
        return response()->json([
            'status' => 'Task updated.'
        ]);
    }

    public function delete(Task $task)
    {
        $task->delete();

        return response()->json([
            'status' => 'Task deleted.'
        ]);
    }
}
