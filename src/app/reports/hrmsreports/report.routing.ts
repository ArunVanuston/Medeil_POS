import {Routes} from '@angular/router';
import { CloseregisterComponent } from './closeregister/closeregister.component';
import { EmpcloseregisterComponent } from './empcloseregister/empcloseregister.component';
import { LoginapprovedempComponent } from './loginapprovedemp/loginapprovedemp.component';
import { OpenregisterComponent } from './openregister/openregister.component';



import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'HRMSReports',

        component: reportComponent,
        data: {
          breadcrumb: 'HRMS Reports'
        } 

      } ,
      {
        path: 'LoginApproveEmployee',

        component: LoginapprovedempComponent,
        data: {
          breadcrumb: 'Login Approved Empolyees Reports'
        } 

      } ,
      {
        path: 'OpenRegister',

        component: OpenregisterComponent,
        data: {
          breadcrumb: 'Open Register Reports'
        } 

      } ,
      {
        path: 'CloseRegister',

        component: CloseregisterComponent,
        data: {
          breadcrumb: 'Close Register Reports'
        } 

      } ,
      {
        path: 'EmployeeRegister',

        component: EmpcloseregisterComponent,
        data: {
          breadcrumb: 'Open and Close Register Reports'
        } 

      } 




    ]
  }
];


