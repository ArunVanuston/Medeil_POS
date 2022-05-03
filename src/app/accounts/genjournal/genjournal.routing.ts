import { Routes } from '@angular/router';
import { genjournalEditComponent } from './genjournalEdit/genjournalEdit.component';
import { genjournalViewComponent } from './genjournalView/genjournalView.component';
import { genjournalSaveComponent } from './genjournalSave/genjournalSave.component';
export const genjournalRoutes: Routes = [
  {
    path: 'EditGenJournal/:id', component: genjournalEditComponent, data: {
      breadcrumb: 'GenJournal'
    }
  },
  {
    path: '',
    children: [
      {
        path: 'GeneralJournal',
        component: genjournalSaveComponent,
        data: {
          breadcrumb: 'GenJournal'
        }
      },
      {
        path: 'EditGenJournal',
        component: genjournalEditComponent,
        data: {
          breadcrumb: 'GenJournal'
        }
      }, {
        path: 'ViewGeneralJournal',
        component: genjournalViewComponent,
        data: {
          breadcrumb: 'ViewGeneralJournal'
        }
      }
    ]
  }
];
