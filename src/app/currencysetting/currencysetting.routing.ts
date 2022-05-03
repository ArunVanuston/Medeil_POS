import { AddcurrencyComponent } from './addcurrency/addcurrency.component';
import { Routes } from '@angular/router';

export const CurrencysettingsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'addcurrency',
                component: AddcurrencyComponent,
                data: {
                    breadcrumb: 'Add Currency',
                }
            }
]
    }]