<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategoryModel;
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
        $productList = ProductCategoryModel::where(['product.deleted_at' => null])->join('product',function ($on1){
            $on1->on('product.id','=','product_category.product_id');
        })->join('category',function ($on1){
            $on1->on('category.id','=','product_category.category_id');
        })->get([
            'product.id as id',
            'category.category_name as category_name',
            'product.product_name as product_name',
            'product.price as price',
        ]);
        return $productList;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request) {
            $id = ProductModel::insertGetId([
                'product_name' => $request->input('product_name'),
                'price' => $request->input('price'),
                'created_at' => $this->nowDate,
            ]);
            ProductCategoryModel::insert([
                'product_id' => $id,
                'category_id' => $request->input('category_id'),
                'created_at' => $this->nowDate,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if ($id) {
            $data = ProductModel::where(['id' => $id])->get();
            return $data;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if ($request) {
            ProductModel::where(['id' => $id])->update([
                'product_name' => $request->input('product_name'),
                'price' => $request->input('price'),
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
        ProductCategoryModel::where(['product_id' => $id])->update(['deleted_at' => $this->nowDate]);
    }
}
