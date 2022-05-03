import { SharedModule } from '../shared/shared.module';
import { AdddamagestockComponent } from './adddamagestock/adddamagestock.component';
import { DamagestockComponent } from './damagestock.component';
import { DamagestockRoutes } from './damagestock.routing';
import { DamagestockService } from './damagestock.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {viewDamageComponent} from './viewdamagestock/viewdamagestock.component';
import {EditdamagestockComponent} from './editdamagestock/editdamagestock.component';
import { RouterModule } from '@angular/router';
import { CategoryPipe } from './viewdamagestock/viewdamagestock.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
} 

import { RightPanelModule } from 'app/rightpanel/rightpanel.module';




@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DamagestockRoutes),
      SharedModule,
      NgxPaginationModule ,
      RightPanelModule ,
      TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http] 
      })    
    ],
    declarations: [DamagestockComponent, AdddamagestockComponent,viewDamageComponent,EditdamagestockComponent,CategoryPipe],
    providers: [DamagestockService]
  })
  
  export class DamagestockModule { }