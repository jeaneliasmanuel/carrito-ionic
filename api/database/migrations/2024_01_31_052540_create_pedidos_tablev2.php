<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->unsignedBigInteger('id_pedido'); // Quitamos el autoincrementable
            $table->unsignedBigInteger('id_usuario');
            $table->decimal('total', 8, 2);
            $table->string('estado');
            $table->timestamp('fecha_pedido')->nullable();
            $table->timestamps();
            // otras columnas necesarias
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
