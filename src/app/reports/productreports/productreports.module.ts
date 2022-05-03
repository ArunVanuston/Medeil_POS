import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { ProductsreportRoutes } from './productreports.router';
import { ColdstorageprodlistComponent } from './coldstorageprodlist/coldstorageprodlist.component';
import { NarcoticdruglistComponent } from './narcoticdruglist/narcoticdruglist.component';
import { SubgroupbaseddruglistComponent } from './subgroupbaseddruglist/subgroupbaseddruglist.component';
import { HazardousprodlistComponent } from './hazardousprodlist/hazardousprodlist.component';

@NgModule({
  imports: [
    CommonModule,
    RightPanelModule,
    RouterModule.forChild(ProductsreportRoutes),
   SharedModule
  ],
  declarations: [ColdstorageprodlistComponent, HazardousprodlistComponent,NarcoticdruglistComponent,SubgroupbaseddruglistComponent ]
})

export class ProductsreportModule {}
