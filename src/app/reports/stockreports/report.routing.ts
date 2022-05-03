import {Routes} from '@angular/router';
import { AdjustmentstocklistComponent } from './adjustmentstocklist/adjustmentstocklist.component';
import { DisposalproductsreportComponent } from './disposalproductsreport/disposalproductsreport.component';








import { reportComponent } from './report.component'  ;
import { ShortexpComponent } from './shortexp/shortexp.component';
import { StockcheckinglistComponent } from './stockcheckinglist/stockcheckinglist.component';


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'StockReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Reports'
        } 

      },
      {
        path: 'DisposalStockReports',

        component: DisposalproductsreportComponent,
        data: {
          breadcrumb: 'Disposal Stock List'
        } 

      } ,
      {
        path: 'ShortExpiryReports',

        component: ShortexpComponent,
        data: {
          breadcrumb: 'Short Expiry Product List'
        } 

      }, {
        path: 'AdjustmentStockList',

        component: AdjustmentstocklistComponent,
        data: {
          breadcrumb: 'Adjustment Stock List'
        }
        },
        {
          path: 'CheckingStockList',
  
          component: StockcheckinglistComponent,
          data: {
            breadcrumb: 'Checking Stock List'
          } 
   

      }      

  

    ]
  }
];


