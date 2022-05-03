import {Routes} from '@angular/router';
import {shopinfoComponent} from "./shopinfo.component";

export const shopinfoRoutes: Routes = [{
  path: '',
  component: shopinfoComponent,
  data: {
    breadcrumb: "Shop Information"
  }
}];
