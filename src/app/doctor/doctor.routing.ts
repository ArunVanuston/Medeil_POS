
import { editDoctorComponent } from './editDoctor/editDoctor.component';
import { DoctorlistComponent } from './viewDoctor/viewDoctor.component';
import { DoctorregistrationComponent } from './addDoctor/addDoctor.component';
import {Routes} from '@angular/router';
export const DoctorRoutes: Routes = [
    {
        path: 'editDoctor/:id',
        component: editDoctorComponent,
        data: {
            breadcrumb: 'Doctor Registration',                   
        } 
    }, 
  
  
    {
        path: '',
        children: [
            { 
                path: 'AddDoctor',
                component: DoctorregistrationComponent,
                data: {
                    breadcrumb: 'Doctor Registration',                   
                }
                },
           {
                path: 'ViewDoctor',
                component: DoctorlistComponent,
                data: {
                    breadcrumb: 'View Doctor List',                   
                }
                }            
        ]
}]
