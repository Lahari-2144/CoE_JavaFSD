import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4500/users';

  constructor(private http: HttpClient, private router: Router) {}

   isLoggedIn(): boolean {
     return !!localStorage.getItem('user');
 }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken');
  }

  //  login(username: string, password: string): Observable<any> {
  //    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`);
  //  }
   login(username: string, password: string): boolean {
     if (username === 'lahari' && password === 'chinni') {
      //  localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({ username }));
       return true;
     }
     return false;
   }

  // isLoggedIn(): boolean {
  //   return localStorage.getItem('isLoggedIn') === 'true';
  // }

  // logout(): void {
  //   localStorage.removeItem('isLoggedIn');
  // }


   logout() {
     localStorage.removeItem('user');
     this.router.navigate(['/login']);
 }
}
