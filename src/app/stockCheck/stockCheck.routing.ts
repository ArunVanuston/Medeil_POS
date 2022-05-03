import {Routes} from '@angular/router';
import {stockCheckComponent} from './stockCheck.component';
import {stockViewComponent} from './stockView/stockView.component';
export const stockCheckRouting: Routes = [

 {
  path: '',  
   
  component: stockCheckComponent,
        data: {
            breadcrumb: 'Stock Checking',
            status: false
        },
        children: [
          {
                path: 'StockChecking',
                component: stockViewComponent,
                data: {
                    breadcrumb: 'View Stocks'                   
                }
            }
          ]
}];
