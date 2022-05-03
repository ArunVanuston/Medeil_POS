import { Routes} from '@angular/router';
import { VatreportsComponent } from './vatreports.component';

export const VatreportsRoutes :Routes =[
    {
       path:'VatReports',
        component:VatreportsComponent,
        data:{
            breadcrumb:'Vat Reports'
        }
    }

]