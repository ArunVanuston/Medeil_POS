import {Routes} from '@angular/router';
import { trialbalanceSaveComponent } from './trialbalanceSave/trialbalanceSave.component';
export const trialbalanceRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'TrialBalance',
        component: trialbalanceSaveComponent ,
        data: {
          breadcrumb: 'TrialBalance'
        }
      }
    ]
  }
];
