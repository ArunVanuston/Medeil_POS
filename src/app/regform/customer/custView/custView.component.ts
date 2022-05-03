
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import 'jquery';
import { AppComponent } from '../../../app.component';

import { custViewService } from './custView.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';


@Component({
  selector: 'app-custView',
  templateUrl: './custView.component.html',
  providers: [custViewService, NotificationsComponent]
})

export class custViewComponent implements OnInit {
  parentMessage = "sales";

  data=[];
  public filterQuery: string = "";
  public rowsOnPage: number = 10;
  //public filterQuery1: string = "";
  registerForm: FormGroup;

  statusCode: number;


  selobj;
  testArray = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }, { id: 3, name: 'Test 3' }];
  gifFail: boolean=true;
  selectedCity: any;
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];
  constructor(private userService: custViewService, private formBuilder: FormBuilder,private notificationsComponent:NotificationsComponent) {

  }


  ngOnInit() {
    
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
    });
    this.viewAll();
  }

  viewAll() {

    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    setTimeout(() => {
    this.userService.patientView(JSON.stringify(frmdata)).subscribe(data => {this.data = data},
      errorCode => console.log(errorCode));
      this.gifFail=false;
    },3000);

  }


  onSubmit() {
    this.userService.save(JSON.stringify(this.registerForm.value)).subscribe(data => console.log(data),
      errorCode => console.log(errorCode));
  }

  deleterec(indexid){
    var   frmdata={ frmint1 : indexid ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
     
    var answer = confirm("Delete data?"); ;
    
   if (answer) { 
    this.userService.patientDelete(JSON.stringify(frmdata) ).subscribe(data => {
      if(data==1){
        this.notificationsComponent.addToast({title:'Success', msg:'Data  Deleted successfully  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
        this.ngOnInit();
      }else{
        this.notificationsComponent.addToast({title:'Error', msg:'Data  Not Deleted', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
      }
    },errorCode => console.log(errorCode));
   }
    
  }
  




}