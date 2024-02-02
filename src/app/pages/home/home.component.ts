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
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private urlApi = `${environment.urlApi}`;
  myPalls: any;
  searchTerm: string = '';
  searchElement: string = '';

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
    return this.myPalls.some((myPall: { id: any }) => myPall.id === pallId);
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

  addToPalldex(pallId: string) {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${authToken}`);

    this.http
      .post(`${this.urlApi}/user/palls`, { pallId }, { headers })
      .subscribe({
        next: (res: any) => {
          this.ngOnInit();
        },
        error: (e: any) => {},
      });
  }

  searchBy() {
    if (this.searchElement.trim() !== '' || this.searchTerm.trim() !== '') {
      if (this.searchElement.trim() !== '' && this.searchTerm.trim() !== '') {
        this.Palls = Palls.filter((pall) =>
          pall.elements.includes(this.searchElement)
        ).filter((pall) =>
          pall.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else if (this.searchElement.trim() === '') {
        this.Palls = Palls.filter((pall) =>
          pall.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else if (this.searchTerm.trim() === '') {
        this.Palls = Palls.filter((pall) =>
          pall.elements.includes(this.searchElement)
        );
      }
    }
  }

  // if (this.searchElement.trim() !== '') {
  //   this.Palls = Palls.filter(pall => pall.elements.includes(this.searchElement));
  // } else {
  //   this.Palls = Palls;
  // }

  // if (this.searchTerm.trim() !== '') {
  //   this.Palls = Palls.filter(pall => pall.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  // } else {
  //   this.Palls = Palls;
  // }
}
