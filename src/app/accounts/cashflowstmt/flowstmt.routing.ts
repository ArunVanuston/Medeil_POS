import {Routes} from '@angular/router';
import { flowstmtSaveComponent } from './flowstmtSave/flowstmtSave.component';
export const flowstmtRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'CashflowStatement',
        component: flowstmtSaveComponent,
        data: {
          breadcrumb: 'Cashflow Statement'
        }
      }
    ]
  }
];
