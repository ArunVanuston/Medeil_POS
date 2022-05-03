import { SharedModule } from '../shared/shared.module';
import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
import { DataHospitalform } from './data.service';
import { editHospitalComponent } from './edit-hospital/edit-hospital.component';
import { HospitalformRoutes } from './hospitalform.routing';
import { viewHospitalComponent } from './viewHospital/viewHospital.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { CategoryPipe } from './viewHospital/viewCompany.view.pipe';
import { HospitalformComponent } from './hospitalform.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module'; 
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(HospitalformRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [HospitalformComponent,CreateHospitalComponent, editHospitalComponent, viewHospitalComponent,CategoryPipe],
   providers: [DataHospitalform]
})

export class HospitalformModule { }
