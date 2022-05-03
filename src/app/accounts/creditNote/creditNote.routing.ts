import { Routes } from '@angular/router';
import { saveCreditComponent } from './saveCreditNote/saveCredit.component';
import { editCreditNoteComponent } from './editCreditNote/editCreditNote.component';
import { viewCreditNoteComponent } from './viewCreditNote/viewCreditNote.component'
export const creditNoteRoutes: Routes = [
  {
    path: 'EditCreditNote/:id', component: editCreditNoteComponent, data: {
      breadcrumb: 'CreditNote'
    }
  },
  {
    path: '',
    children: [
      {
        path: 'CreditNote',
        component: saveCreditComponent,
        data: {
          breadcrumb: 'CreditNote'
        }
      }, {
        path: 'EditCreditNote',
        component: editCreditNoteComponent,
        data: {
          breadcrumb: 'CreditNote'
        }
      }
      , {
        path: 'ViewCreditNote',
        component: viewCreditNoteComponent,
        data: {
          breadcrumb: 'CreditNote Maintenence'
        }
      }
    ]
  }
];
