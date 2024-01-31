<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosTableSeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 81; $i++) {
            DB::table('productos')->insert([
                'descripcion' => 'Producto ' . $i,
                'precio' => rand(100, 1000), // Puedes ajustar el rango de precio
                'foto' => 'producto (' . $i . ').jpg',
                'cantidad' => rand(10, 100), // Ajusta la cantidad según necesites
                'estado' => rand(0, 1), // Estado 0 o 1, ajusta según tu lógica de negocio
                // Agrega cualquier otro campo necesario
            ]);
        }
    }
}
