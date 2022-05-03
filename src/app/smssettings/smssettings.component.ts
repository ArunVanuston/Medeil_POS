import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import {smsService} from './smssettings.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import '../../../node_modules/peity/jquery.peity.min.js';
import { TranslateService } from 'ng2-translate';   
import * as c3 from 'c3';
declare var $: any;


@Component({
  selector: 'app-smssettings',
  templateUrl: './smssettings.component.html',
  styleUrls: ['./smssettings.component.css'],
  providers:[smsService,NotificationsComponent],
  encapsulation: ViewEncapsulation.None
})

export class SmssettingsComponent implements OnInit {
  parentMessage="sales";
  smsForm: FormGroup;
  pagesize: number = 10;
  smslogdata=[];
  brancheslist=[];
  shoplist=[];

  constructor(public translate: TranslateService,private smsservice:smsService,private formBuilder: FormBuilder,private notificationsComponent: NotificationsComponent) {translate.setDefaultLang('en'); }

  ngOnInit() { 
    this.translate.use(localStorage.getItem('language'));
    this.smsForm = this.formBuilder.group({
    
      //To Store Users SMS Id Details
      accountsid:['',[]],
      authtoken: ['', []],
      sendernumber: ['', []],

      //For GET Branch & shop details under company
      branchname:['opt1',[]],
      shopname:['opt1',[]],

      //for formwise checkbox enable disable
      twilosmscheck:[false,[]],
      othersmscheck:[false,[]],
      freesmscheck:[false,[]],
      
      //for checkbox enable disable
      accountsettingcheck:[false,[]],
      viewsmslogcheck:[false,[]],
      smsenableheck:[false,[]],
      smschart:[false,[]],

      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
          
      smsenablearray: this.formBuilder.array([]),
      smsenablearraycreate: this.formBuilder.array([]),
    });

  }

  twilosms:boolean=false;
  selectsms(event,id){
    if(event.target.checked){
      if(id==1){
        this.twilosms=true;
        this.smsForm.get('othersmscheck').setValue(false);
        this.smsForm.get('freesmscheck').setValue(false);
      }else if(id==2){
        this.twilosms=false;
        this.smsForm.get('twilosmscheck').setValue(false);
        this.smsForm.get('freesmscheck').setValue(false);
      }else if(id==3){
        this.twilosms=false;
        this.smsForm.get('twilosmscheck').setValue(false);
        this.smsForm.get('othersmscheck').setValue(false);
      }else{
      this.twilosms=false;
      }
    }
  }


  accountsvalidate(): Number {
    var valflag = 1;
    let accountid=this.smsForm.get('accountsid').value;
    let authtoken=this.smsForm.get('authtoken').value;
    let mobileno=this.smsForm.get('sendernumber').value;
  
    if (accountid == null || accountid == undefined || accountid == 0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Account ID', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      valflag=0; 
    } else if (authtoken == null || authtoken == undefined || authtoken == 0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Auth Token', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      valflag=0; 
    } else if (mobileno == 0 || mobileno == null || mobileno == undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Mobile No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      valflag=0; 
    } 

    return valflag;
  }

  //These Under Acount Settings
  saveaccounts(){
    let validateflag = this.accountsvalidate();
    if (validateflag == 1) {
      this.saveprocess=true;
      this.smsservice.savesmsaccount(JSON.stringify(this.smsForm.value)).subscribe(data => {
        if(data==true){
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Saved Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          this.ngOnInit();
        }}, error => { 
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
      });
     }
  }

  //these under View sms Logs

  accountsshow:boolean=false;
  smslogshow:boolean=false;
  smsenabledisable:boolean=false;
  selecttwilo(event,id){
    if(event.target.checked){
      if(id==1){
        this.smsForm.get('viewsmslogcheck').setValue(false);
        this.smsForm.get('smsenableheck').setValue(false);
        this.smsForm.get('smschart').setValue(false);
      }else if(id==2){
        this.smsForm.get('accountsettingcheck').setValue(false);
        this.smsForm.get('smsenableheck').setValue(false);
        this.smsForm.get('smschart').setValue(false);
        this.smsservice.viewcompanysmslog(AppComponent.companyID).subscribe(data => {this.smslogdata=data}, 
          err => { console.log(err)});
        this.getbranchdetails();
      }
      else if(id==3){
        this.smsForm.get('accountsettingcheck').setValue(false);
        this.smsForm.get('viewsmslogcheck').setValue(false);
        this.smsForm.get('smschart').setValue(false);
        this.smsservice.smsenabledisable(AppComponent.companyID).subscribe(data => {this.smsenabledata(data)}, 
          err => { console.log(err)});
        this.smsservice.viewsmsdefaultforms().subscribe(data => {this.binddefaultsettings(data)}, 
          err => { console.log(err)});
      }  else if(id==4){
        this.smsForm.get('accountsettingcheck').setValue(false);
        this.smsForm.get('viewsmslogcheck').setValue(false);
        this.smsForm.get('smsenableheck').setValue(false);
        this.smsservice.getsmschartvalues(AppComponent.companyID).subscribe(data => {this.piechart(data)}, 
          err => { console.log(err)});
      
      }
      
    }else{
        this.smsForm.get('accountsettingcheck').setValue(false);
        this.smsForm.get('viewsmslogcheck').setValue(false);
        this.smsForm.get('smsenableheck').setValue(false);
        this.smsForm.get('smschart').setValue(false);
    }
  }

  getbranchdetails(){
    this.smsservice.getbranchlist(AppComponent.companyID).subscribe(data => {this.brancheslist=data;
      }, error => { 
      this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
    });
  }

  getshopdetails(){
    this.smsservice.getshoplist(AppComponent.companyID,this.smsForm.get('branchname').value).subscribe(data => {this.shoplist=data;
      }, error => { 
      this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
    });
  }

  shopwisesmslog(){
    this.smsservice.viewshopsmslog(AppComponent.companyID,this.smsForm.get('branchname').value,AppComponent.locRefName1,this.smsForm.get('shopname').value).subscribe(data => {this.smslogdata=data;
    }, error => { 
    this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
  });
  }


  //sms enable disable

  smsenabledata(data) {
    const control = <FormArray>this.smsForm.controls['smsenablearray'];
    control.controls = [];

    for (let i = 0; i < data.length; i++) {
      control.insert(0, this.formBuilder.group({
        statusid:[data[i][0],[]],
        formid:[data[i][1],[]],
        formname: [data[i][2], []],
        status: [data[i][3], []],
        companyid: [AppComponent.companyID, []],
        branchid: [AppComponent.branchID, []],
        locname: [AppComponent.locRefName1, []],
        locrefid: [AppComponent.locrefID1, []], 
      }));
    }

  }

  binddefaultsettings(data){
    const control = <FormArray>this.smsForm.controls['smsenablearraycreate'];
    control.controls=[];
    for (let i = 0; i < data.length; i++) {
      control.insert(0, this.formBuilder.group({
        statusid:[0,[]],
        formid:[data[i][0],[]],
        formname: [data[i][1], []],
        status: [0, []],
        companyid: [AppComponent.companyID, []],
        branchid: [AppComponent.branchID, []],
        locname: [AppComponent.locRefName1, []],
        locrefid: [AppComponent.locrefID1, []], 
      }));
    }
  }

  saveprocess:boolean=false;
  createsmsenabledisable(){
    
    const control = <FormArray>this.smsForm.controls['smsenablearraycreate'];
    if(control.length>0){
      this.saveprocess=true;
      this.smsservice.createsmsenabledisable(JSON.stringify(control.value)).subscribe(data => {
        if(data==true){
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Created Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
            this.smsForm.get('smsenableheck').setValue(false);
            this.smsForm.get('twilosmscheck').setValue(false);
            this.twilosms=false;
        }, 1000);
        }}, error => {
          this.saveprocess=false;
          let errmsg=error.message.split(" ")[0];
          if(errmsg=="Duplicate"){
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Data Already Created', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
            setTimeout(() => {
              this.smsForm.get('smsenableheck').setValue(false);
              this.smsForm.get('twilosmscheck').setValue(false);
              this.twilosms=false;
          }, 1000);
        } 
        //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
      });
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Data not Available', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
    }
    
  }

  savesmsenabledisable(){
      const control = <FormArray>this.smsForm.controls['smsenablearray'];
      let setdata = control.value
      let arrcopy = [];
      let validatearray=[];
      for(let i = 0; i < control.length; i++){
          if(setdata[i].status == true){
            setdata[i].status=1;
            validatearray.push(setdata[i]);
          } else if(setdata[i].status == false){
            setdata[i].status=0;
          }
          arrcopy.push(setdata[i]);
      }
      if(validatearray.length>0){
        this.saveprocess=true;
        this.smsservice.savesmsenabledisable(JSON.stringify(arrcopy)).subscribe(data => {
          if(data==true){
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Updated Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
            setTimeout(() => {
              this.smsForm.get('smsenableheck').setValue(false);
              this.smsForm.get('twilosmscheck').setValue(false);
              this.twilosms=false;
          }, 1000);
          }}, error => { 
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
        });
      }else{
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select or Enable Atleast One', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' }) 
      }
     
  }

    chartview:boolean=true;
    piechart(smsdata){
    // for Pie Chart 
    if(smsdata.length<=0){
      this.chartview=false;
    }else{
      this.chartview=true;
    }
    // for(let i=0;i<smsdata.length;i++){
    //  smsdata[i].pop();
    // }
      const transection = c3.generate({
      bindto: '#transection',
      data: {
          // iris data from R
          columns: smsdata,
          type: 'pie',
          onclick: function(d, j) { console.log('onclick', d, j); },
          onmouseover: function(d, j) { console.log('onmouseover', d, j); },
          onmouseout: function(d, j) { console.log('onmouseout', d, j); }
      },
      color: {
          pattern: ['#239a55', '#0073aa', '#f1c40f']
      },
    });
    }

}
