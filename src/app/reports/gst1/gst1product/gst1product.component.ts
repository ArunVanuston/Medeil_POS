import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { Gst1ReportService } from '../gst1.service';

@Component({
  selector: 'app-gst1product',
  templateUrl: './gst1product.component.html',
  styleUrls: ['./gst1product.component.css'],
  providers:[Gst1ReportService]
})
export class Gst1productComponent implements OnInit {
  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  months: any;
  GstProductForm:FormGroup;
  selmonth: any;
  constructor(private appcomponent:AppComponent,
              private gstservice:Gst1ReportService,
              private formbuilder:FormBuilder,
              private router:Router,
              private domSanitizer:DomSanitizer) { }

  ngOnInit() {
   

    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
  }


  datefetch(mvalue) {

    this.selmonth = mvalue;
   
}

  reportshow:boolean=false;
reportlink:any=" https://secure.medeil.io";
gstmonth(){
 
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Gst1_Report/Gst1_Report_Invoice.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchrefid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&clientcdate="+this.selmonth+"&status=0&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

  
}

}
