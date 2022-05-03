import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserloginService } from '../userlogin.service';
import { User } from '../user';

import * as $ from 'jquery';

import { AppComponent } from '../../app.component';
import * as jwt_decode from 'jwt-decode';

//Encrypt
import * as CryptoJS from 'crypto-js';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { Ng2DeviceService } from 'ng2-device-detector';
import { NotificationsComponent } from 'app/notifications/notifications.component';
var key = CryptoJS.enc.Utf8.parse('7061737323313233');
var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[NotificationsComponent]
})
export class LoginComponent implements OnInit {


  loader: boolean = false;

  loginForm: FormGroup;
  user = new User;
  login: any;
  username: any;
  pass: any;
  companyName: any;
  counter: any;
  timer: any;
  reFlag: boolean = false;
  i;
  modLabel: any = [];
  companylist = [];
  firstString: any;
  secondString: any;
  chooseSection: any;
  deviceObj: any;
  endtime: string;
  static authorities: string;
  static labels: string;
  static localList: any;
  static companyID: any;
  static branchID: any;
  static shopID: any;
  static hospitalID: any;
  static warehouseID: any;
  static locrefID: any;
  static locRefName: any;
  static usertype: any;
  static distributorid: any;
  static locRefName1: any;
  static locrefID1: any;
  static countryID: any;
  static userID: any;
  access_token: any;
  refresh_token: any;

  constructor(private loginService: UserloginService, private router: Router, private fb: FormBuilder, private notificationsComponent: NotificationsComponent,
    private appComponent: AppComponent, private dateformat: dateFormatPipe, private deviceService: Ng2DeviceService) {

    const username = new FormControl();
    const password = new FormControl();
    const companyid = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();
    let grant_type = new FormControl();

    this.loginForm = new FormGroup({
      clientcdate: clientcdate,
      createdby: createdby,
      username: username,
      password: password,
      companyid: companyid,
      grant_type: grant_type
    });



    this.chooseSection = this.fb.group({
      companyid: ['', []],
      userid: ['', []],
      branchid: ['', []],
      shopid: ['', []],
      hospitalid: ['', []],
      warehouseid: ['', []],
      distributorid: ['', []],
      usertype: ['', []],
      countryid:['',[]]
    });
  }

  ngOnInit() {
    sessionStorage.clear();
    localStorage.clear();
    this.loginForm.get('companyid').setValue(15);
    this.loginService.getComplist().subscribe(data => this.companylist = data,
      err => {
        console.log('error on companylist()');
      });
    sessionStorage.clear();
    sessionStorage.removeItem("user");
    // sessionStorage.removeItem("moduleLabel");
    localStorage.removeItem("u1s2e3r4");
    this.firstString = Math.random().toString(36).slice(-2);
    this.secondString = Math.random().toString(36).slice(-2);
    //************************ */
    this.chooseSection.get('branchid').setValue("0");
    this.chooseSection.get('shopid').setValue("0");
    this.chooseSection.get('hospitalid').setValue("0");
    this.chooseSection.get('warehouseid').setValue("0");


  }

  userid: number ;
  usertype: any;
  password: any;
  distributorid: any;



  devicedetails() {

    this.deviceObj = {

      userid: LoginComponent.userID,
      companyrefid: LoginComponent.companyID,
      branchrefid: LoginComponent.branchID,
      locname: LoginComponent.locRefName1,
      locrefid: LoginComponent.locrefID1,
      date: this.dateformat.transform05(Date.now()),
      ipaddress: this.appComponent.ipAddress,
      browsertype: this.appComponent.browser,
      ostype: this.appComponent.os,
      osversion: this.appComponent.osversion,
      devicetype: this.appComponent.devicetype,
      event: '',
      description: '',
      apiname: '',
      starttime: this.dateformat.transform04(),
      endtime: '',

    };

  }
  decoded: any;
  reftoken: any;
  deviceInfo:any;
  onSubmit() {
    localStorage.removeItem('u1s2e3r4');
    sessionStorage.removeItem('indvuserid');
    sessionStorage.removeItem("ranking");
    this.deviceInfo=this.deviceService.getDeviceInfo();
    this.loginForm.get('grant_type').setValue('password');
    let params = new URLSearchParams();  
    params.append('username', this.loginForm.get('username').value);
    params.append('password', this.loginForm.get('password').value);
    params.append('grant_type', this.loginForm.get('grant_type').value);
    params.append('osversion', this.deviceInfo.os);
    params.append('ostype', this.deviceInfo.os_version);
    params.append('browsertype',this.deviceInfo.browser);
    this.loginService.userauthentication(params.toString()).subscribe(data => {
      this.decoded = data.access_token,
      this.reftoken = data.refresh_token,
      this.userid = data.general;
      sessionStorage.setItem("indvuserid",JSON.stringify(data.general)); 
      sessionStorage.setItem('ranking',data.editionranking); 
      sessionStorage.setItem('verticalrank',data.verticalid); 
      localStorage.setItem('language', 'en'); 
      this.access_token = jwt_decode(this.decoded);
      sessionStorage.setItem("acctoken",this.decoded);
      sessionStorage.setItem("reftoken", this.reftoken);
      this.chooseSection.get('companyid').setValue(this.access_token.companyid);
      this.chooseSection.get('branchid').setValue(this.access_token.bid);
      this.chooseSection.get('shopid').setValue(this.access_token.sid);
      this.chooseSection.get('countryid').setValue(this.access_token.countryid);
      this.loginService.updateMinqty(this.access_token.companyid,this.access_token.bid,1,this.access_token.sid).subscribe()
      var postdata = { username: this.access_token.user_name, companyrefid: this.access_token.companyid }
      this.loginService.getAuthorities(JSON.stringify(postdata)).subscribe(
        data => {
          sessionStorage.setItem("auth",JSON.stringify(data.modules));
          sessionStorage.setItem("labels",JSON.stringify(data.labels));
          this.getLogin();
          LoginComponent.authorities = data.modules
          LoginComponent.labels = data.labels;
          
          if (data == null) {
           this.router.navigate(['userlogin/login']);
          }
          else {
            sessionStorage.setItem('loginstatus', '1');
            this.router.navigate(['Dashboard/Admindash']);
            //this.getBranch();
          }
        },
        err => {
          //this.router.navigate(['userlogin/login']);
          sessionStorage.removeItem("moduleLabel")
          console.log("invalid_token")
        }
      )

    },
    (err) => {
          this.loader=false;
          if(err.error_description == "Bad credentials"){
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Bad Credentials', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            this.loginService.accountlock(this.loginForm.get('username').value).subscribe(data => {
              this.notificationsComponent.addToast({ title: 'Error Message', msg: data.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            })
          }else if(err.error_description == "User account is locked"){
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'User account is locked', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            //alert("User account is locked")
          }else{
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'UserName or Password is Incorrect', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
    })


    this.reFlag = this.loginValidation();

    if (this.reFlag == true) {

      this.loader = true;

      this.username = this.loginForm.get('username').value;
      this.pass = this.loginForm.get('password').value;
      this.companyName = this.loginForm.get('companyid').value;
      this.password = this.firstString + '_' + this.pass + '_' + this.secondString;
    
    }
  // else{
  //   this.loginForm.get('grant_type').setValue('refresh_token');
  //   let params = new URLSearchParams(); 
  //   params.append('grant_type', this.loginForm.get('grant_type').value);
  //   params.append('refresh_token',sessionStorage.getItem("moduleLabel"));
  //   this.loginService.userauthentication(params.toString()).subscribe(data => {
  //     sessionStorage.setItem("acctoken",data.access_token)
  //     this.router.navigate(['dashboard']);
  //   },
  //   err => {
  //     console.log("invalid_token")
  //   })
  // }
  }
  
  static shopidref: any =0;
  getLogin() {
    LoginComponent.shopidref= this.chooseSection.get('shopid').value;
this.loginService.getLocalStore(JSON.stringify(this.chooseSection.value)).subscribe(data => {
  if (data !== null || data !== '') {
    this.encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(data)), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    localStorage.setItem("u1s2e3r4", this.encrypted)
  }     
  if (data != null) {
        // window.location.href = "dashboard"
        this.router.navigate(['Dashboard/Admindash']);
      }
    })

    this.devicedetails();
    this.deviceObj.event = "Entry"
    this.deviceObj.apiname = "api/loginModule";
    this.deviceObj.description = "User LogIn";

    localStorage.setItem("logintime", this.dateformat.transform04());

    this.loginService.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => { });
  }

  loginValidation(): boolean {
    this.username = this.loginForm.get('username').value;
    this.pass = this.loginForm.get('password').value;
    let comp = this.loginForm.get('companyid').value;
    // if (comp == "opt1" || comp == null) {
    //   alert('Company Name Must not be Empty');
    //   return false;
    // }
    if (this.username == "" || this.username == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'UserName Must not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      //alert('username Must not be Empty');
      return false;
    }
    if (this.pass == "" || this.pass == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Password Must not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      //alert('Password Must not be Empty');
      return false;
    }
    return true;
  }

  userbranch = [];
  userHospital = [];
  userShop = [];
  userWarehouse = [];

  openMyModal(event) {
    document.querySelector("#" + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  getBranch() {
    this.loginService.getBranch(this.access_token.companyid, this.userid).subscribe(data => {
      if (data != null) {
        this.openMyModal('effect-1');

      } this.userbranch = data, err => {
        //alert(JSON.stringify(err))
        console.log('Error occured On getBranch()');
      }
    })
  }

  getBranchWise() {
    let cid: any = this.loginForm.get('companyid').value;
    let bid: any = this.chooseSection.get('branchid').value;
    this.loginService.getShop(this.access_token.companyid, bid, this.userid).subscribe(data => this.userShop = data, err => {
      console.log('Error occured On getShop()');
    });

    this.loginService.getHospital(this.access_token.companyid, bid, this.userid).subscribe(data => this.userHospital = data, err => {
      console.log('Error occured On getHospital()');
    });

    this.loginService.getWarehouse(this.access_token.companyid, bid, this.userid).subscribe(data => this.userWarehouse = data, err => {
      console.log('Error occured On getWarehouse()');
    });
  }
  public flag: boolean = false;
  encrypted: any;
  chooseModel() {
    this.flag = this.chooseValidation();
    if (this.flag == true) {
      this.chooseSection.get('companyid').setValue(this.companyName);
      this.chooseSection.get('userid').setValue(this.userid.toString());
      this.getLogin();
    }
  }

  chooseValidation(): boolean {
    if (this.chooseSection.get('branchid').value == "0" || this.chooseSection.get('branchid').value == null) {
      alert('Branch Name Must not be Empty');
      return false;
    }
    if (this.chooseSection.get('shopid').value == '0' && this.chooseSection.get('hospitalid').value == '0' && this.chooseSection.get('warehouseid').value == '0') {
      alert('Choose One');
      return false;
    }

    if (this.chooseSection.get('shopid').value !== '0' && this.chooseSection.get('hospitalid').value !== '0') {
      alert('Choose only One');
      return false;
    }
    if (this.chooseSection.get('warehouseid').value !== '0' && this.chooseSection.get('hospitalid').value !== '0') {
      alert('Choose only Two');
      return false;
    }
    if (this.chooseSection.get('warehouseid').value !== '0' && this.chooseSection.get('shopid').value !== '0') {
      alert('Choose only Three');
      return false;
    }
    return true;
  }

  forgetpassword(){
    let user=this.loginForm.get('username').value;
    if(user == '' || user == null || user == undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Must Fill Username Field!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      //alert('Must Fill Username Field!..');
    }else{
      this.router.navigate(['/authentication/forgot/'+user])
    } 
  }

  
}