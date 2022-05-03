import { SharedModule } from '../shared/shared.module';
import { EditionComponent } from './edition.component';
import { EditionRoutes } from './edition.routing';
import { EditionService } from './edition.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddeditionComponent } from './addedition/addedition.component';
import { VieweditionComponent } from './viewedition/viewedition.component';
import { EditiondetailsComponent } from './editiondetails/editiondetails.component';
import { viewAssignComponent } from './viewassignModule/viewassignModule.component';
//Other's
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
//import { DxTreeViewModule } from 'devextreme-angular';
import{CategoryPipe} from './viewedition/viewedition.pipe';
import {moduleAssignPipe} from './viewassignModule/viewassignModule.pipe'
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EditionRoutes),
    SharedModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    //DxTreeViewModule,
    NgxPaginationModule
  ],
  declarations: [EditionComponent, AddeditionComponent, VieweditionComponent, EditiondetailsComponent,viewAssignComponent,CategoryPipe,moduleAssignPipe],
  providers: [EditionService]
})



export class EditionModule { }