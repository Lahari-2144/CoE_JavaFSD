import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];

  constructor() {
    this.loadWishlist();
  }

  addToWishlist(product: any) {
    if (!this.wishlist.some(item => item.id === product.id)) {
      this.wishlist.push(product);
      this.saveWishlist();
    }
  }

  removeFromWishlist(productId: number) {
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    this.saveWishlist();
  }

  getWishlist() {
    return this.wishlist;
  }

  saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  loadWishlist() {
    const data = localStorage.getItem('wishlist');
    if (data) {
      this.wishlist = JSON.parse(data);
    }
  }
}
