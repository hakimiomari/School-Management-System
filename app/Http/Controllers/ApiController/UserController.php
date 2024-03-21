<?php

namespace App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function login(Request $request){
        $allData = $request->all();
        validator($request->all(),['email'=>['required','email'],'password'=>['required']])->validate();

        $remember = $request->filled('remember');
        if(auth()->attempt($request->only(['email','password']),$remember)){
            return response()->json('successfully logedin');
        };
        return response()->json('Invalid Credentials',401);
    }

    public function loginnn(LoginRequest $request)
    {
        $credentials = $request->getCredentials();

        if (!Auth::validate($credentials)) {
            return response()->json(['error' => trans('auth.failed')], 401);
        }

        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        Auth::login($user, $request->get('remember'));

        // return response()->json(['message' => 'Authenticated', 'user' => $user]);
        return $this->authenticated($request, $user);
    }

}