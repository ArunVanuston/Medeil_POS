import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-accpayable',
  templateUrl: './accpayable.component.html',
  styleUrls: ['./accpayable.component.css']
})
export class AccpayableComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  payable(){
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/AccountPayable.rptdesign&locname=" + AppComponent.locRefName1 + "&locrefid=" + AppComponent.locrefID1 + "&companyrefid=" + AppComponent.companyID +"&branchrefid=" + AppComponent.branchID +"&__format=PDF"
  
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

}

