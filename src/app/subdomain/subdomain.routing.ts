import { AddsubdomainComponent } from './addsubdomain/addsubdomain.component';
import { SubdomainlistComponent } from './subdomainlist/subdomainlist.component';
import { Routes } from '@angular/router';
export const SubdomainRoutes: Routes = [
    {
        path: '',       
        children: [
                 {
                path: 'AddSubDomain', 
                component: AddsubdomainComponent,  
                data: {
                    breadcrumb: "Add Sub-Domain"
                  }              
                },
                {
                path: 'ViewSubDomain',
                component:SubdomainlistComponent,
                data: {
                    breadcrumb: "View Sub-Domain"
                  }
                }
              ]
    }         ]
           