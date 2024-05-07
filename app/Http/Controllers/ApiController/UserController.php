<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangingUserPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            $data = $request->except('file');
        }
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

    // changePassword
    public function changePassword(ChangingUserPasswordRequest $request)
    {
        $user = Auth::user();
        if (Hash::check($request->current_password, $user->password)) {
            $user->update([
                'password' => Hash::make($request->new_password)
            ]);
            return response()->json('password successfully changed');
        } else {

            return response()->json(['errors' => ['current_password' => ["The current password is incorrect"]]], 422);
        }
    }
}