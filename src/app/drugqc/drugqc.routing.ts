import { Routes } from '@angular/router';

import { VerifydrugComponent } from './verifydrug/verifydrug.component';


export const DrugQcRouter: Routes = [

        {
            path: 'DrugQC',
            component: VerifydrugComponent,
            data: {
                breadcrumb: 'Drug Quality Controller'
            }

        }
        ]