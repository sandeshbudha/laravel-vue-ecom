<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PaymentController extends Controller
{

    public function initiatePayment(Request $request){

        $merchant_code = env('ESEWA_MERCHANT_CODE', 'EPAYTEST'); // Use "EPAYTEST" for testing
        $transaction_uuid = Str::uuid()->toString(); // Unique transaction ID
        $amount = $request->input('amount', 100); // Default 100
        $tax_amount = $request->input('tax_amount', 10); // Default 10
        $total_amount = $amount + $tax_amount;

        $signed_field_names = "total_amount,transaction_uuid,product_code";
        $data_string = "total_amount={$total_amount},transaction_uuid={$transaction_uuid},product_code={$merchant_code}";

        // Generate Signature
        $signature = base64_encode(hash_hmac('sha256', $data_string, env('ESEWA_SECRET_KEY', '8gBm/:&EnhH.1/q'), true));

        return response()->json([
            "amount" => $amount,
            "tax_amount" => $tax_amount,
            "total_amount" => $total_amount,
            "transaction_uuid" => $transaction_uuid,
            "product_code" => $merchant_code,
            "product_service_charge" => 0,
            "product_delivery_charge" => 0,
            "success_url" => url('/esewa/success'),
            "failure_url" => url('/esewa/failure'),
            "signed_field_names" => $signed_field_names,
            "signature" => $signature
        ]);
    }

    public function success(Request $request){

        $transaction_uuid = $request->input('transaction_uuid');
        $total_amount = $request->input('total_amount');

        // eSewa Transaction Verification API
        $verification_url = "https://rc-epay.esewa.com.np/api/epay/verify";

        $response = Http::post($verification_url, [
            "amount" => $total_amount,
            "transaction_uuid" => $transaction_uuid,
            "product_code" => env('ESEWA_MERCHANT_CODE', 'EPAYTEST')
        ]);

        // Check if verification was successful
        if ($response->successful()) {
            // Here you can update your database, mark order as paid, etc.
            return redirect()->to('/?status=success&transaction_uuid=' . $transaction_uuid);
        } else {
            return redirect()->to('/payment-failed?status=failed&transaction_uuid=' . $transaction_uuid);
        }

    }
}
