<?php

namespace App\Http\Controllers;
use App\Models\User;


class ApiController extends Controller
{
     public function index()
    {
        return response()->json(User::all());
    }
}