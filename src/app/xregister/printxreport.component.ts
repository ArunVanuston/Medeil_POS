import { OnInit, Component } from "@angular/core";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { dateFormatPipe } from "app/notifications/notifications.datepipe";
import { Router } from "@angular/router";
import { XRegisterServices } from "./xregister.services";

@Component({
    selector: 'app-printxreport',
    templateUrl: './printxreport.component.html',
    providers: [dateFormatPipe, NotificationsComponent, XRegisterServices]
})

export class PrintXReportComponent implements OnInit {
    parentMessage='sales'
    openregisterdata=[];
    openregistercopy=[];
    gifFail:boolean=true;
    rowsOnPage:number=10;
    
    constructor(private xRegisterServices: XRegisterServices) { }

    ngOnInit(): void {
        
        setTimeout(() => {
            this.xRegisterServices.ViewallOpenRegisterdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
                this.openregisterdata=data;this.openregistercopy=data;
            });
            this.gifFail = false;
        },2000);      

    }


    searchemployee(event){
        if(event.length>0){
            //===0  starts with
            let srch = Object.assign([], this.openregistercopy).filter(
            item => ((item[2].toLowerCase()).indexOf(event.toLowerCase()) !== -1));
            this.openregisterdata=srch;
          }else{
            this.openregisterdata=this.openregistercopy;
        }
    }



}