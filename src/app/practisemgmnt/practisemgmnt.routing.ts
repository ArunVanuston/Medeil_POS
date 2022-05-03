import { Routes } from "@angular/router";
import { PractisemgmntComponent } from "./practisemgmnt.component";
import { PractiseComponent } from "./practise/practise.component";
import { PrescriptionComponent } from "./prescription/prescription.component";
import { PrescriptionapprovalComponent } from "./prescriptionapproval/prescriptionapproval.component";
import { PrescriptionapproverComponent } from "./prescriptionapprover/prescriptionapprover.component";
import { ViewpresdigitalComponent } from "./viewpresdigital/viewpresdigital.component";
import { EditpracticemngComponent } from "./practise/editpracticemng/editpracticemng.component";
import { ViewpractisemngComponent } from "./practise/viewpractisemng/viewpractisemng.component";



export const PractisemgmntRouting: Routes = [{
    path: '',
        data: {
            breadcrumb: 'Practise Management',
            Component: PractisemgmntComponent,
            status: false
        },

        children: [
            {
                 path: 'PractiseManagement',
                 component: PractiseComponent,
                 data: {
                     breadcrumb: 'Practise Management',
                     status: true
                 }
             }, 
             {
                path: 'PrescDigitalization/:id',
                component: PrescriptionComponent,
                data: {
                    breadcrumb: 'Prescription Digitalization',
                    status: true
                }
             },
             {
                path: 'PrescDigitalization',
                component: PrescriptionComponent,
                data: {
                    breadcrumb: 'Prescription Digitalization',
                    status: true
                }
            },
            {
                path: 'PrescChecking',
                component: PrescriptionapprovalComponent,
                data: {
                    breadcrumb: 'Prescription Checking',
                    status: true
                }
            },  {
                path: 'PrescApproval',
                component: PrescriptionapproverComponent,
                data: {
                    breadcrumb: 'Prescription Approval',
                    status: true
                }
            },
            {
                path: 'ViewPrescription',
                component: ViewpresdigitalComponent,
                data: {
                    breadcrumb: 'View Prescription',
                    status: true
                }
            }, {
                path: 'EditPrescMng/:id',
                component: EditpracticemngComponent,
                data: {
                    breadcrumb: 'Edit Prescription Management',
                    status: true
                }
            },{
                path: 'ViewPrescMng',
                component: ViewpractisemngComponent,
                data: {
                    breadcrumb: 'Edit Practise Management',
                    status: true
                }
            }


        ]

}]