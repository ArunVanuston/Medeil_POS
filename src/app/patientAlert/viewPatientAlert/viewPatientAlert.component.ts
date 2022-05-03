import {patientAlertService} from '../patientAlert.service';
import {Component, OnInit, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';

import {AppComponent} from '../../app.component';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-viewPatientAlert',
  templateUrl: './viewPatientAlert.component.html',
  styleUrls: ['./viewPatientAlert.component.css'],
  providers: [patientAlertService]
})
  

export class viewPatientAlertComponent implements OnInit {

 
  
  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
 
  
  constructor(public translate: TranslateService,private userService: patientAlertService, private route: Router) {
    translate.setDefaultLang('en');

     if ("admin" == AppComponent.userID.substring(0, 5)) { 
     this.userService.patientAlertViewByAdmin().subscribe(data => {this.data = data},
      err => {
        console.log('Error get values from services in Branch Component');
      });
    }else{
      setTimeout(() => {
        
     
      this.userService.patientAlertView(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data = data},
        err => {
          console.log('Error get values from services in Branch Component');
        });
        this.gifFail=false;
      }, 3000);
    }
    

  }


  // private employeeDelete(id:number): void { 
  //   this.userService.employeeDelete(id).subscribe(data=>console.log=data);
  //   this.userService.employeeView().subscribe(data => {this.data = data});
  // }


  private employeeDelete(id:number): void { 
    this.userService.employeeDelete(id).subscribe(data=>{alert("Employee "+data);
      if(data==1){
         alert("Employee  is succesfully Deleted");
        window.location.reload();
       // window.location.replace('employeeinfo/viewEmployee');
      }
    });
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
  }

}







