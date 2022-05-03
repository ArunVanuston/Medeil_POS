import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { hrmsReportModule } from '../report.services';

@Component({
  selector: 'app-openregister',
  templateUrl: './openregister.component.html',
  styleUrls: ['./openregister.component.css'],
  providers:[hrmsReportModule]
})
export class OpenregisterComponent implements OnInit {
  companyrefid:any;
  branchrefid:any;
  locname:any;
  locrefid:any;
  constructor(private appcomponent:AppComponent,
              private hrmsservice:hrmsReportModule,
              private domSanitizer:DomSanitizer) { }

  ngOnInit() {
    this.companyrefid=AppComponent.companyID;
    this.branchrefid=AppComponent.branchID;
    this.locname=AppComponent.locRefName1;
    this.locrefid=AppComponent.locrefID1;
  }

  reportshow:boolean;
  reportlink:any="https://secure.medeil.io";
  getopenreg(){
   
    this.reportshow=true;
    let rlink ="https://secure.medeil.io/birt/frameset?__report=MedeilReports/NOpenRegister/openregister.rptdesign&companyrefid="+this.companyrefid+"&branchid="+this.branchrefid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
  
}
