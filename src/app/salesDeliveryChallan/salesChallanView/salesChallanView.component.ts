
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {challanViewService} from './salesChallanView.service'  ;
import { AppComponent } from '../../app.component';
import { data } from 'jquery';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-salesdeliveryChallan',
  templateUrl: './salesChallanView.component.html',
  providers: [challanViewService]
})
export class salesChallanViewComponent implements OnInit {

  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;


  viewchallan:FormGroup;
  
  selobj ;

  deviceObj: any;

    constructor(private userService: challanViewService,private formBuilder:FormBuilder,
      private appComponent: AppComponent,private dateformat: dateFormatPipe) {

      this.viewchallan=this.formBuilder.group({
        companyid: ['', []],
        branchid: ['', []],
        locname: ['', []],
        locref: ['', []],
      });

    }
  
    ngOnInit() {
  

      setTimeout(() => {
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data=data,this.setData(data) },
          errorCode => {console.log(errorCode)});

          this.gifFail=false;

          this.devicedetails();
          this.deviceObj.apiname="api/viewdeliverychallan";
          this.deviceObj.description="View Sales DeliveryChallan";
  
          this.userService.viewdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
        
      },3000);

  
        
    }
  
         
    setData(data:any){

      if(data!=null||undefined){
        this.viewchallan.get('companyid').setValue(data[0][1]);
        this.viewchallan.get('branchid').setValue(data[0][2]);
        this.viewchallan.get('locname').setValue(data[0][3]);
        this.viewchallan.get('locref').setValue(data[0][4]);
      }
      
    }


    
     
  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}

  }