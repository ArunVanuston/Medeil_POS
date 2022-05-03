import { Routes } from "@angular/router";
import { SoacodeComponent } from "./soacode.component";


export const SoacodeRoutes: Routes = [
    {
        path:'',
        children:[
            {
            path:'AssignSacCode',
            component: SoacodeComponent,
            data: {
                breadcrumb:'Assign SOA Code'
            }
        }
        ]
        
        
    }
]
