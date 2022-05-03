
import {Routes} from '@angular/router';

import { BanneddrugComponent } from './banneddrug/banneddrug.component';
import { AddbanneddrugComponent } from './addbanneddrug/addbanneddrug.component';
import { BangenriclistComponent } from './bangenriclist/bangenriclist.component';

export const BanneddrugRouting: Routes = [
  
    {
        path: '',
        children: [
            { 
                path:'ViewBannedDrug',
                component: BanneddrugComponent,
                data: {
                    breadcrumb: 'View Banned Drug List',                   
                }
                },
                
            { 
                path:'AddBannedDrug',
                component: AddbanneddrugComponent,
                data: {
                    breadcrumb: 'Add Banned Drug',                   
                }
                },
                { 
                    path:'ViewBannedGenric',
                    component: BangenriclistComponent,
                    data: {
                        breadcrumb: '',                   
                    }
                    }            
        ]
                
        
}]
