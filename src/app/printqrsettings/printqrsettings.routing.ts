import { Routes } from '@angular/router';
import { PrintsettingsComponent } from './printsettings/printsettings.component';
import { PrintsettingsviewComponent } from './printsettingsview/printsettingsview.component';
import { PrintsettingssaveComponent } from './printsettingssave/printsettingssave.component';
import { PrintimagesaveComponent } from './printimagesave/printimagesave.component';
import { PrintimageviewComponent } from './printimageview/printimageview.component';

export const PrintqrSettingRoutes: Routes = [

    {
        path: '',
        
        children: [
            {
                path: 'printsettings',
                component: PrintsettingsComponent,
                data: {
                    breadcrumb: 'General Settings'
                }
            },{
                path: 'viewprintsettings',
                component: PrintsettingsviewComponent,
                data: {
                    breadcrumb: 'General Settings'
                }
            },{
                path: 'saveprintsettings',
                component: PrintsettingssaveComponent,
                data: {
                    breadcrumb: 'Save PrintSettings'
                }
            },{
                path: 'saveprintimage',
                component: PrintimagesaveComponent,
                data: {
                    breadcrumb: 'General Settings'
                }
            },{
                path: 'viewprintimage',
                component: PrintimageviewComponent,
                data: {
                    breadcrumb: 'General Settings'
                }
            }]
    }];

