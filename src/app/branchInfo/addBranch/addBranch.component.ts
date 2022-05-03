import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AddbranchService } from './addBranch.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { all } from 'q';
import { AppComponent } from '../../app.component';

const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
const emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
@Component({
  selector: 'app-addBranch',
  templateUrl: './addBranch.component.html',
  //  styleUrls: ['./addBranch.component.css'],
  providers: [AddbranchService, NotificationsComponent]
})

export class AddbranchComponent implements OnInit {
  parentMessage = "sales";
  branchForm: FormGroup;
  submitted = false;
  productinfo = [];
  countries = [];
  companies = [];
  domain = [];
  subdomain = [];
  edition = [];
  states = [];
  cities = [];
  ccode = [];
  flag: boolean = false;
  isExist: boolean = false;

  constructor(private branchinfo: AddbranchService, private router: Router, private notificationsComponent: NotificationsComponent, private appComponent: AppComponent) {
    let companyrefid = new FormControl('', Validators.required);
    let branchname = new FormControl('', Validators.required);
    let shortname = new FormControl();
    let contactperson = new FormControl();
    let desgination = new FormControl();
    let gstno = new FormControl();
    let tinno = new FormControl();
    let cstno = new FormControl();
    let panno = new FormControl();
    let mobileno = new FormControl('', [Validators.required]);
    let address1 = new FormControl('',Validators.required);
    let address2 = new FormControl();
    let state = new FormControl();
    let country = new FormControl();
    let city = new FormControl();
    let pincode = new FormControl();
    let phoneno = new FormControl();
    let email = new FormControl('', [Validators.pattern(emailpattern)]);
    let countrycode = new FormControl();
    let createdby = new FormControl();
    let clientcdate = new FormControl();
    
    this.branchForm = new FormGroup({
      companyrefid: companyrefid,
      branchname: branchname,
      shortname: shortname,
      contactperson: contactperson,
      desgination: desgination,
      gstno: gstno,
      tinno: tinno,
      cstno: cstno,
      panno: panno,
      mobileno: mobileno,
      address1: address1,
      address2: address2,
      state: state,
      country: country,
      city: city,
      pincode: pincode,
      phoneno: phoneno,
      email: email,
      countrycode: countrycode,
      
      createdby: createdby,
      clientcdate: clientcdate
    });

  }


  ngOnInit() {
    this.branchForm.get('companyrefid').setValue('opt1');
    this.branchForm.get('country').setValue('opt1');
    this.branchForm.get('state').setValue('opt1');
    this.branchForm.get('city').setValue('opt1');
    this.branchForm.get('countrycode').setValue('opt1');

    //get Country
    this.branchinfo.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured ');
      });

    //selva
    //alert(AppComponent.usertype);
    //alert(AppComponent.usertype =='\"SuperAdmin\" ');
    if (AppComponent.usertype == "\"SuperAdmin\" ") {

      this.branchinfo.getAllCompany().subscribe(data => this.companies = data,
        err => {
          console.log('Error Occured ');
        });
    }
    else {
      this.branchinfo.getCompany(AppComponent.companyID).subscribe(data => this.companies = data,

        err => {
          console.log('Error Occured ');
        });
    }
    this.branchForm.get('createdby').setValue(AppComponent.userID);

    this.branchForm.get('clientcdate').setValue(AppComponent.date);

  }


  getState() {
    //Get States 
    this.branchinfo.getStates(this.branchForm.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });
    //Get Country Code
    this.branchinfo.getCountrycode(this.branchForm.get('country').value).subscribe(data => this.ccode = data,

      err => {
        console.log('Error Occured Country Code');
      });

  }
  getCity() {
    //Get States 
    this.branchinfo.getCities(this.branchForm.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get States');
      });


  }

  private branchValidation(): boolean {
    let branch=this.branchForm.get('branchname').value;
    let short=this.branchForm.get('shortname').value;
    let conperson=this.branchForm.get('contactperson').value;
    let designation=this.branchForm.get('desgination').value;
    let mobno=this.branchForm.get('mobileno').value;
    let address1=this.branchForm.get('address1').value;
    let address2=this.branchForm.get('address2').value;
    if (this.branchForm.get('companyrefid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COMPANY IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (branch.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'First Name Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (short.toString().length>12) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'First Name Maximum 12 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (conperson.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Contact Person Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (designation.toString().length>50) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Designation Maximum 50 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (mobno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Mobile No Maximum 15 Digits', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (address1.toString().length>200) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Address1 Maximum 200 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (address2 != null && address2.toString().length>150) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Address2 Maximum 150 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (this.branchForm.get('country').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COUNTRY  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (this.branchForm.get('state').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'STATE  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (this.branchForm.get('city').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'CITY  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }

    return true;
  }

  onSubmit() {
    this.submitted = true;
    this.flag = this.branchValidation();
    if (this.flag == true) {
      this.branchinfo.isExistBranch(this.branchForm.get('branchname').value, AppComponent.companyID).subscribe(data => {
        //alert(data);
        if (data == true) {
          //alert(data);      
          this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'EMPLOYEE NAME IS ALREADY EXIST', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        } else {
          this.createRecord();
        }
      });
    }
  }



  private createRecord(): void {
    // alert(JSON.stringify(this.branchForm.value));
    this.branchinfo.createBranch(JSON.stringify(this.branchForm.value)).subscribe(data=>{


      
    });
    //window.location.href = '/Registration/ViewBranchRegistration';
    this.notificationsComponent.addToast({title:'SUCESS MESSAGE', msg:'DATA SAVED SUCESSFULLY.', timeout: 5000, theme:'default', position:'bottom-right', type:'success'});
      setTimeout(() => {
        this.router.navigate(['Registration/ViewBranchRegistration']);
      }, 2000);
  
  }
}
