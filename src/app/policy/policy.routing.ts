import {Routes} from '@angular/router';
import { PolicyeditComponent } from './policyedit/policyedit.component';
import { PolicysaveComponent } from './policysave/policysave.component';
import { PolicyviewComponent } from './policyview/policyview.component';




export const policyRoutes: Routes = [{

    path: '',

    children: [
      {
        path: 'AddPolicy',

        component: PolicysaveComponent,  
        data: {
          breadcrumb: 'Add Policy'
        }

      } ,
      {
        path: 'ViewPolicy',

        component: PolicyviewComponent,  
        data: {
          breadcrumb: 'View Policy'
        }
      },
      {
        path: 'EditPolicy/:id',

        component: PolicyeditComponent,  
        data: {
          breadcrumb: 'Edit Policy'
        }
      },
    
     
    ]
  }];


