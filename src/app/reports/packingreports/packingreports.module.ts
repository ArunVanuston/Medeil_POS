import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { packreportRoutes } from './packingreports.routing';
import { PackingreportsComponent } from './packingreports.component'  ;


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(packreportRoutes),
   SharedModule
  ],
  declarations: [ PackingreportsComponent ]
})

export class packreportModule {}
