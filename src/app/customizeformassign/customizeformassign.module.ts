import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "app/app.routing";
import {NgxPaginationModule} from 'ngx-pagination';
import { CustomizeformassignComponent } from "./customizeformassign.component";
import { customizeFormRouting } from "./customizeformassign.routing";
import { CustomizeformcustomersComponent } from "./customizeformcustomers/customizeformcustomers.component";

@NgModule({
    imports:[
        SharedModule,
        CommonModule,
        RouterModule.forChild(customizeFormRouting),
        NgxPaginationModule
    ],
    declarations:[CustomizeformassignComponent, CustomizeformcustomersComponent]
})

export class customizeformModule{

}
