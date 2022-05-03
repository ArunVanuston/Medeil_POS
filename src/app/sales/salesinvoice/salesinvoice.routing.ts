import {Routes} from '@angular/router';
import { slsInvSaveComponent } from './slsInvSave/slsInvSave.component'  ;
import { slsInvEditComponent } from './slsInvEdit/slsInvEdit.component'  ;
import { slsInvViewComponent } from './slsInvView/slsInvView.component'  ;
import { MultisalesinvoiceComponent } from './multisalesinvoice/multisalesinvoice.component';
import { QuotationinvoiceComponent } from './quotationinvoice/quotationinvoice.component';

export const salesinvoiceRoutes: Routes = [

  {path: 'slsInvEdit/:id', component: slsInvEditComponent  ,
  data: {
    breadcrumb: 'Edit Sales Invoice'
  }},

  {
    path: '',


    children: [
      {
        path: 'MultiInvoice',

        component: MultisalesinvoiceComponent,
        data: {
          breadcrumb: 'Multi Sales Invoice'
        }

      } ,{
        path: 'SalesInvoice',

        component: slsInvSaveComponent,
        data: {
          breadcrumb: 'Sales Invoice'
        }

      } ,  {
        path: 'SalesInvoice/:id',

        component: MultisalesinvoiceComponent,
        data: {
          breadcrumb: 'Sales Order Invoice'
        }

      }  , {
        path: 'RefillInvoice/:rinvid/:rcustid',
        component: MultisalesinvoiceComponent,
        data: {
          breadcrumb: 'Refill Invoice'
        }

      }  ,  {
        path: 'slsInvEdit',

        component: slsInvEditComponent,
        data: {
          breadcrumb: 'Edit Sales Invoice'
        }

      } , {
        path: 'SalesMaintenance',

        component: slsInvViewComponent,
        data: {
          breadcrumb: 'View Sales Invoice'
        }

      },
      {
        path: 'QuotationInvoice',

        component: QuotationinvoiceComponent,
        data: {
          breadcrumb: 'Quotation Invoice'
        }

      }

    ]
  }
];


