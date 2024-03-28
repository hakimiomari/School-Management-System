<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClassRequest;
use App\Models\Classes;

class ClassController extends Controller
{
    // index
    public function index()
    {
        $classes = Classes::paginate(5);
        return response()->json($classes);
    }

    // store classes
    public function store(ClassRequest $request)
    {
        Classes::create($request->all());
        return response()->json('success');
    }
}