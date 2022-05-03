import {Routes} from '@angular/router';






import {savePRComponent} from './savepurchaseReturn/savePR.component';

import {editPRComponent} from './editPurchaseReturn/editPR.component';

import {viewPRComponent} from './viewPurchaseReturn/viewPR.component';



export const purchaseReturnRoutes: Routes = [

{path: 'editPR/:id/:id1', component: editPRComponent  ,  data: {
          breadcrumb: 'Purchase Return'
        }},

  {
    path: '',


    children: [
     
      {
        path: 'PurchaseReturn',

        component: savePRComponent,
          data: {
          breadcrumb: 'Purchase Return'
        }

      }, {
        path: 'editPR',

        component: editPRComponent,
          data: {
          breadcrumb: 'Purchase Return'
        }

      }, {
        path: 'ViewPurchaseReturn',

        component: viewPRComponent,
          data: {
          breadcrumb: 'Purchase Return Maintenence'
        }

      }



    ]
  }
];


