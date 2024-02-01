import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(public _router: Router) {}

  home() {
    this._router.navigate(['home']);
  }
  palldex() {
    this._router.navigate(['palldex']);
  }
  logout() {
    localStorage.clear()
    this._router.navigate(['login']);
  }
}
