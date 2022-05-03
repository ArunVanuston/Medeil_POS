import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SharedModule } from "app/shared/shared.module";

import { ViewClientActivityComponent } from "./clientactivity/clientactivity.component";
import { viewClientRoutes } from "./useractivity.routing";
import { ViewClientMonitoringComponent } from "./clientmonitoring/clientmonitoring.component";
import { ViewUserAuditComponent } from "./useraudit/useraudit.component";
import { EmployeeTrackingComponent } from "./employeetracking/employeetracking.component";
import { CategoryPipeEmployee } from "./employeetracking/employeetracking.pipe";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";





@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(viewClientRoutes),
        SharedModule,
        RightPanelModule
    ],


    declarations: [ViewClientActivityComponent, ViewClientMonitoringComponent, ViewUserAuditComponent, EmployeeTrackingComponent, CategoryPipeEmployee ]
})


export class UserActivityModule {



}