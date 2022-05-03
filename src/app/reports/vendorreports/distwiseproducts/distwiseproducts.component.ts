import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { reportComponent } from '../report.component';
import { vendorReportModule } from '../report.services';

@Component({
  selector: 'app-distwiseproducts',
  templateUrl: './distwiseproducts.component.html',
  styleUrls: ['./distwiseproducts.component.css'],
  providers: [vendorReportModule]
})
export class DistwiseproductsComponent implements OnInit {

  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  distid: any;
  private DistwiseForm: FormGroup;
  distributorId: any;
  constructor(private appcomponent: AppComponent,
              private domSanitizer: DomSanitizer,
              private formbuilder: FormBuilder,
              private distservice: vendorReportModule) { }

  ngOnInit() {
    this.DistwiseForm = this.formbuilder.group({
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
    this.distid = this.DistwiseForm.get('vendorid').value;
  }


  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  getdistproduct() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NDistributorwise_Products/distributorwiseProducts.rptdesign&companyrefid=" + this.companyrefid + "&branchrefid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&distributorid=" + this.distid + "&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

}
