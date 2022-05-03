import {Routes} from '@angular/router';
import { daybookSaveComponent } from './daybookSave/daybookSave.component';
export const daybookRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'DayBook',
        component: daybookSaveComponent,
        data: {
          breadcrumb: 'DayBook '
        }
      }
    ]
  }
];
