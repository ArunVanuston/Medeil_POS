import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { ProfileinfoComponent } from './profileinfo.component';
import { ViewprofileinfoComponent } from './viewprofileinfo/viewprofileinfo.component';

export const ProfileInfoRouting: Routes = [{
        path: '',
        children: [
            {
                 path: 'viewprofileinfo',
                 component: ViewprofileinfoComponent,
                 data: {
                     breadcrumb: 'View ProfileInfo',
                     status: true
                 }
            },  {
                path: 'ViewProfileSettings',
                component: ProfileinfoComponent,
                data: {
                    breadcrumb: 'View Profile Settings',
                    status: true
                }
           },
        
        ]

}]