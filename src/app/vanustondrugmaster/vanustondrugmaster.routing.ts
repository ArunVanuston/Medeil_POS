import {Routes} from '@angular/router';
import { VanustondrugmasterComponent } from './vanustondrugmaster.component';
import { AdddrugComponent } from './AddDrugmaster/AddDrugmaster.component';
import { viewvanustondrugComponent } from './viewDrugmaster/viewDrugmaster.component';
import { editdrugComponent } from './editDrugmaster/editDrugmaster.component';
import { ViewgroupComponent } from './viewgroup/viewgroup.component';

export const VanustonDrugRoutes: Routes = [
 
  {
    path: 'AddDrugmaster', 
    component: AdddrugComponent,
    data: {
      breadcrumb: 'Add Vanuston Drugmaster'
    }
  },{
    path: 'ViewDrugmaster', 
    component: viewvanustondrugComponent,
    data: {
      breadcrumb: 'View Vanuston Drugmaster'
    },
  },{
    path: 'editDrugmaster/:drugid', component: editdrugComponent,
    data: {
      breadcrumb: 'Edit Vanuston Drugmaster'
    }
  }, {
    path: 'Viewgroups', 
    component: ViewgroupComponent,
    data: {
      breadcrumb: 'View Product Groups'
    }
  }];
