import {Routes} from '@angular/router';
import { saveDebitNoteComponent } from './saveDebitNote/saveDebitNote.component';
import { editDebitNoteComponent } from './editDebitNote/editDebitNote.component';
import { viewDebitNoteComponent } from './viewDebitNote/viewDebitNote.component';
export const debitNoteRoutes: Routes = [
{path: 'EditDebitNote/:id', component: editDebitNoteComponent  ,
data: {
  breadcrumb: 'DebitNote'
}},
  {
    path: '',
    children: [
    
      {
        path: 'DebitNote',
        component: saveDebitNoteComponent,
        data: {
          breadcrumb: 'DebitNote'
        }
      },
      {
        path: 'EditDebitNote',
        component: editDebitNoteComponent,
        data: {
          breadcrumb: 'DebitNote'
        }
      },
      {
        path: 'ViewDebitNote',
        component: viewDebitNoteComponent,
        data: {
          breadcrumb: 'DebitNote Maintenence'
        }
      }
    ]
  }
];
