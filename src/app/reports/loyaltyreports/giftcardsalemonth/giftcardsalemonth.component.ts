import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-giftcardsalemonth',
  templateUrl: './giftcardsalemonth.component.html',
  styleUrls: ['./giftcardsalemonth.component.css']
})
export class GiftcardsalemonthComponent implements OnInit {

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
  getgiftcardsalemonth() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NGiftcardSales_CurDate/Giftcard_SaleMonthly.rptdesign&companyrefid=" + this.companyrefid + "&branchid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid +"&month="+this.months+"&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
}
