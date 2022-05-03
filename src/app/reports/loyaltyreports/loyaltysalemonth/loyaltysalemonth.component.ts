import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-loyaltysalemonth',
  templateUrl: './loyaltysalemonth.component.html',
  styleUrls: ['./loyaltysalemonth.component.css']
})
export class LoyaltysalemonthComponent implements OnInit {

 
  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  months: any;
  constructor(private appcomponent: AppComponent,
              private domSanitizer: DomSanitizer,
              private formbuilder: FormBuilder) { }

  ngOnInit() {
  
  
    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
  }



  getmonth(evalue){
   
    this.months = evalue;
  }

  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  MonthlyLoyaltySales() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NLoyaltySales_Month/Loyalty_Sales_Monthly.rptdesign&companyrefid=" + this.companyrefid + "&branchid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid +"&month="+this.months+"&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
}
