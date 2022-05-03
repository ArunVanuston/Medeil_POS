import {Routes} from '@angular/router';
import { InsurenceeditComponent } from './insurenceedit/insurenceedit.component';
import { InsurenceComponent } from './insurencesave/insurence.component';
import { InsurenceviewComponent } from './insurenceview/insurenceview.component';



export const insurenceRoutes: Routes = [{

    path: '',

    children: [
      {
        path: 'AddInsurence',

        component: InsurenceComponent,  
        data: {
          breadcrumb: 'Add Insurence'
        }

      } ,
      {
        path: 'ViewInsurence',

        component: InsurenceviewComponent,  
        data: {
          breadcrumb: 'View Insurence'
        }
      },
      {
        path: 'insurEdit/:id',

        component: InsurenceeditComponent,  
        data: {
          breadcrumb: 'Edit Insurence'
        }
      }
    ]
  }];


