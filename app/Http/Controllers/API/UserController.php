<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return User::latest()->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //VALIDASI
        $this->validate($request, [
            'name' => 'required|string|max:191',
            'email' => 'required|email|unique:users|max:191',
            'password' => 'required|string|min:6',
            'type' => 'required'
        ]);

        return User::Create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' =>
            Hash::make($request['password']),
            'type' => $request['type'],
            'bio' => $request['bio'],
            'photo' => $request['photo']
        ]);
        // return ['message' => 'I have your data'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $user = User::findOrfail($id);
        $this->validate($request, [
            'name' => 'required|string|max:191',
            'email' => 'required|email|string|unique:users,email,' . $request->id,
            'password' => 'sometimes|min:6',
            'type' => 'required|string'
        ]);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => hash::make($request->password),
            'type' => $request->type,

        ]);

        return ['message' => 'User has been updated!'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //

        $user = User::FindOrFail($id);
        $user->delete();
        return ['message' => 'User deleted'];
    }
}
