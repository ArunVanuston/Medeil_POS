import { Routes } from '@angular/router';
import { purchaseApprovalComponent } from './purchaseApproval.component';
import { addpurchaseApprovalComponent } from './addpurchaseApproval/addpurchaseApproval.component';
import { viewpurchaseApprovalComponent } from './viewpurchaseApproval/viewpurchaseApproval.component';
export const purcdueRoutes: Routes = [
  {
    path: '',
  
    children: [
      {
        path: 'AddPurchaseDue',
        component: addpurchaseApprovalComponent,
        data: {
          breadcrumb: 'Add Purchase Due'
        }
      },
      {
        path: 'ViewPurchaseDue',
        component: viewpurchaseApprovalComponent,
        data: {
          breadcrumb: 'View Purchase Due'
        }
      }
    ]
  }];
