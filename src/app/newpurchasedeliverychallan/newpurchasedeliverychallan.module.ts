import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";
import { SharedModule } from "app/shared/shared.module";
import { NewpurchasedeliverychallanComponent } from "./newpurchasedeliverychallan.component";
import { NewpurchasedeliverychallanRouter } from "./newpurchasedeliverychallan.routing";
import { ViewpdeliverychallanComponent } from "./viewpdeliverychallan/viewpdeliverychallan.component";
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
    imports:[CommonModule,
            SharedModule,
            RightPanelModule,
            RouterModule.forChild(NewpurchasedeliverychallanRouter),
            TranslateModule.forRoot({
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            })
           ],
    declarations:[NewpurchasedeliverychallanComponent, ViewpdeliverychallanComponent]           

})
export class NewpurchasedeliverychallanModule{}