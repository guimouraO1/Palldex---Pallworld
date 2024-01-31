import { RouterModule, Routes } from '@angular/router';
import { alwaysAllowAuthGuard } from './_guard/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    // canActivate: [alwaysAllowAuthGuard],
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  