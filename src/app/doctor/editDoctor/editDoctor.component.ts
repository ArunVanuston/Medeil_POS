import { DoctorService } from '../doctor.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { TranslateService } from 'ng2-translate';

@Component({
  /**@Author Ajith Kumar**/
  selector: 'editDoctor',
  templateUrl: './editDoctor.component.html',
  styleUrls: ['./editDoctor.component.css'],
  providers: [NotificationsComponent, dateFormatPipe]
})
export class editDoctorComponent implements OnInit {
  alertmsgs:any;
  parentMessage = "sales";
  did: any;
  doctorForm: FormGroup;
  state = [];
  country = [];
  city = [];
  countrycode = [];
  public reFlag: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  deviceObj;
  
  constructor(public translate: TranslateService,private doctorService: DoctorService, private router: Router, private route: ActivatedRoute, private appComponent : AppComponent, private dateformat:dateFormatPipe,
    private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) { translate.setDefaultLang('en');
    this.doctorForm = this.formBuilder.group({
      id: [, []],
      title: [, []],
      doctorname: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      registrationno: [, []],
      gender: [, []],
      docdob: [, []],
      docaddress1: ['', [Validators.required]],
      docaddress2: [, []],

      country: [0, []],
      state: [0, []],
      city: [0, []],
      pincode: [, []],
      countrycode: [, []],
      mobile: ['', [Validators.required]],
      phone: [, []],
      email: [, [Validators.pattern(this.emailPattern)]],
      website: [, []],
      aadhaarcardno: [, []],
      language: [, [Validators.pattern("[a-zA-Z ,]*")]],
      experience: [, []],
      workhour: [, []],
      clientcdate: [, []],
      companyrefid: [, []],
      branchrefid: [, []],
      locrefid: [, []],
    });
  }
  ngOnInit() {

    this.translate.use(localStorage.getItem('language'));
    this.did = this.route.snapshot.paramMap.get('id');

    this.doctorService.editDoctorinfo(this.did).subscribe(data => this.doctorForm.patchValue(data),
      err => {
        console.log('Error Occured on editDoctorinfo()');
      }
    );
    this.doctorService.getcountry().then(data => this.country = data);

    // Get Edit State 
    this.doctorService.getEditStates(this.did).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });

    //Get Country Code    
    this.doctorService.getCcode(this.did).subscribe(data => this.countrycode = data,
      err => {
        console.log('Error Occured Get Country Code');
      });

    //Get City    
    this.doctorService.geteditCity(this.did).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });

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
      this.doctorService.updateDoctor(this.doctorForm.value).subscribe(
        data => {
          if (data == true) {
            this.justInitiate();
      
            this.deviceObj.apiname = "api/updateDoctor";
            this.deviceObj.description = "Doctor updated";
          
            this.doctorService.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
              errorCode => console.log(errorCode));
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: this.alertmsgs.common.dataupdatedsuccesfully, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
            setTimeout(() => {
              this.router.navigate(['DoctorRegistration/ViewDoctor']);
            }, 2000);
            
          }
          else {
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
        }
      );;
    }
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
    }
    return true;
    // else if (this.doctorForm.get('gender').value == '' || this.doctorForm.get('gender').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Gender must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
  }


  getState() {
    this.doctorService.getStates(this.doctorForm.get('country').value).subscribe(data => this.state = data,
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
}

