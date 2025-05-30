import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ProductListComponent } from './app/products/product-list/product-list.component';

bootstrapApplication(ProductListComponent, appConfig)
  .catch((err) => console.error(err));
