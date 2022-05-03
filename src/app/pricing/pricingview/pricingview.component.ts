import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
import { pricingService } from '../pricing.service';
import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';
declare var Razorpay: any;

@Component({
  selector: 'app-pricingview',
  templateUrl: './pricingview.component.html',
  styleUrls: ['./pricingview.component.css'],
  providers:[pricingService,NotificationsComponent]
})
export class PricingviewComponent implements OnInit {
  @ViewChild('rzpbutton1') rzpbutton1: ElementRef;
  @ViewChild("otpLength") otpLength: any;
  pricingForm: any;
  pricing = 0;
  otp: number = 0;
  mobverify: number = 0;
  baseResUrl2: string;
  emailPattern: any = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb: FormBuilder, private http: Http, private pricingserv: pricingService,private router: Router, private notificationsComponent: NotificationsComponent) {
    this.pricingForm = this.fb.group({
      email: ['', Validators.pattern(this.emailPattern)],
      username: ['', []],
      otp: ['', []],
      mobile: ['', []],
      shop: ['', []],
      country: ['opt1', []],
      editiontype:['opt1',[]],
      editionid:['opt1',[]],
      plantype:['opt1',[]],
      selectcheck:[1,[]]
    });
  }
  country;
  ipfetchcountry:any;
  ngOnInit() {

    this.baseResUrl2 = environment.backend.paymentUrl;
    this.pricingForm.get('country').setValue("opt1");
    this.pricingForm.get('plantype').setValue("opt1");
    this.http.get(this.baseResUrl2 + '/domain-country-dropdown').map(res => res.json()).subscribe(data => {
      if(data){
        this.country = data;
        setTimeout(() => {
          this.http.get('https://geoip-db.com/json/').map(res => res.json()).subscribe(data => {
            if(data){  
              //https://jsonip.com
              //http://api.ipify.org/?format=json
              //http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK' -only ip
              //http://ipinfo.io/json? -full details with code
              this.ipfetchcountry=data.country_name;
              let subindx= this.country.findIndex(p => p[1].toLowerCase()==this.ipfetchcountry.toLowerCase());
              this.pricingForm.get('country').setValue(this.country[subindx][0]);
            }         
          },err => console.log("error on getcountry")); 
        }, 1200);
      }
    },err => console.log("error on getcountry"));
    
  }

  editiontypechange(){
    this.pricingForm.get('editionid').setValue("opt1");
    this.pricingForm.get('plantype').setValue("opt1");
    this.selplanamount=0;
  }

 
  editionchange(){
    this.pricingForm.get('plantype').setValue("opt1");
    this.selplanamount=0;
  }
  
  editionid:any;
  plantype:any;
  selplanamount:any;
  planchange(){
    this.editionid= this.pricingForm.get('editionid').value;
    this.plantype= this.pricingForm.get('plantype').value;
    this.http.get(this.baseResUrl2 + '/getPricingPlanDetails/'+ this.pricingForm.get('country').value + 
    '/' + this.pricingForm.get('editionid').value + '/' + this.pricingForm.get('plantype').value).map(res => res.json()).subscribe(edata => {
      if(edata.length>0){
        this.selplanamount=edata[0][2];
      }else{this.selplanamount=0}
    },err => {console.log("error on getEditionid:"+err);this.selplanamount=0});
  }

  signupvalidate(){
    let countryid=this.pricingForm.get('country').value;
    let editiontype=this.pricingForm.get('editiontype').value;
    let editionid=this.pricingForm.get('editionid').value;
    let plantype=this.pricingForm.get('plantype').value;
    if( countryid== 'opt1' || countryid== '' || countryid==null){
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'Please Select Country!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if( editiontype== 'opt1' || editiontype== '' || editiontype==null){
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'Please Select Edition Type!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if( editionid== 'opt1' || editionid== '' || editionid==null){
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'Please Select Edition!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if( plantype== 'opt1' || plantype== '' || plantype==null){
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'Please Select Plan Type!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  getSignup(){
    let valflag=this.signupvalidate();
    if(valflag){
      this.http.get(this.baseResUrl2 + '/getEditionid/'+this.pricingForm.get('country').value + '/' + this.pricingForm.get('editionid').value).map(res => res.json()).subscribe(edata => 
        { this.routecall(this.pricingForm.get('editionid').value,edata[0]) },
        err => console.log("error on getEditionid"));
    }
  }

  routecall(erank,eid){
    if(erank == 1){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid, plantype:0 } })
    }else if(erank == 2){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank,editionid: eid, plantype:0 } })
    }else if(erank == 3){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid, plantype:0 } }) 
    }else if(erank == 4){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid, plantype:0 } }) 
    }else if(erank == 5){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid, plantype:0  } }) 
    }else if(erank == 6){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid, plantype: this.pricingForm.get('plantype').value } }) 
    }else if(erank == 7){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid, plantype: this.pricingForm.get('plantype').value } }) 
    }else if(erank == 8){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid, plantype: this.pricingForm.get('plantype').value } }) 
    }else if(erank == 9){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid, plantype: this.pricingForm.get('plantype').value } }) 
    }
   
  }

  trialplan() {
    this.pricing = 1;
  }

 
  openMyModal(event) {
    document.querySelector("#" + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


}
