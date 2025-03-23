import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:4500/products'; // JSON Server

  constructor(private http: HttpClient) {}
 
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  getJewelry(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?category=jewelry`);
  }

  getCosmetics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?category=cosmetics`);
  }

  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  }

  addToWishlist(product: any) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Added to wishlist!');
  }
}
