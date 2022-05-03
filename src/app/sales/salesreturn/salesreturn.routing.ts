import {Routes} from '@angular/router';

import { slsRetSaveComponent } from './slsRetSave/slsRetSave.component'  ;

import { slsRetEditComponent } from './slsRetEdit/slsRetEdit.component'  ;

import { slsRetViewComponent } from './slsRetView/slsRetView.component'  ;


export const salesreturnRoutes: Routes = [

 
  {path: 'slsRetEdit/:id', component: slsRetEditComponent   ,
  data: {
    breadcrumb: 'Edit Sales Return'
  }},

  {
    path: '',


    children: [
    {
        path: 'SalesReturn',

        component: slsRetSaveComponent,
        data: {
          breadcrumb: 'Sales Return'
        }

      }, {
        path: 'slsRetEdit',

        component: slsRetEditComponent,
        data: {
          breadcrumb: 'Edit Sales Return'
        }

      }, {
        path: 'ViewSalesReturn',

        component: slsRetViewComponent,
        data: {
          breadcrumb: 'View Sales Return'
        }

      }


    ]
  }
];


