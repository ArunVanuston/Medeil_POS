import {Routes} from '@angular/router';
import {stockViewComponent} from './stockView.component';
export const viewEmployeeRoutes: Routes = [{
  path: '',
  component:stockViewComponent,
  data: {
    breadcrumb: 'INDENT STATUS'
  }
}];
