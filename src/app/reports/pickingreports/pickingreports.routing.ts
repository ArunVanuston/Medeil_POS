import {Routes} from '@angular/router';
import { PickingreportsComponent } from './pickingreports.component' ;

export const pickreportRoutes: Routes = [


  {
    path: '',


    children: [

     {
        path: 'PickingReports',

        component: PickingreportsComponent,
        data: {
          breadcrumb: 'Picking Reports'
        } 

      } 

    ]
  }
];


