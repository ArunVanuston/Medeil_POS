import {Routes} from '@angular/router';


import { saveDistProdComponent } from './saveDistProd/saveDistProd.component';
import { editDistProdComponent } from './editDistProd/editDistProd.component';
import { viewDistProdComponent } from './viewDistProd/viewDistProd.component';


import { viewDistWiseProdComponent } from './viewDistWiseProd/viewDistWiseProd.component';

export const distprodRoutes: Routes = [

{path: 'EditVendorwiseProduct/:id', component: editDistProdComponent   ,
data: {
  breadcrumb: 'Vendorwise Product'
}
 },

  {
    path: '',


    children: [
    {
        path: 'AddVendorwiseProduct',

        component: saveDistProdComponent,
        data: {
          breadcrumb: 'Vendorwise Product'
        }

      }, {
        path: 'EditVendorwiseProduct',

        component: editDistProdComponent,
        data: {
          breadcrumb: 'Vendorwise Product'
        }

      },
      
      
  /*    {
        path: 'viewDistProd',

        component: viewDistProdComponent  ,
        data: {
          breadcrumb: 'DistributorWise Product Maintenance'
        }

      }   */
      
      
      
       {
        path: 'ViewVendorwiseProduct',

        component: viewDistWiseProdComponent  ,
        data: {
          breadcrumb: 'Vendorwise Product'
        }

      }  





      

    ]
  }
];


