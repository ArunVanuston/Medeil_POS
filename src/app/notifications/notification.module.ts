import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { NotificationsComponent } from "./notifications.component";


@NgModule({
    imports: [
      CommonModule,
      SharedModule
    
    ],
    declarations: [NotificationsComponent],
    providers: []
  })

  export class NotificationModule{
      
}