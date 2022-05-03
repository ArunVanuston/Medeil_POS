import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";
import { SharedModule } from "app/shared/shared.module";
import { DecimalsettingComponent } from "./decimalsetting.component";
import { DecimalsetRoutes } from "./decimalsetting.routing"; 
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http'; 

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(DecimalsetRoutes),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RightPanelModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
          })
    ],
    declarations:[DecimalsettingComponent],
    providers: []
})
export class DecimalsettModule { }