import {Routes} from '@angular/router';
import {addEmployeeComponent} from './addEmployee.component';

export const addEmployeeRoutes: Routes = [{
  path: '',
  component: addEmployeeComponent,
  data: {
    breadcrumb: 'Employee Information'
  }
}];
