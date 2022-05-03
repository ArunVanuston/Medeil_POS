import {Routes} from '@angular/router';
import { HqreportComponent } from './hqreport.component'  ;
export const hqreportRoutes: Routes = [
  {
    path: '',
    children: [
     {
        path: 'ALLReports',
        component: HqreportComponent,
        data: {
          breadcrumb: 'HQ Reports'
        } 

      } 
    ]
  }
];
