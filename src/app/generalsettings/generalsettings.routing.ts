import {Routes} from '@angular/router';
import { GeneralsettingsComponent } from './generalsettings.component' ;

export const generalsettingsRoutes: Routes = [


  {
    path: '',


    children: [

     {
        path: 'GeneralSettings',

        component: GeneralsettingsComponent,
        data: {
          breadcrumb: 'General Settings'
        } 

      } 

    ]
  }
];


