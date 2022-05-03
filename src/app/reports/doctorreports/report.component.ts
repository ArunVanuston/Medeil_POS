
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
})
export class reportComponent implements OnInit {


 branchid: any;
 locname: any;
 locrefid: any;
 companyrefid: any;
 status: number=0;

 constructor(private appComponent: AppComponent,  private domSanitizer: DomSanitizer) {}

 ngOnInit() {
   this.branchid=  AppComponent.branchID;
   this.locname=  AppComponent.locRefName1;
   this.locrefid= AppComponent.locrefID1;
   this.companyrefid= AppComponent.companyID;


 }

 reportshow:boolean;
 reportlink:any="https://secure.medeil.io";
 doctorlist(){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/DoctorList/Doctorinfo.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&status=0&__format=PDF"
   this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }


 hospitallist(){
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/HospitalList/Hospitalinfo.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&status=0&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
}
 

}

