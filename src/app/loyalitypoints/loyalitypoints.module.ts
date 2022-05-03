import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { LoyalitypointsRouting } from "./loyalitypoints.routing";
import { LoyalitypointsettingsComponent } from "./loyalitypointsettings/loyalitypointsettings.component";
import { loyalitysettingsService } from "./loyalitypoints.service";
import { GiftcardsettingsComponent } from "./giftcardsettings/giftcardsettings.component";
import { ViewlpointschemeComponent } from "./viewlpointscheme/viewlpointscheme.component";
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CustomerpointsComponent } from "./customerpoints/customerpoints.component";
import { CategoryPipe } from "./customerpoints/customerloyality.pipe";
import { ViewgiftcardComponent } from "./viewgiftcard/viewgiftcard.component";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";

import { GiftCategoryPipe } from "./viewgiftcard/viewgiftcard.pipe";

 


 
@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(LoyalitypointsRouting),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        NgxQRCodeModule,
        RightPanelModule,

        
    ],
    declarations:[LoyalitypointsettingsComponent, GiftcardsettingsComponent, ViewlpointschemeComponent, CustomerpointsComponent,CategoryPipe, ViewgiftcardComponent,GiftCategoryPipe],
    providers: [loyalitysettingsService]
})
export class LoyalityModule { }

