import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PatientAlertRoutes } from './PatientAlert.routing';
import { PatientAlertComponent } from './PatientAlert.component';
import { addPatientAlertComponent } from './addPatientAlert/addPatientAlert.component';
import { viewPatientAlertComponent } from './viewPatientAlert/viewPatientAlert.component';
import { CategoryPipe } from './viewPatientAlert/viewPatientAlert-list.pipe';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
} 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientAlertRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [PatientAlertComponent, addPatientAlertComponent, viewPatientAlertComponent, CategoryPipe]
})

export class PatientAlertmodule { }
