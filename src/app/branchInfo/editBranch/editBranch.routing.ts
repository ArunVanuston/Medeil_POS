import {Routes} from '@angular/router';
import {brancheditComponent} from "./editBranch.component";

export const brancheditRoutes: Routes = [{
  path: '',
  component: brancheditComponent,
  data: {
    breadcrumb: "Branch Information"
  }
}];
