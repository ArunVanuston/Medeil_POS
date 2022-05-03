import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RolelistComponent } from './rolelist/rolelist.component';
import { UserreportsComponent } from './userreports/userreports.component';

export const UserroleRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'UserReport',
                component: UserreportsComponent,
                data: {
                    breadcrumb: 'User List'

                }
            },
            {
                path: 'RoleReport',
                component: RolelistComponent,
                data: {
                    breadcrumb: 'Role List'

                }
            }
        ]
    }
]

