import { Routes } from '@angular/router';
import { NewpurchasedeliverychallanComponent } from './newpurchasedeliverychallan.component';
import { ViewpdeliverychallanComponent } from './viewpdeliverychallan/viewpdeliverychallan.component';


export const NewpurchasedeliverychallanRouter: Routes = [

        {
            path: 'PurchaseDC',
            component: NewpurchasedeliverychallanComponent,
            data: {
                breadcrumb: 'Purchase Delivery Challan'
            }

        },
        {
            path:'',
            children:[
        {
            path: 'ViewPurchaseDC',
            component:ViewpdeliverychallanComponent,
            data: {
                breadcrumb: 'View Purchase Delivery Challan'
            }

        }   ] 
    
}]