import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PractisemgmntComponent } from './practisemgmnt.component';
import { PractisemgmntRouting } from './practisemgmnt.routing';
import { PractiseComponent } from './practise/practise.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionapprovalComponent } from './prescriptionapproval/prescriptionapproval.component';
import { PrescriptionapproverComponent } from './prescriptionapprover/prescriptionapprover.component';
import { ViewpresdigitalComponent } from './viewpresdigital/viewpresdigital.component';
import {CategoryPipe} from  './viewpresdigital/viewpresdigital.component.pipe';
import { PrescriptionhistoryComponent } from './prescriptionhistory/prescriptionhistory.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditpracticemngComponent } from './practise/editpracticemng/editpracticemng.component';
import { ViewpractisemngComponent } from './practise/viewpractisemng/viewpractisemng.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(PractisemgmntRouting),
      SharedModule,
      NgxPaginationModule,
      RightPanelModule
    ],
    declarations: [PractisemgmntComponent, PractiseComponent, PrescriptionComponent, CategoryPipe, PrescriptionapprovalComponent, PrescriptionapproverComponent, ViewpresdigitalComponent, PrescriptionhistoryComponent, EditpracticemngComponent, ViewpractisemngComponent],
     
  })
export class PractiseassignModule {

}