import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";

import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";

import { PharmacistregRouts } from "./Pharmacistreg.routing";
import { PharmacistRegComponent } from "./pharmacist-reg/pharmacist-reg.component";
import { pharmacistregService } from "./Pharmacistreg.service";

import { RightPanelModule } from "app/rightpanel/rightpanel.module";
import { CategoryPipes } from "./pharmacist-reg/pharmreg.pipe";



@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(PharmacistregRouts),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,RightPanelModule

    ],
    declarations:[PharmacistRegComponent,CategoryPipes],
    providers: [pharmacistregService]
})
export class PharmacistregModule { }