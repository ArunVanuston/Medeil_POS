import { Routes } from "@angular/router";
import { PricingComponent } from "./pricing.component";
import { PricingviewComponent } from "./pricingview/pricingview.component";
export const pricingRouting: Routes = [
    // {
    // path: '',
    //             component: PricingComponent
        
    // },
    {
        path:'',
        children:[{
            path:'viewprice',
            component:PricingviewComponent
        }]        
    },{
        path:'',
        children:[{
            path:'mobileviewprice',
            component:PricingComponent
        }]        
    }
];
