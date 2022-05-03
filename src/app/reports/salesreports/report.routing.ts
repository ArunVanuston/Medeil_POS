import {Routes} from '@angular/router';








import { reportComponent } from './report.component'  ;
import { SalesandpurchaseComponent } from './salesandpurchase/salesandpurchase.component';
import { SalesflowchartComponent } from './salesflowchart/salesflowchart.component';


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'SalesReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Sales Reports'
        } 

      } ,
      {
        path: 'SalesChart',

        component: SalesflowchartComponent,
        data: {
          breadcrumb: 'Sales Chart'
        } 

      } ,
      {
        path: 'SalesPurchaseChart',

        component: SalesandpurchaseComponent,
        data: {
          breadcrumb: 'Sales and Purchase Chart'
        } 

      } 



    ]
  }
];


