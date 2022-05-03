import { Routes } from '@angular/router';
import { Gstr3bComponent } from './gstr3b.component';
import { Gstr3bprodComponent } from './gstr3bprod/gstr3bprod.component';

export const Gstr3bRoutes: Routes = [

    {
        path: '',

        children: [
            {
                path: 'Gstr3bMonthreport',

                component: Gstr3bComponent,
                data: {
                    breadcrumb: 'Monthly Gstr3B Reports'
                }

            }



        ]
    }, {
        path: '',

        children: [
            {
                path: 'Gstr3bYearReports',

                component: Gstr3bprodComponent,
                data: {
                    breadcrumb: 'Yearly Gstr3B Reports'
                }

            }



        ]
    }
];


