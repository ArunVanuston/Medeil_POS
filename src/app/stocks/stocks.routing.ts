import { Routes } from '@angular/router';
import { CreateStocksComponent } from './create-stocks/create-stocks.component';
import { ViewstocksComponent } from './viewstocks/viewstocks.component';
import { editStockComponent } from './edit-stocks/edit-stocks.component';
export const warehousestockRoutes: Routes = [
    {
        path: 'editStock/:id',
        component: editStockComponent,
        data: {
            breadcrumb: 'Edit Stock Details',
        }
    },
    {
        path: '',
        data: {
            breadcrumb: 'Stocks',
        },
        children: [
            {
                path: 'AddNewStock',
                component: CreateStocksComponent,
                data: {
                    breadcrumb: 'Add Stocks',
                }
            }, {
                path: 'ViewStockList',
                component: ViewstocksComponent,
                data: {
                    breadcrumb: 'View Stocks',
                }
            }
        ]
    }
]
