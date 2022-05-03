import {stockViewService} from './stockView.services';
import {Component, OnInit, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';

import { AppComponent } from '../../app.component';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-stockView',
  templateUrl: './stockView.component.html',
  styleUrls: ['./stockView.component.css'],
  providers: [stockViewService]
})
  

export class stockViewComponent implements OnInit {

  public data=[];
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";

  
  purchaseOrder: FormGroup;
  gifFail: boolean=true;
  
  constructor(private userService: stockViewService, private route: Router,
    private formBuilder:FormBuilder,public translate: TranslateService) {
    translate.setDefaultLang('en');
    this.purchaseOrder = this.formBuilder.group({
      companyid: ['', []],
      branchid: ['', []],
      locname: ['', []],
      locref: ['', []],
    });
   

    if (AppComponent.usertype == "\"SuperAdmin\" ") { 
      setTimeout(() => {
      this.userService.superAdminViewStock().subscribe(data => {this.data = data},
        err => {
          console.log('Error get values from services in Branch Component');
         
        });
        this.gifFail=false;
        
      },3000);
    
      }
      
    else{
      setTimeout(() => {

      this.userService.viewStock(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data = data,this.setdata(data)},
        err => {
          console.log('Error get values from services in Branch Component');
          
        });
        this.gifFail=false;
      },3000);

      }
  
    
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
  }

setdata(data:any){
  if(data!=null||undefined){
    this.purchaseOrder.get('companyid').patchValue(data[0][0]);
    this.purchaseOrder.get('branchid').setValue(data[0][1]);
    this.purchaseOrder.get('locname').setValue(data[0][2]);
    this.purchaseOrder.get('locref').setValue(data[0][3]);
  }
}

  

 
 
}







