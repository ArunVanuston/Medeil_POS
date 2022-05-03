import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-policyview',
  templateUrl: './policyview.component.html',
  providers: [PolicyService]
})
export class PolicyviewComponent implements OnInit {

  selobj; 
  data=[];
  rowsOnPage=10;
  gifFail: boolean= true;

  constructor(private policyservice: PolicyService,) { }

  ngOnInit() {
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchid: AppComponent.branchID };
    setTimeout(() => {
      this.gifFail=false;
    }, 1300);
     this.viewAll();
  }

  
  viewAll() {


    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname,companyid: this.selobj.companyid,branchid: this.selobj.branchid };
    setTimeout(() => {
    this.policyservice.policyView(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {this.data = data},
      errorCode => console.log(errorCode));
    },3000);

  }

}
