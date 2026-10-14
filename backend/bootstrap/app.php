<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        apiPrefix: '/api'
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api([
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);    
        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
        $middleware->use([
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);
            // Other middleware if needed
       
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (Throwable $e, Request $request) {
            if ($request->is('api/*') || $request->wantsJson()) {
                if ($e instanceof AuthenticationException) {
                    return response()->json([
                        'message' => 'Unauthenticated',
                    ], 401);
                }
                
                if ($e instanceof ValidationException) {
                    return response()->json([
                        'message' => 'The given data was invalid.',
                        'errors' => $e->errors(),
                    ], 422);
                }
                
                if ($e instanceof MethodNotAllowedHttpException) {
                    return response()->json([
                        'message' => 'Method not allowed',
                    ], 405);
                }
                
                // Handle other exceptions
                return response()->json([
                    'message' => $e->getMessage(),
                ], 500);
            }
            
            return null;
        });
    })->create();
