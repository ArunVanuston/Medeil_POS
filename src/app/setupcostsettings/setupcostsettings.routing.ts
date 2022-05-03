import { Routes } from "@angular/router";
import { SetupcostsettingsComponent } from "./setupcostsettings.component";

export const SetupcostRoutes: Routes = [{
    path:'setupcost',
    component:SetupcostsettingsComponent,
    data:{
        breadcrumb:'SetupCost Settings'
    }
}]
