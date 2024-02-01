import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Palls } from '../../models/pall-list';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  Palls = Palls;
}
