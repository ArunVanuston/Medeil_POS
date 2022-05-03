import {Routes} from '@angular/router';
import { plstmtSaveComponent } from './plstmtSave/plstmtSave.component';
export const plstmtRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ProfitLossStatement',
        component: plstmtSaveComponent,
        data: {
          breadcrumb: 'Profit & Loss Statement'
        }
      }
    ]
  }
];
