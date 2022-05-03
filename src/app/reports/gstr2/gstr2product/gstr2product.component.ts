import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { Gst2ReportService } from '../gstr2.service';

@Component({
  selector: 'app-gstr2product',
  templateUrl: './gstr2product.component.html',
  styleUrls: ['./gstr2product.component.css'],
  providers:[Gst2ReportService]
})
export class Gstr2productComponent implements OnInit {


  months: any;
  companyrefid: any;
  branchid: any;
  locrefid: any;
  locname: any;
  data: any;
  selmonth: any;

  constructor(private gstservice: Gst2ReportService,
              private appcomponent:AppComponent,
              private Formbuilder:FormBuilder,
              private domSanitizer:DomSanitizer) { }

  ngOnInit() {
  
  // this.gstservice.getgst1invoice(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,).subscribe(data =>{
  //   this.data=data
  // });
  this.companyrefid =AppComponent.companyID;
  this.branchid = AppComponent.branchID;
 this.locname = AppComponent.locRefName1;
 this.locrefid =AppComponent.locrefID1;
  
} 
datefetch(mvalue) {

  this.selmonth = mvalue;
 
}

reportshow:boolean;
reportlink:any=" https://secure.medeil.io";
gstrprodmonth(){
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Gst2_Report/GST2_Product.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&invoicedate="+this.selmonth+"&status=0&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
}






  
 

}
