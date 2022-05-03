import { SharedModule } from '../shared/shared.module';
import { DoctorComponent } from './doctor.component';
import { DoctorRoutes } from './doctor.routing';
import { DoctorService } from './doctor.service';
import { editDoctorComponent } from './editDoctor/editDoctor.component';
import { DoctorlistComponent } from './viewDoctor/viewDoctor.component';
import { DoctorregistrationComponent } from './addDoctor/addDoctor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CategoryPipe} from './viewDoctor/viewDoctor.pipe'
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [  
    CommonModule, 
    RouterModule.forChild(DoctorRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [DoctorComponent, DoctorregistrationComponent, DoctorlistComponent, editDoctorComponent,CategoryPipe],
  providers: [DoctorService]
})
export class DoctorModule { }