import {Routes} from '@angular/router';
import { AccledgerComponent } from './accledger/accledger.component';
export const ledgerRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'LedgerAccount',
        component: AccledgerComponent,
        data: {
          breadcrumb: 'Ledger'
        }
      }
    ]
  }
];
