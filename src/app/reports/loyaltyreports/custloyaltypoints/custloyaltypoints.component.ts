import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-custloyaltypoints',
  templateUrl: './custloyaltypoints.component.html',
  styleUrls: ['./custloyaltypoints.component.css']
})
export class CustloyaltypointsComponent implements OnInit {
 
  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  constructor(private appcomponent: AppComponent,
              private domSanitizer: DomSanitizer,
              private formbuilder: FormBuilder) { }

  ngOnInit() {
  
  
    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
  }

  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  getloyaltycustpoints() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NCustomerLoyaltyPoints/CustomerLoyalty.rptdesign&companyrefid=" + this.companyrefid + "&branchrefid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

 
}
