import {Routes} from '@angular/router';
import {purchaseOrderComponent} from './purchaseOrder.component';
export const purchaseOrderRoutes: Routes = [{
  path: '',
  component:purchaseOrderComponent,
  data: {
    breadcrumb: ''
  }
}];
