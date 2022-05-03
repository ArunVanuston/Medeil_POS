import {Routes} from '@angular/router';
import {addPatientAlertComponent} from './addPatientAlert.component';

export const addPatientAlertRoutes: Routes = [{
  path: '',
  component: addPatientAlertComponent,
  data: {
    breadcrumb: 'Add Patient Alert'
  }
}];
