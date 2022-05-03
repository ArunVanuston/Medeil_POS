import { Routes } from '@angular/router';




import { PhcompanyEditComponent } from './pharmacompanyEdit/phcompanyEdit.component';
import { PharmacompanyComponent } from './pharmacompanySave/pharmacompany.component';
import { PharmacompanyViewComponent } from './pharmacompanyView/pharmacompanyView.component';







export const companypharmaRoutes: Routes = [

  {
    path: 'phcompanyedit/:id', 
    component: PhcompanyEditComponent,

    data: {
      breadcrumb: 'Pharma Company'
    }},

  {
    path: '',
    children: [
      {
        path: 'AddManufacturer',
        component: PharmacompanyComponent,
        data: {
          breadcrumb: 'Manufacturer Details'
        }

      }, {
        path: 'ViewManufacturer',

        component: PharmacompanyViewComponent,
        data: {
          breadcrumb: 'View Manufacturer Details'
        }

      },
      //  {
      //   path: 'phcompanyedit',

      //   component: PhcompanyEditComponent,
      //   data: {
      //     breadcrumb: 'Edit Manufacturer Details'
      //   }

      // }


    ]
  }
];


