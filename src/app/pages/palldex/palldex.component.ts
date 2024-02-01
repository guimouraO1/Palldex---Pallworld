import { Component, OnInit } from '@angular/core';
import { PallService } from '../../services/pall.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-palldex',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './palldex.component.html',
  styleUrl: './palldex.component.scss'
})
export class PalldexComponent implements OnInit{
  myPalls: any;

  constructor(private _pallService: PallService){}

  ngOnInit(): void {
    this.getPalls();
  }

  getPalls() {
    this._pallService.getPalls().subscribe({
      next: (_palls: any) => {
        this.myPalls = _palls;
      },
      error: (error: any) => {
        // console.error('Erro ao obter usuário:', error);
      },
    });
  }
}
