import { Routes } from '@angular/router';
import { DomaincheckComponent } from './domaincheck.component';
import { DomainerrorpageComponent } from './domainerrorpage/domainerrorpage.component';

export const DomainCheckRoutes: Routes = [
    {
        path: '',
        component: DomaincheckComponent  
    },{
        path: 'errorpage',
        component: DomainerrorpageComponent  
    }
]

