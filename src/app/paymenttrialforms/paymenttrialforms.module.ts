import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaymentTrialRoutes } from './paymenttrialforms.routing';
import { PaymentTrialService } from './paymenttrialforms.service';
import { ViewcustomerslistComponent } from './viewcustomerslist/viewcustomerslist.component';
import { ViewpaymentstatusComponent } from './viewpaymentstatus/viewpaymentstatus.component';
import { ViewcustpaymentsComponent } from './viewcustpayments/viewcustpayments.component';
import { ViewtrialcustomersComponent } from './viewtrialcustomers/viewtrialcustomers.component';
import { ViewpaidcustomersComponent } from './viewpaidcustomers/viewpaidcustomers.component';
import { ViewfreecustomersComponent } from './viewfreecustomers/viewfreecustomers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PaymentTrialRoutes),
    SharedModule,
    NgxPaginationModule,
  ],
  exports:[ViewcustpaymentsComponent],
  declarations: [ViewcustomerslistComponent, ViewpaymentstatusComponent, ViewcustpaymentsComponent, ViewtrialcustomersComponent, ViewpaidcustomersComponent, ViewfreecustomersComponent],
  providers: [PaymentTrialService, NotificationsComponent]
})

export class PaymentTrialModule { }
