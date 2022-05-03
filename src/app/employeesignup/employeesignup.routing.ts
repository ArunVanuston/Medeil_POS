import { Routes } from "@angular/router";
import { EmployeesignupComponent } from "./employeesignup.component";

export const employeesignupRouting: Routes = [{
    path: 'signup/:encrypturl',
        component: EmployeesignupComponent
    }
];
