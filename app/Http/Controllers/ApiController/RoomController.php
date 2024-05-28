<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Models\Room;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::paginate(5);
        return response()->json($rooms);
    }

    // store room
    public function store(StoreRoomRequest $request)
    {
        Room::create($request->all());
        return response()->json(['message' => 'success'], 200);
    }
}