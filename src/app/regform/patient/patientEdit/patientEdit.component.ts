import { PatientEditService } from './patientEdit.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppComponent } from '../../../app.component';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
@Component({
  selector: 'app-patientedit',
  templateUrl: './patientEdit.component.html',
  providers: [PatientEditService, NotificationsComponent, dateFormatPipe]
})
export class PatientEditComponent implements OnInit {
  email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  private sub: any;
  registerForm: FormGroup;
  id: number;
  countries: any;
  states = [];
  cities = [];
  selobj;
  deviceObj;
  constructor(private userService: PatientEditService, private dateformat:dateFormatPipe, private appComponent: AppComponent, private router: Router,private formBuilder: FormBuilder, private route: ActivatedRoute, private notificationsComponent: NotificationsComponent) { }
  ngOnInit() {
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.registerForm = this.formBuilder.group({
      id: ['', []],
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
      companyid: ['', []],
      createdby: [this.selobj.userid, []],
      clientcdate: ['', []],
      clientmdate: ['', []],
      modifiedby: ['', []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
    });
    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var custedit={patientid:this.id}
    this.userService.viewPatientEdit(JSON.stringify(frmdata)).subscribe(data => this.registerForm.patchValue(data),
      errorCode => console.log(errorCode));
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));
      this.userService.getcuststateedit(JSON.stringify(custedit)).subscribe(data =>{ this.states = data, this.viewState()},
      errorCode => console.log(errorCode)  );
      this.userService.getcustcityedit(JSON.stringify(custedit)).subscribe(data =>{ this.cities = data, this.viewCity()},
      errorCode => console.log(errorCode)  );
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
   // var answer = confirm("Save data?");
   
      this.registerForm.get('clientmdate').setValue(AppComponent.date);
      this.registerForm.get('modifiedby').setValue(AppComponent.userID);

      this.userService.savePatient(JSON.stringify(this.registerForm.value)).subscribe(data => { 
        this.savevalid(data) },
        errorCode => console.log(errorCode));
      
        setTimeout(() => {
          this.router.navigate(['Patient/ViewPatient']);
        }, 2000);
    
  }

 

  savevalid(data: any) {
    if (data==1) {

      this.justInitiate();
      this.deviceObj.apiname = "api/patient/savePatient";
      this.deviceObj.description = "Patient Created";

      this.userService.deviceDetails(JSON.stringify(this.deviceObj))
        .subscribe(data => { },
          errorCode => console.log(errorCode));




      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
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
  deletePatient() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var answer = confirm("Delete data?");
    if (answer) {
      this.userService.deletePatient(JSON.stringify(frmdata)).subscribe(data => { this.router.navigate(['/Patient/ViewPatient']) },
        errorCode => console.log(errorCode));
        setTimeout(() => {
          this.router.navigate(['Patient/ViewPatient']);
        }, 2000);
    }
  }
 Back(){
  setTimeout(() => {
    this.router.navigate(['Patient/ViewPatient']);
  }, 2000);

 }
  clear() {
    this.ngOnInit();
  }
}
