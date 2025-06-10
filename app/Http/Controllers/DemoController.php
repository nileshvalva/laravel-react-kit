<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DemoController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('first', [
            'users' => $users
        ]);
    }
}
