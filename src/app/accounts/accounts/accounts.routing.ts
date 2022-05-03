import { Routes } from '@angular/router';
import { accountsSaveComponent } from './accountsSave/accountsSave.component';
import { BankregComponent } from './bankreg/bankreg.component';
import { ChequebookComponent } from './chequebook/chequebook.component';
import { ViewbankComponent } from './viewbank/viewbank.component';
export const accountsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Accounts',
        component: accountsSaveComponent,
        data: {
          breadcrumb: 'Charts Of Accounts'
        }
      },
      {
        path: 'BankRegistration',
        component: BankregComponent,
        data: {
          breadcrumb: 'Bank Registration'
        }
      },
      {
        path: 'BankRegistration/:id',
        component: BankregComponent,
        data: {
          breadcrumb: 'Bank Registration'
        }
      },
      {
        path: 'viewbank',
        component: ViewbankComponent,
        data: {
          breadcrumb: 'Bank Details'
        }
      },
      {
        path: 'ChequeRegistration',
        component: ChequebookComponent,
        data: {
          breadcrumb: 'Cheque Details'
        }
      }
    ]
  }
];
