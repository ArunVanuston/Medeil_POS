import {Routes} from '@angular/router';


import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'AdminReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Reports'
        } 

      } 



    ]
  }
];


