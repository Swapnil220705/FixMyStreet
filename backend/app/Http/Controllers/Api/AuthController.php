<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
public function register(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|confirmed|min:8',
        'is_admin' => 'sometimes|boolean',
        'employee_id' => 'sometimes|string|max:255',
        'department_code' => 'sometimes|string|max:255',
        'government_id' => 'sometimes|string|max:255',
        'phone' => 'sometimes|string|max:20',
        'date_of_birth' => 'sometimes|date',
    ]);

    // Create user with validated data
    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => Hash::make($validatedData['password']),
        'is_admin' => $validatedData['is_admin'] ?? false,
        'employee_id' => $validatedData['employee_id'] ?? null,
        'department_code' => $validatedData['department_code'] ?? null,
        'government_id' => $validatedData['government_id'] ?? null,
        'phone' => $validatedData['phone'] ?? null,
        'date_of_birth' => $validatedData['date_of_birth'] ?? null,
    ]);

    // Create token
    $token = $user->createToken('auth-token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token
    ], 201);
}


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Create a new token for the user
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
