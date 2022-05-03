import { Component, OnInit } from '@angular/core';
import { pharmacistregService } from 'app/pharmacist-reg/Pharmacistreg.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pharmacistreportService } from './pharmacistreport.service';
import { AppComponent } from 'app/app.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pharmacistregreport',
  templateUrl: './pharmacistregreport.component.html',
  styleUrls: ['./pharmacistregreport.component.css'],
 
})
export class PharmacistregreportComponent implements OnInit {
  PharmacistReport:FormGroup;
  opt2=0;
  data: any;
  companyrefid: any;
  locrefid: any;
  locname: any;
  branchid: any;
  selmonth: string;
  schedule: any;
  fromdate: any;
  todate: any;

  constructor(private pharmacistservice:pharmacistreportService,private formbuilder:FormBuilder,
              private pharmacistregservice:pharmacistregService,private appcomponent:AppComponent,
              private domSanitizer:DomSanitizer) {
   }

  ngOnInit() {

    this.PharmacistReport = this.formbuilder.group({
      scheduleid:[,[]],
      fromdate:[,[]],
      todate:[,[]]

    });
   
    // this.PharmacistReport.get('scheduleid').setValue(this.opt2);
   
    this.pharmacistregservice.getschedule().subscribe(data => { this.data =data})
    this.companyrefid =AppComponent.companyID;
  this.branchid = AppComponent.branchID;
 this.locname = AppComponent.locRefName1;
 this.locrefid =AppComponent.locrefID1;

  }
setvalue(){
  this.fromdate = this.PharmacistReport.get('fromdate').value;
 
  this.todate = this.PharmacistReport.get('todate').value;
 
 this.schedule= this.PharmacistReport.get('scheduleid').value;

}

  reportshow:boolean;
reportlink:any=" https://secure.medeil.io";
schedulerep(){
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales Register/PharmacistReg.rptdesign&scheduleid="+this.schedule+"&fromdate="+this.fromdate+"&todate="+this.todate+"&companyrefid="+this.companyrefid+"&locrefid="+this.locrefid+"&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

  // "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales Register/PharmacistReg.rptdesign&scheduleid={{scheduleid}}&fromdate={{fromdate}}&todate={{todate}}&companyrefid={{companyrefid}}&locrefid={{locrefid}}"
}

}
