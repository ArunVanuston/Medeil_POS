
import { AddeditionComponent } from './addedition/addedition.component';
import { VieweditionComponent } from './viewedition/viewedition.component';
import { Routes } from '@angular/router';
import { EditiondetailsComponent } from './editiondetails/editiondetails.component';
import { viewAssignComponent } from './viewassignModule/viewassignModule.component';
export const EditionRoutes: Routes = [       
       
        {
            path: '',           
            children: [
                {
                    path: 'AddEdition',
                    component: AddeditionComponent,
                    data: {
                        breadcrumb: 'Add Edition'
                      }   
                },
               {
                    path: 'ViewEdition',
                    component: VieweditionComponent,
                    data: {
                        breadcrumb: 'View Edition'
                      }   
               },
               {
                path: 'viewassignModule',
                component: viewAssignComponent,
                data: {
                    breadcrumb: 'Assign Module'
                }   
           },
           {
            path: 'editiondetails',///:id/:sid
            component: EditiondetailsComponent,
            data: {
                breadcrumb: 'Edition Control'
              }  
           }
            ]}]