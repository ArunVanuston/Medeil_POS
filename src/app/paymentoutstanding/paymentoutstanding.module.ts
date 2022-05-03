import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { PaymentoutstandingComponent } from "./paymentoutstanding.component";
import { PaymentoutCategoryPipe } from "./paymentoutstanding.pipe";
import { paymentoutstandingRoute } from "./paymentoutstanding.routing";

@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        RouterModule.forChild(paymentoutstandingRoute)
    ],
    exports:[],
    declarations:[PaymentoutstandingComponent,PaymentoutCategoryPipe]
})

export class paymentoutstandingModule{}