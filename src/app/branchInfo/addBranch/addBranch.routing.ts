import {Routes} from '@angular/router';
import {AddbranchComponent} from "./addBranch.component";

export const AddbranchRoutes: Routes = [{
  path: '',
  component: AddbranchComponent,
  data: {
    breadcrumb: "Branch Registration"
  }
}];
