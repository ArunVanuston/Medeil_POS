import {Routes} from '@angular/router';






import { stkadjSaveComponent } from './stkadjSave/stkadjSave.component';


import { stkadjEditComponent } from './stkadjEdit/stkadjEdit.component';


import { stkadjViewComponent } from './stkadjView/stkadjView.component'  ;


export const stockadjustmentRoutes: Routes = [



  {path: 'stkadjEdit/:id',
  component: stkadjEditComponent  ,
  data: {
    breadcrumb: 'Edit Stock Adjustment'
  }
},

  {
    path: '',


    children: [
    

        {
        path: 'StockAdjustment',

        component: stkadjSaveComponent,
        data: {
          breadcrumb: 'Stock Adjustment'
        }

      }  ,
      {
      path: 'stkadjEdit',

      component: stkadjEditComponent,
      data: {
        breadcrumb: 'Edit Stock Adjustment'
      }

    } ,  {
      path: 'ViewStockAdjustment',

      component: stkadjViewComponent,
      data: {
        breadcrumb: 'View Stock Adjustment'
      }

    }



    ]
  }
];


