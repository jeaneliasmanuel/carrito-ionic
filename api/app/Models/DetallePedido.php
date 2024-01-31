<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    protected $table = 'detalle_pedidos';
    protected $fillable = ['id_pedido', 'id_producto', 'cantidad', 'precio'];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'id_pedido');
    }
}

