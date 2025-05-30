import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        tap((users) => {
          if (users.length > 0) {
            this.loggedIn.next(true);
            localStorage.setItem('user', JSON.stringify(users[0]));
          } else {
            this.loggedIn.next(false);
          }
        })
      );
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
  
}
