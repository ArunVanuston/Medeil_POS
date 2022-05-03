import { Routes } from "@angular/router";
import { PaymentoutstandingComponent } from "./paymentoutstanding.component";
 export const paymentoutstandingRoute: Routes =[{
   path:'',
    children:[
        {
        path:'PaymentOutstanding',
        component:PaymentoutstandingComponent,
        data: {
         breadcrumb: 'Payment Outstanding'
        }
    } 
    ]

}]