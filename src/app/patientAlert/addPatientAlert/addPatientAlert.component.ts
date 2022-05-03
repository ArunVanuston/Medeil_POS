import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { patientAlertService } from '../patientAlert.service';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import data_grid from 'devextreme/ui/data_grid';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-addPatientAlert',
  templateUrl: './addPatientAlert.component.html',
  providers: [patientAlertService, NotificationsComponent, dateFormatPipe]

})
export class addPatientAlertComponent implements OnInit {
  alertmsgs:any;
  parentMessage = "sales";
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  patientForm: FormGroup;
  submitted = false;
  companies = [];
  branches = [];
  shops = [];
  warehouse = [];
  hospital = [];
  patient = [];
  patinesinfo = [];
  emailflag: boolean = false;
  mobileflag: boolean = false;
  deviceObj;

  constructor(public translate: TranslateService,private appComponent: AppComponent, private dateformat: dateFormatPipe, private addPatientAlert: patientAlertService, private router: Router, formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) {
    translate.setDefaultLang('en');
    let companyrefid = new FormControl();
    let branchrefid = new FormControl();
    let storerefid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    let mobile = new FormControl('', [Validators.required]);
    let email = new FormControl('', [Validators.pattern(this.emailpattern)]);
    let patientid = new FormControl('', [Validators.required]);
    let message = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();




    this.patientForm = new FormGroup({
      companyrefid: companyrefid,
      branchrefid: branchrefid,
      storerefid: storerefid,
      locname: locname,
      locrefid: locrefid,
      patientid: patientid,
      mobile: mobile,
      email: email,
      clientcdate: clientcdate,
      createdby: createdby,
      message: message
    });


  }

  ngOnInit() {
    // this.patientForm.get('companyrefid').setValue('opt1');
    // this.patientForm.get('branchrefid').setValue('opt1');
    // this.patientForm.get('storerefid').setValue('opt1');
    this.translate.use(localStorage.getItem('language'));
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getCompany().subscribe(data => this.companies = data,
      err => {
        console.log('Error Occured ');
      });

      this.getFirmPatient();
      setTimeout(() => {
        let language='en';
        language=localStorage.getItem('language');
        this.addPatientAlert.GetAlerts(language).subscribe(data => this.alertmsgs = data,
          errorCode => console.log(errorCode));
      }, 1800);

  }



  //Get Branches by Company ID
  getBranche() {
    this.patientForm.get('branchrefid').setValue('opt1');
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getBranche(this.patientForm.get('companyrefid').value).subscribe(data => { this.branches = data },
      err => {
        console.log('Error Occured Get Company');
      });
  }

  //Get Shop & Warehouse & Hospital by Branch ID

  getFirm() {
    this.patientForm.get('storerefid').setValue('opt1');
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getShop(this.patientForm.get('branchrefid').value).subscribe(data => { this.shops = data },
      err => {
        console.log('Error Occured Get Shop');
      });

    this.addPatientAlert.getWareHouse(this.patientForm.get('branchrefid').value).subscribe(data => { this.warehouse = data },
      err => {
        console.log('Error Occured Get Warehouse');
      });

    this.addPatientAlert.getHospital(this.patientForm.get('branchrefid').value).subscribe(data => { this.hospital = data },
      err => {
        console.log('Error Occured Get Hospital');
      });

  }

  //Get Patient By Company ID

  getCompanyPatient() {
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getCompanyPatient(this.patientForm.get('companyrefid').value).subscribe(data => { this.patient = data },
      err => {
        console.log('Error Occured Get Company');
      });
  }


  //Get Patient By Branch ID

  getBranchPatient() {
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getBranchPatient(this.patientForm.get('companyrefid').value, this.patientForm.get('branchrefid').value).subscribe(data => { this.patient = data },
      err => {
        console.log('Error Occured Get Company');
      });
  }

  //Get Patient By Shop ID or Warehouse ID or Hospital ID

  getFirmPatient() {
      this.addPatientAlert.getFirmPatient(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1).subscribe(data => { this.patient = data },
        err => {
          console.log('Error Occured Get Company');
        });

    //let val = this.patientForm.get('storerefid').value;
    // if ("SHOP" == val.substring(0, 4)) {
    //   this.patientForm.get('locname').setValue('1');
    //   this.patientForm.get('locrefid').setValue(val.substring(4));
    //   this.addPatientAlert.getFirmPatient(this.patientForm.get('companyrefid').value, this.patientForm.get('branchrefid').value, this.patientForm.get('locname').value).subscribe(data => { this.patient = data },
    //     err => {
    //       console.log('Error Occured Get Company');
    //     });
    // }
    // if ("WARE" == val.substring(0, 4)) {
    //   this.patientForm.get('locname').setValue('2');
    //   this.patientForm.get('locrefid').setValue(val.substring(4));
    //   this.addPatientAlert.getFirmPatient(this.patientForm.get('companyrefid').value, this.patientForm.get('branchrefid').value, this.patientForm.get('locname').value).subscribe(data => { this.patient = data },
    //     err => {
    //       console.log('Error Occured Get Company');
    //     });

    // }
    // if ("HOSP" == val.substring(0, 4)) {
    //   this.patientForm.get('locname').setValue('3');
    //   this.patientForm.get('locrefid').setValue(val.substring(4));
    //   this.addPatientAlert.getFirmPatient(this.patientForm.get('companyrefid').value, this.patientForm.get('branchrefid').value, this.patientForm.get('locname').value).subscribe(data => { this.patient = data },
    //     err => {
    //       console.log('Error Occured Get Company');
    //     });
    // }
  }



  getPatientInfo() {
    this.addPatientAlert.getPatientInfo(this.patientForm.get('patientid').value).subscribe(data => {
      this.patinesinfo = data,
        this.patientForm.get('mobile').setValue(data[0][0]),
        this.patientForm.get('email').setValue(data[0][1])
    },

      err => {
        console.log('Error Occured Get Company');
      });
  }


  checkemail(e) {
    if (e.target.checked) {
      this.emailflag = true;
    } else {
      alert("falsecalling");
      this.emailflag = false;
      console.log("unchecked");
    }
  }



  checkmobile(e) {
    if (e.target.checked) {
      this.mobileflag = true;
      console.log("This is checked")
    } else {
      this.mobileflag = false;
      console.log("unchecked");
    }
  }

  justInitiate() {
    this.deviceObj = {
      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      ipaddress: this.appComponent.ipAddress,
      browsertype: this.appComponent.browser,
      ostype: this.appComponent.os,
      osversion: this.appComponent.osversion,
      devicetype: this.appComponent.devicetype,
      apiname: '',
      description: '',
      clientcdate: this.dateformat.transform04()

    };
    this.justInitiate();
    this.deviceObj.apiname = "api/savePatient";
    this.deviceObj.description = "Patient Created";
    this.addPatientAlert.deviceDetails(JSON.stringify(this.deviceObj))
    .subscribe(data => { },
      errorCode => console.log(errorCode));
  }

  sendmail(){
      this.addPatientAlert.sendMessageByMail(this.patientForm.get('email').value, this.patientForm.get('message').value).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'SUCCESS MESSAGE', msg: this.alertmsgs.hospital.messagesentsuccessfully, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          return true;
        } else {
          this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: this.alertmsgs.hospital.messagenotsent, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          return true;
        }
      });
  }

  sendmobile(){
  //  this.addPatientAlert.sendMessageByMail(this.patientForm.get('email').value,this.patientForm.get('message').value).subscribe(data=>{
      //    if(data==true){
      //      return true;
      //    }
      //  });
  }


  validation(): boolean {
    let msg=this.patientForm.get('message').value;
    if (this.emailflag == false && this.mobileflag == false) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: this.alertmsgs.hospital.selectrequiredoptionstosendmessage, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else  if (msg == '' || msg == null || msg == undefined) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: this.alertmsgs.hospital.enteramessage, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }
    return true;
  }

  onSubmit() {
    let flag = this.validation();
    if (flag == true) {
      this.patientForm.get('clientcdate').setValue(AppComponent.date);
      this.patientForm.get('createdby').setValue(sessionStorage.getItem('indvuserid'));
      this.patientForm.get('companyrefid').setValue(AppComponent.companyID);
      this.patientForm.get('branchrefid').setValue(AppComponent.branchID);
      this.patientForm.get('locname').setValue(AppComponent.locRefName1);
      this.patientForm.get('locrefid').setValue(AppComponent.locrefID1);
      if(this.emailflag==true){
        this.sendmail();
      }else if(this.mobileflag==true){
        this.sendmobile();
      }
      this.addPatientAlert.createMessage(JSON.stringify(this.patientForm.value)).subscribe(data => {alert("res"+data);
        if (data) {
          this.notificationsComponent.addToast({ title: 'SUCCESS MESSAGE', msg: this.alertmsgs.hospital.savedsuccessfully, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          this.patientForm.reset();
          this.ngOnInit();
        }

      });

    }
  }






}
