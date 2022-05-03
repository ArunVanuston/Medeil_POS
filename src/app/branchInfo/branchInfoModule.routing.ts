import {Routes} from '@angular/router';
import {BranchComponent} from "./branchInfoModule.component";
import {AddbranchComponent} from './addBranch/addBranch.component';
import {viewbranchComponent} from './viewBranch/viewBranch.view.component';
import {brancheditComponent} from './editBranch/editBranch.component';
export const BranchRoutes: Routes = [
  { 
       path: 'editBranch/:id', 
       component: brancheditComponent ,
       data: {
         breadcrumb: 'Edit Branch Information'
       }
  },
  {
       path: 'viewBranch',
       component: viewbranchComponent
  },
  {
    path: '',
    children: [
      {
        path: 'BranchRegistration',
        component: AddbranchComponent,
        data: {
          breadcrumb: 'Branch Registration'
        }
      }, {
        path: 'ViewBranchRegistration',
        component: viewbranchComponent,
        data: {
          breadcrumb: 'View Branch Information'        
        }
      }
  ]   
}];
