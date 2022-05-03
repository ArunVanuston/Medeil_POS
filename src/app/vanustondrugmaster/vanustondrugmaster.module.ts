import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module"; 
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VanustonDrugRoutes } from './vanustondrugmaster.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { VanustondrugmasterComponent } from './vanustondrugmaster.component';
import { AdddrugComponent } from './AddDrugmaster/AddDrugmaster.component';
import { viewvanustondrugComponent } from './viewDrugmaster/viewDrugmaster.component';
import { editdrugComponent } from './editDrugmaster/editDrugmaster.component';
import { FilterPipe } from './viewDrugmaster/viewDrugmaster.pipe';
import { SortPipe } from './viewDrugmaster/viewDrugmasterSort.pipe';
import { ViewgroupComponent } from './viewgroup/viewgroup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VanustonDrugRoutes),
    SharedModule, 
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  declarations: [VanustondrugmasterComponent,AdddrugComponent,viewvanustondrugComponent,
    editdrugComponent,FilterPipe, SortPipe,ViewgroupComponent]
})

export class VanustonDrugModule {}  