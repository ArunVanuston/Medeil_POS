import {Routes} from '@angular/router';







import { sdummySaveComponent } from './sdummySave/sdummySave.component'  ;

import { sdummyEditComponent } from './sdummyEdit/sdummyEdit.component'  ;


import { sdummyViewComponent } from './sdummyView/sdummyView.component'  ;


export const salesdummyRoutes: Routes = [



  {path: 'sdummyEdit/:id', component: sdummyEditComponent  ,
  data: {
    breadcrumb: 'Sales Estimation'
  }  },
  {
    path: '',


    children: [
     {
        path: 'SalesDummy',

        component: sdummySaveComponent,
        data: {
          breadcrumb: 'Sales Estimation'
        }

      }  ,{
        path: 'sdummyEdit',

        component: sdummyEditComponent,
        data: {
          breadcrumb: 'Sales Estimation'
        }

      }  ,{
        path: 'ViewSalesDummy',

        component: sdummyViewComponent,
        data: {
          breadcrumb: 'Sales Estimation Maintenence'
        }

      }




    ]
  }
];


