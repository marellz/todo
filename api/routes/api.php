<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('list')->group(function(){

    Route::get('/','TodoListController@index');
    Route::get('/show/{id}','TodoListController@show');
    Route::post('/new','TodoListController@store');
    Route::post('/update/{id}','TodoListController@update');
    Route::get('/delete/{id}','TodoListController@delete');

});

Route::prefix('task')->group(function(){

    Route::post('/new','TaskController@store');
    Route::post('/update/{id}','TaskController@update');
    Route::get('/delete/{id}','TaskController@delete');

});