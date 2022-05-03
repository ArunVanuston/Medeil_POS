import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
import {PickingReportService} from './pickingreports.service';


@Component({
  selector: 'app-pickingreports',
  templateUrl: './pickingreports.component.html',
  styleUrls: ['./pickingreports.component.css'],
  providers: [PickingReportService]
})

export class PickingreportsComponent implements OnInit {

  private myForm: FormGroup;
  private myempForm: FormGroup;

 branchid: any;
 locname: any;
 locrefid: any;
 companyrefid: any;
 status: number=0;
 empid= [];
 reportvar;
 reportvar1;
 empname: any;
 
 constructor(private pickservice:PickingReportService,private formBuilder:FormBuilder) { }


 ngOnInit() {

   this.myForm = this.formBuilder.group({
     
       from_date: ['', Validators.required],

       to_date: ['', Validators.required],
    
   });


   this.myempForm = this.formBuilder.group({
     
    empname: ['', Validators.required],

});

   this.branchid=  AppComponent.branchID;
   this.locname=  AppComponent.locRefName1;
   this.locrefid= AppComponent.locrefID1;
   this.companyrefid= AppComponent.companyID;
   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;


   this.myempForm.get('empname').setValue('opt1');
  
   this.pickservice.getEmployeesList(this.companyrefid,this.branchid,this.locname,this.locrefid).subscribe(data => this.empid = data,
      err => {
        console.log('Error Occured ');
 
      });
 
 }

datefetch(){

   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;
}

getEmployee() {
  this.empname=this.myempForm.get('empname').value;
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





