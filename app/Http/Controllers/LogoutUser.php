<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class LogoutUser extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $token = $request->bearerToken();

            if (!$token) {
                return response()->json(['error' => 'Token not provided'], 401);
            }

            JWTAuth::invalidate($token);

            return response()->json([
                'message' => 'Successfully logged out',
                'logout' => true
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout, token might be invalid'], 500);
        }
    }
}
