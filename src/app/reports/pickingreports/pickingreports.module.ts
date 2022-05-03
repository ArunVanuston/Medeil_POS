import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { pickreportRoutes } from './pickingreports.routing';
import { PickingreportsComponent } from './pickingreports.component'  ;


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pickreportRoutes),
   SharedModule
  ],
  declarations: [ PickingreportsComponent ]
})

export class pickreportModule {}
