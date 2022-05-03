import {Routes} from '@angular/router';
import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [

  {
    path: '',

    children: [
     {
        path: 'DoctorReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Doctor Reports'
        } 

      } 



    ]
  }
];


