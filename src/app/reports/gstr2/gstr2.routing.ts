import {Routes} from '@angular/router';
import { Gstr2Component } from './gstr2.component';
import { Gstr2productComponent } from './gstr2product/gstr2product.component';

export const Gst2Routes: Routes = [

  {
    path: '',

    children: [
     {
        path: 'Gstr2InvReports',

        component: Gstr2Component,
        data: {
          breadcrumb: 'Invoicewise Gstr2 Reports'
        } 

      } 



    ]
  }, {
    path: '',

    children: [
     {
        path: 'Gstr2ProdReports',

        component: Gstr2productComponent,
        data: {
          breadcrumb: 'Productwise Gstr2 Reports'
        } 

      } 



    ]
  }
];


