import { Routes } from '@angular/router';
import { UserloginComponent } from './userlogin.component';
import { LoginComponent } from './login/login.component';

export const UserloginRoutes: Routes =[{
    path: '',
    children: [
               {
                path: 'login',
                component:LoginComponent,
                }
                
        ]}]