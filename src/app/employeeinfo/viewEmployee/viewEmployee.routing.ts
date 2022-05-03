import {Routes} from '@angular/router';
import {viewEmployeeComponent} from './viewEmployee.component';
export const viewEmployeeRoutes: Routes = [{
  path: '',
  component:viewEmployeeComponent,
  data: {
    breadcrumb: 'Employee Viwe Information'
  }
}];
