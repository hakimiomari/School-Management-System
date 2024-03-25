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

    public function login(LoginRequest $request)
    {
        if (auth()->attempt($request->only(['email', 'password']))) {
            $token = auth()->user()->createToken('user', ["*"], now()->addDays(90));
            $user = Auth::user();
            $userRole = $user->roles->first()->name;
            return response()->json([
                'status' => 'success',
                'role' => $userRole,
                'user' => $user,
                'token' => $token->plainTextToken
            ]);
        } else {
            return response()->json('Invalid Credentials', 401);
        }
    }
    public function userInfo()
    {
        $user = Auth::user();
        return response()->json($user);
    }
    public function getUserRole()
    {
        $user = Auth::user();
        $userRole = $user->roles->first()->name;
        return response()->json($userRole);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('success', 204);
    }
}
