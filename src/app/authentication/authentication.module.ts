import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './authentication.routing';
import { ForgotComponent } from './forgot/forgot.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { SharedModule } from "../shared/shared.module";
import { AddsinupComponent } from './SinUp/addSinUp.component';
import { DirectforgotComponent } from './directforgot/directforgot.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ForgotComponent, DirectforgotComponent, LockScreenComponent, AddsinupComponent, ChangepasswordComponent]
})

export class AuthenticationModule { }

