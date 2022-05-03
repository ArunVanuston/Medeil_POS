import { Routes } from '@angular/router';
import { PatientAlertComponent } from './PatientAlert.component';
import { addPatientAlertComponent } from './addPatientAlert/addPatientAlert.component';
import { viewPatientAlertComponent } from './viewPatientAlert/viewPatientAlert.component';
export const PatientAlertRoutes: Routes = [

    {
        path: '',

        component: PatientAlertComponent,
        data: {
            breadcrumb: 'PatientAlert',
            status: false
        },
        children: [
            {
                path: 'SendPatientAlert',
                component: addPatientAlertComponent,
                data: {
                    breadcrumb: 'Add Patient Alert'
                }
            },{

            
                path: 'ViewPatientAlert',
                component: viewPatientAlertComponent,
                data: {
                    breadcrumb: 'View Patient Alert'
                }
            }]
    }];

