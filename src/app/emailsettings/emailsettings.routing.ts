import {Routes} from '@angular/router';
import { EmailsettingsComponent } from './emailsettings.component';

export const EmailsettingsRoutes: Routes = [


  {
    path: '',


    children: [

     {
        path: 'EmailSettings',

        component: EmailsettingsComponent,
        data: {
          breadcrumb: 'General Settings'
        } 

      } 

    ]
  }
];


