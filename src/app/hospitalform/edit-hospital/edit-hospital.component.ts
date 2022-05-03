import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { DataHospitalform } from '../data.service';
import { AppComponent } from '../../app.component';
import { TranslateService } from 'ng2-translate'; 
@Component({
  selector: 'edit-hospital',
  templateUrl: './edit-hospital.component.html',
  providers: [NotificationsComponent]
})
export class editHospitalComponent implements OnInit {
  hid: any;
  hospitalForm: any;
  country = [];
  state = [];
  city = [];
  countrycode = [];
  speciality = [];
  submitted = false;
  public reFlag: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public translate: TranslateService,private hospitalService: DataHospitalform, private route: ActivatedRoute, private fb: FormBuilder,
    private notificationsComponent: NotificationsComponent, private router: Router) { translate.setDefaultLang('en');
    this.hospitalForm = this.fb.group({
      id: ['', []],
      hospitalname: ['', []],
      registrationno: ['', []],
      specialityid: [0, []],
      hosheadquarters: ['', [Validators.required]],
      hosaddress1: ['', []],
      hosaddress2: ['', []],
      hospincode: ['', []],
      countryid: [0, []],
      stateid: [0, []],
      city: [0, []],
      countrycode: ['', []],
      phoneno: ['', []],
      helpline: ['', []],
      email: ['', [Validators.required]],
      status: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      clientcdate: ['', []],
      createdby : ['', []],
      clientmdate : ['', []],
      modifiedby : ['', []],
      registerflag: ['', []],
    });

  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.hid = this.route.snapshot.paramMap.get('id');

    this.hospitalService.getEdithospital(this.hid).subscribe(data => { this.hospitalForm.patchValue(data) },
      err => {
        console.log('Error occured on getEdithospital()');
      });

    this.hospitalService.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error Occured Edit Hospital getCountry()');
      });

    this.hospitalService.getSpeciality().subscribe(data => this.speciality = data,
      err => {
        console.log('Error Occured Edit Hospital getSpeciality()');
      });

    // Get Edit State 
    this.hospitalService.getEditStates(this.hid).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });

    //Get Country Code    
    this.hospitalService.getCcode(this.hid).subscribe(data => this.countrycode = data,
      err => {
        console.log('Error Occured Get Country Code');
      });

    //Get City    
    this.hospitalService.geteditCity(this.hid).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  getState() {
    this.hospitalService.getStates(this.hospitalForm.get('countryid').value).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Edit Hospital  GetStates()');
      });

    this.hospitalService.getCountrycode(this.hospitalForm.get('countryid').value).subscribe(data => {
      this.countrycode = data,
        this.hospitalForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Edit Hospital CountryCode()');
      });
  }

  getCity() {
    this.hospitalService.getCity(this.hospitalForm.get('stateid').value).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Edit Hospital GetCity()');
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
    }
     else if (this.hospitalForm.get('email').value == '' || this.hospitalForm.get('email').value == null) {
     this.notificationsComponent.addToast({ title: 'Error', msg: 'Email must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
       return false;
     }
     else if (this.hospitalForm.get('hosheadquarters').value == '' || this.hospitalForm.get('hosheadquarters').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Email must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
    // }else if (this.hospitalForm.get('specialityid').value == '' || this.hospitalForm.get('specialityid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Speciality must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    return true;
  }
  
  saveprocess:boolean=false;
  onSubmit(): any {
    this.submitted = true;
    this.reFlag = this.hospitalValidation();
    if (this.reFlag == true) {
      this.saveprocess=true;
      this.hospitalForm.get('clientcdate').setValue(AppComponent.date);
      this.hospitalForm.get('clientmdate').setValue(AppComponent.date);
      this.hospitalForm.get('modifiedby').setValue(AppComponent.userID);

      this.hospitalService.updateHospital(JSON.stringify(this.hospitalForm.value)).subscribe(data => {
        if (data == true) {
          // this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Hospital Updated Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          // this.hospitalForm.reset();
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'SUCCESS MESSAGE', msg: 'DATA UPDATED SUCCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
            this.router.navigate(['HospitalRegistration/ViewHospital']);
          }, 2000);
        }else{
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Error MESSAGE', msg: 'DATA Not UPDATED.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        }
      },
        err => {
          console.log('Error Occured on updateHospital()');
        }
      );
    }
  }
}
