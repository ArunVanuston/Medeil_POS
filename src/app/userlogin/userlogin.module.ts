import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import { UserloginComponent } from './userlogin.component';
import { UserloginRoutes } from './userlogin.routing';
import { LoginComponent } from './login/login.component';
import { UserloginService } from './userlogin.service';


@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(UserloginRoutes),
      SharedModule
  ],
  declarations: [UserloginComponent, LoginComponent],
  providers: [UserloginService]
})

export class UserloginModule {}
