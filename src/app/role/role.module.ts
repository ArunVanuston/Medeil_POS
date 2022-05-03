import { SharedModule } from '../shared/shared.module';
import { RoleService } from './role.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleRoutes } from './role.routing';
import { RoleComponent } from './role.component';
import { AddroleComponent } from './addrole/addrole.component';
import { ViewroleComponent } from './viewrole/viewrole.component';
import { RoledetailsComponent } from './roledetails/roledetails.component';
import { CategoryPipe } from './viewrole/viewrole.pipe';
import { viewAssignComponent } from './viewAssignRole/viewAssignRole.component';
import { roleAssignPipe } from './viewAssignRole/viewassignModule.pipe'
import { NgxPaginationModule } from 'ngx-pagination';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RoleRoutes),
    SharedModule,
    NgxPaginationModule,
    RightPanelModule,
    AngularMultiSelectModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [RoleComponent, AddroleComponent, ViewroleComponent, RoledetailsComponent, CategoryPipe, viewAssignComponent, roleAssignPipe],
  providers: [RoleService]
})

export class RoleModule { }