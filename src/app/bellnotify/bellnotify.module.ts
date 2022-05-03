import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { bellRoutes } from './bellnotify.routing';
import { BellnotifyComponent } from './bellnotify.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { viewnotifyComponent } from './viewnotify/viewnotify.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(bellRoutes),
    SharedModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  declarations: [BellnotifyComponent,viewnotifyComponent]
})

export class bellnotifyModule { }