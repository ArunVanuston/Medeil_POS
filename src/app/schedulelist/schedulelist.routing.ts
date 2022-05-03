
import {Routes} from '@angular/router';
import { ViewschedulelistComponent } from './viewschedulelist/viewschedulelist.component';

export const SchedulelistRouting: Routes = [
  
    {
        path: '',
        children: [
            { 
                path: 'ScheduleList',
                component: ViewschedulelistComponent,
                data: {
                    breadcrumb: 'Schedule List',                   
                }
                }          
        ]
}]
