import { Routes } from "@angular/router";
import { CustomizeformassignComponent } from "./customizeformassign.component";
import { CustomizeformcustomersComponent } from "./customizeformcustomers/customizeformcustomers.component";

export const customizeFormRouting: Routes = [
    {
        path: 'Customize',
        component: CustomizeformassignComponent,
        data: {
            breadcrumb: 'Customize Forms Assign'
        } 
    }, {
        path: 'CustomizeCustomers',
        component: CustomizeformcustomersComponent,
        data: {
            breadcrumb: 'Customize Forms Customers'
        } 
    }
]