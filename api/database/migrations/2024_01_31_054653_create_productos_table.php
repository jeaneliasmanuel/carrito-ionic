<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('idproducto');
            $table->string('descripcion');
            $table->decimal('precio', 8, 2);
            $table->string('foto')->nullable(); // Asumiendo que 'foto' es una cadena y puede ser nula
            $table->integer('cantidad');
            $table->boolean('estado');
            // Agrega aquí otros campos necesarios
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
