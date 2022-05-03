import {Routes} from '@angular/router';
import { PackingreportsComponent } from './packingreports.component' ;

export const packreportRoutes: Routes = [


  {
    path: '',


    children: [

     {
        path: 'PackingReports',

        component: PackingreportsComponent,
        data: {
          breadcrumb: 'Packing Reports'
        } 

      } 

    ]
  }
];


