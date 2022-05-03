import {Routes} from '@angular/router';
import { salesChallanSaveComponent } from './salesChalanSave/salesChallanSave.component'; 
import { salesChallanEditcomponent } from './salesChallanEdit/salesChallanEdit.component';
import { salesChallanViewComponent } from './salesChallanView/salesChallanView.component';


export const salesChallanRoutes: Routes = [


  {
    path: 'salesChallanEdit/:id',
   component: salesChallanEditcomponent ,
  data: {
    breadcrumb: 'Sales Delivery Challan'
  }},

  {
    path: '',


    children: [
     
      {
        path: 'SalesDeliveryReceipt',

        component: salesChallanSaveComponent,
        data: {
          breadcrumb: 'Sales Delivery Challan'
        }

      },
      {
        path: 'SalesDeliveryReceipt/:id',

        component: salesChallanSaveComponent,
        data: {
          breadcrumb: 'Sales Delivery Challan'
        }

      },


      
      // {
      //   path: 'SalesChallanEdit',

      //   component: salesChallanEditcomponent,
      //   data: {
      //     breadcrumb: 'Sales Delivery Challan'
      //   }

      // },
      
      
      
      
      {
        path: 'ViewSalesDelivery',

        component: salesChallanViewComponent,
        data: {
          breadcrumb: 'Sales Challan View'
        }

      }


    ]
  }
];


