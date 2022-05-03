import { Routes } from '@angular/router';
import { CloseXRegisterComponent } from './closexregistershift.component';
import { PrintXReportComponent } from './printxreport.component';
import { OPenXRegisterComponent } from './openxregistershift.component';
import { XreportComponent } from './xreport/xreport.component';
import { XSummaryComponent } from './xsummary.component';

export const xreportRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'OpenRegister',
                component: OPenXRegisterComponent,
                data: {
                    breadcrumb: 'Open Register',
                }
            },

            {
                path: 'CloseRegister',
                component: CloseXRegisterComponent,
                data: {
                    breadcrumb: 'Close Register',
                }
            },

            {
                path: 'ViewOpenRegister',
                component: PrintXReportComponent,
                data: {
                    breadcrumb: 'View Open Register'
                }
            },

            {
                path: 'ViewCloseRegister',
                component: XSummaryComponent,
                data: {
                    breadcrumb: 'View Close Register'
                }
            },

            {
                path: 'xReport',
                component: XreportComponent,
                data: {
                    breadcrumb: 'xReport',
                }
            },

        ]


    }];
