import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';




import { distributorRoutes } from './distributor.routing';
import { DistributorComponent } from './distributorSave/distributor.component';


import {DistributorEditComponent } from './distributorEdit/distributorEdit.component';

import {DistributorViewComponent }  from './distributorView/distributorView.component';

   import { CategoryPipe } from   './distributorView/distributorView.pipe'; 


import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { Http } from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


  
@NgModule({
  imports: [    
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    RightPanelModule,

  MultiselectDropdownModule,
    AngularMultiSelectModule,
    CommonModule,
    RouterModule.forChild(distributorRoutes),
   SharedModule,
   TranslateModule.forRoot({
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http]
  })
  ],
  declarations: [ DistributorComponent,DistributorEditComponent ,DistributorViewComponent, CategoryPipe  ]   ,

  bootstrap: [DistributorEditComponent    ]
})

export class DistributorModule {}
