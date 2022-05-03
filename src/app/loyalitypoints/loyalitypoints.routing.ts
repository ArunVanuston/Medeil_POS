import { Routes } from "@angular/router";
import { Component } from "@angular/core";
import { LoyalitypointsettingsComponent } from "./loyalitypointsettings/loyalitypointsettings.component";
import { GiftcardsettingsComponent } from "./giftcardsettings/giftcardsettings.component";
import { ViewlpointschemeComponent } from "./viewlpointscheme/viewlpointscheme.component";

import { CustomerpointsComponent } from "./customerpoints/customerpoints.component";
import { ViewgiftcardComponent } from "./viewgiftcard/viewgiftcard.component";


export const LoyalitypointsRouting:Routes = [
    {
        path:'',
        children:[
            {
                path:'LoyaltyPoints',
                component: CustomerpointsComponent,
                data:{
                    breadcrumb:'View Loyalty Points',
                }
            },
            {
                path:'Loyaltypointsettings',
                component: LoyalitypointsettingsComponent,
                data:{
                    breadcrumb:'Loyalty Points Settings',
                }
            },
            {
                path:'ViewLoyaltyPoints',
                component: ViewlpointschemeComponent,
                data:{
                    breadcrumb:'View Loyalty Scheme',
                }
            },
            {
                path:'GiftCardSettings',
                component: GiftcardsettingsComponent,
                data:{
                    breadcrumb:'Gift Card settings',
                }
            },
            {
                path:'ViewGiftCard',
                component: ViewgiftcardComponent,
                data:{
                    breadcrumb:'View Gift Card settings',
                }
            }
      
        ]
        


}]