<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Services\Service;
use Illuminate\Http\Request;

class FeeController extends Controller
{
    private $services;

    public function __construct(Service $services)
    {
        $this->services = $services;
    }

}