import {Routes} from '@angular/router';
import {editEmployeeComponent} from './editEmployee.component';

export const editEmployeeRoutes: Routes = [{
  path: ' ',
  component: editEmployeeComponent,
  data: {
    breadcrumb: 'Employee Edit Information'
    
  }
}];
