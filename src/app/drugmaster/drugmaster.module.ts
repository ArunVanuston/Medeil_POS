import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {drugRoutes} from './drugmaster.routing';
import {drugComponent} from './drugmaster.component';
import {adddrugComponent} from './addDrugmaster/addDrugmaster.component';
import {viewdrugComponent} from './viewDrugmaster/viewDrugmaster.component';  
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryPipe } from './viewDrugmaster/viewDrugmaster.pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {editdrugComponent} from './editDrugmaster/editDrugmaster.component';
import {drugpicturesComponent} from './drugPictures/drugPictures.component';
import { InsertdrugsComponent } from './insertdrugs/insertdrugs.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { ViewdrugmasterpaginateComponent } from './viewdrugmasterpaginate/viewdrugmasterpaginate.component';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(drugRoutes),
    SharedModule, 
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    RightPanelModule,
    HttpClientModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [drugComponent,adddrugComponent,viewdrugComponent,CategoryPipe,editdrugComponent,drugpicturesComponent, InsertdrugsComponent, ViewdrugmasterpaginateComponent]
})

export class drugModule {}  