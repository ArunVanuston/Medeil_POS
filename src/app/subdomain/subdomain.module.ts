import { SharedModule } from '../shared/shared.module';
import { AddsubdomainComponent } from './addsubdomain/addsubdomain.component';
import { SubdomainComponent } from './subdomain.component';
import { SubdomainRoutes } from './subdomain.routing';
import { SubdomainService } from './subdomain.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CategoryPipe } from './subdomainlist/subdomainlist.pipe';
import { SubdomainlistComponent } from './subdomainlist/subdomainlist.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SubdomainRoutes),
    SharedModule
 
  ],
  declarations: [SubdomainComponent, AddsubdomainComponent, SubdomainlistComponent,CategoryPipe],
  providers: [SubdomainService]
})
export class SubdomainModule {}