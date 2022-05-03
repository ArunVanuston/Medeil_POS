import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";
import { SharedModule } from "app/shared/shared.module";
import { DrugQcRouter } from "./drugqc.routing";
import { DrugQCService } from "./drugqc.service";
import { VerifydrugComponent } from "./verifydrug/verifydrug.component";
import { QcCategoryPipe } from "./verifydrug/verifydrug.pipe";


@NgModule({
    imports: [CommonModule,
        SharedModule,
        RightPanelModule,
        RouterModule.forChild(DrugQcRouter),
    ],
    declarations: [VerifydrugComponent,QcCategoryPipe],
    providers:[DrugQCService]

   

})
export class DrugqcModule {
}
