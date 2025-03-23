import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken');
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
