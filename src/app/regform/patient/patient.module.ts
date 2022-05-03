import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { PatientComponent } from './patientSave/patient.component';


import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {SharedModule} from '../../shared/shared.module';
import { PatientRoutes } from './patient.routing';
import { PatientEditComponent } from './patientEdit/patientEdit.component';
import { PatientInComponent } from './patientIn/patientIn.component';

 import { PatientViewComponent } from './patientView/patientView.component';

    import { CategoryPipe } from   './patientView/patientView.pipe'; 
import { AddRelativesComponent } from './add-relatives/add-relatives.component';


@NgModule({
  imports: [
    CommonModule,
    AngularMultiSelectModule,
    RouterModule.forChild(PatientRoutes),
   SharedModule
  ],
  declarations: [PatientComponent, PatientEditComponent, PatientViewComponent, PatientInComponent,AddRelativesComponent, CategoryPipe]
})

export class PatientModule {}
