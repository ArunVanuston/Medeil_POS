import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "app/app.routing";
import {NgxPaginationModule} from 'ngx-pagination';
import { addonsRouting } from "./addons.routing";
import { AddonsComponent } from "./addons.component";
import { DrugspecifyComponent } from "./drugspecify/drugspecify.component";

@NgModule({
    imports:[
        SharedModule,
        CommonModule,
        RouterModule.forChild(addonsRouting),
        NgxPaginationModule
    ],
    declarations:[AddonsComponent,DrugspecifyComponent]
})

export class addonsModule{

}
