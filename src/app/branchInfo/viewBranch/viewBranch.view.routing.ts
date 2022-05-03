import {Routes} from '@angular/router';
import {viewbranchComponent} from './viewBranch.view.component';
export const branchviewRoutes: Routes = [{
  component: viewbranchComponent,
  data: {
    breadcrumb: "View CompanyInfo",
    status: false
  }
}];
