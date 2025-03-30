import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { JewelryComponent } from './pages/jewelry/jewelry.component';
import { CosmeticsComponent } from './pages/cosmetics/cosmetics.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/jewelry', component: JewelryComponent, canActivate: [AuthGuard] },
  { path: 'products/cosmetics', component: CosmeticsComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'enquiry', component: EnquiryComponent },
  { path: '', redirectTo: '/jewelry', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
