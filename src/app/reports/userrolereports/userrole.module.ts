import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserreportsComponent } from './userreports/userreports.component';
import { UserroleService } from './userrole.service';
import { UserroleRouting } from './userrole.routing';
import { SharedModule } from 'app/shared/shared.module';
import { RolelistComponent } from './rolelist/rolelist.component';

@NgModule({
    imports:[SharedModule,
    CommonModule,
    RouterModule.forChild(UserroleRouting)],
    declarations:[UserreportsComponent,RolelistComponent],
    providers:[UserroleService]
})

export class UserroleModule{}