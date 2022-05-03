import { SharedModule } from '../shared/shared.module';
import { warehousestockRoutes } from './stocks.routing';
import { DataStocks } from './stocks.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateStocksComponent } from './create-stocks/create-stocks.component';
import { editStockComponent } from './edit-stocks/edit-stocks.component';
import { ViewstocksComponent } from './viewstocks/viewstocks.component';
import { CategoryPipe } from './viewstocks/viewstocks.component.pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(warehousestockRoutes),
    SharedModule,
    NgxPaginationModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [CreateStocksComponent, editStockComponent, ViewstocksComponent, CategoryPipe],
  providers: [DataStocks]
})
export class StocksModule { }
