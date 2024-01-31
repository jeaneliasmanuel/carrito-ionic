<?php

// app/Http/Controllers/CarritoController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class CarritoController extends Controller
{
    public function obtenerCarrito(Request $request)
    {
        // Lógica para obtener el carrito desde el request
        $carrito = $request->session()->get('carrito', []);

        return response()->json(['carrito' => $carrito]);
    }

    public function agregarAlCarrito(Request $request)
    {
        // Lógica para agregar un producto al carrito
        // Puedes recibir el ID del producto y la cantidad desde el request
        // Agrega la lógica según sea necesario

        // Ejemplo:
        $productoId = $request->input('producto_id');
        $cantidad = $request->input('cantidad');

        // Obtén el producto desde la base de datos (puedes necesitar ajustar esto según tu modelo)
        $producto = Producto::find($productoId);

        // Agrega el producto al carrito
        $carrito = $request->session()->get('carrito', []);
        $carrito[] = [
            'id' => $producto->id,
            'nombre' => $producto->nombre,
            'precio' => $producto->precio,
            'cantidad' => $cantidad,
        ];

        // Guarda el carrito en la sesión
        $request->session()->put('carrito', $carrito);

        return response()->json(['mensaje' => 'Producto agregado al carrito con éxito']);
    }

    // Puedes agre
}