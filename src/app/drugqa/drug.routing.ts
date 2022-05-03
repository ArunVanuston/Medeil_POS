import {  Routes} from '@angular/router';
import { DrugqaComponent } from './drugqa.component';

export const DrugqaRouter:Routes = [
    {
        path:'DrugQA',
        component:DrugqaComponent,
        data:{
            breadcrumb:'Drug Quality Access'
        }

    }
] 