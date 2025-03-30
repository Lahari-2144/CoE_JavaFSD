import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cosmetics',
  templateUrl: './cosmetics.component.html',
  styleUrls: ['./cosmetics.component.css']
})
export class CosmeticsComponent implements OnInit {
  cosmeticProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCosmeticsProducts().subscribe(data => {
      this.cosmeticProducts = data;
      console.log(this.cosmeticProducts);
    });
  }
  
  // ngOnInit(): void {
  //   this.getCosmeticProducts();
  // }

  // getCosmeticProducts() {
  //   this.productService.getCosmetics().subscribe((data: any) => {
  //     this.cosmeticProducts = data;
  //   });
  // }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }
}
