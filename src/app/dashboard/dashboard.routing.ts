import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PurchasedashComponent } from './purchasedash/purchasedash.component';
import { SalesdashComponent } from './salesdash/salesdash.component';

export const DashboardRoutes: Routes = [{
  path: 'Admindash',
  component: DashboardComponent,
  data: {
    breadcrumb: "Dashboard"
  }
},
{
path: 'Salesdash',
component: SalesdashComponent,
data: {
  breadcrumb: "Dashboard"
}
},
{
  path: 'Purchasedash',
  component: PurchasedashComponent,
  data: {
    breadcrumb: "Dashboard"
  }
}];
