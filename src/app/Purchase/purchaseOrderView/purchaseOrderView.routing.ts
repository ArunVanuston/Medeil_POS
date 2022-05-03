import {Routes} from '@angular/router';
import {purchaseOrderViewComponent} from './purchaseOrderView.component';
export const purchaseOrderViewRoutes: Routes = [{
  path: '',
  component:purchaseOrderViewComponent,
  data: {
    breadcrumb: ''
  }
}];
