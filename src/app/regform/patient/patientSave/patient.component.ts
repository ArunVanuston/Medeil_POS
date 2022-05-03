
import { PatientService } from './patient.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { CustomValidators } from 'ng2-validation';


import { NotificationsComponent } from '../../../notifications/notifications.component';

import { dateFormatPipe } from '../../../notifications/notifications.datepipe';



import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  providers: [PatientService, NotificationsComponent, dateFormatPipe]

})
export class PatientComponent implements OnInit {
  email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  registerForm: FormGroup;

  countries = [];

  states = [];

  cities = [];

  i;

  selobj;
  deviceObj;

  constructor(private formBuilder: FormBuilder, private appComponent: AppComponent, private router: Router, private dateformat: dateFormatPipe, private userService: PatientService, private notificationsComponent: NotificationsComponent) { }


  ngOnInit() {






    var date = this.dateformat.transformnew(Date.now());



    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };



    this.registerForm = this.formBuilder.group({
      ptid: ['', []],
      hospitalid: ['', []],
      patientcode: ['', []],
      patienttitle: ['', []],
      patientfirstname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      patientlastname: ['', [Validators.pattern("[a-zA-Z ]*")]],
      gender: ['', []],
      maritalstatus: ['', []],
      dob: ['', [CustomValidators.date]],
      patienttype: ['', []],
      address1: ['', [Validators.required]],
      address2: ['', []],
      country: ['', []],
      state: ['', []],
      city: ['', []],
      pincode: ['', []],
      countrycode: ['', []],
      mobile: ['', [Validators.required]],
      phone: ['', []],
      email: ['', [Validators.pattern(this.email)]],
      aadhaarcardno: ['', []],
      language: ['', []],
      description: ['', []],
      ipaddress: ['', []],
      latitude: ['', []],
      longitude: ['', []],
      status:[1,[]],
      companyid: ['', []],
      clientcdate: ['', []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
    });



    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));




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

  }

  onSubmit() {



    this.registerForm.get('clientcdate').setValue(AppComponent.date);
    this.userService.savePatient(JSON.stringify(this.registerForm.value)).subscribe(data => {
      this.savevalid(data)
    },

      errorCode => console.log(errorCode));
    setTimeout(() => {
      this.router.navigate(['Patient/ViewPatient']);
    }, 2000);



  }

  savevalid(data: any) {
    if (data == 1) {
      this.justInitiate();
      this.deviceObj.apiname = "api/patient/savePatient";
      this.deviceObj.description = "Patient Created";

      this.userService.deviceDetails(JSON.stringify(this.deviceObj))
        .subscribe(data => { },
          errorCode => console.log(errorCode));






      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clear();

    } else {

      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }

  viewState() {

    var frmdata = { frmint1: this.registerForm.get('country').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewState(JSON.stringify(frmdata)).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));

  }


  viewCity() {

    this.cities = [];

    var frmdata = { frmint1: this.registerForm.get('state').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCity(JSON.stringify(frmdata)).subscribe(data => this.cities = data,
      errorCode => console.log(errorCode));


  }




  clear() {

    this.ngOnInit();
  }


  addrelatives(){
  
    this.router.navigate(['/PatientRelatives/AddRelatives']);
  }






}
