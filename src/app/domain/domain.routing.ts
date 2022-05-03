import { AddDomainComponent } from './add-domain/add-domain.component';
import { DomainListComponent } from './domain-list/domain-list.component';
import { Routes } from '@angular/router';
export const DomainRoutes: Routes = [
    {
        path: '',
        
        children: [
            {
                path: 'Add Domain'.replace(' ', ''),
                component: AddDomainComponent,
                data: {
                    breadcrumb: "Add Domain"
                }
            },
            {
                path: 'View Domain'.replace(' ', ''),
                component: DomainListComponent,
                data: {
                    breadcrumb: "View Domain"
                }
            }
        ]
    }
]

