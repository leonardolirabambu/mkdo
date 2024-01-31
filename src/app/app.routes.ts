import { Routes } from '@angular/router';
import { LoginComponent } from './pages/Auth/login/login.component';
import { ListapersonalComponent } from './pages/listapersonal/listapersonal.component';
import { ChangepassfirtComponent } from './pages/Auth/changepassfirt/changepassfirt.component';
import { RestorepasswordComponent } from './pages/Auth/restorepassword/restorepassword.component';
import { DataPersonalComponent } from './pages/data-personal/data-personal.component';

export const routes: Routes = [
  {
    path: 'auth',
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'actualizarpassword',
        component:ChangepassfirtComponent
      },
      {

        path:'recuperar',
        children:[
          {
            path:'password',
            component:RestorepasswordComponent
          },
          {
            path:'actualizar',
            component:RestorepasswordComponent
          }
        ]
      }
    ]
  },
  {
    path: 'lista/:type',
    component:ListapersonalComponent
  },
  {
    path:'datos/persona/:id',
    component:DataPersonalComponent
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
