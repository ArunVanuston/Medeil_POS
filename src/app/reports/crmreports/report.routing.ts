import {Routes} from '@angular/router';
import { AllmembershiplistComponent } from './allmembershiplist/allmembershiplist.component';
import { RefillcustComponent } from './refillcust/refillcust.component';
import { reportComponent } from './report.component'  ;
import { SelectedmembershipsComponent } from './selectedmemberships/selectedmemberships.component';


export const reportRoutes: Routes = [

  {
    path: '',

    children: [
     {
        path: 'CRMReports',

        component: reportComponent,
        data: {
          breadcrumb: 'CRM Reports'
     }
    },
        {
          path: 'RefillCustomers',
  
          component: RefillcustComponent,
          data: {
            breadcrumb: 'Refill Customers List'
          } 
   

      } ,
      {
        path: 'MembershipList',

        component: AllmembershiplistComponent,
        data: {
          breadcrumb: 'Membership List'
        } 
 

    },
    {
      path: 'SelectedMembershipList',

      component: SelectedmembershipsComponent,
      data: {
        breadcrumb: 'Membership List'
      } 


  } 





    ]
  }
];


