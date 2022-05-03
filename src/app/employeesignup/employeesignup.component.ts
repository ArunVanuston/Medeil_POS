import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { UsersService } from 'app/users/users.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-employeesignup',
  templateUrl: './employeesignup.component.html',
  styleUrls: ['./employeesignup.component.css'],
  providers: [UsersService,NotificationsComponent, dateFormatPipe]
})
export class EmployeesignupComponent implements OnInit {
  employeesignupForm:FormGroup;
  encrypturl:any;
  passwordregex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");  //^[A-Z]
  constructor(private fb: FormBuilder, private http: Http, private notificationsComponent: NotificationsComponent, 
    private dateformat: dateFormatPipe,private userService: UsersService,private route: ActivatedRoute,private router: Router) { 
      this.employeesignupForm = this.fb.group({
        clientcdate:[this.dateformat.transform04(),[]],
        createdby:['',[]],
        countryrefid:['',[]],
        productrefid: ['',[]],
        domainrefid: ['',[]],
        subdomainrefid: ['',[]],
        companyrefid: ['',[]],
        branchid: ['',[]],
        shopid: ['',[]],
        rolerefid: ['',[]],
        username: ['',[]],
        editionrefid: ['',[]],
        password: ['',[Validators.required]],
        confirmpassword:['',[Validators.required]],
        suserid:['',[]],
        employeeid: ['',[]],
        planid:['',[]],
        isadmin: [0,[]],
        isactive: [1,[]],
        emailid: ['',[]],
        phoneno: ['',[]],
        distributorid: ['',[]],
        verticalid: ['',[]],
        period:['',[]],
        customername:['',[]],
        captcha: [, []],
        terms:[false, []],
        status:[1,[]]
      });
    }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  ngOnInit() {
    this.encrypturl = this.route.snapshot.paramMap.get('encrypturl');
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(this.encrypturl, 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // this.employeesignupForm.get('countryrefid').setValue(decryptedData.split(",")[2].split('":')[1]);
    // console.log("decrypt11: "+decryptedData.split(",")[20].split('":')[1]);
    this.employeesignupForm.get('countryrefid').setValue(decryptedData.countryrefid);
    this.employeesignupForm.get('productrefid').setValue(decryptedData.productrefid);
    this.employeesignupForm.get('domainrefid').setValue(decryptedData.domainrefid);
    this.employeesignupForm.get('subdomainrefid').setValue(decryptedData.subdomainrefid);
    this.employeesignupForm.get('companyrefid').setValue(decryptedData.companyrefid);
    this.employeesignupForm.get('branchid').setValue(decryptedData.branchid);
    this.employeesignupForm.get('shopid').setValue(decryptedData.shopid);
    this.employeesignupForm.get('rolerefid').setValue(decryptedData.rolerefid);
    this.employeesignupForm.get('username').setValue(decryptedData.username);
    this.employeesignupForm.get('editionrefid').setValue(decryptedData.editionrefid);
    this.employeesignupForm.get('suserid').setValue(decryptedData.suserid);
    this.employeesignupForm.get('employeeid').setValue(decryptedData.employeeid);
    this.employeesignupForm.get('planid').setValue(decryptedData.planid);
    this.employeesignupForm.get('isadmin').setValue(decryptedData.isadmin);
   // this.employeesignupForm.get('isactive').setValue(decryptedData.isactive);
    this.employeesignupForm.get('emailid').setValue(decryptedData.emailid);
    this.employeesignupForm.get('phoneno').setValue(decryptedData.phoneno);
    this.employeesignupForm.get('distributorid').setValue(decryptedData.distributorid);
    this.employeesignupForm.get('verticalid').setValue(decryptedData.verticalid);
    this.employeesignupForm.get('period').setValue(decryptedData.period);
    this.employeesignupForm.get('customername').setValue(decryptedData.customername);
  }

  empSignupvalidate(){
    let password = this.employeesignupForm.get('password').value;
    let cnfrmpassword = this.employeesignupForm.get('confirmpassword').value;
    var captcharesponse = grecaptcha.getResponse();
    //if (newpass.match(this.passwordregex) == null)
    if(password!=cnfrmpassword){
      this.notificationsComponent.addToast({title:'Error Message', msg:'Password & Confirm Password not Match', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      this.employeesignupForm.get('confirmpassword').setValue('');
     return false;
    }else if(captcharesponse.length == 0) { 
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Validate Captcha', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.employeesignupForm.get('terms').value == false || this.employeesignupForm.get('terms').value == '' || this.employeesignupForm.get('terms').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Accept Terms & Conditions', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  empSignup(){
    let valflag=this.empSignupvalidate();
    if(valflag){
      console.log(JSON.stringify(this.employeesignupForm.value));
      this.userService.createUser(JSON.stringify(this.employeesignupForm.value)).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'User Created Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.employeesignupForm.reset();
          setTimeout(() => {
            this.router.navigate(['/userlogin/login']);
          },1500)
          // this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'User not Created', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },err => {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'User not Created', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        console.log('Error Occured On createlogin()');
      });
    }
  }

}
