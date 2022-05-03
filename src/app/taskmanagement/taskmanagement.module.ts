
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';

import { NgModule } from '@angular/core';

import { taskManagement } from './taskmanagement.routing';

import { AddAssignTaskComponent } from './assigntask/addassigntask.component';
import { PendingTaskComponent } from './pendingtask/pendingtask.component';
import { TodayTaskComponent } from './todaytask/todaytask.component';
import { EmployeeWiseTaskComponent } from './employeewisetask/employeewisetask.component';


// npm install ngx-ui-switch@^1.6.0 --save

// https://github.com/webcat12345/ngx-ui-switch/tree/1.x-stable


@NgModule({
  imports: [

    CommonModule,
    RouterModule.forChild(taskManagement),
    SharedModule,
 




  ],
  declarations: [AddAssignTaskComponent, PendingTaskComponent, TodayTaskComponent, EmployeeWiseTaskComponent ]
})

export class TaskManagementModule { }
