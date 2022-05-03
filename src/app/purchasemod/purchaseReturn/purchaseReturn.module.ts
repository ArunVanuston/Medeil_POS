import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { purchaseReturnRoutes } from './purchaseReturn.routing';
import { savePRComponent } from './savepurchaseReturn/savePR.component';
import { editPRComponent } from './editPurchaseReturn/editPR.component';
import { viewPRComponent } from './viewPurchaseReturn/viewPR.component';
import { CategoryPipe } from './viewPurchaseReturn/viewPR.pipe';
import {
  DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule
} from 'devextreme-angular';
import { Http } from '@angular/http';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    RouterModule.forChild(purchaseReturnRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [savePRComponent, editPRComponent, viewPRComponent, CategoryPipe]
})
export class purchaseReturnModule { }
