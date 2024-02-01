import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Palls } from '../../models/pall-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  Palls = Palls;
}
