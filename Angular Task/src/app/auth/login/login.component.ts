import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // login() {
  //   this.authService.login(this.username, this.password).subscribe({
  //     next: (users) => {
  //     if (users.length > 0) {  
  //       localStorage.setItem('user', JSON.stringify(users[0]));
  //       alert('Login Successful!');
  //       this.router.navigate(['/products']); }
  //     else{
  //       alert('Invalid Credentials!'); 
  //       }
  //     },
  //      error: (err) => {
  //     console.error('Login error:', err);
  //        alert('Something went wrong. Please try again.');
  //     }
  //     });
  // }
  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/products']); // Redirect to products after login
    } else {
      alert('Invalid credentials!');
    }
  }
}
