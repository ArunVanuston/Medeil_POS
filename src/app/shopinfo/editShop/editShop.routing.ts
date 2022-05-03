import {Routes} from '@angular/router';
import {shopeditComponent} from "./editShop.component";

export const shopeditRoutes: Routes = [{
  path: '',
  component: shopeditComponent,
  data: {
    breadcrumb: "Shop Information"
  }
}];
