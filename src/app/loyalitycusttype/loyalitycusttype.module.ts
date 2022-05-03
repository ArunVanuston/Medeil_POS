import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";

import { NgxQRCodeModule } from 'ngx-qrcode2';



import { CustomertypeComponent } from "./customertype/customertype.component";
import { loyalitycusttypeService } from "./loyalitycusttype.service";
import { LoyalitycusttypeRouting } from "./loyalitycusttype.routing";
import { ViewcustypeComponent } from "./viewcustype/viewcustype.component";
import { CategoryPipe } from "./viewcustype/loyalitycusttype.pipe";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";



 
@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(LoyalitycusttypeRouting),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        NgxQRCodeModule,
        RightPanelModule
    ],
    declarations:[CustomertypeComponent, ViewcustypeComponent,CategoryPipe],
    providers: [loyalitycusttypeService]
})
export class LoyalitycusttypeModule { }

