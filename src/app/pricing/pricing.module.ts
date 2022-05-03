import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { pricingRouting } from './pricing.routing';
import { PricingComponent } from './pricing.component';
import { PricingviewComponent } from './pricingview/pricingview.component';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(pricingRouting),
      SharedModule
    ],
    declarations: [PricingComponent, PricingviewComponent],
     
  })
export class  pricingModule {

}