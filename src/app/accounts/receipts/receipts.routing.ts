import { Routes } from '@angular/router';
import { receiptSaveComponent } from './receiptSave/receiptSave.component';
import { receiptEditComponent } from './receiptEdit/receiptEdit.component';
import { receiptViewComponent } from './receiptView/receiptView.component';
export const receiptsRoutes: Routes = [
  {
    path: 'receiptEdit/:id', component: receiptEditComponent,
    data: {
      breadcrumb: 'Receipt'
    }
  },
  {
    path: '',
    children: [
      {
        path: 'Receipt',
        component: receiptSaveComponent,
        data: {
          breadcrumb: 'Receipt'
        }
      }, {
        path: 'receiptEdit',
        component: receiptEditComponent,
        data: {
          breadcrumb: 'Receipt'
        }
      }, {
        path: 'ViewReceipt',
        component: receiptViewComponent,
        data: {
          breadcrumb: 'Receipt Maintenence'
        }
      }
    ]
  }
];
