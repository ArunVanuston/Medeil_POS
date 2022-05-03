import { Component, OnInit } from "@angular/core";

import { FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { ViewClientActivityServices } from "./clientactivity.component.services";





@Component({

    selector: 'app-clientactivityview',
    templateUrl: 'clientactivity.component.html',
    providers: [ViewClientActivityServices]
})
export class ViewClientActivityComponent implements OnInit{



    
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


    selobj;



    constructor(private viewClientActivityServices:ViewClientActivityServices, private formbuilder: FormBuilder ){

    }


    ngOnInit(){

        this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
          locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid:AppComponent.branchID };



    this.viewClientActivity();   
    
    
    }




    viewClientActivity(){



        
      var frmdata1 = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
      companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };

      this.viewClientActivityServices.viewClientActivity(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },


        errorCode => console.log(errorCode));




    }







    
}