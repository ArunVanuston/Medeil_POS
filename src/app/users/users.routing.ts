import { Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { AddusermodulesComponent } from './addusermodules/addusermodulescomponent';
import { AdduseraccessComponent } from './adduseraccess/adduseraccess.component';
import { userView } from './viewUser/viewUser.component';
import { userViewmodule } from './viewUserModules/viewUserModules.component';
import { userViewAccess } from './viewUserAccess/viewUserAccess.component';
export const UsersRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'AddUser',
                component: AdduserComponent,
                data: {
                    breadcrumb: 'Add User'
                }
            },
            {
                path: 'AssignUser',
                component: AddusermodulesComponent,
                data: {
                    breadcrumb: 'Add User Modules'
                }
            },
            {
                path: 'UserAccess',
                component: AdduseraccessComponent,
                data: {
                    breadcrumb: 'User Access'
                }
            },
            {
                path: 'ViewUser',
                component: userView,
                data: {
                    breadcrumb: 'View User'
                }
            },
            {
                path: 'userviewmodule',
                component: userViewmodule,
                data: {
                    breadcrumb: 'View User Module'
                }
            },
            {
                path: 'userviewaccess/:value',
                component: userViewAccess,
                data: {
                    breadcrumb: 'View User Module'
                }
            }
        ]
    }]