<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;
use App\Models\DetallePedido;
use Illuminate\Support\Facades\DB;


class PedidoController extends Controller
{
    public function crearPedido(Request $request)
{
    try {
        DB::beginTransaction();

        // Obtener todos los pedidos existentes para el usuario
        $pedidosUsuario = Pedido::where('id_usuario', $request->id_usuario)->get();

        if ($pedidosUsuario->isEmpty()) {
            // Si no hay pedidos para el usuario, establecer el ID del nuevo pedido como 1
            $id_pedido = 1;
        } else {
            // Si hay pedidos para el usuario, obtener el último pedido y sumarle uno al ID
            $ultimoPedido = $pedidosUsuario->last();
            $id_pedido = $ultimoPedido->id_pedido + 1;
        }

        // Crear un nuevo pedido sin guardarlo en la base de datos aún
        $pedido = new Pedido();
        $pedido->id_pedido = $id_pedido; // Establecer el ID del pedido
        $pedido->id_usuario = $request->id_usuario;
        $pedido->total = $request->total;
        $pedido->estado = 'pendiente';
        $pedido->fecha_pedido = now();

        // Recorrer cada item del carrito y crear un detalle de pedido
        foreach ($request->items as $item) {
            $detalle = new DetallePedido();
            $detalle->id_pedido = $id_pedido; // Usar el ID obtenido previamente
            $detalle->id_producto = $item['idproducto'];
            $detalle->cantidad = $item['cantidad'];
            $detalle->precio = $item['precio'];
            $detalle->save();
        }

        // Ahora, guardar el pedido en la base de datos
        $pedido->save();

        DB::commit();

        return response()->json(['success' => true, 'message' => 'Pedido creado exitosamente']);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['success' => false, 'message' => 'Error al crear el pedido', 'error' => $e->getMessage()], 500);
    }
}
}