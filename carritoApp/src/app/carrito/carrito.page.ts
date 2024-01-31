import { Component, OnInit } from '@angular/core';
import { itemCarrito } from '../models/itemCarrito';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-carrito',
templateUrl: './carrito.page.html',
styleUrls: ['./carrito.page.scss'],
})

export class CarritoPage implements OnInit {
  listaItemsCarrito: itemCarrito[] = [];
  public total = 0;

  constructor(private productoService: ProductoService, private router: Router) {} 

  ngOnInit() {
    this.MuestraCarrito();
  }

  VaciarCarrito() {
    // Puedes agregar un mensaje de confirmación aquí
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      localStorage.clear();
      this.listaItemsCarrito = []; // Vacía la lista de elementos del carrito
      this.total = 0; // Establece el total en 0
    }
  }
  
  eliminarProductoCarrito(i: number) {
    let carrito = this.getCarritoFromStorage();
    carrito.splice(i, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.MuestraCarrito();
  }

  MuestraCarrito() {
    this.listaItemsCarrito = this.getCarritoFromStorage();
    this.TotalCarrito();
  }

  TotalCarrito() {
    let carrito = this.getCarritoFromStorage();
    let suma = carrito.reduce((total, item) => total + (item.precio || 0) * (item.cantidad || 0), 0);
    this.total = suma;
  }

  private getCarritoFromStorage(): itemCarrito[] {
    let carritoStorage = localStorage.getItem('carrito') || '[]';
    return JSON.parse(carritoStorage);
  }

  finalizarCompra() {
    const pedido = {
      items: this.listaItemsCarrito,
      total: this.total,
      id_usuario: 1, 
    };

    this.productoService.realizarPedido(pedido).subscribe({
      next: (response) => {
        if (response && response.success) {
          console.log('Pedido realizado con éxito', response);
          localStorage.clear(); // Limpia el carrito después de realizar el pedido
          this.listaItemsCarrito = []; // Actualiza la lista del carrito
          this.total = 0;
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        } else {
          console.error('Hubo un error al realizSar el pedido', response);
          // Aquí maneja el mensaje de error, por ejemplo, mostrarlo al usuario
        }
      },
      error: (error) => {
        console.error('Hubo un error en la solicitud', error);
        // Aquí maneja el error de solicitud, por ejemplo, mostrar un mensaje genérico
      }
    });
}

verCatalogo() {
  this.router.navigate(['/catalogo']); // Reemplaza '/carrito' con la ruta real de tu carrito
}
}