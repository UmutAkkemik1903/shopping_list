<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('category','App\Http\Controllers\Api\CategoryController@index');
Route::get('category/{id}','App\Http\Controllers\Api\CategoryController@show');
Route::post('category','App\Http\Controllers\Api\CategoryController@store');
Route::post('category-edit/{id}','App\Http\Controllers\Api\CategoryController@update');
Route::post('category-delete/{id}','App\Http\Controllers\Api\CategoryController@destroy');
Route::get('product','App\Http\Controllers\Api\ProductController@index');
Route::get('product/{id}','App\Http\Controllers\Api\ProductController@show');
Route::post('product','App\Http\Controllers\Api\ProductController@store');
Route::post('product-edit/{id}','App\Http\Controllers\Api\ProductController@update');
Route::post('product-delete','App\Http\Controllers\Api\ProductController@destroy');
Route::get('list','App\Http\Controllers\Api\ListController@index');
Route::get('list/{id}','App\Http\Controllers\Api\ListController@show');
Route::post('list','App\Http\Controllers\Api\ListController@store');
Route::post('list-edit/{id}','App\Http\Controllers\Api\ListController@update');
Route::post('list-delete','App\Http\Controllers\Api\ListController@destroy');
