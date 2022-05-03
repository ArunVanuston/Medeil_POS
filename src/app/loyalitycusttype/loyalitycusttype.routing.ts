import { Routes } from "@angular/router";
import { Component } from "@angular/core";

import { CustomertypeComponent } from "./customertype/customertype.component";
import { ViewcustypeComponent } from "./viewcustype/viewcustype.component";

export const LoyalitycusttypeRouting:Routes = [
    {
        path:'',
        children:[
            {
                path:'CustomerType',
                component: CustomertypeComponent,
                data:{
                    breadcrumb:'Customer Type Settings',
                }
            },
            {
                path:'ViewCustomerType',
                component: ViewcustypeComponent,
                data:{
                    breadcrumb:'View Customer Type',
                }
            }
        
      
        ]
        


}]