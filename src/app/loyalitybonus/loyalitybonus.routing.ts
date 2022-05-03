import { Routes } from "@angular/router";
import { Component } from "@angular/core";

import { BonusloyalityComponent } from "./bonusloyality/bonusloyality.component";
import { BonusloyalityviewComponent } from "./bonusloyalityview/bonusloyalityview.component";

export const BonusLoyalityRouting:Routes = [
    {
        path:'',
        children:[       
         
            {
                path:'BonusLoyalty',
                component:BonusloyalityComponent,
                data:{
                    breadcrumb:'Bonus Loyalty Settings',
                }
            },
            {
                path:'ViewBonusLoyalty',
                component:BonusloyalityviewComponent,
                data:{
                    breadcrumb:'View Bonus Loyalty',
                }
            }
      
        ]
        


}]