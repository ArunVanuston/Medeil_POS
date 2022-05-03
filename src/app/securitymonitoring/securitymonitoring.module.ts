import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";

import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { SecuritymonitoringRouting } from "./securitymonitoring.routing";
import { UserlockComponent } from "./userlock/userlock.component";
import { securitymonitoringService } from "./securitymonitoring.service";
import { UserloginhistoryComponent } from "./userloginhistory/userloginhistory.component";
import { CategoryPipe } from "./userloginhistory/viewloginhistory.pipe";
import { TokenaccesstimeComponent } from "./tokenaccesstime/tokenaccesstime.component";
import { UserpasshistoryComponent } from "./userpasshistory/userpasshistory.component";


@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(SecuritymonitoringRouting),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule

    ],
    declarations:[UserlockComponent, UserloginhistoryComponent,CategoryPipe,TokenaccesstimeComponent, UserpasshistoryComponent],
    providers: [securitymonitoringService]
})
export class securitymonitoringModule { }