import { Routes } from "@angular/router";
import { ViewClientActivityComponent } from "./clientactivity/clientactivity.component";





export const viewClientRoutes: Routes = [{



    path: '',



    children: [

        {

            path: 'ViewClientActivity',

            component: ViewClientActivityComponent,

            data: {
                breadcrumb: 'View Client Activity'
            }

        },

       



    ]





















}];