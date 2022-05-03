import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { salesmaintainRoutes } from './salesmaintain.routing';
import { slsMaintViewComponent } from './slsMaintView/slsMaintView.component';
import { CategoryPipe } from './slsMaintView/slsMaintView.pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(salesmaintainRoutes)  ,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [slsMaintViewComponent,CategoryPipe]
})

export class salesmaintainModule {}
