import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { ManualcustomerslistComponent } from './manualcustomerslist/manualcustomerslist.component';
import { ManualinvoiceadminComponent } from './manualinvoiceadmin/manualinvoiceadmin.component';
import { ManualsalesinvoiceComponent } from './manualsalesinvoice/manualsalesinvoice.component';
import { ManualsalesorderComponent } from './manualsalesorder/manualsalesorder.component';
import { ServicecustomersComponent } from './servicecustomers/servicecustomers.component';
import { ViewservicecustomersComponent } from './servicecustomers/viewservicecustomers/viewservicecustomers.component';
import { ViewsalesinvoicemanualComponent } from './viewsalesinvoicemanual/viewsalesinvoicemanual.component';
import { ViewsalesorderComponent } from './viewsalesorder/viewsalesorder.component';

export const ManualbillRouting: Routes = [{
    path: '',
        data: {
            // breadcrumb: 'Ranking',
            // Component: ModulerankingComponent,
            // status: false
        },
        children: [
            {
                 path: 'ManualCustomers',
                 component: ManualcustomerslistComponent,
                 data: {
                     breadcrumb: 'Manual Customers',
                     status: true
                 }
             }, {
                path: 'ManualSalesOrder',
                component: ManualsalesorderComponent,
                data: {
                    breadcrumb: 'Manual Sales Orders',
                    status: true
                }
            },{
                path: 'ManualSalesOrderList',
                component: ViewsalesorderComponent,
                data: {
                    breadcrumb: 'Manual Sales Orders List',
                    status: true
                }
            },  {
                path: 'ConvertManualSalesInvoice/:soid',
                component: ManualsalesinvoiceComponent,
                data: {
                    breadcrumb: 'Manual Sales Invoice',
                    status: true
                }
            }, {
                path: 'ManualSalesInvoice',
                component: ManualinvoiceadminComponent,
                data: {
                    breadcrumb: 'Manual Sales Invoice',
                    status: true
                }
            }, {
                path: 'ManualSalesInvoiceList',
                component: ViewsalesinvoicemanualComponent,
                data: {
                    breadcrumb: 'Manual Sales Invoice List',
                    status: true
                }
            }, {
                path: 'SerivceCustomerSave',
                component: ServicecustomersComponent,
                data: {
                    breadcrumb: 'Service Customers',
                    status: true
                }
            }, {
                path: 'ViewSerivceCustomers',
                component: ViewservicecustomersComponent,
                data: {
                    breadcrumb: 'View Service Customers',
                    status: true
                }
            }, 
        ]
}]