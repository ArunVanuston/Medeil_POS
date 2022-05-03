import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { SharedModule } from "app/shared/shared.module";
import { SetupcostsettingsComponent } from "./setupcostsettings.component";
import { SetupcostRoutes } from "./setupcostsettings.routing";

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(SetupcostRoutes),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,

    ],
    declarations:[SetupcostsettingsComponent],
    providers: []
})
export class SetupcostModule { }