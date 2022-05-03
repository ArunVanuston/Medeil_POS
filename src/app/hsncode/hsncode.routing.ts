import { Routes } from "@angular/router";
import { Component } from "@angular/core";
import { AssignhsncodeComponent } from "./assignhsncode/assignhsncode.component";
import { AddhsncodeComponent } from "./addhsncode/addhsncode.component";

export const HsncodeRoutes: Routes = [
    {
        path:'',
        children:[
            {
            path:'AssignHsnCode',
            component: AssignhsncodeComponent,
            data: {
                breadcrumb:'Assign HSN Code'
            }
        },
        {
            path:'AddHsnCode',
            component:AddhsncodeComponent,
            data:{
                breadcrumb:'Add HSN Code'
            }
        }
        ]    
    }
]