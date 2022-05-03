import {Routes} from '@angular/router';

import { slsMaintViewComponent } from './slsMaintView/slsMaintView.component';


export const salesmaintainRoutes: Routes = [

  {
    path: '',


    children: [
      {
        path: 'QuotateView',

        component: slsMaintViewComponent,
        data: {
          breadcrumb: 'Quotation Invoice View '
        }
      }


    ]
  }
];


