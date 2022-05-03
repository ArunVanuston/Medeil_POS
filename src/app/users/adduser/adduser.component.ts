import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
//encrypt values
import * as CryptoJS from 'crypto-js';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers: [NotificationsComponent, dateFormatPipe]
})
export class AdduserComponent implements OnInit {
  alertmsgs:any;
  parentMessage = "purchase"
  userForm: FormGroup;
  submitted: boolean;
  remaintimestamp:any;
  public reFlag: boolean = false;
  employeelist = [];
  country = [];
  product = [];
  domain = [];
  rolelist = [];
  data = [];
  subdomain = [];
  edition = [];
  distributorrefid = [];
  deviceObj;
  emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  constructor(public translate: TranslateService,private userService: UsersService, private appComponent: AppComponent, private notificationsComponent: NotificationsComponent,
    private router: Router, private dateformat:dateFormatPipe ) { translate.setDefaultLang('en'); }

  ngOnInit() {   
    this.translate.use(localStorage.getItem('language'));
    const countryrefid = new FormControl();
    const productrefid = new FormControl();
    const domainrefid = new FormControl();
    const subdomainrefid = new FormControl();
    const companyrefid = new FormControl();
    const branchid = new FormControl(AppComponent.branchID);
    const shopid = new FormControl(AppComponent.locrefID1);
    const status = new FormControl();
    const rolerefid = new FormControl('opt1');
    const editionrefid = new FormControl();
    const username = new FormControl();
    const customername= new FormControl();
    const usertype = new FormControl();
    const employeeid = new FormControl('opt1');
    const isadmin = new FormControl(0);
    const isactive = new FormControl(0);
    const cuserrefid = new FormControl();
    const emailid = new FormControl('', Validators.pattern(this.emailPattern));
    const phoneno = new FormControl();
    const phoneno1 = new FormControl();
    const suserid = new FormControl();
    const planid = new FormControl();
    const period = new FormControl();
    const distributorid = new FormControl();
    const verticalid = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();

    this.userForm = new FormGroup({
      clientcdate: clientcdate,
      createdby: clientcdate,
      countryrefid: countryrefid,
      productrefid: productrefid,
      domainrefid: domainrefid,
      subdomainrefid: subdomainrefid,
      companyrefid: companyrefid,
      branchid:branchid,
      shopid:shopid,
      rolerefid: rolerefid,
      username: emailid,
      editionrefid: editionrefid,
      suserid:suserid,
      employeeid: employeeid,
      planid:planid,
      isadmin: isadmin,
      isactive: isactive,
      emailid: emailid,
      phoneno: phoneno,
      phoneno1: phoneno1,
      distributorid: distributorid,
      verticalid:verticalid,
      period:period,
      customername:customername
    });

    this.userService.getemployeelist(sessionStorage.getItem('indvuserid')).then(data => { this.employeelist = data 
    },err => console.log("error on Employee"));

    this.userService.getTimestamp(sessionStorage.getItem('indvuserid')).then(data => { this.userForm.get('period').setValue(data[1]*1000);
    },err => console.log("error on Time stamp"));

    this.userService.getRoles(sessionStorage.getItem('indvuserid')).then(data => { this.rolelist=data
    },err => console.log("error on Time stamp"));

    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.userService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }

  getUserList(){
    this.userService.getUserlist(sessionStorage.getItem('indvuserid')).then(data => {
      this.userForm.get('countryrefid').setValue(data[0][0]);
      this.userForm.get('productrefid').setValue(data[0][1]);
      this.userForm.get('domainrefid').setValue(data[0][2]);
      this.userForm.get('suserid').setValue(data[0][3]);
      this.userForm.get('companyrefid').setValue(data[0][4]);
      this.userForm.get('subdomainrefid').setValue(data[0][7]);
      this.userForm.get('planid').setValue(data[0][8]);
      this.userForm.get('verticalid').setValue(data[0][12]);
    })
  }

  emailexistvalidate(email:any){
    this.userService.EmailexistValid(email).then(data => {
      if (data) {
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.users.emailalreadyexists, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        this.userForm.get('emailid').setValue('');
      } 
    },
      err => console.log("error on Emailvalid()"))
  }

  roleexistvalidate(roleid){
    let roleindx=this.rolelist.findIndex(p => p[0]==roleid);
    this.userService.getRoleIDExist(roleid).then(data => { 
      if(data){
        this.userService.getEditionID(roleid,roleindx).then(data => {this.userForm.get('editionrefid').setValue(data[0][0]);
        },err => console.log("error on Employee"));
      }
      else{
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.users.rolenamealreadyassigned, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        this.userForm.get('rolerefid').setValue('opt1');
      }
    },err =>  {
      this.userForm.get('rolerefid').setValue('opt1');
      console.log('Error Occured On createlogin()');
    });
   
  }
 
  userValidation(): boolean {
    if (this.userForm.get('employeeid').value == 'opt1' || this.userForm.get('employeeid').value == 'null') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.selectemployeename, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.userForm.get('rolerefid').value == 'opt1' || this.userForm.get('rolerefid').value == 'null') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.selectroleid, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.userForm.get('emailid').value == '' || this.userForm.get('emailid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.pleaseenteryouremail, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.userForm.get('username').value == '' || this.userForm.get('username').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.enterusername, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.userForm.get('phoneno1').value == '' || this.userForm.get('phoneno1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.pleaseenteryourphonenumber, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.userForm.get('emailid').value.match(this.emailPattern) == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.matchemailformat, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // else if (this.userForm.get('password').value == '' || this.userForm.get('password').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter User Password..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    return true;
  }

  encrypted: any;
  onSubmit(): any {
    this.reFlag = this.userValidation();
    if (this.reFlag == true) {
      this.userForm.get('clientcdate').setValue(AppComponent.date);
      this.userForm.get('rolerefid').setValue(parseInt(this.userForm.get('rolerefid').value));
      let mobileconcat='';
      mobileconcat='+91'+this.userForm.get('phoneno1').value;
      this.userForm.get('phoneno').setValue(mobileconcat);
      let selempid=this.userForm.get('employeeid').value;
      let empindex = this.employeelist.findIndex(p => p[1] ==selempid);
      this.userForm.get('customername').setValue(this.employeelist[empindex][0]);

      this.userService.createUserCheck(JSON.stringify(this.userForm.value)).subscribe(data => {
        if(data){
          // Encrypt
          var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.userForm.value), 'secret key 123').toString();
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.users.linkcreatedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.users.linkwillbesendenteredmail, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          setTimeout(() => {
            this.router.navigate(['employeesignup/signup',ciphertext]);
          },1500)
          
        }else{
          this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.users.maximumusercreated, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.users.buyusersviabilling, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
      },err => {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.maximumusercreated, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.users.buyusersviabilling, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        console.log('Error Occured On createlogin()');
      });
    }
  }

  newsign(){
    this.userService.createUser(JSON.stringify(this.userForm.value)).subscribe(data => {
      if (data == true) {
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.users.linkcreatedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.users.linkwillbesendenteredmail, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.userForm.reset();
        this.ngOnInit();
      }else{
        this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.linknotcreated, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    },err => {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.linknotcreated, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      console.log('Error Occured On createlogin()');
    });
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

  viewUserinfo() {
    this.router.navigate(['User/ViewUser']);
  }
}