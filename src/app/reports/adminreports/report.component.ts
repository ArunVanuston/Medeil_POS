
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
import {adminReportModule} from './report.services';




@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
providers: [adminReportModule]
})
export class reportComponent implements OnInit {
 private myForm: FormGroup;
 companyrefid=[];
 branchrefid=[];

 branchref;
 companyref;


 constructor(private adminservice:adminReportModule) {
 let company = new FormControl('', Validators.required);
 let branchname = new FormControl('', Validators.required);
 this.myForm = new FormGroup({
   company: company,
   branchname: branchname});
 }

 getbranch(){

   this.branchref= this.myForm.get("branchname").value;
 
}
getBranch() {
 this.adminservice.getBranch(this.myForm.get('company').value).subscribe(data => this.branchrefid = data, err => {
   console.log('Error occured On getBranch()');
 })
}
  ngOnInit() {
   //this.companyrefid= AppComponent.companyID;
   this.myForm.get('branchname').setValue('opt1');
   this.myForm.get('company').setValue('opt1');
   this.adminservice.getAllCompany().subscribe(data => this.companyrefid = data,
     err => {
       console.log('Error Occured ');

     });
     this.branchref= this.myForm.get("branchname").value;
     this.companyref= this.myForm.get("company").value;
   /*  if (AppComponent.usertype == "\"SuperAdmin\" ") {

       this.branchref.getAllCompany().subscribe(data => this.companyrefid = data,
         err => {
           console.log('Error Occured ');
         });
     }
     else {
       this.branchref.getCompany(AppComponent.companyID).subscribe(data => this.companyrefid = data,
          err => {
           console.log('Error Occured ');
         });
     }*/
 }
   
 view(){

   this.branchref= this.myForm.get("branchname").value;
   this.companyref= this.myForm.get("company").value;
}
    }


