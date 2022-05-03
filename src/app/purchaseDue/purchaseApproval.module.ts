import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, UrlSerializer } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { purcdueRoutes } from './purchaseApproval.routing';
import { purchaseApprovalComponent } from './purchaseApproval.component';
import { addpurchaseApprovalComponent } from './addpurchaseApproval/addpurchaseApproval.component';
import { editpurchaseApprovalComponent } from './editpurchaseApproval/editpurchaseApproval.component';
import { viewpurchaseApprovalComponent } from './viewpurchaseApproval/viewpurchaseApproval.component';
import { ApprovalCategoryPipe } from './viewpurchaseApproval/viewpurchaseApproval.pipe';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module'; 
import { Http } from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(purcdueRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [ApprovalCategoryPipe,purchaseApprovalComponent, addpurchaseApprovalComponent,editpurchaseApprovalComponent,viewpurchaseApprovalComponent]
})

export class purchaseApprovalModule { }