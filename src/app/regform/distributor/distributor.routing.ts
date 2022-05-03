import {Routes} from '@angular/router';

import { DistributorComponent } from './distributorSave/distributor.component';

import {DistributorEditComponent } from './distributorEdit/distributorEdit.component';

import {DistributorViewComponent }  from './distributorView/distributorView.component';



export const distributorRoutes: Routes = [

  {path: 'EditVendor/:id', component: DistributorEditComponent ,
  data: {
    breadcrumb: 'Edit Vendor Details'
  }},

  {
    path: '',


    children: [
   {
        path: 'AddVendor',

        component: DistributorComponent ,
        data: {
          breadcrumb: 'Add Vendor'
        }

      }, {
        path: 'EditVendor',

        component: DistributorEditComponent,
        data: {
          breadcrumb: 'Edit Vendor Details'
        }

      }

      , {
        path: 'ViewVendor',

        component: DistributorViewComponent,
        data: {
          breadcrumb: 'View Vendor'
        }

      }


    ]
  }
];


