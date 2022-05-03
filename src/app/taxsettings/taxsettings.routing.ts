import { AddtaxsettingsComponent } from './addtaxsettings/addtaxsettings.component';
import { Routes } from '@angular/router';
import { AddtaxtypeComponent } from './addtaxtype/addtaxtype.component';
import { AddtaxComponent } from './addtax/addtax.component';
export const TaxsettingsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'AddNewTax',
                component: AddtaxsettingsComponent,
                data: {
                    breadcrumb: 'Add Tax',
                }
            }, {
                path: 'TaxType',
                component: AddtaxtypeComponent,
                data: {
                    breadcrumb: 'TaxType',
                }
            }
            , {
                path: 'AddTax',
                component: AddtaxComponent,
                data: {
                    breadcrumb: 'AddTax',
                }
            }
]
    }]