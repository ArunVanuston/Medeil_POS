import { Routes } from '@angular/router';
import { GenerateqrcodeComponent } from './generateqrcode/generateqrcode.component';
import { ViewqrcodeComponent } from './viewqrcode/viewqrcode.component';

export const QrcodeSettingsRoutes: Routes = [

    {
        path: '',
        
        children: [
            {
                path: 'generateqrcode',
                component: GenerateqrcodeComponent,
                data: {
                    breadcrumb: 'General Settings'
                }
            },{
                path: 'viewqrcode',
                component: ViewqrcodeComponent,
                data: {
                    breadcrumb: 'General Settings'
                }
            }]
    }];

