import {Routes} from '@angular/router';
import {invoiceComponent} from "./purchaseInvoice.component";
import {addinvoiceComponent} from './addPurchaseinvoice/addPurchaseinvoice.component';
import {viewinvoiceComponent} from './viewPurchaseinvoice/viewPurchaseinvoice.component';  
import {editinvoiceComponent} from './editPurchaseinvoice/editPurchaseinvoice.component';
export const invoiceRoutes: Routes = [
  { 
    path: 'editPurchaseinvoice/:id', 
    component: editinvoiceComponent ,
    data: {
      breadcrumb: 'Purchase Invoice'
    }
  },
  {path: 'viewInvoice', component: viewinvoiceComponent},
  {
  path: '',
  children: [ 
    {
      path: 'PurchaseInvoice',
      component: addinvoiceComponent,
      data: {
        breadcrumb: 'Purchase Invoice'
      }
    }, {
      path: 'ViewPurchaseInvoice',
      component: viewinvoiceComponent,
      data: {
        breadcrumb: 'Purchase Invoice'        
      }
    }
  ]   
}];
