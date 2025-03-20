<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {

        $credentials = $request->validate([
            'email'=> ['required', 'email'],
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->is_admin) {
            Auth::logout();
            return response([
                'message' => 'You don\'t have permission to authenticate as admin'
            ], 403);
        }
        if (!$user->email_verified_at) {
            Auth::logout();
            return response([
                'message' => 'Your email address is not verified'
            ], 403);
        }
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token' => $token,
            'message' => 'you have logged in successfully'
        ]);

    }

    public function logout()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response($user, 204);
    }

    public function userRegister(Request $request){


        $credentials = $request->validate([
            'email'=> ['required', 'email','unique:users'],
            'password' => 'required',
            'fullName' => 'required',
        ]);



        $user = User::create([
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password']),
            'name' => $credentials['fullName'],
            'is_admin' => 0,
        ]);
        $token="";

        if($user){
            Auth::login($user);
            $token = $user->createToken('main')->plainTextToken;
        }

        $user = Auth::user();

        return response([
            'user' => new UserResource($user),
            'token' => $token,
            'message' => 'you account has beeen created successfully'
        ]);
    }
}
