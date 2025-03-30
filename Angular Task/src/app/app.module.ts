import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { JewelryComponent } from './pages/jewelry/jewelry.component';
import { CosmeticsComponent } from './pages/cosmetics/cosmetics.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    JewelryComponent,
    CosmeticsComponent,
    WishlistComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    EnquiryComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    CurrencyFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
