import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-giftcardsalecurdate',
  templateUrl: './giftcardsalecurdate.component.html',
  styleUrls: ['./giftcardsalecurdate.component.css']
})
export class GiftcardsalecurdateComponent implements OnInit {

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
  getgiftcardsalecurdate() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NGiftcardSales_CurDate/GiftcardSales_Curdate.rptdesign&companyrefid=" + this.companyrefid + "&branchid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
}
