import {Routes} from '@angular/router';
import { blncesheetSaveComponent } from './blncesheetSave/blncesheetSave.component';
export const blncesheetRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'BalanceSheet',
        component: blncesheetSaveComponent,
        data: {
          breadcrumb: 'Balance Sheet'
        }
      }
    ]
  }
];
