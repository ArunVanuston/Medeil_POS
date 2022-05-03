import { DataHospitalform } from '../data.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component'; 
import { TranslateService } from 'ng2-translate';  
@Component({
  /**@Author Ajith Kumar**/
  selector: 'app-create-hospital',
  templateUrl: './create-hospital.component.html',
  providers: [NotificationsComponent, AppComponent]
})
export class CreateHospitalComponent implements OnInit {
  parentMessage = "sales"
  hospitalForm: any;
  country = [];
  state = [];
  city = [];
  countrycode = [];
  speciality = [];
  submitted = false;
  public reFlag: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  shopregex = "^$|^[A-Za-z0-9]+";
  constructor(public translate: TranslateService,private hospitalService: DataHospitalform, private fb: FormBuilder,
    private notificationsComponent: NotificationsComponent, private router: Router, private appComponent: AppComponent) {translate.setDefaultLang('en');
    this.hospitalForm = this.fb.group({
      hospitalname: ['', [Validators.required]],
      registrationno: ['', [Validators.required,Validators.pattern(this.shopregex)]],
      specialityid: [0, []],
      hosheadquarters: ['',  [Validators.required]],
      // [ Validators.pattern("^[A-Za-z]*$")]],
      hosaddress1: ['', [Validators.required]],
      hosaddress2: ['', []],
      hospincode: ['', []],
      countryid: [0, []],
      stateid: [0, []],
      city: [0, []],
      countrycode: ['', []],
      phoneno: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      helpline: ['', [Validators.pattern("^[0-9]*$")]],
      email: ['',  [Validators.required,Validators.pattern(this.emailPattern)]],
      // email: ['', [Validators.pattern(this.emailPattern)]],
      status: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      createdby : ['', []],
      clientcdate: ['', []],
      registerflag: ['', []],
    });
  }

  get f(){
    return this.hospitalForm.controls; 
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    //**To set  Values on place Holder**//
    this.hospitalForm.get('countryid').setValue("0");
    this.hospitalForm.get('stateid').setValue("0");
    this.hospitalForm.get('city').setValue("0");
    this.hospitalForm.get('countrycode').setValue("0");
    this.hospitalForm.get('specialityid').setValue("0");
    this.hospitalForm.get('status').setValue("0");

    this.hospitalForm.get('companyrefid').setValue(AppComponent.companyID);
    this.hospitalForm.get('branchrefid').setValue(AppComponent.branchID);
    this.hospitalForm.get('locname').setValue(AppComponent.locRefName1);
    this.hospitalForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.hospitalForm.get('registerflag').setValue("0");

    this.hospitalService.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error Occured getCountry()');
      });

    this.hospitalService.getSpeciality().subscribe(data => this.speciality = data,
      err => {
        console.log('Error Occured getSpeciality()');
      });

  }


  getState() {
    this.hospitalService.getStates(this.hospitalForm.get('countryid').value).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });

    this.hospitalService.getCountrycode(this.hospitalForm.get('countryid').value).subscribe(data => {
      this.countrycode = data,
        this.hospitalForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Country Code');
      });
  }

  getCity() {
    this.hospitalService.getCity(this.hospitalForm.get('stateid').value).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  hospitalValidation(): boolean {
    let hname=this.hospitalForm.get('hospitalname').value;
    let address1=this.hospitalForm.get('hosaddress1').value;
    let address2=this.hospitalForm.get('hosaddress2').value;
    let regno=this.hospitalForm.get('registrationno').value;
    let helpno=this.hospitalForm.get('helpline').value;
    if (this.hospitalForm.get('hospitalname').value == '' || this.hospitalForm.get('hospitalname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Hospital Name must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (hname.toString().length > 40) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Hospital Name Maximum 40 Charcaters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.hospitalForm.get('registrationno').value == '' || this.hospitalForm.get('registrationno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Register Number must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (regno.toString().length > 20) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Register Number Maximum 20 Charcaters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.hospitalForm.get('hosaddress1').value == '' || this.hospitalForm.get('hosaddress1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Address1 must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (address1.toString().length > 200) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Address1 MAximum 200 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (address2 != null && address2.toString().length > 150) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Address2 MAximum 150 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.hospitalForm.get('countryid').value == '0' || this.hospitalForm.get('countryid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Country must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.hospitalForm.get('stateid').value == '0' || this.hospitalForm.get('stateid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'State must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.hospitalForm.get('city').value == '0' || this.hospitalForm.get('city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'City must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.hospitalForm.get('phoneno').value == '' || this.hospitalForm.get('phoneno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Phone Number must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (helpno != null && helpno.toString().length > 15) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Help Line Number Maximum 15 Charcters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.hospitalForm.get('hosheadquarters').value == '' || this.hospitalForm.get('hosheadquarters').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Headquatars must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.hospitalForm.get('email').value == '' || this.hospitalForm.get('email').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Email must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // else if (this.hospitalForm.get('email').value == '' || this.hospitalForm.get('email').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Email must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }else if (this.hospitalForm.get('specialityid').value == '0' || this.hospitalForm.get('specialityid').value == '' || this.hospitalForm.get('specialityid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Speciality must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    return true;
  }

  maxMobLength() {
    let phoneno = this.hospitalForm.get('phoneno').value;
    console.log(phoneno.length + " " + this.hospitalForm.get('phoneno').value + " " + phoneno);
    if (parseInt(phoneno.length) > 14 && parseInt(phoneno.length) < 16) {
      if (phoneno.length == 15)
        this.notificationsComponent.addToast({ title: 'Error', msg: 'You can type only 15 Numbers....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }


  maxPinCodeLength(){
    let hospincode = this.hospitalForm.get('hospincode').value;
    console.log(hospincode.length + " " + this.hospitalForm.get('hospincode').value + " " + hospincode);
    if (parseInt(hospincode.length) > 9 && parseInt(hospincode.length) < 11) {
      if (hospincode.length == 10)
        this.notificationsComponent.addToast({ title: 'Error', msg: 'You can type only 10 Numbers....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  saveprocess:boolean=false;
  onSubmit(): any {
    this.submitted = true;
    let reFlag = this.hospitalValidation();
    if (reFlag == true) {
      this.saveprocess=true;
      this.appComponent.getDate();
      this.hospitalForm.get('clientcdate').setValue(AppComponent.date);
      this.hospitalForm.get('createdby').setValue(AppComponent.userID);
      this.hospitalService.createHospital(JSON.stringify(this.hospitalForm.value)).subscribe(data => {
        if (data == true) {
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA SAVED SUCCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
            this.router.navigate(['/HospitalRegistration/ViewHospital']);
          }, 2000);
        }else{
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'DATA Not SAVED!.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        }
      },
        err => {
          console.log('Error Occured on createHospital()');
        }
      );
    }
  }

}
