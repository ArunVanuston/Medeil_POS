import {Routes} from '@angular/router';

import {PatientComponent} from './patientSave/patient.component';



import {PatientEditComponent} from './patientEdit/patientEdit.component';
import { PatientInComponent } from './patientIn/patientIn.component';

import {PatientViewComponent} from './patientView/patientView.component';
import { AddRelativesComponent } from './add-relatives/add-relatives.component';

export const PatientRoutes: Routes = [


{path: 'patientedit/:id', component: PatientEditComponent  ,
data: {
  breadcrumb: 'Edit Patient Details'
}},
  {
    path: '',


    children: [
      {
        path: 'AddPatient',

        component: PatientComponent,
        data: {
          breadcrumb: 'Add Patient'
        }

      }, {
        path: 'ViewPatient',

        component: PatientViewComponent,
        data: {
          breadcrumb: 'Patient Maintenance'
        }

      }, {
        path: 'AddRelatives',

        component: AddRelativesComponent,
        data: {
          breadcrumb: 'Add Relatives'
        }

      }


    ]
  }
];


