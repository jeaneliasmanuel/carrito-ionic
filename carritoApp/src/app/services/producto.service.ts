import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  private url='http://localhost:8000/api'
  constructor( private http:HttpClient ) { }
  ObtenerTodos(){
    return this.http.get<[Producto]>(this.url+"/listado");
  }

  realizarPedido(pedido: any): Observable<any> {
    return this.http.post(this.url + '/crear-pedido', pedido);
  }
  
}
