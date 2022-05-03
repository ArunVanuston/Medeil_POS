import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { BonusloyalityComponent } from "./bonusloyality/bonusloyality.component";
import { BonusloyalityviewComponent } from "./bonusloyalityview/bonusloyalityview.component";
import { BonusloyalityService } from "./loyalitybonus.service";
import { BonusLoyalityRouting } from "./loyalitybonus.routing";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { CategoryPipe } from "./bonusloyalityview/bonusloyality.pipe";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";
 
@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(BonusLoyalityRouting),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        NgxQRCodeModule,
        RightPanelModule
    ],
    declarations:[ BonusloyalityComponent, BonusloyalityviewComponent,CategoryPipe],
    providers: [BonusloyalityService]
})
export class BonusLoyalityModule { }

