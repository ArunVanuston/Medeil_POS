import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AppComponent } from 'app/app.component';
import { hrmsReportModule } from '../report.services';

@Component({
  selector: 'app-empcloseregister',
  templateUrl: './empcloseregister.component.html',
  styleUrls: ['./empcloseregister.component.css'],
  providers:[hrmsReportModule]
})
export class EmpcloseregisterComponent implements OnInit {
  companyrefid:any;
  branchrefid:any;
  locname:any;
  locrefid:any;
  month: any;
  constructor(private appcomponent:AppComponent,
              private hrmsservice:hrmsReportModule,
              private domSanitizer:DomSanitizer) { }

  ngOnInit() {
    this.companyrefid=AppComponent.companyID;
    this.branchrefid=AppComponent.branchID;
    this.locname=AppComponent.locRefName1;
    this.locrefid=AppComponent.locrefID1;
  }

  getmonth(mvalue){
    this.month=mvalue;
  }

  reportshow:boolean;
  reportlink:any="https://secure.medeil.io";
  getempclosereg(){
   
    this.reportshow=true;
    let rlink ="https://secure.medeil.io/birt/frameset?__report=MedeilReports/NopencloseReg/openclosereg.rptdesign&companyrefid="+this.companyrefid+"&branchid="+this.branchrefid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&month="+this.month+"&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
  
}
