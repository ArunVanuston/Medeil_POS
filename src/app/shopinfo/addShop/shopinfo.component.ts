import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { shopService } from './shopinfo.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
@Component({
  /**@Author Ajith Kumar**/
  selector: 'app-shopinfo',
  templateUrl: './shopinfo.component.html',
  styleUrls: ['./shopinfo.component.css'],
  providers: [shopService, NotificationsComponent,dateFormatPipe ]
})

export class shopinfoComponent implements OnInit {
  alertmsgs:any;
  parentMessage = "sales";
  myForm: FormGroup;
  submitted = false;
  companyrefid1 = [];
  branchrefid1 = [];
  countries = [];
  states = [];
  cities = [];
  states1 = [];
  cities1 = [];

  deviceObj;
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  emailPattern ="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private shopinfo: shopService, private appComponent:AppComponent, private dateformat: dateFormatPipe, private router: Router, private notificationsComponent: NotificationsComponent) {
   
    let shopname = new FormControl('',[Validators.required,Validators.pattern(this.textPattern)]);
    let ownername = new FormControl('',[Validators.required,Validators.pattern(this.textPattern)]);
    let license = new FormControl('',[Validators.required]);
    let dlNumber = new FormControl();
    let gst = new FormControl();
    let tin = new FormControl('',[Validators.required]);
    let cstNumber = new FormControl();
    let pan = new FormControl();
    let registrationNumber = new FormControl('',[Validators.required]);
    let address = new FormControl('',[Validators.required]);
    let state = new FormControl();
    let country = new FormControl();
    let city = new FormControl();
    let pincode = new FormControl('',[Validators.required]);
    let phonenumber = new FormControl('', [Validators.pattern(this.textnumbers)]);
    let email = new FormControl('', [Validators.pattern(this.emailPattern)]);
    let pharmaName = new FormControl();
    let pharmastate = new FormControl();
    let pharmacountry = new FormControl();
    let pharmapincode = new FormControl('',[Validators.required]);
    let pharma_phonenumber = new FormControl('', [Validators.pattern(this.textnumbers)]);
    let pharma_email = new FormControl('', [Validators.pattern(this.emailPattern)]);
    let pharmacity = new FormControl();
    let companyrefid = new FormControl();
    let branchrefid = new FormControl();
    let registerflag = new FormControl();
    let addressl = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();


    let locname = new FormControl();
    let locrefid = new FormControl();


    this.myForm = new FormGroup({
      
      shopname: shopname,
      ownername: ownername,
      license_holder: license,
      dlno: dlNumber,
      gstno: gst,
      tinno: tin,
      cstno: cstNumber,
      panno: pan,
      phar_registration_no: registrationNumber,
      address1: address,
      address2:addressl,
      state: state,
      country: country,
      city: city,
      pincode: pincode,
      mobileno: phonenumber,
      emailid: email,
      pharmacistname: pharmaName,
      phar_state: pharmastate,
      phar_country: pharmacountry,
      phar_pincode: pharmapincode,
      phar_contactno1: pharma_phonenumber,
      phar_emailid: pharma_email,
      phar_city: pharmacity,
      registerflag: registerflag,
      companyrefid: companyrefid,
      branchrefid: branchrefid,
      clientcdate: clientcdate,
      createdby: createdby,
      locname: locname,
      locrefid: locrefid
    });

  }


  ngOnInit() {
    //get Country
    this.shopinfo.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured Country');
      });
    //To Set Plachoder For DropDown
    this.myForm.get('country').setValue("0");
    this.myForm.get('state').setValue("0");
    this.myForm.get('city').setValue("0");
    this.myForm.get('phar_country').setValue("0");
    this.myForm.get('phar_state').setValue("0");
    this.myForm.get('phar_city').setValue("0");

    this.myForm.get('registerflag').setValue("0");
    // this.myForm.get('branchid').setValue('opt1');
    // this.myForm.get('companyid').setValue('opt1');
    this.shopinfo.getAllCompany().subscribe(data => this.companyrefid1 = data,
      err => {
        console.log('Error Occured ');

      });
      setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.shopinfo.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }

  getBranch() {
    this.shopinfo.getBranch(this.myForm.get('companyid').value).subscribe(data => this.branchrefid1 = data, err => {
      console.log('Error occured On getBranch()');
    })
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
    alert("onSubmit")
    this.submitted = true;
    this.createRecord();
  }
  public returnFlag: boolean = false;
  private createRecord(): void {
    
    this.returnFlag = this.shopValidation();
    if (this.returnFlag == true) {

      this.myForm.get('clientcdate').setValue(AppComponent.date);
      this.myForm.get('createdby').setValue(AppComponent.userID);
      
      this.myForm.get('companyrefid').setValue(AppComponent.companyID);
      this.myForm.get('branchrefid').setValue(AppComponent.branchID);
      
      this.myForm.get('locname').setValue(AppComponent.locRefName1);
     
      this.myForm.get('locrefid').setValue(AppComponent.locrefID1);
       this.myForm.get('branchid').setValue(AppComponent.branchID);
     this.myForm.get('companyid').setValue(AppComponent.companyID);

      this.shopinfo.createShop(JSON.stringify(this.myForm.value)).subscribe(data=> {

        if(data){

          this.justInitiate();
          this.deviceObj.apiname = "api/createshopRecord'";
          this.deviceObj.description = "Shop Created";
          alert("devicedetails")
          this.shopinfo.deviceDetails(JSON.stringify(this.deviceObj))
          .subscribe(data => { },
            errorCode => console.log(errorCode));



        }


      });



      this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['Registration/ViewShopInformation']);
      }, 2000);
    }
  }



// companyid: companyid,
      // branchid: branchid,
       // let companyid = new FormControl('', Validators.required);
    // let branchid = new FormControl('', Validators.required);










  getState() {
    //Get States 
    this.shopinfo.getStates(this.myForm.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });
  }

  getState1() {
    //Get States 
    this.shopinfo.getStates(this.myForm.get('phar_country').value).subscribe(data => this.states1 = data,
      err => {
        console.log('Error Occured Get States');
      });
  }
  getCity() {
    //Get City 
    this.shopinfo.getCity(this.myForm.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  getCity1() {
    //Get City 
    this.shopinfo.getCity(this.myForm.get('phar_state').value).subscribe(data => this.cities1 = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  shopValidation(): boolean {
    // if (this.myForm.get('companyid').value == '' || this.myForm.get('companyid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Company Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }

    // if (this.myForm.get('branchid').value == '' || this.myForm.get('branchid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Branch Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (this.myForm.get('shopname').value == '' || this.myForm.get('shopname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopname, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('ownername').value == '' || this.myForm.get('ownername').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourownername, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('license_holder').value == '' || this.myForm.get('license_holder').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourlicenseholdername, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('dlno').value == '' || this.myForm.get('dlno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enterdruglicensenumber, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // if (this.myForm.get('gstno').value == '' || this.myForm.get('gstno').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Goods and ServiceTax', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (this.myForm.get('tinno').value == '' || this.myForm.get('tinno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.entertaxidentificationnumber, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('address1').value == '' || this.myForm.get('address1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopaddress, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('country').value == '0' || this.myForm.get('country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopcountry, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('state').value == '0' || this.myForm.get('state').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopstate, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('city').value == '0' || this.myForm.get('city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopcity, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('mobileno').value == '' || this.myForm.get('mobileno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopmobilenumber, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('emailid').value == '' || this.myForm.get('emailid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopemailaddress, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('pharmacistname').value == '' || this.myForm.get('pharmacistname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourpharmacistname, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_country').value == '0' || this.myForm.get('phar_country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourpharmacoutry, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_state').value == '0' || this.myForm.get('phar_state').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourpharmastate, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_contactno1').value == '' || this.myForm.get('phar_contactno1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourpharmamobilenumber, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_emailid').value == '' || this.myForm.get('phar_emailid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourpharmaemailaddress, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

}