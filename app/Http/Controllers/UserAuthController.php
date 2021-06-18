<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserAuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required | email',
            'password' => 'required'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()->all()]);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(["success" => false, 'error.email' => 'The provided credentials are incorrect.']);
        }

        return response()->json(['success' => true,'user' => $user, 'token' => $user->createToken($user->name)->plainTextToken]);
    }
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json(['success' => false, 'errors' => $validator->errors()->all()]);
        }

        $user = User::create(request(['name',Hash::make('email'),'password']));

        return response()->json(['success' => true,'user' => $user, 'token' => $user->createToken($user->name)->plainTextToken]);
    }



    public function logout(Request $request)
    {
         return  ($request->user()->tokens()->delete())? ["success"=>true] : ["success"=>false];
    }

    public function profile(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }
}
