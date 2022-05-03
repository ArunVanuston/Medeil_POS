import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomainCheckRoutes } from './domainrouting.routing';
import { DomaincheckComponent } from './domaincheck.component';
import { DomainerrorpageComponent } from './domainerrorpage/domainerrorpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [ 
  


    CommonModule,
    RouterModule.forChild(DomainCheckRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [DomaincheckComponent, DomainerrorpageComponent],
})
export class DomainCheckModule { }
