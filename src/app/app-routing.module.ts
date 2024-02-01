import { RouterModule, Routes } from '@angular/router';
import { alwaysAllowAuthGuard, authGuard } from './_guard/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    canActivate: [alwaysAllowAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Pallword | Login',
        loadComponent: () =>
          import('./pages/login/login.component')
          .then((p) => p.LoginComponent),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Pallword | Home',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (p) => p.HomeComponent
          ),
      },
      {
        path: 'palldex',
        title: 'Pallword | Palldex',
        loadComponent: () =>
          import('./pages/palldex/palldex.component').then(
            (p) => p.PalldexComponent
          ),
      },
    ],
  },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  