import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { InsurenceService } from '../insurence.service';


@Component({
  selector: 'app-insurenceview',
  templateUrl: './insurenceview.component.html',
  providers: [InsurenceService, NotificationsComponent]
})
export class InsurenceviewComponent implements OnInit {
  parentMessage = "sales";

  public filterQuery: string = "";

  insurenceForm: FormGroup;
  selobj; 
  data=[];
  rowsOnPage=10;
  gifFail: boolean= true;


  constructor(private notificationsComponent:NotificationsComponent,private insureservice: InsurenceService,) { }
 
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
    this.insureservice.insuranceView(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {this.data = data},
      errorCode => console.log(errorCode));
    },3000);

  }

}
