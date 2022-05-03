import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { RightPanelModule } from "app/rightpanel/rightpanel.module";
import { ManualbillRouting } from "./manualbilling.routing";
import { ManualbillingComponent } from "./manualbilling.component";
import { ManualcustomerslistComponent } from "./manualcustomerslist/manualcustomerslist.component";
import { ManualsalesorderComponent } from "./manualsalesorder/manualsalesorder.component";
import { ManualsalesinvoiceComponent } from "./manualsalesinvoice/manualsalesinvoice.component";
import { NgxPaginationModule } from "ngx-pagination";
import { ViewsalesorderComponent } from "./viewsalesorder/viewsalesorder.component";
import { ViewsalesinvoicemanualComponent } from "./viewsalesinvoicemanual/viewsalesinvoicemanual.component";
import { ManualinvoiceadminComponent } from "./manualinvoiceadmin/manualinvoiceadmin.component";
import { ServicecustomersComponent } from "./servicecustomers/servicecustomers.component";
import { ViewservicecustomersComponent } from "./servicecustomers/viewservicecustomers/viewservicecustomers.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(ManualbillRouting),
      SharedModule, 
      RightPanelModule,
      NgxPaginationModule
    ],
    declarations: [ManualbillingComponent, ManualcustomerslistComponent, ManualsalesorderComponent, ManualsalesinvoiceComponent, ViewsalesorderComponent, ViewsalesinvoicemanualComponent, ManualinvoiceadminComponent, ServicecustomersComponent, ViewservicecustomersComponent],
    providers: [NotificationsComponent]
  })

  export class ManualbillingModule{
      
}