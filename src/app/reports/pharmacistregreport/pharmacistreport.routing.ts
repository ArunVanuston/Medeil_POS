import {Routes} from '@angular/router';
import { PharmacistregreportComponent } from './pharmacistregreport.component';



export const pharmacistreportRoutes: Routes = [

  {
    path: '',

    children: [
     {
        path: 'PharmacistRegisterReport',

        component: PharmacistregreportComponent,
        data: {
          breadcrumb: 'Pharmacist Register Report'
        } 

      } 



    ]
  }
];


