import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";

import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";

import { RightPanelModule } from "app/rightpanel/rightpanel.module";

import { SoacodeComponent } from "./soacode.component";
import { SoacodeRoutes } from "./soacode.routing";
import { SoacodeService } from "./soacode.service";

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(SoacodeRoutes),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        RightPanelModule
    ],
    declarations:[SoacodeComponent],
    providers: [SoacodeService]
})
export class SoacodeModule { }