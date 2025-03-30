import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private wishlistService: WishlistService, private cartService: CartService) {}

  ngOnInit() {
    // this.productService.getProducts().subscribe(data => {
    //   this.products = data;
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  addToWishlist(product: any) {
    this.wishlistService.addToWishlist(product);
    alert(`${product.name} added to wishlist!`);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
}

}