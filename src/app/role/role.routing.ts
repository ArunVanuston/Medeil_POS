import { Routes } from '@angular/router';
import { AddroleComponent } from './addrole/addrole.component';
import { ViewroleComponent } from './viewrole/viewrole.component';
import { RoledetailsComponent } from './roledetails/roledetails.component';
import { viewAssignComponent } from './viewAssignRole/viewAssignRole.component';
export const RoleRoutes: Routes = [
    {
        path: 'assingModule/:id/:rindex',
        component: RoledetailsComponent,
        data: {
            breadcrumb: 'Role Assign'
        }
    },
    {
        path: '',
        children: [
            {
                path: 'AddRole',
                component: AddroleComponent,
                data: {
                    breadcrumb: 'Add Role'
                }
            },
            {
                path: 'ViewRole',
                component: ViewroleComponent,
                data: {
                    breadcrumb: 'View Role'
                }
            }, {
                path: 'viewassignRole',
                component: viewAssignComponent,
                data: {
                    breadcrumb: 'Assign Role'
                }
            }
        ]
    }]