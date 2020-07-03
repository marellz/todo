<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;


class UtilitiesController extends Controller
{
    //
    public function gap(Request $request)
    {
        $js_h = $request->input('hour');
        $n = Carbon::now();
        $h = $n->hour;
        $gap = $h - $js_h;
        return response()->json(['gap'=> $gap]);
    }
}
