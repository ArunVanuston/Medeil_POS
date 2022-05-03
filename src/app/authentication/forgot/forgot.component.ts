import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { validateConfig } from '@angular/router/src/config';
import swal from 'sweetalert2';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  providers: [NotificationsComponent]
})
export class ForgotComponent implements OnInit {
  baseResUrl2 = environment.medauthbackend.baseResUrl2;
  forgotForm: any;
  passwordregex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
  
  enterotp: number = 1;
  otp: any;
  phonevalid;
  user;

  constructor(private fb: FormBuilder, private router: Router, private http: Http, private notificationsComponent: NotificationsComponent,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('id');
    this.forgotForm = this.fb.group({
      phone: ['', []],
      newpassword: ['', []],
      confirmpassword: ['', []],
      enteredpassword:['',[]],
    });

    this.http.get(this.baseResUrl2+'/user-mobile-number-identification' + '/' + this.user).map(res => res.json()).subscribe(data => {
      this.phonevalid = data.message;
    })
  }

  mobileconcat;
  otpenable:boolean=false;
  mobilevalid() {
    this.mobileconcat = "+91" + this.forgotForm.get('phone').value
    this.otpenable=true;
    this.http.get(this.baseResUrl2+'/user-mobile-number-verification' + '/' + this.user + '/' + this.mobileconcat).map(res => res.json()).subscribe(data => {
      if (data.code == "true") {
        setTimeout(() => {
          this.otpenable=false;
        }, 1000);
        this.getOTP();
      }else{
        this.forgotForm.get('phone').setValue('');
        this.notificationsComponent.addToast({title:'Error', msg:data.message, timeout: 5000, theme:'default', position:'top-right',type:'error'});
        setTimeout(() => {
          this.otpenable=false;
        }, 700);
      }
    })
  }

  getOTP() {
    this.http.get(this.baseResUrl2+'/user-otp-request' + '/' + this.user + '/' + this.mobileconcat).map(res => res.json()).subscribe(data => {
      if(data.code="true"){
        this.enterotp = 2;
        this.notificationsComponent.addToast({title:'Success', msg:data.message, timeout: 5000, theme:'default', position:'top-right',type:'success'});
      }
      else{
        this.notificationsComponent.addToast({title:'Error', msg:data.message, timeout: 5000, theme:'default', position:'top-right',type:'error'});
      }
    })
  }

  otpvalidate(){
     this.otp = this.forgotForm.get('enteredpassword').value.toString();
     if(this.otp.length == 6){
      this.http.get(this.baseResUrl2+'/otp-validation' + '/' + this.user + '/' + this.mobileconcat+'/'+this.otp).map(res => res.json()).subscribe(data =>{
        if(data.code=="true"){
          this.enterotp=3;
          this.notificationsComponent.addToast({title:'Success', msg:data.message, timeout: 5000, theme:'default', position:'top-right',type:'success'});
        }else{
          this.notificationsComponent.addToast({title:'Error', msg:data.message, timeout: 5000, theme:'default', position:'top-right',type:'error'});
        }
      });
     }else{
       this.notificationsComponent.addToast({title:'Alert!', msg:'Enter 6 Digits', timeout: 5000, theme:'default', position:'top-right',type:'warning'});
     }
  }

  savepasswordvalidate(){
    let pass=this.forgotForm.get('newpassword').value;
    let confirmpass=this.forgotForm.get('confirmpassword').value;
    if(pass==''||pass==null||pass==undefined){
      this.notificationsComponent.addToast({title:'Error', msg:'Password not to be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }else if(pass.match(this.passwordregex) == null) {
      this.notificationsComponent.addToast({title:'Error', msg:'Password Pattern not Matched', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      this.forgotForm.get('newpassword').setValue('');
      this.forgotForm.get('confirmpassword').setValue('');
      return false;
    }else if(pass!=confirmpass){
      this.notificationsComponent.addToast({title:'Alert!', msg:'New PassWord & Confirm PassWord MisMatch', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      this.forgotForm.get('confirmpassword').setValue('');
      return false;
    }
    return true;
  }

  savepassword(){
    let pass=this.forgotForm.get('newpassword').value;
    let confirmpass=this.forgotForm.get('confirmpassword').value;
    let valflag=this.savepasswordvalidate();
    if(valflag){
      this.http.get(this.baseResUrl2+'/save-new-password' + '/' + this.user + '/' + this.mobileconcat+'/'+ confirmpass +'/'+this.otp).map(res => res.json()).subscribe(data =>{
        if(data.code == "true"){
         this.openSuccessSwal();
        }else{
         this.notificationsComponent.addToast({title:'Error', msg:data.message, timeout: 5000, theme:'default', position:'top-right',type:'error'});
        }
       });
    }
  }

  showpassflag:boolean=false;
  showpass(){
    this.showpassflag = !this.showpassflag
  }

  openSuccessSwal() {
    swal({
      title: 'PassWord Reset SuccessFully!',
      type: 'success',
      confirmButtonColor: '#dd333382',
      confirmButtonText: 'Exit!..',
    }).then(() => {
      this.router.navigate(['/userlogin/login']);
    }).catch(swal.noop);
  }
  



}
