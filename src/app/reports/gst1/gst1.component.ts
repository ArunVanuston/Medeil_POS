import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { Gst1ReportService } from './gst1.service';

@Component({
  selector: 'app-gst1',
  templateUrl: './gst1.component.html',
  styleUrls: ['./gst1.component.css'],
  providers:[Gst1ReportService]
})
export class Gst1Component implements OnInit {
  data: any;

  months: any;
  companyrefid: any;
  branchid: any;
  locrefid: any;
  locname: any;
  selmonth: any;

  constructor(private gstservice: Gst1ReportService,
              private appcomponent:AppComponent,
              private Formbuilder:FormBuilder,
              private domSanitizer:DomSanitizer) { }

  ngOnInit() {
 

  this.gstservice.getgst1invoice(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,).subscribe(data =>{
    this.data=data
  });
  this.companyrefid =AppComponent.companyID;
  this.branchid = AppComponent.branchID;
 this.locname = AppComponent.locRefName1;
 this.locrefid =AppComponent.locrefID1;
  
} 


datefetch(mvalue) {

  this.selmonth = mvalue;
 
}
reportshow:boolean;
reportlink:any="https://secure.medeil.io";
gstmonth(){
 
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Gst1_Report/Gst1_Report_Invoice.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&clientcdate="+this.selmonth+"&status=0&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

 

}

}
