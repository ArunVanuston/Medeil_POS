import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { saveDistProdComponent } from './saveDistProd/saveDistProd.component';
import { editDistProdComponent } from './editDistProd/editDistProd.component';
import { viewDistProdComponent } from './viewDistProd/viewDistProd.component';

import { viewDistWiseProdComponent } from './viewDistWiseProd/viewDistWiseProd.component';

import {SharedModule} from '../../shared/shared.module';
import { distprodRoutes } from './distprod.routing'; 

   import { CategoryPipe } from   './viewDistProd/viewDistProd.pipe'; 
   import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

import {FormsModule} from '@angular/forms';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
      DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    RightPanelModule,
    RouterModule.forChild(distprodRoutes),
   SharedModule,
   TranslateModule.forRoot({
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http]
  })
  ],
  declarations: [ CategoryPipe, saveDistProdComponent ,editDistProdComponent,viewDistProdComponent   ,viewDistWiseProdComponent ]
})

export class distprodModule {}
