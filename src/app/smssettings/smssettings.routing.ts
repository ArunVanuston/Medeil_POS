import {Routes} from '@angular/router';
import { SmssettingsComponent } from './smssettings.component';


export const smssettingsRoutes: Routes = [


  {
    path: '',


    children: [

     {
        path: 'SmsSettings',

        component: SmssettingsComponent,
        data: {
          breadcrumb: 'SMS Settings'
        } 

      } 

    ]
  }
];


