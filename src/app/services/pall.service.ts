import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PallService {
  private urlApi = `${environment.urlApi}`;

  constructor(public authService: AuthService, private http: HttpClient) {}
  getPalls() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    return this.http.get(`${this.urlApi}/user/palls`, { headers });
  }
}
