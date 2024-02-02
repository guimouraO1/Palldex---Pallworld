import { Component, OnInit } from '@angular/core';
import { PallService } from '../../services/pall.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-palldex',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './palldex.component.html',
  styleUrl: './palldex.component.scss'
})
export class PalldexComponent implements OnInit{
  myPalls: any;
  private urlApi = `${environment.urlApi}`;

  constructor(private _pallService: PallService, private http: HttpClient){}

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

  deletePall(pallId: string) {

    console.log(pallId);
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${authToken}`);
  
    this.http.delete(`${this.urlApi}/user/palls`, { headers, body: { pallId } })
      .subscribe({
        next: (res: any) => {
          this.ngOnInit();
        },
        error: (e: any) => {
          // Trate os erros conforme necessário
        },
      });
  }
  
}
