import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ModulerankRouting } from "./moduleranking.routing";
import { SharedModule } from "app/shared/shared.module";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { FolderrankingComponent } from "./folderranking/folderranking.component";
import { ModulerankingComponent } from "./moduleranking.component";
import { ModulerankComponent } from './modulerank/modulerank.component';
import { RightPanelModule } from "app/rightpanel/rightpanel.module";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(ModulerankRouting),
      SharedModule, 
      RightPanelModule
    ],
    declarations: [FolderrankingComponent,ModulerankingComponent, ModulerankComponent],
    providers: [NotificationsComponent]
  })

  export class RankingModule{
      
}