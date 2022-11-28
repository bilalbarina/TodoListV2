<?php

use App\Http\Controllers\API\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(TaskController::class)->prefix('/task')->group(function() {
    # Get all tasks
    Route::get('/all', 'getAll');
    # Get a specific task
    Route::get('/{task}', 'get');
    # Create new task
    Route::post('/create', 'create');
    # Update a task
    Route::post('/update/{task}', 'update');
    # Delete a task
    Route::delete('/{task}', 'delete');
});

