import {Routes} from '@angular/router';
import {purchaseOrderComponent} from './purchaseOrder/purchaseOrder.component';
import {purchaseOrderEditComponent} from './purchaseOrderEdit/purchaseOrderEdit.component';
import {purchaseOrderViewComponent} from './purchaseOrderView/purchaseOrderView.component';
export const purchaseRoutes: Routes = [  
  { 
    path: 'editPurchaseOrder/:id', 
    component: purchaseOrderEditComponent ,
    data: {
      breadcrumb: 'Edit Purchase Order'
    }
  },
  { 
    path: 'ViewPurchaseOrders', 
    component: purchaseOrderViewComponent 
  },

  {
  path: '',
  children: [
    {
      path: 'PurchaseOrder',
      component: purchaseOrderComponent,
      data: {
        breadcrumb: 'Purchase Order'
      }    
    },
    {
      path: 'ViewPurchaseOrder',
      component: purchaseOrderViewComponent,
      data: {
          breadcrumb: 'View PurchaseOrder'                   
      }
    }
  ]   
}];
