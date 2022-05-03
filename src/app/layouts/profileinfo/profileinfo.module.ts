import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfileInfoRouting } from "./profileinfo.routing";
import { SharedModule } from "app/shared/shared.module";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { ProfileinfoComponent } from "./profileinfo.component";
import { ViewprofileinfoComponent } from "./viewprofileinfo/viewprofileinfo.component";
import { billingModule } from "app/billing/billing.module";
import { PaymentTrialModule } from "app/paymenttrialforms/paymenttrialforms.module";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(ProfileInfoRouting),
      SharedModule, 
      billingModule,
      PaymentTrialModule
    ],
    declarations: [ProfileinfoComponent,ViewprofileinfoComponent],
    providers: [NotificationsComponent]
  })

  export class ProfileInfoModule{
      
}