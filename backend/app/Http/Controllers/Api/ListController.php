<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ListModel;
use Illuminate\Http\Request;

class ListController extends Controller
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
        $list = ListModel::where(['shopping_list.deleted_at' => null])->join('product',function ($on1){
            $on1->on('product.id','=','shopping_list.product_id');
        })->get([
            'shopping_list.id as id',
            'product.product_name as product_name',
            'product.price as price',
        ]);
        return $list;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,string $id)
    {
        if($request){
            ListModel::insert([
                'product_id'=>$id,
                'user_id'=>1,
                'created_at'=>$this->nowDate
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ListModel::where(['id'=>$id])->update([
            'deleted_at'=>$this->nowDate
        ]);
    }
}
