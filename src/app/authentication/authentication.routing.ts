import { Routes } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DirectforgotComponent } from './directforgot/directforgot.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockScreenComponent } from "./lock-screen/lock-screen.component";
import { AddsinupComponent } from './SinUp/addSinUp.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
        data: {
          breadcrumb: "Login"
        }
      },
      {
        path: 'registration',
        loadChildren: './registration/registration.module#RegistrationModule',
        data: {
          breadcrumb: "Registration"
        }
      }, {
        path: 'forgot/:id',
        component: ForgotComponent,
        data: {
          breadcrumb: "Forgot"
        }
      },{
        path: 'directforgot/:user',
        component: DirectforgotComponent,
        data: {
          breadcrumb: "Forgot"
        }
      },{
        path: 'ChangePassword',
        component: ChangepasswordComponent,
        data: {
          breadcrumb: "Change Password"
        }
      }, {
        path: 'lock-screen',
        component: LockScreenComponent,
        data: {
          breadcrumb: "Lock Screen"
        }
      },
      {
        path: 'SinUp',
        component: AddsinupComponent,
        data: {
          breadcrumb: "Sin Up"
        }
      }]
  }
];


