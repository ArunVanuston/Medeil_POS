import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Gstr3bComponent } from './gstr3b.component';
import { Gstr3bprodComponent } from './gstr3bprod/gstr3bprod.component';
import { Gstr3bRoutes } from './gstr3b.routing';
import { Gstr3bReportService } from './gstr3b.service';



@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild(Gstr3bRoutes),
        SharedModule
    ],
    declarations: [Gstr3bComponent,Gstr3bprodComponent],
    providers:[Gstr3bReportService]
})

export class Gstr3bModule { }
