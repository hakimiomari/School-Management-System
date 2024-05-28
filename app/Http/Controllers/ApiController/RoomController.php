<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use Illuminate\Http\Request;

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

    // delete room
    public function deleteRoom($id)
    {
        $room = Room::find($id);
        if ($room) {
            $room->delete();
            return response()->json("success");
        } else {
            return response()->json(['message' => 'Room not found'], 422);
        }
    }

    // update room
    public function updateRoom(UpdateRoomRequest $request)
    {
        $room = Room::find($request->id);
        $room->name = $request->name;
        $room->number = $request->number;
        $room->capicity = $request->capicity;
        $room->save();
        return response()->json(['message' => 'success'], 200);
    }
}
