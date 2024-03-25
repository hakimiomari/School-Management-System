<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
    // get user info
    public function userInfo()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    // get user role
    public function getUserRole()
    {
        $user = Auth::user();
        $userRole = $user->roles->first()->name;
        return response()->json($userRole);
    }

    // update profile
    public function updateProfile(UserUpdateRequest $request)
    {
        $image = $request->file('file');
        $user = Auth::user(); // Assuming you have user authentication in place
        if ($image) {
            $previousImagePath = $user->image; // Get the previous file path

            if ($previousImagePath) {
                Storage::disk('public')->delete($previousImagePath); // Unlink the previous file
            }
            $path = $image->store('userImages', 'public');
            $user->image = $path;
            $user->save();
        }
        $data = $request->except('file');
        $data = $request->except('id');
        $user->update($data);
        return response()->json($user);
    }
    // logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('success', 204);
    }
}