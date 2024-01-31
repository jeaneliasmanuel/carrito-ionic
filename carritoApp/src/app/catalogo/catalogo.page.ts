import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { itemCarrito } from '../models/itemCarrito';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})

export class CatalogoPage implements OnInit {
  productos:Producto[] | undefined;
  quantity:number;
  hasProducts: boolean = false;

  constructor(private productoService:ProductoService,
    private router:Router){
      this.quantity=0;
    }

    ngOnInit() {
      this.productoService.ObtenerTodos().subscribe((resp: any) => {
        this.productos = resp;
        this.hasProducts = false;
      })
    }    

    ionViewWillEnter() {
      // Este método se ejecutará cuando el usuario regrese a la vista 'catalogo'
      this.actualizarCarritoDesdeLocalStorage();
    }
  
    actualizarCarritoDesdeLocalStorage() {
      // Consulta el valor de 'localStorage' para obtener el carrito actual
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = JSON.parse(carritoStorage);
  
      // Actualiza 'quantity' y 'hasProducts' según el carrito actual
      if (carrito && carrito.length > 0) {
        this.quantity = carrito.length;
        this.hasProducts = true;
      } else {
        this.quantity = 0;
        this.hasProducts = false;
      }
    }

    addCarrito(producto: any) {
      let iCarrito:itemCarrito={
        idproducto:producto.idproducto,
        descripcion:producto.descripcion,
        precio:producto.precio,
        cantidad: 1
      }
      if(localStorage.getItem("carrito") === null) {
        let carrito:itemCarrito[] = [];
        carrito.push(iCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        this.quantity++;
        this.hasProducts = true;
      } else {
        let carritoStorage = localStorage.getItem("carrito") as string;
        let carrito = JSON.parse(carritoStorage);
        let index = -1;
        for(let i = 0; i < carrito.length; i++) {
          let filaC:itemCarrito = carrito[i];
          if (iCarrito.idproducto === filaC.idproducto) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          carrito.push(iCarrito);
          this.quantity++; // Incrementar la cantidad solo cuando se agrega un nuevo producto
          this.hasProducts = true; // Hay productos en el carrito
          localStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
          let itemCarrito: itemCarrito = carrito[index];
          itemCarrito.cantidad!++;
          this.hasProducts = true; // Hay productos en el carrito
          localStorage.setItem("carrito", JSON.stringify(carrito));
        }
      }
    }

  verCarrito() {
    this.router.navigate(['/carrito']); // Reemplaza '/carrito' con la ruta real de tu carrito
  }
  
}
