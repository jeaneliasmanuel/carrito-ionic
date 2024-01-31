<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class ProductoController extends Controller
{
    public function index()
    {
        $producto=Producto::where('estado','=','1')->get();
        return response()->json($producto);
    }

}
