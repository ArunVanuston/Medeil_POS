import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
import { customersignupService } from './customersignup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';
declare var Razorpay: any;

@Component({
  selector: 'app-customersignup',
  templateUrl: './customersignup.component.html',
  styleUrls: ['./customersignup.component.css'],
  providers: [customersignupService, NotificationsComponent]
})
export class CustomersignupComponent implements OnInit {
  @ViewChild('rzpbutton1') rzpbutton1: ElementRef;
  @ViewChild("otpLength") otpLength: any;
  countrycode:any;
  customersignupForm: any;
  pricing = 0;
  mobverify: number = 0;
  baseResUrl2= environment.backend.paymentUrl;
  authurl= environment.medauthbackend.baseResUrl2;
  emailPattern: any = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  shopregex1 = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
  shopregex = "^$|^[A-Za-z0-9 ]+"
  domainregex = "^$|^[a-z]+"
  constructor(private fb: FormBuilder, private http: Http, private notificationsComponent: NotificationsComponent, 
    private pricingserv: customersignupService, private router: ActivatedRoute,private router1: Router) {
    this.customersignupForm = this.fb.group({
      email: ['', [Validators.pattern(this.emailPattern)]],
      username: ['', []],
      verticalid:['opt1',[]],
      otp: ['', []],
      mobile: ['', []],
      shop: ['',[Validators.pattern(this.shopregex)]],
      domainname:['',[Validators.pattern(this.domainregex)]],
      country: ['opt1', []],
      countryname:[,[]],
      captcha: [, []],
      terms:[false, []],
      status:[0,[]],
    });
  }
  country;
  cId;
  sub;
  editionid;
  editionrank;
  plantype:any;
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  vertical=[];
  ngOnInit() {
    this.sub = this.router.queryParams.subscribe(params => {
      this.cId = +params['countryid'];
      this.editionrank = +params['editionrank'];
      this.editionid = +params['editionid'];
      this.plantype = +params['plantype'];
      this.pricingserv.countrycode( this.cId).subscribe(data => {
    
     this.countrycode = data
   
      },)
    });
    this.customersignupForm.get('country').setValue("opt1");
    this.http.get(this.baseResUrl2 + '/domain-country-dropdown').map(res => res.json()).subscribe(cdata =>{
      //this.country = data;
      let subindx= cdata.findIndex(p => p[0]==this.cId);
      this.customersignupForm.get('country').setValue(cdata[subindx][0]);
      this.customersignupForm.get('countryname').setValue(cdata[subindx][1]);},
      err => console.log("error on getcountry"));
      this.customersignupForm.get('verticalid').setValue("opt1");
    this.http.get(this.baseResUrl2 + '/vertical-name-list/'+this.cId).map(res => res.json()).subscribe(vdata =>{
      this.vertical = vdata;
    },err => console.log("error on getcountry"));
  }

  trialplan() {
    this.pricing = 1;
  }

  email: number;
  emailvalidation() {
    this.pricingserv.Emailvalid(this.customersignupForm.get('email').value).subscribe(data => {
      if (data) {
        this.email = 1;
      } else {
        this.email = 0;
      }
    },
      err => console.log("error on Emailvalid()"))
  }
  
  openMyModal(event) {
    document.querySelector("#" + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  signformvalidate(): boolean {
    let userval = this.customersignupForm.get('username').value;
    let verticalval = this.customersignupForm.get('verticalid').value;
    let shopval = this.customersignupForm.get('shop').value;
    let domain = this.customersignupForm.get('domainname').value;
    let emailval = this.customersignupForm.get('email').value;
    let mobval = this.customersignupForm.get('mobile').value;
    var captcharesponse = grecaptcha.getResponse();
    if (userval == '' ||userval == null || userval.toString().length == 0 || userval == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter User Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (userval.length > 30) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'User Name only 30 Letters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else  if (shopval == '' ||shopval == null || shopval.toString().length == 0 || shopval == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Shop Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else  if (shopval.length > 30) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Shop Name only 30 Letters without Space', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else  if (domain == '' ||domain == null || domain.toString().length == 0 || domain == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Domain Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else  if (domain.indexOf(" ") >= 0) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Domain Name without Space', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else  if (verticalval == 'opt1' || verticalval == null || verticalval == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Vertical', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else  if (emailval == '' ||emailval == null || emailval.toString().length == 0 || emailval == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Email', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.email == 1) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Email Already Exists', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else  if (mobval == '' ||mobval == null || mobval.toString().length == 0 || mobval == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter MobileNo', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.customersignupForm.get('country').value == 'opt1' || this.customersignupForm.get('country').value == '' || this.customersignupForm.get('country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Country not Fetched', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(captcharesponse.length == 0) { 
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Validate Captcha', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.customersignupForm.get('terms').value == false || this.customersignupForm.get('terms').value == '' || this.customersignupForm.get('terms').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Accept Terms & Conditions', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  otpprocess:boolean=false;
  trialprocess:boolean=false;
  getOTP() {
    let valflag=this.signformvalidate();
    if(valflag){
      this.otpprocess=true;
      this.trialprocess=false;
      this.mobverify=0;
      var data = { trialmobilenumber: this.countrycode + this.customersignupForm.get('mobile').value }
      this.pricingserv.OTPrequest(JSON.stringify(data)).subscribe(data => {
        if (data) {
          this.notificationsComponent.addToast({ title: 'SUCCESS MESSAGE', msg: 'OTP Send Your Registered Mobile No!...', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        } else {
          this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'OTP Not Send Check Mobile No!...', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
          this.mobverify = 3;
        }
      })
    }
  }

  resendOTP() {
    // let valflag=this.signformvalidate();
    // if(valflag){
    // }
    this.otpprocess=true;
    this.trialprocess=false;
    this.mobverify=0;
    var data = { trialmobilenumber:this.countrycode + this.customersignupForm.get('mobile').value }
    this.pricingserv.OTPrequest(JSON.stringify(data)).subscribe(data => {
      if (data) {
        this.notificationsComponent.addToast({ title: 'SUCCESS MESSAGE', msg: 'OTP Send Your Registered Mobile No!...', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
      } else {
        this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'OTP Not Send Check Mobile No!...', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
        this.mobverify = 3;
      }
    })
  }

  
  enterOTP() {
    this.otpLength = this.customersignupForm.get('otp').value;
    if (this.otpLength.toString().length == 6) {
      var data = { trialmobilenumber: this.countrycode + this.customersignupForm.get('mobile').value, otp: this.customersignupForm.get('otp').value }
      this.pricingserv.OTPverification(JSON.stringify(data)).subscribe(data => {
        if (data) {
          this.mobverify = 1;
          this.otpprocess=false;
          if(this.editionrank>5){
              this.getbuy();
          }else{
            this.savetrial();
          }
        } else {
          this.mobverify = 2;
        }
      });
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Enter 6 Digits!...', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
    }
  }

  // direct customer Payment Process
  razorplanid:any;
  starttime:any;
  endtime:any;
  amount:any;
  currency:any;
  getbuy(){
    this.http.get(this.baseResUrl2 + '/get-razorpayplanid/'+this.editionrank+'/'+this.customersignupForm.get('country').value+'/'+this.plantype).map(res => res.json()).subscribe(data => {
      if(data != null){
        this.razorplanid = data[0][0],
        this.starttime = data[0][1],
        this.endtime = data[0][2],
        this.amount = data[0][3],
        this.currency = data[0][4]
        this.savesubcription();
      }else{
        err => console.log("error on get-razorpayplanid",err);
      }
    })
  }

  savesubcription(){
    var postdata = {
      
        "plan_id":this.razorplanid,
        "total_count":1,
        "quantity": 1,
        "customer_notify":1,
        "start_at":this.starttime,
        "expire_by": this.endtime,
        "addons":[
          {
            "item":{
              "name":"Delivery Charges",
              "amount":this.amount+'00',
              "currency":this.currency
            }
          }
        ],
        "notes":{
          "notes_key_1":this.customersignupForm.get('email').value,
          "notes_key_2":"New Admin User",
        }
      }
      
    this.http.post(this.baseResUrl2 + '/Razorpaysubscriptions',postdata).map(res => res.json()).subscribe(data => {
      if(data){
        this.http.get(this.baseResUrl2 + '/generate-razorpay-scriptbuy/'+ '/' +this.customersignupForm.get('country').value + '/' + this.editionrank).map(res => res.json()).subscribe(data => {
          if(data){
            this.openEvent(data);
          }  
        })
      }
    })
  }

  //Call Payment Script
  paymentprocess:boolean=false;
  subscriptionid:any;
  openEvent(data) {
    this.subscriptionid=data[0][0];
    var options = {   //rzp_test_J7Kx3OyuVUnlSt 
      "key": "rzp_live_DLJiaXRnr8NSGv", "subscription_id": data[0][0],
      "name": data[0][1],
      "description":"Medeil POS Plan",
      "image": "http://vanuston.com/images/vanuston%20images/sliderimages/roundlogo.png",
      'handler': this.getstatus.bind(this),
      // "handler": function (response) {
      //   alert(response.razorpay_payment_id),
      //   alert(response.razorpay_subscription_id);
      //   alert(response.razorpay_signature);
      // },
      "modal": {
           "ondismiss":this.manualcustomersave.bind(this)
        // "ondismiss": function(){
        //     alert("Payment Cancelled");
        //     window.location.replace('https://secure.medeil.io/medeilpos/#/userlogin/login');
        //   }
        },
      "prefill": { "name": this.customersignupForm.get('username').value, "email": this.customersignupForm.get('email').value,
      "contact": this.customersignupForm.get('mobile').value },
      "notes": { "note_key_1": this.customersignupForm.get('email').value, "note_key_2": "New User Purchase" },  //"+91"+this.customersignupForm.get('mobile').value
      "theme": { "color": "#5076bb" }
    };
    //event.preventDefault();
    var rzp1 = new Razorpay(options);
    //let element: HTMLElement = document.getElementById('rzpbutton1') as HTMLElement;
    //element.click();
    rzp1.open();
    this.paymentprocess=true;
  }

  
  getstatus(response){
    setTimeout(() => {
      this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy'+ '/' + this.customersignupForm.get('email').value+'/'+response.razorpay_subscription_id)
      .map(res => res.json()).subscribe(paymentdata => {
        if(paymentdata[0]=="completed"){
            this.paymentprocess=false;
            this.savetrial();
          }else{
          setTimeout(() => {
            this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy' + '/' + this.customersignupForm.get('email').value+'/'+response.razorpay_subscription_id)
            .map(res => res.json()).subscribe(paymentdata => {
              if(paymentdata[0]=="completed"){
                this.paymentprocess=false;
                this.savetrial();
              }else{
                setTimeout(() => {
                  this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy' + '/' + this.customersignupForm.get('email').value+'/'+response.razorpay_subscription_id)
                  .map(res => res.json()).subscribe(paymentdata => {
                    if(paymentdata[0]=="completed"){
                      this.paymentprocess=false;
                      this.savetrial();
                    }else{
                      console.log("Payment Will be Initiated or Failed");
                      this.manualcustomersave();
                    }
                  });
                }, 7500); 
              }  
            });
          }, 7000); 
        }
      },err=>{console.log(err);
        setTimeout(() => {
          this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy' + '/' + this.customersignupForm.get('email').value+'/'+response.razorpay_subscription_id)
          .map(res => res.json()).subscribe(paymentdata => {
            if(paymentdata[0]=="completed"){
              this.paymentprocess=false;
              this.savetrial();
            }
          },err=>{console.log(err);
            this.manualcustomersave();
          });
        }, 3800); 
      });
    }, 7000); 
  }

//save trial Process
savetrial() {
  this.trialprocess=true;
  //let element: HTMLElement = document.getElementById('mouseclick') as HTMLElement;
  //element.click();
  this.http.get(this.baseResUrl2 + '/getPlanid/' + this.cId+'/'+this.editionid+ '/'+ this.plantype).map(res => res.json()).subscribe(data => {
    if(data){
      if(this.editionrank>5){this.customersignupForm.get('status').setValue(1)}else{this.customersignupForm.get('status').setValue(0)};
      let datas = {
        trialemailid: this.customersignupForm.get('email').value,
        shopname: this.customersignupForm.get('shop').value,
        countryid: this.customersignupForm.get('country').value,
        trialmobilenumber: this.countrycode + this.customersignupForm.get('mobile').value,
        trialcustomername: this.customersignupForm.get('username').value,
        planid:data[0][0],
        ranking:data[0][2],
        editionid:this.editionid,
        verticalid:this.customersignupForm.get('verticalid').value,
        status:this.customersignupForm.get('status').value,
        domainname:this.customersignupForm.get('domainname').value
      }
      this.pricingserv.savetrial(JSON.stringify(datas)).subscribe(data => {
        if (data) {
          this.trialprocess=false;
          //this.customersignupForm.reset();
          //alert("Username & Password will be Send your Mail.")
          console.log("calling");
          this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Link will be Send your Mail.', timeout: 18000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => { 
            //this.openMyModal('effect-1');
            //this.router1.navigate(['userlogin/login']);
           window.location.replace('https://secure.medeil.io/medeilpos/#/userlogin/login');
          },1200)
        }
        err => {
          if (err.status == 400) {
            this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'User Already Exists.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
          }
        }
      })
    }

  }, err => console.log("error on gettrialPlanid"))
}

//Manual Customer Save
manualcustomersave(){
  this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Payment will be Failed Manual Billing Link will be Send your Mail Soon!..', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
  //Call Manual Billing
  this.http.get(this.baseResUrl2 + '/getPlanid/' + this.cId+'/'+this.editionid+ '/'+ this.plantype).map(res => res.json()).subscribe(data => {
    if(data){
      let datas = {
        trialemailid: this.customersignupForm.get('email').value,
        shopname: this.customersignupForm.get('shop').value,
        countryid: this.customersignupForm.get('country').value,
        trialmobilenumber: this.countrycode + this.customersignupForm.get('mobile').value,
        trialcustomername: this.customersignupForm.get('username').value,
        planid:data[0][0],
        ranking:data[0][2],
        editionid:this.editionid,
        verticalid:this.customersignupForm.get('verticalid').value,
        status:this.customersignupForm.get('status').value,
        domainname:this.customersignupForm.get('domainname').value,
        subscriptionid:this.subscriptionid
      }
      this.pricingserv.savemanual(JSON.stringify(datas)).subscribe(data => {
        if (data) {
          this.trialprocess=false;
          //this.customersignupForm.reset();
          //alert("Username & Password will be Send your Mail.")
          console.log("calling");
          this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Payment will be Failed Manual Billing Link will be Send your Mail Soon!..', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
          setTimeout(() => { 
            //this.openMyModal('effect-1');
            //this.router1.navigate(['userlogin/login']);
          window.location.replace('https://secure.medeil.io/medeilpos/#/userlogin/login');
          },2100)
        }
        err => {
          if (err.status == 400) {
            this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'User Already Exists.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
          }else{
            setTimeout(() => { 
              //this.openMyModal('effect-1');
              //this.router1.navigate(['userlogin/login']);
            window.location.replace('https://secure.medeil.io/medeilpos/#/userlogin/login');
            },1800)
          }
        }
      })
    }
  });          
}


   
}

