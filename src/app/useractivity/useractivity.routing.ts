import { Routes } from "@angular/router";
import { ViewClientActivityComponent } from "./clientactivity/clientactivity.component";
import { ViewClientMonitoringComponent } from "./clientmonitoring/clientmonitoring.component";
import { ViewUserAuditComponent } from "./useraudit/useraudit.component";
import { EmployeeTrackingComponent } from "./employeetracking/employeetracking.component";






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

        {

            path: 'ViewClientMonitoring',

            component: ViewClientMonitoringComponent,

            data: {
                breadcrumb: 'View Client Monitoring'
            }

        },


        {

            path: 'ViewUserAudit',

            component: ViewUserAuditComponent,

            data: {
                breadcrumb: 'View User Audit'
            }

        },
       
       
        {

            path: 'ViewEmployeeTracking',

            component:  EmployeeTrackingComponent,

            data: {
                breadcrumb: 'View Employee Tracking'
            }

        },


    ]





















}];