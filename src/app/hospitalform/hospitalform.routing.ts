import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
import { editHospitalComponent } from './edit-hospital/edit-hospital.component';
import { viewHospitalComponent } from './viewHospital/viewHospital.component';
import { Routes } from '@angular/router';
export const HospitalformRoutes: Routes = [
    {
        path: 'editHospitaldetails/:id',
        component: editHospitalComponent,
        data: {
            breadcrumb: 'Edit Hospital Information',                   
        }
    }, 
    {       
        path: '',
        data: { 
            breadcrumb: 'hospital Information',
            status: false
        },
        children: [
            {
                path: 'AddHospital',
                component: CreateHospitalComponent,
                data: {
                    breadcrumb: 'Add Hospital',                   
                }
            }, {
                path: 'ViewHospital',
                component: viewHospitalComponent,
                data: {
                    breadcrumb: 'View Hospital',                
                }
            },             
        ]
  } 
  ]
