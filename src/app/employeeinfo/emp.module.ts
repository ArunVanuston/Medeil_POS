import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {empRoutes} from './emp.routing';
import {empComponent} from './emp.component';
import {addEmployeeComponent} from './addEmployee/addEmployee.component';
import {editEmployeeComponent} from'./editEmployee/editEmployee.component';
import {viewEmployeeComponent} from'./viewEmployee/viewEmployee.component';
import {CategoryPipe}from '../employeeinfo/viewEmployee/employee-list.pipe';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(empRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [empComponent,addEmployeeComponent,viewEmployeeComponent,editEmployeeComponent,CategoryPipe]
})

export class empModule {}
