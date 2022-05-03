import { Component, OnInit } from "@angular/core";

import { FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { ViewUserAuditServices } from "./useraudit.component.services";






@Component({

    selector: 'app-userauditview',
    templateUrl: 'useraudit.component.html',
    providers: [ViewUserAuditServices]
})
export class ViewUserAuditComponent implements OnInit{



    
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


    selobj;



    constructor(private viewUserAuditServices:ViewUserAuditServices, private formbuilder: FormBuilder ){

    }


    ngOnInit(){

        this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
          locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid:AppComponent.branchID };



    this.viewAudit();   
    
    
    }




    viewAudit(){



        
      var frmdata1 = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
      companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };

      this.viewUserAuditServices.viewUserAudit(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },


        errorCode => console.log(errorCode));




    }







    
}