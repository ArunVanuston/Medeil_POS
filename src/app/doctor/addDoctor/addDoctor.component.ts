import { DoctorService } from '../doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { TranslateService } from 'ng2-translate';

@Component({
  /**@Author Ajith Kumar**/
  selector: 'app-addDoctor',
  templateUrl: './addDoctor.component.html',
  styleUrls: ['./addDoctor.component.css'],
  providers: [NotificationsComponent, dateFormatPipe]
})
export class DoctorregistrationComponent implements OnInit {
  alertmsgs:any;
  parentMessage = "sales";
  doctorForm: FormGroup;
  statelist = [];
  country = [];
  city = [];
  countrycode = [];
  public reFlag: boolean = false;
  textnumbers = '^[0-9]+([0-9]{1,2})?$';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobPattern = '^[0-9]+(\.[0-9]{1,2})?$';
  websitepattern ="^((http|https|ftp):\/\/(www\.)?|www\.)[a-zA-Z0-9\_\-]+\.([a-zA-Z]{2,4}|[a-zA-Z]{2}\.[a-zA-Z]{2})(\/[a-zA-Z0-9\-\._\?\&=,'\+%\$#~]*)*$";
  deviceObj: any;
  docname: any=[];
  constructor(public translate: TranslateService,private doctorService: DoctorService, private router: Router, private dateformat: dateFormatPipe, private appComponent: AppComponent, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) { translate.setDefaultLang('en');
    this.doctorForm = this.formBuilder.group({
      title: [, []],
      doctorname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      registrationno: [, [Validators.pattern("^[a-zA-Z0-9]*$")]],
      gender: [, []],
      docdob: [, []],
      docaddress1: ['', [Validators.required]],
      docaddress2: ['', [Validators.required]],
      country: [, []],
      state: [, []],
      city: [, []],
      pincode: [, []],
      countrycode: [, []],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      phone: ['', [ Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.pattern(this.emailPattern)]],
      website: ['', [Validators.pattern(this.websitepattern)]],
      aadhaarcardno: [, []],
      language: ['', [Validators.pattern("[a-zA-Z ,]*")]],
      experience: [, []],
      workhour: [, []],
      clientcdate: [, []],
      companyrefid: [, []],
      branchrefid: [, []],
      locrefid: [, []],
      locname: [, []],
    });
  }

  get f(){
    return this.doctorForm.controls;
  }

  ngOnInit() {
    //To set All the PlaceHolder Name in DropDown//
    this.translate.use(localStorage.getItem('language'));
    this.doctorForm.get('title').setValue('Dr');
    this.doctorForm.get('country').setValue('0');
    this.doctorForm.get('state').setValue('0');
    this.doctorForm.get('countrycode').setValue('0');
    this.doctorForm.get('city').setValue('0');

    this.doctorForm.get('companyrefid').setValue(AppComponent.companyID);
    this.doctorForm.get('branchrefid').setValue(AppComponent.branchID);
    this.doctorForm.get('locname').setValue(AppComponent.locRefName1);
    this.doctorForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.doctorService.getcountry().then(data => this.country = data);

    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.doctorService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
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
    }

  }

  saveprocess:boolean=false;
  onSubmit() {
    this.reFlag = this.doctorValidation();
    if (this.reFlag == true) {
      this.saveprocess=true;
      this.doctorForm.get('clientcdate').setValue(AppComponent.date);
      this.doctorService.createDoctor(this.doctorForm.value).subscribe(
        data => {
          if (data == true) {
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 1500, theme: 'default', position: 'bottom-right', type: 'success' });
            this.justInitiate();
            this.deviceObj.apiname = "api/saveDoctor";
            this.deviceObj.description = "Doctor Created";
            this.doctorService.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
              errorCode => console.log(errorCode));
            setTimeout(() => {
              this.router.navigate(['DoctorRegistration/ViewDoctor']);
            }, 2000);
          }
          else {
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
        }
      );
    }
  }

  view(): void {
    this.router.navigate(['DoctorRegistration/ViewDoctor']);
  }

  doctorValidation(): boolean {
    let docname=this.doctorForm.get('doctorname').value;
    let address1=this.doctorForm.get('docaddress1').value;
    let address2=this.doctorForm.get('docaddress2').value;
    if (this.doctorForm.get('doctorname').value == '' || this.doctorForm.get('doctorname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.doctornamemustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (docname.toString().length > 30) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.doctornamemaximum30charcters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('registrationno').value == '' || this.doctorForm.get('registrationno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.prcregisternumbermustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('docaddress1').value == '' || this.doctorForm.get('docaddress1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.addressmustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (address1.toString().length > 200) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.address1maximum200characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (address2 != null && address2.toString().length > 150) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.address2maximum150characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('country').value == '0' || this.doctorForm.get('country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.countrymustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('state').value == '0' || this.doctorForm.get('state').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.statemustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('city').value == '0' || this.doctorForm.get('city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.citymustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('mobile').value == '' || this.doctorForm.get('mobile').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.phonenumbermustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('email').value == '' || this.doctorForm.get('email').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.emailmustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('experience').value == '' || this.doctorForm.get('experience').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.experiencemustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.doctorForm.get('docaddress2').value == '' || this.doctorForm.get('docaddress2').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.Addressline2mustnotbeempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
    // else if (this.doctorForm.get('gender').value == '' || this.doctorForm.get('gender').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Gender must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
  }


  maxMobLength() {
    let mobile = this.doctorForm.get('mobile').value;
    console.log(mobile.length + " " + this.doctorForm.get('mobile').value + " " + mobile);
    if (parseInt(mobile.length) > 14 && parseInt(mobile.length) < 16) {
      if (mobile.length == 15)
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.youcantypeonly15numbers, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  maxPhnLength(){
    let phone = this.doctorForm.get('phone').value;
    console.log(phone.length + " " + this.doctorForm.get('phone').value + " " + phone);
    if (parseInt(phone.length) > 14 && parseInt(phone.length) < 16) {
      if (phone.length == 15)
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.youcantypeonly15numbers, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  maxPinCodeLength(){
    let pincode = this.doctorForm.get('pincode').value;
    console.log(pincode.length + " " + this.doctorForm.get('pincode').value + " " + pincode);
    if (parseInt(pincode.length) > 9 && parseInt(pincode.length) < 11) {
      if (pincode.length == 10)
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.doctor.youcantypeonly10numbers, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  

  getState() {
    this.doctorService.getStates(this.doctorForm.get('country').value).subscribe(data => this.statelist = data,
      err => {
        console.log('Error Occured Get States');
      });

    this.doctorService.getCountrycode(this.doctorForm.get('country').value).subscribe(data => {
      this.countrycode = data,
        this.doctorForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Country Code');
      });
  }

  getCity() {
    this.doctorService.getCity(this.doctorForm.get('state').value).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }



  searchdoct(doct:any){
    if(doct.length){
      this.doctorService.searchdoctor(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,doct).subscribe(data =>{
        if(data){
          this.docname =data;
        }else{
          this.docname.length=0;
        }
      },err=>{console.log(err)});
    }else{
      this.docname.length=0;
    }
  }
}
