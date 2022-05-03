
import {Routes} from '@angular/router';
import { PharmacistRegComponent } from './pharmacist-reg/pharmacist-reg.component';

export const PharmacistregRouts: Routes = [
  
    {
        path: '',
        children: [
            { 
                path: 'PharmacistRegistration',
                component: PharmacistRegComponent,
                data: {
                    breadcrumb: 'Pharmacist Registration',                   
                }
                }          
        ]
}]
