import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(): boolean {
    // if (this.authService.isLoggedIn()) {
    //   const user = localStorage.getItem('user');
    //   if (user) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    const isAuthenticated = localStorage.getItem('user') !== null;
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }
}
