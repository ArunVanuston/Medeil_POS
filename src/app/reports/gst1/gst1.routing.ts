import {Routes} from '@angular/router';
import { Gst1Component } from './gst1.component';
import { Gst1productComponent } from './gst1product/gst1product.component';


export const Gst1Routes: Routes = [

  {
    path: '',

    children: [
     {
        path: 'Gstr1InvReports',

        component: Gst1Component,
        data: {
          breadcrumb: 'Invoicewise Gstr1 Reports'
        } 

      } 



    ]
  }, {
    path: '',

    children: [
     {
        path: 'Gstr1ProdReports',

        component: Gst1productComponent,
        data: {
          breadcrumb: 'Productwise Gstr1 Reports'
        } 

      } 



    ]
  }
];


