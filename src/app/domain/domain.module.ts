import { SharedModule } from '../shared/shared.module';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { DomainComponent } from './domain.component';
import { DomainRoutes } from './domain.routing';
import { DomainService } from './domain.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomainListComponent } from './domain-list/domain-list.component';
import { CategoryPipe } from './domain-list/domain-list.pipe';
@NgModule({
  imports: [ 
    CommonModule,
    RouterModule.forChild(DomainRoutes),
    SharedModule
  ],
  declarations: [DomainComponent, AddDomainComponent, DomainListComponent,CategoryPipe],
  providers: [DomainService]
})
export class DomainModule { }
