<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerAdress;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{


    public function order(Request $request){
        DB::beginTransaction();

        $customerDetails = $request->customerDetails;

        $customer = Customer::create([
            'first_name'=>$customerDetails['first_name'],
            'last_name'=>$customerDetails['last_name'],
            'phone'=>$customerDetails['phone_number'],

        ]);

        $customerAddress = CustomerAdress::create([
            'customer_id'=>$customer->id,
            'province'=>$customerDetails['province'],
            'district'=>$customerDetails['district'],
            'city'=>$customerDetails['city'],
            'address'=>$customerDetails['address'],
        ]);

        //order Part
        $order = Order::create([
            'total_price'=>$request->total_amount,
            'customer_id'=>$customer->id,
            'status'=>'pending',
        ]);

        //order details

        foreach ($request->orderItems as $orderItem) {

            OrderItem::create([
                'order_id'=>$order->id,
                'product_id'=>$orderItem['id'],
                'quantity'=>$orderItem['quantity'],
                'unit_price'=>$orderItem['price'],
            ]);

        }
        DB::commit();

        return response()->json(['message'=>'success']);

    }
}
