import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
