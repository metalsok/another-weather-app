import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient,private router:Router) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.httpClient
      .post<{ token: string }>('http://localhost:3000/api/user/login', {
        email,
        password,
      })
      .pipe(tap((res) => this.setToken(res.token)));
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public clearToken(): void {
    localStorage.removeItem('access_token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    // Here you can also check if the token is expired using a JWT library
    return !!token;
  }
}
