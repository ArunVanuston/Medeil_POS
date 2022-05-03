import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {savePaymentComponent} from './savePayment/savePayment.component';
import {editPaymentComponent} from './editPayment/editPayment.component';
import {viewPaymentComponent} from './viewPayment/viewPayment.component';
import {SharedModule} from '../../shared/shared.module';
import { paymentRoutes } from  './payment.routing';
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';
    import { CategoryPipe } from   './viewPayment/viewPayment.pipe'
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
} 

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    
    RouterModule.forChild(paymentRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  
  ],
  declarations: [ savePaymentComponent,CategoryPipe, editPaymentComponent,viewPaymentComponent]
})
export class paymentModule {}
