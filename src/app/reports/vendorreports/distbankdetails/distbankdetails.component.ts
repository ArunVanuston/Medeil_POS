import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { vendorReportModule } from '../report.services';

@Component({
  selector: 'app-distbankdetails',
  templateUrl: './distbankdetails.component.html',
  styleUrls: ['./distbankdetails.component.css']
})
export class DistbankdetailsComponent implements OnInit {

  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  distid: any;
  private DistbankForm: FormGroup;
  distributorId: any;
  constructor(private appcomponent: AppComponent,
              private domSanitizer: DomSanitizer,
              private formbuilder: FormBuilder,
              private distservice: vendorReportModule) { }

  ngOnInit() {
    this.DistbankForm = this.formbuilder.group({
      vendorid: ['opt1', []]
    });

    //Get Distributor List

    this.distservice.getDistributorInfo(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => this.distributorId = data,
      err => {
        console.log('Error Occured ');
      });

    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
  }

  getdistid() {

    this.distid = this.DistbankForm.get('vendorid').value;
  }


  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  getdistbank() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NDistributor_Bank_Details/Dist_BankDetails.rptdesign&companyid=" + this.companyrefid + "&branchid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&distributorid=" + this.distid + "&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }


}
