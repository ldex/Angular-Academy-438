import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';
  private http = inject(HttpClient)
  products$: Observable<Product[]>

  constructor() {
    this.initProducts()
  }

  initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                        tap(console.table),
                        delay(1500) // pour la démo
                      )
  }
}
