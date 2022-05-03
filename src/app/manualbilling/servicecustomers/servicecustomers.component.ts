import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { custSaveService } from 'app/regform/customer/custSave/custSave.service';
import { RightpanelComponent } from 'app/rightpanel/rightpanel.component';
import { ManualbillingService } from '../manualbilling.service';

@Component({
  selector: 'app-servicecustomers',
  templateUrl: './servicecustomers.component.html',
  styleUrls: ['./servicecustomers.component.css'],
  providers:[custSaveService,ManualbillingService]
})

export class ServicecustomersComponent implements OnInit {
  parentMessage = "sales"
  @ViewChild(RightpanelComponent) child  

   Email  =    "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
   shopregex = "^$|^[A-Za-z0-9]+";

  registerForm: FormGroup;
  countries = [];
  states = [];
  cities = [];
  i;
  selobj;
  saveprocess:boolean=false;
  constructor(private formBuilder: FormBuilder, private dateformat: dateFormatPipe,private router: Router,
    private userService: custSaveService,private manualservice: ManualbillingService, private notificationsComponent: NotificationsComponent) { }
 
  ngOnInit() {
    var date = this.dateformat.transformnew(Date.now());
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, cdate: AppComponent.date };
    this.registerForm = this.formBuilder.group({
      ptid: ['', []],
      hospitalid: ['', []],
      patientcode: ['', []],
      patienttitle: ['', []],
      patientfirstname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      patientlastname: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      gender: ['', []],
      age:[0,[]],
      maritalstatus: ['', []],
      dob: ['', []],
      patienttype: ['', []],
      address1: ['', [Validators.required]],
      address2: ['', []],
      country: ['opt1', []],
      state: ['opt1', []],
      city: ['opt1', []],
      pincode: ['', []],
      countrycode: ['', []],
      mobile: ['', [Validators.required]],
      phone: ['', []],
      email: [, [Validators.pattern(this.Email)]],
      aadhaarcardno: ['', []],
      language: ['', []],
      description: ['', []],
      ipaddress: ['', []],
      latitude: ['', []],
      longitude: ['', []],
      companyid: ['', []],
      createdby: [this.selobj.userid, []],
      clientcdate: [this.selobj.cdate, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      tinno: [, [Validators.pattern(this.shopregex)]],
      gstno: [, [Validators.pattern(this.shopregex)]],
      vatno: [, [Validators.pattern(this.shopregex)]],
      scitizenflag: [false, []],
      phycapflag: [false, []],
      // scitizenno: [{ value: '', disabled: true }, [Validators.pattern(this.shopregex)]],
      // phycapno: [{ value: '', disabled: true }, [Validators.pattern(this.shopregex)]],
      productid:[0]
    });
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));
  }

  calculatedage:any;
  agecalculate(gd1){
    let d1=new Date(gd1);
    let d2=new Date();
    if(d1>d2){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Valid Previous Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.registerForm.get('dob').setValue('');
      this.registerForm.get('age').setValue(0);
    }else{
      var diff = Math.floor(d2.getTime() - d1.getTime());
      var calcdays=1000 * 60 * 60 * 24;
      var days=0; var months=0; var years=0;
      days = Math.floor(diff/calcdays);
      months = Math.floor(days/31);
      years = Math.floor(days/365.25);    // Math.floor(months/12);
      var message = d2.toDateString();
      this.calculatedage=days+ " Days -" + months+ " Months -" + years+ " Years"
      this.registerForm.get('age').setValue(years);
    }
  }
  

  seniorvalid(){
    var resval=1;
    let patientfname=this.registerForm.get('patientfirstname').value
    let patientlname=this.registerForm.get('patientlastname').value
    let age=this.registerForm.get('age').value
    let address1=this.registerForm.get('address1').value
    let address2=this.registerForm.get('address2').value
    let gstno=this.registerForm.get('gstno').value
    let vatno=this.registerForm.get('vatno').value
    let mobno=this.registerForm.get('mobile').value
    let phno=this.registerForm.get('phone').value
    let countrycode=this.registerForm.get('country').value
    let statecode=this.registerForm.get('state').value
    let citycode=this.registerForm.get('city').value
    if(patientfname.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First Name Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(patientlname.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Last Name Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(age<1) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Age Not be a zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(gstno != null && gstno.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'TIN No Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(vatno != null && vatno.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'VAT No Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if((address1.toString().length>200)) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Address1 Limit 200 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if((address2 != null && address2.toString().length>150)) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Address2 Limit 150 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(countrycode=='opt1'||countrycode==''||countrycode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Country', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(statecode=='opt1'||statecode==''||statecode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(citycode=='opt1'||citycode==''||citycode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select City', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(mobno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Mobile No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(phno != null && phno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Phone No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }
    return resval;
  }


  onSubmit() {
    //var answer = confirm("Save data?");
   let valflag=this.seniorvalid();
   
   if(valflag==1){
     this.saveprocess=true;
    this.manualservice.saveServicePatient(this.registerForm.value).subscribe(data => {
      this.savevalid(data)
    },errorCode =>{console.log(errorCode);this.saveprocess=false});
      
    }
  
  }

  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.saveprocess=false;
        this.router.navigate(['/ManualBilling/ViewSerivceCustomers']);
      }, 2000);
    } else {
      this.saveprocess=false;
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

 
}
