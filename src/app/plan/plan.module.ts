import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PlanRouting } from './plan.routing';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { PlanCategoryPipe } from './view-plan/view-plan.pipe';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(PlanRouting),
      SharedModule
    ],
    declarations: [ AddPlanComponent, ViewPlanComponent,PlanCategoryPipe],
     
  })
export class  PlanModule {

}