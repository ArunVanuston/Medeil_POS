import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { providers } from "ng2-toasty";
import { HsncodeRoutes } from "./hsncode.routing";
import { HsncodeService } from "./hsncode.service";
import { AssignhsncodeComponent } from "./assignhsncode/assignhsncode.component";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { AddhsncodeComponent } from "./addhsncode/addhsncode.component";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
} 

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(HsncodeRoutes),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        RightPanelModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        })
    ],
    declarations:[AssignhsncodeComponent, AddhsncodeComponent],
    providers: [HsncodeService]
})
export class HsncodeModule { }