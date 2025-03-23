import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-jewelry',
  templateUrl: './jewelry.component.html',
  styleUrls: ['./jewelry.component.css']
})
export class JewelryComponent implements OnInit {
  jewelryProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getJewelryProducts();
  }

  getJewelryProducts() {
    this.productService.getJewelry().subscribe((data: any) => {
      this.jewelryProducts = data;
    });
  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }
}
