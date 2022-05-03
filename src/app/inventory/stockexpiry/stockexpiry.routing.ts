import { Routes } from '@angular/router'; import { stkexpSaveComponent } from './stkexpSave/stkexpSave.component'; import { stkexpEditComponent } from './stkexpEdit/stkexpEdit.component'; import { stkexpViewComponent } from './stkexpView/stkexpView.component'; export const stockexpiryRoutes: Routes = [
  {
    path: 'stkexpEdit/:id', component: stkexpEditComponent, data: {
      breadcrumb: 'Expired Stock'
    }
  }, {
    path: '',
    children: [
      {
        path: 'ExpiredStock',
        component: stkexpSaveComponent,
        data: {
          breadcrumb: 'Expired Stock'
        }
      }, {
        path: 'stkexpEdit',
        component: stkexpEditComponent,
        data: {
          breadcrumb: 'Expired Stock'
        }
      }, {
        path: 'ViewExpiredStock',
        component: stkexpViewComponent,
        data: {
          breadcrumb: 'Expired Stock Maintenance'
        }
      }
    ]
  }
];
