import {Routes} from '@angular/router';
import {drugComponent} from "./drugmaster.component";
import {adddrugComponent} from './addDrugmaster/addDrugmaster.component';
import {viewdrugComponent} from './viewDrugmaster/viewDrugmaster.component';
import {editdrugComponent} from './editDrugmaster/editDrugmaster.component';
import {drugpicturesComponent} from './drugPictures/drugPictures.component';
import { InsertdrugsComponent } from './insertdrugs/insertdrugs.component';
import { ViewdrugmasterpaginateComponent } from './viewdrugmasterpaginate/viewdrugmasterpaginate.component';

export const drugRoutes: Routes = [
  {
    path: 'EditProductMaster/:drugid', component: editdrugComponent,
    data: {
      breadcrumb: 'Edit Product Master'
    }
  },
  {
    path: 'ViewProductMaster',
    component: viewdrugComponent,
    data: {
      breadcrumb: 'view Product Master'
    }

  },

  {
    path: 'drugPictures/:id', component: drugpicturesComponent,
    data: {
      breadcrumb: 'Drug Picture'
    }
  },

  {
    path: '',
    children: [
      {
        path: 'AddProduct',
        component: adddrugComponent,
        data: {
          breadcrumb: 'Add Product'
        }
      }, {
        path: 'ViewProductList',
        component: viewdrugComponent,
        data: {
          breadcrumb: 'View Products'
        }
      },{
        path: 'ViewDrugList',
        component: ViewdrugmasterpaginateComponent,
        data: {
          breadcrumb: 'View Drugs'
        }
      },{
        path: 'InsertProducts', component: InsertdrugsComponent,
        data: {
          breadcrumb: 'Drug Index'
        }
      }
    ]
  }];
