import { Component, OnInit } from "@angular/core";

import { FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { EmployeeTrackingServices } from "./employeetracking.component.services";






@Component({

  selector: 'app-employeetrackingview',
  templateUrl: 'employeetracking.component.html',
  providers: [EmployeeTrackingServices]
})
export class EmployeeTrackingComponent implements OnInit {




  public data: any;
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean = true;

  selobj;



  constructor(private employeeTrackingServices: EmployeeTrackingServices, private formbuilder: FormBuilder) {

  }


  ngOnInit() {

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid: AppComponent.branchID
    };



    this.viewEmployeeTracking();


  }





  taskStatus(event: any) {

    // var frmdata2 = {locrefid: this.selobj.locrefid, 
    // companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid, taskStatus:event };
    // alert(event);

    // this.employeeTrackingServices.getTaskStatus(JSON.stringify(frmdata2)).subscribe(data => { this.data = data },
    //   errorCode => console.log(errorCode));



    this.employeeTrackingServices.getTaskStatus(this.selobj.companyid, this.selobj.branchid, this.selobj.locname, this.selobj.branchid, event).subscribe(data => { this.data = data },
      errorCode => console.log(errorCode));



  }







  viewEmployeeTracking() {




    var frmdata1 = {
      frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid,
      companyrefid: this.selobj.companyid, locname: this.selobj.locname, branchrefid: this.selobj.branchid
    };


    setTimeout(() => {
      
  
    this.employeeTrackingServices.viewEmployeeTracking(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },


      errorCode => console.log(errorCode));

      this.gifFail = false;

    }, 3000);


  }








}