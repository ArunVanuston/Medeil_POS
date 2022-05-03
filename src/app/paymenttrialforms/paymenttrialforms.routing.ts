import { Routes } from '@angular/router';
import { ViewcustomerslistComponent } from './viewcustomerslist/viewcustomerslist.component';
import { ViewcustpaymentsComponent } from './viewcustpayments/viewcustpayments.component';
import { ViewfreecustomersComponent } from './viewfreecustomers/viewfreecustomers.component';
import { ViewpaidcustomersComponent } from './viewpaidcustomers/viewpaidcustomers.component';
import { ViewpaymentstatusComponent } from './viewpaymentstatus/viewpaymentstatus.component';
import { ViewtrialcustomersComponent } from './viewtrialcustomers/viewtrialcustomers.component';

export const PaymentTrialRoutes: Routes = [

    {
        path: '',
        children: [
           {
                path: 'TrialPaidCustomers',
                component: ViewcustomerslistComponent,
                data: {
                    breadcrumb: 'View Customers'
                }
            },{
                path: 'AllPayments',
                component: ViewpaymentstatusComponent,
                data: {
                    breadcrumb: 'View Customer Payments'
                }
            },{
                path: 'PaidDetails',
                component: ViewcustpaymentsComponent,
                data: {
                    breadcrumb: 'View Payments'
                }
            },{
                path: 'FreeCustomers',
                component: ViewfreecustomersComponent,
                data: {
                    breadcrumb: 'View Free Cutomers'
                }
            }, {
                path: 'TrialCustomers',
                component: ViewtrialcustomersComponent,
                data: {
                    breadcrumb: 'View Trial Customers'
                }
            }, {
                path: 'PaidCustomers',
                component: ViewpaidcustomersComponent,
                data: {
                    breadcrumb: 'View Paid Cutomers'
                }
            }]
    }];

