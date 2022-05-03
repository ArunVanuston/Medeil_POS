import {Routes} from '@angular/router';
import { BellnotifyComponent } from './bellnotify.component';
import { viewnotifyComponent } from './viewnotify/viewnotify.component';

export const bellRoutes: Routes = [{
    path: 'BellNotify',
    component: BellnotifyComponent,
    data: {
      breadcrumb: 'Notifications'
    }
  },{
    path: 'ViewNotify',
    component: viewnotifyComponent,
    data: {
      breadcrumb: 'View Notifications'
    }
  }];
