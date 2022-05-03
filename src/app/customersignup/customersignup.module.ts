import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CustomersignupComponent } from './customersignup.component';
import { customersignupRouting } from './customersignup.routing';
import { RecaptchaModule } from 'ng2-recaptcha';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(customersignupRouting),
      SharedModule,
      RecaptchaModule.forRoot()
    ],
    declarations: [CustomersignupComponent],
     
  })
export class  customersignupModule {

}