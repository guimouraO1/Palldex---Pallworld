import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Palls } from '../../models/pall-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PallService } from '../../services/pall.service';
import { take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private urlApi = `${environment.urlApi}`;
  myPalls: any;
  constructor(private _pallService: PallService, private http: HttpClient) {}
  
  @ViewChild(MatPaginatorModule)
  paginator!: MatPaginator;

  Palls = Palls;
  totalItems: number = Palls.length;
  pageSize: number = 10; // número de itens por página
  currentPage: number = 0;

  ngOnInit() {
    this.getPalls();
    this.paginator.pageSize = this.pageSize;
  }

  // Método para obter a página atual
  get currentPageData() {
    const startIndex = this.currentPage * this.pageSize;
    return this.Palls.slice(startIndex, startIndex + this.pageSize);
  }

  // Método chamado quando a página é alterada
  onPageChange(event: { pageIndex: number }) {
    this.currentPage = event.pageIndex;
  }

  isPallInMyPalls(pallId: any): boolean {
    return this.myPalls.some((myPall: { id: any; }) => myPall.id === pallId);
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


  addToPalldex(pallId: string){
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${authToken}`);
    
      this.http.post(`${this.urlApi}/user/palls`, { pallId }, { headers })
        .subscribe({
          next: (res: any) => {
            this.ngOnInit();
          },
          error: (e: any) => {
          },
        });
    }

  
}
