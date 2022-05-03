import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { ModulerankingComponent } from './moduleranking.component';
import { FolderrankingComponent } from './folderranking/folderranking.component';
import { ModulerankComponent } from './modulerank/modulerank.component';

export const ModulerankRouting: Routes = [{
    path: '',
        data: {
            breadcrumb: 'Ranking',
            Component: ModulerankingComponent,
            status: false
        },
        children: [
            {
                 path: 'folderrank',
                 component: FolderrankingComponent,
                 data: {
                     breadcrumb: 'General Settings',
                     status: true
                 }
             }, 
        
             {
                path: 'modulerank',
                component: ModulerankComponent,
                data: {
                    breadcrumb: 'General Settings',
                    status: true
                }
            }, 
        ]

}]