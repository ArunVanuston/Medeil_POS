import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Gst2Routes } from './gstr2.routing';
import { Gstr2Component } from './gstr2.component';
import { Gstr2productComponent } from './gstr2product/gstr2product.component';
import { Gst2ReportService } from './gstr2.service';


@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild(Gst2Routes),
        SharedModule
    ],
    declarations: [Gstr2Component,Gstr2productComponent],
    providers:[Gst2ReportService]
})

export class Gst2Module { }
