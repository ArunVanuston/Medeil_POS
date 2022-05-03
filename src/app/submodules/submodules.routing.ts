import { AddsubmodulesComponent } from './addsubmodules/addsubmodules.component';
import { ViewsubmoduleComponent } from './viewsubmodule/viewsubmodule.component';
import { Routes } from '@angular/router';
export const AddsubmodulesRoutes: Routes = [{
   path: '',
        data: {
            breadcrumb: 'Sub Modules',
            status: false
        },
        children: [
           {
                path: 'AddSubModule',
                component: AddsubmodulesComponent,
                data: {
                    breadcrumb: 'Add Sub Modules',
                    status: true
                }
            }, {
                path: 'ViewSubModule',
                component: ViewsubmoduleComponent,
                data: {
                    breadcrumb: 'View Sub Modules',
                    status: true
                }
            }
        ]
  }]
