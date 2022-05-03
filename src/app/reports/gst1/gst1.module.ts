import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { Gst1Routes } from './gst1.routing';
import { Gst1Component } from './gst1.component';
import { Gst1productComponent } from './gst1product/gst1product.component';
import { Gst1ReportService } from './gst1.service';

@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild(Gst1Routes),
        SharedModule
    ],
    declarations: [Gst1Component, Gst1productComponent],
    providers:[Gst1ReportService]
})

export class Gst1Module { }
