import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProductRoutes } from "app/product/product.routing";
import { SharedModule } from "app/shared/shared.module";

import { AddproductComponent } from "app/product/addproduct/addproduct.component";
import { ProductService } from "app/product/product.service";
import { ProductlistComponent } from "app/product/productlist/productlist.component";
import {CategoryPipe} from './productlist/product-list.pipe'
import { ProductComponent } from "./product.component";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
    imports: [
      CommonModule, 
      RouterModule.forChild(ProductRoutes),
      SharedModule,
      MultiselectDropdownModule,
      AngularMultiSelectModule
    ],
    declarations: [ ProductComponent,AddproductComponent, ProductlistComponent,CategoryPipe],
    providers: [ProductService]
  })
  export class ProductModule { } 