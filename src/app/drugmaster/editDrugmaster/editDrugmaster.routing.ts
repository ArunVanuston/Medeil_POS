import {Routes} from '@angular/router';
import {editdrugComponent} from "./editDrugmaster.component";

export const drugeditRoutes: Routes = [{
  path: '',
  component: editdrugComponent,
  data: {
    breadcrumb: "DRUG MASTER"
  }
}];
 