import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { emailService } from './emailsettings.service';
import { TranslateService } from 'ng2-translate';   

@Component({
  selector: 'app-emailsettings',
  templateUrl: './emailsettings.component.html',
  styleUrls: ['./emailsettings.component.css'],
  providers:[emailService]
})
export class EmailsettingsComponent implements OnInit {
  emailForm: FormGroup;
  parentMessage="sales";
  constructor(public translate: TranslateService,private formBuilder: FormBuilder,private emailservice:emailService, private notificationsComponent: NotificationsComponent) {translate.setDefaultLang('en'); }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.emailForm = this.formBuilder.group({

      //for checkbox enable disable
      viewemaillogcheck:[false,[]],
      emailenablecheck:[false,[]],
      emailchartcheck:[false,[]],

      //For GET Branch & shop details under company
      branchname:['opt1',[]],
      shopname:['opt1',[]],

      //for formwise checkbox enable disable
      twilosmscheck:[false,[]],
      othersmscheck:[false,[]],
      freesmscheck:[false,[]],
    
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
          
      emailenablearray: this.formBuilder.array([]),
      emailenablearraycreate: this.formBuilder.array([]),
    });

  }

  selectemailprocess(event,selid){
      if(event.target.checked){
        if(selid==1){
          this.emailForm.get('viewemaillogcheck').setValue(false);
          //this.emailForm.get('emailchartcheck').setValue(false);
          this.emailservice.viewemailenabledisable(AppComponent.companyID).subscribe(data => {this.emailenabledata(data)}, 
          err => { console.log(err)});
          this.emailservice.viewemaildefaultforms().subscribe(data => {this.binddefaultsettings(data)}, 
          err => { console.log(err)});
        }else if(selid==2){
          this.emailForm.get('emailenablecheck').setValue(false);
          //this.emailForm.get('emailchartcheck').setValue(false);
          // this.smsservice.viewcompanysmslog(AppComponent.companyID).subscribe(data => {this.smslogdata=data}, 
          //   err => { console.log(err)});
        }else{
          this.emailForm.get('emailenablecheck').setValue(false);
          this.emailForm.get('viewemaillogcheck').setValue(false);
          //this.emailForm.get('emailchartcheck').setValue(false);
        }
      }
  }

   //sms enable disable
   emailenabledata(data) {
    const control = <FormArray>this.emailForm.controls['emailenablearray'];
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

  saveprocess:boolean=false;
  updateemailenabledisable(){
    const control = <FormArray>this.emailForm.controls['emailenablearray'];
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
      this.emailservice.updateemailenabledisable(JSON.stringify(arrcopy)).subscribe(data => {
        if(data==true){
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Updated Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
            this.emailForm.get('emailenablecheck').setValue(false);
            this.emailForm.get('viewemaillogcheck').setValue(false);
        }, 1000);
        }}, error => { 
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
      });
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select or Enable Atleast One', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' }) 
    }
   
  }

  //first time creation process
  binddefaultsettings(data){
    const control = <FormArray>this.emailForm.controls['emailenablearraycreate'];
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

  createemailenabledisable(){
    const control = <FormArray>this.emailForm.controls['emailenablearraycreate'];
    if(control.length>0){
      this.saveprocess=true;
      this.emailservice.createemailenabledisable(JSON.stringify(control.value)).subscribe(data => {
        if(data==true){
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Created Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
            this.emailForm.get('emailenablecheck').setValue(false);
            this.emailForm.get('viewemaillogcheck').setValue(false);
        }, 1000);
        }}, error => {
          this.saveprocess=false;
          let errmsg=error.message.split(" ")[0];
          if(errmsg=="Duplicate"){
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Data Already Created', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
            setTimeout(() => {
              this.emailForm.get('emailenablecheck').setValue(false);
              this.emailForm.get('viewemaillogcheck').setValue(false);
          }, 1000);
        } 
        //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
      });
    }else{
      this.notificationsComponent.addToast({ title: 'Error MSG', msg:'Data not Available', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
    }
  }

}
