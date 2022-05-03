import { AddmodulesComponent } from './addmodules/addmodules.component';
import { ModuleviewComponent } from './moduleview/moduleview.component';

import { UsersettingComponent } from './usersetting.component';
import { Routes } from '@angular/router';
export const AddmodulesRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Add Modules',
            status: false
        },
        children: [
           {
                path: 'Module',
                component: UsersettingComponent,
                data: {
                    breadcrumb: 'Modules',
                    status: true
                }
            },
            {
                path: 'AddModule',
                component: AddmodulesComponent,
                data: {
                    breadcrumb: 'Add Modules',
                    status: true
                }
            }, {
                path: 'ViewModule',
                component: ModuleviewComponent,
                data: {
                    breadcrumb: 'view Modules',
                    status: true
                }
           }

          ]
  }
  ]
