import { Routes } from '@angular/router';
import { AddAssignTaskComponent } from './assigntask/addassigntask.component';
import { PendingTaskComponent } from './pendingtask/pendingtask.component';
import { TodayTaskComponent } from './todaytask/todaytask.component';
import { EmployeeWiseTaskComponent } from './employeewisetask/employeewisetask.component';





export const taskManagement: Routes = [



    // {
    //     path: 'Usertaskdetail/:id', component: UsertaskdetailsComponent,
    //     data: {
    //         breadcrumb: 'User Task Details',
    //     }
    // },


    {
        path: '',
        children: [
            {
                path: 'AddAssignTask',
                component: AddAssignTaskComponent,
                data: {
                    breadcrumb: 'Add Assign Task'
                }
            },

            {
                path: 'PendingTask',
                component: PendingTaskComponent,
                data: {
                    breadcrumb: 'Pending Task',
                }
            },

            {
                path: 'TodayTask',
                component: TodayTaskComponent,
                data: {
                    breadcrumb: 'Today Task',
                }
            },


            

            {
                path: 'EmployeeWiseTask',
                component: EmployeeWiseTaskComponent,
                data: {
                    breadcrumb: 'EmployeeWise Task',
                }
            },



        ]




    }];
