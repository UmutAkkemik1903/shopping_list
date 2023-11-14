<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategoryModel;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public $nowDate;

    public function __construct()
    {
        $this->nowDate = date('Y-m-d H:i:s');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryList = CategoryModel::where(['deleted_at'=>null])->get();
        return $categoryList;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request){
            CategoryModel::insert([
                'category_name'=>$request->input('category_name'),
                'created_at' => $this->nowDate,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if($id){
            return CategoryModel::where(['id' => $id])->get();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if($request){
            CategoryModel::where(['id' => $id])->update([
                'category_name' => $request->input('category_name'),
                'updated_at' => $this->nowDate,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        CategoryModel::where(['id' => $id])->update(['deleted_at' => $this->nowDate]);
    }
}
