import { Routes } from "@angular/router";
import { AddonsbuyComponent } from "./addonsbuy/addonsbuy.component";
import { BillingComponent } from "./billing.component";
import { CartitemsComponent } from "./cartitems/cartitems.component";

export const billingRouting: Routes = [
    { path:'',
    component:BillingComponent
    },{
        path: 'viewcart',
        component: CartitemsComponent,
    },{
        path: 'addonsbuy',
        component: AddonsbuyComponent,
    }
]