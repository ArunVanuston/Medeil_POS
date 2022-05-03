import {Routes} from '@angular/router';
import {ShopComponent} from "./shopinfoModule.component";
import {shopinfoComponent} from './addShop/shopinfo.component';
import {viewshopComponent} from './viewShop/shopinfo.view.component';
import {shopeditComponent} from './editShop/editShop.component';
export const shopRoutes: Routes = [
  { 
     path: 'editShop/:shopid',
     component: shopeditComponent,
     data: {
      breadcrumb: 'Edit Shop Information'
    }
    },
  {
    path: 'viewShop',
     component: viewshopComponent,
     data: {
      breadcrumb: 'Shop Information'
    }
    },
  {
  path: '',
  children: [
    {
      path: 'ShopRegistration',
      component: shopinfoComponent,
      data: {
        breadcrumb: 'Shop Registration'
      }
    }, {
      path: 'ViewShopInformation',
      component: viewshopComponent,
      data: {
        breadcrumb: 'View Shop Information'        
      }
    },
    {
      path: 'ViewShopDetails',
      component: shopeditComponent,
      data: {
        breadcrumb: 'Edit Shop details'
      }
    }, 
  ]   
}];
