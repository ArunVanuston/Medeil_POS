import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencysettingComponent} from './currencysetting.component';
import { CurrencysettingsRoutes } from './currencysetting.routing';
import { CurrencySettingService } from './currencysetting.service';
import { AddcurrencyComponent } from './addcurrency/addcurrency.component';
import { from } from 'rxjs/observable/from';
@NgModule({
    imports: [  
      CommonModule, 
      RouterModule.forChild(CurrencysettingsRoutes),
      SharedModule
    ],
    declarations: [AddcurrencyComponent, CurrencysettingComponent],
    providers: [CurrencySettingService]
  })
  export class CurrencysettingsModule { }