import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cart: any[] = [];
  totalAmount: number = 0;

  constructor(private fb: FormBuilder, private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.totalAmount = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      alert('Order placed successfully!');
      this.cartService.clearCart();
      this.checkoutForm.reset();
    }
  }
}
