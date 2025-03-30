import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-jewelry',
  templateUrl: './jewelry.component.html',
  styleUrls: ['./jewelry.component.css']
})
export class JewelryComponent implements OnInit {
  jewelryProducts: any[] = [];

  constructor(private productService: ProductService) {}

   ngOnInit() {
     this.productService.getJewelryProducts().subscribe(data => {
       this.jewelryProducts = data;
       console.log(this.jewelryProducts);
     });
   }
  // ngOnInit(): void {
  //   this.productService.getJewelryProducts().subscribe(
  //     (data: Product[]) => {
  //       console.log("JewelryProducts:", data); 
  //       this.jewelryProducts = data;
  //     },
  //     (error) => {
  //       console.error("Error fetching Jewelry Products", error);
  //     }
  //   );
  // }


  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }
}
