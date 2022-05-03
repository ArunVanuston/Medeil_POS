import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";

import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { SchedulelistRouting } from "./schedulelist.routing";
import { ViewschedulelistComponent } from "./viewschedulelist/viewschedulelist.component";
import { SchedulelistService } from "./schedulelist.service";
import { CategoryPipes } from "./viewschedulelist/schedule.pipe";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";





@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(SchedulelistRouting),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        RightPanelModule

    ],
    declarations:[ViewschedulelistComponent,CategoryPipes],
    providers: [SchedulelistService]
})
export class SchedulelistModule { }