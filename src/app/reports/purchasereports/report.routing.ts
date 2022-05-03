import {Routes} from '@angular/router';
import { CommongstreportComponent } from './commongstreport/commongstreport.component';
import { DcreportComponent } from './dcreport/dcreport.component';
import { PurchasebarchartComponent } from './purchasebarchart/purchasebarchart.component';
import { PurchasereturngstComponent } from './purchasereturngst/purchasereturngst.component';








import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'PurchaseReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Purchase Reports'
        } 

      },
      {
        path: 'PurchaseDeliveryChallan',

        component: DcreportComponent,
        data: {
          breadcrumb: 'Purchase Delivery Challan Reports'
        }
       } ,
        {
          path: 'PurchaseBarchart',
  
          component: PurchasebarchartComponent,
          data: {
            breadcrumb: 'Purchase Monthly Reports'
          } 
        },
          {
            path: 'PurchaseGSTReport',
    
            component: CommongstreportComponent,
            data: {
              breadcrumb: 'Common GST Reports'
            } 

          },   {
            path: 'PurchaseReturnGSTReport',
    
            component: PurchasereturngstComponent,
            data: {
              breadcrumb: 'Purchase Return GST Reports'
            } 

          }
    ]
  }
];


