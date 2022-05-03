import { Routes } from '@angular/router';
import { GeneratebarcodeComponent } from './generatebarcode/generatebarcode.component';
import { ViewbarcodeComponent } from './viewbarcode/viewbarcode.component';

export const BarcodeSettingsRoutes: Routes = [

    {
        path: '',
        
        children: [
            {
                path: 'generatebarcode',
                component: GeneratebarcodeComponent,
                data: {
                    breadcrumb: 'General Settings'
                }
            },{
                path: 'viewbarcode',
                component: ViewbarcodeComponent,
                data: {
                    breadcrumb: 'General Settings'
                }
            }]
    }];

