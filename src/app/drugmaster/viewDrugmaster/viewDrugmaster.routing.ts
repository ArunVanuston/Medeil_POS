import {Routes} from '@angular/router';
import {viewdrugComponent} from './viewDrugmaster.component';
export const drugviewRoutes: Routes = [{
  path: '',
  component: viewdrugComponent,
  data: {
    breadcrumb: "View DrugMaster"   
  }
}];
