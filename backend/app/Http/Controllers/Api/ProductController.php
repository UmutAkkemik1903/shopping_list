<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductModel;
use Illuminate\Http\Request;

class ProductController extends Controller
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
        $productList = ProductModel::where(['deleted_at'=>null])->get();
        return $productList;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request){
            ProductModel::insert([
                'product_name'=>$request->input('product_name'),
                'price'=>$request->input('price'),
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
            $data = ProductModel::where(['id' => $id])->get();
            return $data;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if($request){
            ProductModel::where(['id' => $id])->update([
                'product_name'=>$request->input('product_name'),
                'price'=>$request->input('price'),
                'updated_at' => $this->nowDate,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ProductModel::where(['id' => $id])->update(['deleted_at' => $this->nowDate]);

    }
}
