import { Routes } from "@angular/router";
import { Component } from "@angular/core";
import { UserlockComponent } from "./userlock/userlock.component";
import { UserloginhistoryComponent } from "./userloginhistory/userloginhistory.component";
import { TokenaccesstimeComponent } from "./tokenaccesstime/tokenaccesstime.component";
import { UserpasshistoryComponent } from "./userpasshistory/userpasshistory.component";

export const SecuritymonitoringRouting:Routes = [
    {
        path:'',
        children:[
            {
                path:'UserLock',
                component: UserlockComponent,
                data:{
                    breadcrumb:'User Lock Details',
                }
            },
            {
                path:'LoginHistory',
                component: UserloginhistoryComponent,
                data:{
                    breadcrumb:'User Login History',
                }
            },
            {
                path:'TokenAccessTime',
                component: TokenaccesstimeComponent,
                data:{
                    breadcrumb:'Token Access Time Settings',
                }
            },
            {
                path:'UserPasswordHistory',
                component: UserpasshistoryComponent,
                data:{
                    breadcrumb:'User Password History',
                }
            },
        ]
 }]