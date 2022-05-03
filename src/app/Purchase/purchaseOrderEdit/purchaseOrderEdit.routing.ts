import {Routes} from '@angular/router';
import {purchaseOrderEditComponent} from './purchaseOrderEdit.component';
export const purchaseOrderEditRoutes: Routes = [{
  path: '',
  component:purchaseOrderEditComponent,
  data: {
    breadcrumb: ''
  }
}];
