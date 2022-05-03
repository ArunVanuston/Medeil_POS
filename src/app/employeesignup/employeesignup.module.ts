import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { RecaptchaModule } from 'ng2-recaptcha';
import { EmployeesignupComponent } from './employeesignup.component';
import { employeesignupRouting } from './employeesignup.routing';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(employeesignupRouting),
      SharedModule,
      RecaptchaModule.forRoot()
    ],
    declarations: [EmployeesignupComponent],
     
  })
export class  employeesignupModule {

}