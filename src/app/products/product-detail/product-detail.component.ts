import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [UpperCasePipe, DatePipe, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  private activatedRoute = inject(ActivatedRoute)
  private productService = inject(ProductService)
  private router = inject(Router)

  deleteProduct() {
    this
      .productService
      .deleteProduct(this.id)
      .subscribe(
        {
          next: () => {
            console.log('Product deleted on the server.')
            this.productService.resetList()
            this.router.navigateByUrl('/products')
          },
          error: err => console.log('Error while deleting product: ' + err.message)
        }
      )
  }

  private id = this.activatedRoute.snapshot.params.id

  product: Product;

  constructor() {
    this
      .productService
      .getProductById(this.id)
      .subscribe(
        data => this.product = data
      )
  }
}
