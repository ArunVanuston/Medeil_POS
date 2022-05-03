import { Routes } from '@angular/router';



import { stkminqtySaveComponent } from './stkminqtySave/stkminqtySave.component';


import { stkminqtyEditComponent } from './stkminqtyEdit/stkminqtyEdit.component';

import { stkminqtyViewComponent } from './stkminqtyView/stkminqtyView.component';

import { viewWantedBookComponent } from './viewWantedBookEntries/viewWantedBookEntries.component';





export const stkminqtyRoutes: Routes = [




  {
    path: 'viewWantedRecord/:id/:tabId', component: viewWantedBookComponent,
    data: {
      breadcrumb: 'Wanted Book Record'
    }
  },


  {
    path: 'stkminqtyEdit/:id', component: stkminqtyEditComponent,
    data: {
      breadcrumb: 'Wanted Book'
    }
  },








  {
    path: '',


    children: [
      {
        path: 'ReorderForm',

        component: stkminqtySaveComponent,

        data: {
          breadcrumb: 'Wanted Book'
        }

      },
      {
        path: 'stkminqtyEdit',

        component: stkminqtyEditComponent,

        data: {
          breadcrumb: 'Wanted Book'
        }

      }, {
        path: 'ViewReorderForm',

        component: stkminqtyViewComponent,

        data: {
          breadcrumb: 'Wanted Book Maintenance'
        }

      }, 
      
      
      // {


      //   path: 'viewWantedRecord',
       
      //   component: viewWantedBookComponent,


      //   data: {

      //     breadcrumb: 'View Wanted Book Record'
      //   }
      // }



    ]
  }
];


