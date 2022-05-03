import {Routes} from '@angular/router';








import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'InventoryReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Reports'
        } 

      } 



    ]
  }
];


