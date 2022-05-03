import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { Gstr3bReportService } from './gstr3b.service';

@Component({
  selector: 'app-gstr3b',
  templateUrl: './gstr3b.component.html',
  styleUrls: ['./gstr3b.component.css']
})
export class Gstr3bComponent implements OnInit {

  
  GSTR3BMonthForm:FormGroup;
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
              private domSanitizer:DomSanitizer) { }

  ngOnInit() {
    this.GSTR3BMonthForm = this.Formbuilder.group({
      
         months:['',[]]
   
  });

  // this.gstservice.getgst1invoice(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,).subscribe(data =>{
  //   this.data=data
  // });
  this.companyrefid =AppComponent.companyID;
  this.branchid = AppComponent.branchID;
 this.locname = AppComponent.locRefName1;
 this.locrefid =AppComponent.locrefID1;
  
} 


datefetch(dmonth) {

  this.selmonth = dmonth;
 
}


reportshow:boolean;
reportlink:any="https://secure.medeil.io";
gstr3bmonth(){
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Gst3B/Gst3b.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&month="+this.selmonth+"&status=0&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
}

}
