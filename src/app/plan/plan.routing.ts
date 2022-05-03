import { Routes } from "@angular/router";
import { PlanComponent } from "./plan.component";
import { AddPlanComponent } from "./add-plan/add-plan.component";
import { ViewPlanComponent } from "./view-plan/view-plan.component";
export const PlanRouting: Routes = [{
    path: '',
       children: [
            {
                path: 'AddPlan',
                component: AddPlanComponent,
                data:{
                    breadcrumb: 'Add Plan',
                
                }
            },
            {
                path: 'ViewPlan',
                component: ViewPlanComponent,
                data:{
                    breadcrumb: 'View Plan',
                
                }
            }
        ]
    }
];
