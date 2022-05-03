import {Routes} from '@angular/router';
import {adddrugComponent} from "./addDrugmaster.component";

export const drugRoutes: Routes = [{
  path: '',
  component: adddrugComponent,
  data: {
    breadcrumb: "DRUG MASTER"
  }
}];
 