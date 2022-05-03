import {Routes} from '@angular/router';
import { custSaveComponent } from './custSave/custSave.component'  ;
import { custEditComponent } from './custEdit/custEdit.component'  ;
import { custViewComponent } from './custView/custView.component' ;
import { RefillcustviewComponent } from './refillcustview/refillcustview.component';

export const customerRoutes: Routes = [

{path: 'custEdit/:id', component: custEditComponent ,
data: {
  breadcrumb: 'Edit Customer Details'
}  },

  {
    path: '',


    children: [
      {
        path: 'AddCustomer',

        component: custSaveComponent,  
        data: {
          breadcrumb: 'Add Customer'
        }

      }  ,

         {
        path: 'custEdit',

        component: custEditComponent, 
         data: {
          breadcrumb: 'Edit Customer Details'
        }


      } , {
        path: 'ViewCustomer',

        component: custViewComponent,  
        data: {
          breadcrumb: 'View Customer'
        }


      }, {
        path: 'ViewRefillCustomer',

        component:  RefillcustviewComponent,  
        data: {
          breadcrumb: 'View Customer'
        }


      }


    ]
  }
];


