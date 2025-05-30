import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, AsyncPipe, SlicePipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'})
export class ProductListComponent {

    title = 'Products'
    selectedProduct: Product
    private productService = inject(ProductService)
    private router = inject(Router)

    pageSize = 5
    start = 0
    end = this.pageSize
    pageNumber = 1

    previousPage() {
      this.start -= this.pageSize
      this.end -= this.pageSize
      this.pageNumber--
      this.selectedProduct = null
    }

    nextPage() {
      this.start += this.pageSize
      this.end += this.pageSize
      this.pageNumber++
      this.selectedProduct = null
    }

    onSelect(product: Product) {
      this.selectedProduct = product
      this.router.navigateByUrl('/products/' + product.id)
    }

    products$: Observable<Product[]> = this.productService.products$
}
