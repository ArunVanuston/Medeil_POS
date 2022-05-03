import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { billingRouting } from "./billing.routing";
import { BillingComponent } from "./billing.component";
import { AppRoutes } from "app/app.routing";
import { CartitemsComponent } from "./cartitems/cartitems.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { AddonsbuyComponent } from "./addonsbuy/addonsbuy.component";

@NgModule({
    imports:[
        SharedModule,
        CommonModule,
        RouterModule.forChild(billingRouting),
        NgxPaginationModule
    ],
    declarations:[BillingComponent, CartitemsComponent, AddonsbuyComponent],
    exports: [BillingComponent,AddonsbuyComponent]
})

export class billingModule{

}
