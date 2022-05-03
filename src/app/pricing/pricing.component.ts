import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
import { pricingService } from './pricing.service';
import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
declare var Razorpay: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
  providers: [pricingService,NotificationsComponent]
})

export class PricingComponent implements OnInit {
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
      country: ['', []],
      selectcheck: [1, []],
    });
  }
  country;

  ngOnInit() {
    this.baseResUrl2 = environment.backend.paymentUrl;
    this.pricingForm.get('country').setValue("opt")
    this.http.get(this.baseResUrl2 + '/domain-country-dropdown').map(res => res.json()).subscribe(data => this.country = data,
      err => console.log("error on getcountry"))
  }

 
  getSignup(data){
    if(this.pricingForm.get('country').value != 'opt'){
      this.http.get(this.baseResUrl2 + '/getEditionid/'+this.pricingForm.get('country').value + '/' + data).map(res => res.json()).subscribe(edata => 
        { this.routecall(data,edata[0]) },
        err => console.log("error on getEditionid"))
    }
    else{
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'Please Select Country!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
  }

  routecall(erank,eid){
    if(erank == 1){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid } })
    }else if(erank == 2){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank,editionid: eid } })
    }else if(erank == 3){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid  } }) 
    }else if(erank == 4){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid  } }) 
    }else if(erank == 5){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid} }) 
    }else if(erank == 6){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid } }) 
    }else if(erank == 7){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid } }) 
    }else if(erank == 8){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid } }) 
    }else if(erank == 9){
      this.router.navigate(['/usersignup'], { queryParams: { countryid: this.pricingForm.get('country').value, editionrank: erank, editionid: eid } }) 
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

  //radio Change
  trial:boolean=true;
  selectcheck(event, id: number) {
    if (event.target.checked) {
      if (id == 1) {
        this.trial = true;
      }
      else if (id == 2) {
        this.trial = false;
      }
    }
  }


}
