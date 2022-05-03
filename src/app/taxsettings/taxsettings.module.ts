import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaxsettingsComponent } from './taxsettings.component';
import { TaxsettingsRoutes } from './taxsettings.routing';
import { TaxsettingsService } from './taxsettings.service'
import { AddtaxsettingsComponent } from './addtaxsettings/addtaxsettings.component';
import { AddtaxtypeComponent } from './addtaxtype/addtaxtype.component';
import { AddtaxComponent } from './addtax/addtax.component';
@NgModule({
    imports: [  
      CommonModule, 
      RouterModule.forChild(TaxsettingsRoutes),
      SharedModule
    ],
    declarations: [AddtaxsettingsComponent, TaxsettingsComponent, AddtaxtypeComponent, AddtaxComponent],
    providers: [TaxsettingsService]
  })
  export class TaxsettingsModule { }