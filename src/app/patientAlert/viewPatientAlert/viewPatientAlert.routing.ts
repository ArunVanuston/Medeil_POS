import {Routes} from '@angular/router';
import {viewPatientAlertComponent} from './viewPatientAlert.component';
export const viewPatientAlertRoutes: Routes = [{
  path: '',
  component:viewPatientAlertComponent,
  data: {
    breadcrumb: 'Employee Viwe Information'
  }
}];
