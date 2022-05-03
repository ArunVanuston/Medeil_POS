import { Routes } from '@angular/router';
// import { salesOrderComponentnew } from './salesOrdernew.component';
import { addsalesOrderComponentnew } from './addsalesordernew/addsalesordernew.component';
import { viewSalesOrderComponentnew } from './viewsalesordernew/viewsalesordernew.component';
import { viewSalesOrderRecordComponentnew } from './viewsalesorderrecordnew/viewsalesorderrecordnew.component';
import { editsalesOrderComponentnew } from './editsalesordernew/editsalesordernew.component';
export const salesOrderRoutes: Routes = [
  {
    path: 'salesorderrecord/:id',
    component: viewSalesOrderRecordComponentnew,
    data:
      {
        breadcrumb: 'Sales Order Record'
      }
  },
  {
    path: 'editSalesorder/:id',
    component: editsalesOrderComponentnew,
    data:
      {
        breadcrumb: 'Edit Sales Order'
      }
  },
  
  {
    path: '',
    children: [
      {
        path: 'SalesOrder',
        component: addsalesOrderComponentnew,
        data: {
          breadcrumb: 'Sales Order'
        }
      },
      {
        path: 'SalesOrderHistory',
        component: viewSalesOrderComponentnew,
        data: {
          breadcrumb: 'View Sales Order'
        }
      },
    ]
  }];
