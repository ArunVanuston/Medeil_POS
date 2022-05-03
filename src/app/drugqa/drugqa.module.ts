import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { SharedModule } from "app/shared/shared.module";
import { DrugqaRouter } from './drug.routing';
import { DrugqaComponent } from './drugqa.component';
import { QaCategoryPipe } from './drugqa.pipe';
import { DrugQaService } from './drugqa.service';


@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        RightPanelModule,
        RouterModule.forChild(DrugqaRouter)
    ],
    declarations:[DrugqaComponent,QaCategoryPipe],
    providers:[DrugQaService]
})
export class DrugqaModule{}