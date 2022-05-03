import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RightpanelComponent } from './rightpanel.component';
import { AppRoutes } from 'app/app.routing';

@NgModule({
  imports: [
    CommonModule,
    //RouterModule.forChild(AppRoutes),
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [RightpanelComponent],
  exports: [RightpanelComponent],
  providers: [NotificationsComponent]
})

export class RightPanelModule { }
