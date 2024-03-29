import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _isAuthenticated: boolean = false;
  private urlApi = `${environment.urlApi}`;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    this.http
      .post(`${this.urlApi}/login`, { email, password })
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this._isAuthenticated = true;
          localStorage.setItem('token', res.authToken);
          this.router.navigate(['/home']);
        },
        error: (e: any) => {},
      });
  }

  register(email: string, password: string, confirmPassword: string) {
    this.http
      .post(`${this.urlApi}/user`, {
        email,
        password,
        confirmPassword,
      })
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['login']);
        },
        error: (e: any) => {},
      });
  }

  async asycUserAuthentication() {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${authToken}`);

    try {
      const res: any = await lastValueFrom(
        this.http.get(`${this.urlApi}/user/auth`, { headers }).pipe(take(1))
      );

      this._isAuthenticated = true;
      return true;
    } catch (e) {
      this._isAuthenticated = false;
      return false;
    }
  }

  async _isAuthUser(): Promise<boolean> {
    await this.asycUserAuthentication();
    return this._isAuthenticated;
  }
}
