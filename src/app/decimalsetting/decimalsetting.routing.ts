import { Routes } from "@angular/router";
import { DecimalsettingComponent } from "./decimalsetting.component";

export const DecimalsetRoutes: Routes = [{
       path:'decimaltype',
       component:DecimalsettingComponent,
       data:{
           breadcrumb: 'DecimalSettings'
       }
    }]