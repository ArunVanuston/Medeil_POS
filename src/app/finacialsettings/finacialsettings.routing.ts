import { Routes } from "@angular/router";
import { FinacialsettingsComponent } from "./finacialsettings.component";

export const FinacialRoutes: Routes = [{
    path:'finacial',
    component:FinacialsettingsComponent,
    data: {
        breadcrumb:'Finacial Settings'
    }
}]