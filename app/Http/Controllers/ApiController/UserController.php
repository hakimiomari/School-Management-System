<?php

namespace App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function login(LoginRequest $request){
        // validator($request->all(),['email'=>['required','email'],'password'=>['required']])->validate();

        if(auth()->attempt($request->only(['email','password']))){
            $token = auth()->user()->createToken('user');
            $string = 'lacalhost';
            $user = Auth::user();
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'token'=>$token->plainTextToken
            ]);
        }
        else{
            return response()->json('Invalid Credentials',401);
        }
    }
    public function userInfo(){
        $user = Auth::user();
        return response()->json($user);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json('success',204);
    }

}