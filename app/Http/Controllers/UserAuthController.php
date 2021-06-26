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
        $validator = Validator::make($request->all(), [
            'email' => 'required | email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()]);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(["success" => false, 'errors' => ["email"=>['The email is not matched with our record']]]);
        }
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(["success" => false, 'errors'=>['password' => ['Password is incorrect']]]);
        }

        return response()->json(['success' => true, 'user' => $user, 'token' => $user->createToken($user->name)->plainTextToken]);
    }
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()]);
        }
        $user = User::create(['name' => $request->name, 'password' => Hash::make($request->password), 'email' => $request->email]);
        return response()->json(['success' => true, 'user' => $user, 'token' => $user->createToken($user->name)->plainTextToken]);
    }



    public function logout($id,Request $request)
    {
        $user = User::find($request->id);
        return ($user->tokens()->delete()) ? ["success" => true] : ["success" => false];
    }

    public function profile(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }
}
