import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:4500/products'; 
  private jewelryApiUrl = 'http://localhost:4500/JewelryProducts'; 
  private cosmeticsApiUrl = 'http://localhost:4500/CosmeticsProducts'

  constructor(private http: HttpClient) {}
 
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  //  getJewelry(): Observable<any> {
  //    return this.http.get<any>(`${this.jewelryApiUrl}?category=jewelry`);
  //  }

  //  getCosmetics(): Observable<any> {
  //    return this.http.get<any>(`${this.cosmeticsApiUrl}?category=cosmetics`);
  //  }

  getJewelryProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jewelryApiUrl).pipe(
      map(products => products.filter(product => product.category == 'Jewelry'))
    );
  }
  
  getCosmeticsProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.cosmeticsApiUrl).pipe(
      map(products => products.filter(product => product.category == 'Cosmetics'))
    );
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

  addEnquiry(data:any):Observable<any>{
    return this.http.post('http://localhost:4500/enquiry',data);
  }

  getEnquiry():Observable<any>{
    return this.http.get('http://localhost:4500/enquiry');
  }

}
