import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { generalsettingsRoutes } from './generalsettings.routing';
import { GeneralsettingsComponent } from './generalsettings.component'  ;
import { SharedModule } from 'app/shared/shared.module';
import { DxCircularGaugeModule } from 'devextreme-angular'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(generalsettingsRoutes),
    DxCircularGaugeModule,
    SharedModule
  ],
  declarations: [ GeneralsettingsComponent ]
})

export class generalsettingsModule {}
