import {Routes} from '@angular/router';
import { DistbankdetailsComponent } from './distbankdetails/distbankdetails.component';
import { DistwiseproductsComponent } from './distwiseproducts/distwiseproducts.component';
import { ManuwiseproductsComponent } from './manuwiseproducts/manuwiseproducts.component';








import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'VendorReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Vendor Reports'
        } 
        

      } ,
      {
        path: 'VendorwiseProducts',

        component: DistwiseproductsComponent,
        data: {
          breadcrumb: 'Vendorwise Products'
        } 
        

      } ,
      {
        path: 'VendorBankDeatils',

        component: DistbankdetailsComponent,
        data: {
          breadcrumb: 'Vendor Bank Deatils'
        } 
        

      } ,
      {
        path: 'PharmaCompanyProducts',

        component: ManuwiseproductsComponent,
        data: {
          breadcrumb: 'Manufacturewise Products'
        } 
        

      } 




    ]
  }
];


