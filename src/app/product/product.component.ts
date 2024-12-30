import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  product: any = {};
  productId: number = 0;  // Déclarez ici la variable productId avec une valeur initiale
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProducts(); // Récupérer tous les produits lors du démarrage du composant
  }

  getProducts() {
    this.http.get('http://localhost:8080/api/products')
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Error fetching products!';
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.products = data;
      });
  }

  addProduct() {
    this.http.post('http://localhost:8080/api/products', this.product)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Error adding product!';
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.products.push(data);
          this.product = {};
        }
      });
  }

  deleteProduct(productId: number) {
    this.http.delete(`http://localhost:8080/api/products/${productId}`)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Error deleting product!';
          return of(null);
        })
      )
      .subscribe(() => {
        this.products = this.products.filter(product => product.id !== productId);
      });
  }

  getProductById(productId: number) {
    this.http.get(`http://localhost:8080/api/products/${productId}`)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Product not found!';
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.product = data;
      });
  }
}
