import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {shopRoutes} from './shopinfoModule.routing';
import {ShopComponent} from './shopinfoModule.component';
import {shopinfoComponent} from './addShop/shopinfo.component';
import {viewshopComponent} from './viewShop/shopinfo.view.component';  
import {shopeditComponent} from './editShop/editShop.component';
import { CategoryPipe } from './viewShop/shopinfo.view.pipe';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(shopRoutes),
    SharedModule, 
    RightPanelModule
  ],
  declarations: [ShopComponent,shopinfoComponent,viewshopComponent,shopeditComponent,CategoryPipe]
})

export class ShopModule {}