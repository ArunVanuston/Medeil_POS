import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { Gstr3bReportService } from '../gstr3b.service';

@Component({
  selector: 'app-gstr3bprod',
  templateUrl: './gstr3bprod.component.html',
  styleUrls: ['./gstr3bprod.component.css']
})
export class Gstr3bprodComponent implements OnInit {

  GSTR3BYearForm:FormGroup;
  months: any;
  companyrefid: any;
  branchid: any;
  locrefid: any;
  locname: any;
  data: any;
  selmonth: any;

  constructor(private gstservice: Gstr3bReportService,
              private appcomponent:AppComponent,
              private Formbuilder:FormBuilder,
              private domSanitizer:DomSanitizer,
              private dateformat: dateFormatPipe) { }

  ngOnInit() {
    this.GSTR3BYearForm = this.Formbuilder.group({
      
         months:[this.dateformat.transform05(Date.now()),[]]
   
  });

  // this.gstservice.getgst1invoice(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,).subscribe(data =>{
  //   this.data=data
  // });
  this.companyrefid =AppComponent.companyID;
  this.branchid = AppComponent.branchID;
 this.locname = AppComponent.locRefName1;
 this.locrefid =AppComponent.locrefID1;
  
} 
datefetch() {

  this.selmonth = this.GSTR3BYearForm.get("months").value;
 
}

reportshow:boolean;
reportlink:any=" https://secure.medeil.io";
gstr3byear(){
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Gst3B/Gst3bYear.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&month="+this.selmonth+"&status=0&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
}

}
