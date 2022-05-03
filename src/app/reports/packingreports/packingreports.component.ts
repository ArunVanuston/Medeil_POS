import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
//import {PackingReportService} from './packingreports.service';

@Component({
  selector: 'app-packingreports',
  templateUrl: './packingreports.component.html',
  styleUrls: ['./packingreports.component.css']
})


export class PackingreportsComponent implements OnInit {

 private myForm: FormGroup;
 
 branchid: any;
 locname: any;
 locrefid: any;
 companyrefid: any;
 status: number=0;
 empid= [];
 reportvar;
 reportvar1;
 empname: any;
 
 constructor(private formBuilder:FormBuilder) { }


 ngOnInit() {

   this.myForm = this.formBuilder.group({
     
       from_date: ['', Validators.required],

       to_date: ['', Validators.required],
    
   });

   this.branchid=  AppComponent.branchID;
   this.locname=  AppComponent.locRefName1;
   this.locrefid= AppComponent.locrefID1;
   this.companyrefid= AppComponent.companyID;
   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;

 }

datefetch(){

   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;
}

 
setDateRange(): void {
  // Set date range (today) using the patchValue function
  let date = new Date();
  this.myForm.patchValue({from_date:  {
      beginDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
      },
      endDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
      }
  }});
  let date2 = new Date();
  this.myForm.patchValue({to_date: {
    beginDate: {
        year: date2.getFullYear(),
        month: date2.getMonth() + 1,
        day: date2.getDate()
    },
    endDate: {
        year: date2.getFullYear(),
        month: date2.getMonth() + 1,
        day: date2.getDate()
    }
}});
}


}





