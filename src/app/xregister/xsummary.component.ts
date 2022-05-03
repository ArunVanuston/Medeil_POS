import { OnInit, Component } from "@angular/core";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { dateFormatPipe } from "app/notifications/notifications.datepipe";
import { Router } from "@angular/router";
import { XRegisterServices } from "./xregister.services";

@Component({
    selector: 'app-xsummary',
    templateUrl: './xsummary.component.html',
    providers: [dateFormatPipe, NotificationsComponent, XRegisterServices]
})

export class XSummaryComponent implements OnInit {
    closeregisterdata=[];
    closeregistercopy=[];
    gifFail:boolean=true;
    rowsOnPage:number=10;
    constructor(private xRegisterServices: XRegisterServices) { }

    ngOnInit(): void {
        
        setTimeout(() => {
            this.xRegisterServices.ViewallCloseRegisterdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
                this.closeregisterdata=data;this.closeregistercopy=data;
            });
            this.gifFail = false;
        },2000);      

    }


    searchemployee(event){
        if(event.length>0){
            //===0  starts with
            let srch = Object.assign([], this.closeregistercopy).filter(
            item => ((item[3].toLowerCase()).indexOf(event.toLowerCase()) !== -1));
            this.closeregisterdata=srch;
          }else{
            this.closeregisterdata=this.closeregistercopy;
        }
    }

    fulldetails=[];
    totalopenings:any=0.00;
    detailsview:boolean=false;
    cashmovements(userid,logintime,logouttime,openbal){
        this.detailsview=true;
        this.totalopenings=openbal;
        this.xRegisterServices.ViewCashMovements(userid,logintime,logouttime).subscribe(data => {
            this.fulldetails=data;
        });
    }



}