<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $token = $request->bearerToken();

            Log::info($token);

            if (!$token) {
                return response()->redirectTo('/login');
            }

            JWTAuth::setToken($token);
            $user = JWTAuth::authenticate();

            if (!$user) {
                return response()->redirectTo('/login');
            }

            $request->merge(['auth_user' => $user]);
        } catch (TokenExpiredException $e) {
            return response()->redirectTo('/login');
        } catch (TokenInvalidException $e) {
            return response()->redirectTo('/login');
        } catch (JWTException $e) {
            return response()->redirectTo('/login');
        }

        return $next($request);
    }
}
