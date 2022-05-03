import { Routes } from '@angular/router';

import { ViewusertaskComponent } from './viewusertask/viewusertask.component';
import { AddUsertaskComponent } from './addusertask/addusertask.component';
import { ViewmytasksComponent } from './viewmytasks/viewmytasks.component';
import { UsertaskdetailsComponent } from './usertaskdetails/usertaskdetails.component';
import { PendingtasksComponent } from './pendingtasks/pendingtasks.component';
import { TodoListComponent } from './todolist/todolist.component';
import { AddGroupUsertaskComponent } from './addgroupusertask/addgroupusertask.component';
import { viewIndividualTasksComponent } from './viewindividualtasks/viewindividualtasks.component';
import { ViewAssignmentTaskComponent } from './viewassignmenttask/viewassignmenttask.component';
import { ViewMangerReviewComponent } from './viewmangerreiew/viewmangerreiew.component';
import { EmployeeReviewComponent } from './employeereview/employeereview.component';
import { ViewTaskPerformanceComponent } from './viewtaskperformance/viewtaskperformance.component';


export const UsertaskRoutes: Routes = [



    {


        path: 'Usertaskdetail/:id', component: UsertaskdetailsComponent,
        data: {
            breadcrumb: 'User Task Details',
        }
    },


    {

        path: '',



        children: [

            {

                path: 'UserTask',

                component: AddUsertaskComponent,

                data: {
                    breadcrumb: 'User Task Assignment'
                }

            },

            {
                path: 'ViewUserTask',
                component: ViewusertaskComponent,
                data: {
                    breadcrumb: 'View User Task',
                }
            },

            {
                path: 'ViewMyTasks',
                component: ViewmytasksComponent,
                data: {
                    breadcrumb: 'View My Tasks',
                }
            },




            {
                path: 'PendingTasks',
                component: PendingtasksComponent,
                data: {
                    breadcrumb: 'Pending Tasks',
                }
            },

            {
                path: 'ToDoList',
                component: TodoListComponent,
                data: {
                    breadcrumb: 'ToDo-List',
                }
            },


            {
                path: 'GroupUserTask',
                component: AddGroupUsertaskComponent,
                data: {
                    breadcrumb: 'Group User Task',
                }
            },
            {
                path: 'viewIndTask',
                component: viewIndividualTasksComponent,
                data: {
                    breadcrumb: ' View Individual Task',
                }
            },
            {
                path: 'viewAssignTask',
                component: ViewAssignmentTaskComponent,
                data: {
                    breadcrumb: ' View Assigned Task',
                }
            },

            {
                path: 'viewManagerRev',
                component: ViewMangerReviewComponent,
                data: {
                    breadcrumb: ' View Manager Review',
                }
            },
            {
                path: 'EmpReview/:term/:taskId',
                component: EmployeeReviewComponent,
                data: {
                    breadcrumb: 'Employee Evaluation Review',
                }
            },
            {
                path: 'viewTaskPerf',
                component: ViewTaskPerformanceComponent,
                data: {
                    breadcrumb: 'View Task Performance',
                }
            },
            

        ]




    }];
