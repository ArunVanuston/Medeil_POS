import {Routes} from '@angular/router';
import {empComponent} from './emp.component';
import {addEmployeeComponent} from './addEmployee/addEmployee.component';
import {editEmployeeComponent} from './editEmployee/editEmployee.component';
import {viewEmployeeComponent} from './viewEmployee/viewEmployee.component';
export const empRoutes: Routes = [

{ path: 'editEmployee/:id', 
component: editEmployeeComponent,
data: {
    breadcrumb: 'Edit Employee Details'
  }},
  
 {
  path: '',  
   
  component: empComponent,
        data: {
            breadcrumb: 'Employee',
            status: false
        },
        children: [
            {
                path: 'AddEmployee',
                component: addEmployeeComponent,
                data: {
                    breadcrumb: 'Add New Employee'                    
                }
            },
             {
                path: 'ViewEmployee',
                component: viewEmployeeComponent,
                data: {
                    breadcrumb: 'View Employee'                   
                }
            },
          
          ]
}];
