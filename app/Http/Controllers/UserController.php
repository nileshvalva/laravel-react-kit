<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required'],
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return to_route('user.index');
    }

    public function show($id)
    {
        
    }

    public function edit($id)
    {
        $user = User::find($id);
        return Inertia::render('users/edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        if (isset($request->password)) {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        // return to_route('user.index')->with('success', 'User updated successfully!');
        return redirect()->route('user.index')->with('success', 'User updated successfully!');
    }

    public function destroy(string $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return redirect()->route('user.index')->with('success', 'User deleted successfully!');
        }
        return redirect()->route('user.index')->with('error', 'User not found!');
    }
}
