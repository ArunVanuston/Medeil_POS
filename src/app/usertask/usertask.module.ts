import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsertaskRoutes } from './usertask.routing';

import { ViewusertaskComponent } from './viewusertask/viewusertask.component';
import { AddUsertaskComponent } from './addusertask/addusertask.component';
import { ViewmytasksComponent } from './viewmytasks/viewmytasks.component';
import { UsertaskdetailsComponent } from './usertaskdetails/usertaskdetails.component';
import { PendingtasksComponent } from './pendingtasks/pendingtasks.component';
import { usertaskComponent } from './usertask.component';
import { TodoListComponent } from './todolist/todolist.component';
import { AddGroupUsertaskComponent } from './addgroupusertask/addgroupusertask.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/multiselect.component';
import { viewIndividualTasksComponent } from './viewindividualtasks/viewindividualtasks.component';
import { ViewAssignmentTaskComponent } from './viewassignmenttask/viewassignmenttask.component';
import { viewIndividualTasksPipe } from './viewindividualtasks/viewindividualtasks.pipe';
import { ViewAssignmentTaskPipe } from './viewassignmenttask/viewassignmenttask.pipe';
import { ViewMangerReviewComponent } from './viewmangerreiew/viewmangerreiew.component';
import { EmployeeReviewComponent } from './employeereview/employeereview.component';
import { ViewTaskPerformanceComponent } from './viewtaskperformance/viewtaskperformance.component';
import { viewIndividualTasksPipe1 } from './viewtaskperformance/viewtaskperformance1.pipe';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsertaskRoutes),
    SharedModule,
    DxDataGridModule,
    DxButtonModule,
    NgxPaginationModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
  ],
  declarations: [usertaskComponent, AddUsertaskComponent, ViewusertaskComponent,
    ViewmytasksComponent, UsertaskdetailsComponent, PendingtasksComponent, TodoListComponent, AddGroupUsertaskComponent, viewIndividualTasksComponent,
    ViewAssignmentTaskComponent, viewIndividualTasksPipe,viewIndividualTasksPipe1, ViewMangerReviewComponent, ViewAssignmentTaskPipe, EmployeeReviewComponent, ViewTaskPerformanceComponent]
})

export class UsertaskModule { }