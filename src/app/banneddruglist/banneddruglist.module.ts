import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";

import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { BanneddrugRouting } from "./banneddruglist.routing";
import { BannedDrugService } from "./banneddruglist.service";
import { BanneddrugComponent } from "./banneddrug/banneddrug.component";
import { AddbanneddrugComponent } from "./addbanneddrug/addbanneddrug.component";
import { BangenriclistComponent } from './bangenriclist/bangenriclist.component';
import { RightPanelModule } from "app/rightpanel/rightpanel.module";
import { CategoryPipe } from "./banneddrug/banneddrug.pipe";





@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(BanneddrugRouting),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        RightPanelModule

    ],
    declarations:[BanneddrugComponent, AddbanneddrugComponent, BangenriclistComponent,CategoryPipe],
    providers: [BannedDrugService]
})
export class BanneddrugModule { }