
import {Routes} from '@angular/router';
import { ViewshortexpiryComponent } from './viewshortexpiry/viewshortexpiry.component';
import { ShortexpirysettingsComponent } from './shortexpirysettings/shortexpirysettings.component';

export const ShortexpiryRouting: Routes = [
  
    {
        path: '',
        children: [
            { 
                path: 'ViewShortExpiry',
                component: ViewshortexpiryComponent,
                data: {
                    breadcrumb: 'View Short Expiry',                   
                }
                },
                { 
                    path: 'ShortExpirySettings',
                    component: ShortexpirysettingsComponent,
                    data: {
                        breadcrumb: 'Short Expiry Settings',                   
                    }
                    }                    
        ]
}]
