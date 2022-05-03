import {Routes} from '@angular/router';
import {viewshopComponent} from './shopinfo.view.component';

export const shopviewRoutes: Routes = [{
  path: '',
  component: viewshopComponent,
  data: {
    breadcrumb: "View ShopInformation"
  }
}];
