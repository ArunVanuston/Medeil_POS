import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { environment } from 'environments/environment.prod';
import swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html'
})

export class ChangepasswordComponent implements OnInit {
  changepasswordForm:FormGroup;
  passwordregex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");  //^[A-Z]
 
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private notificationsComponent: NotificationsComponent,
    private http: Http,private router: Router) { }
  baseResUrl2 = environment.medauthbackend.baseResUrl2;
  payurl = environment.backend.paymentUrl;
  
  ngOnInit() {
    this.changepasswordForm = this.fb.group({
      currentpassword: ['', []],
      newpassword: ['', []],
      confirmpassword: ['', []],
      //enteredpassword:['',[]],
    });
  }

  validatepassword(){
    var flagset=1;
    var currentpass=this.changepasswordForm.get('currentpassword').value;
    var newpass=this.changepasswordForm.get('newpassword').value;
    var cnfrmpass=this.changepasswordForm.get('confirmpassword').value;
    if (currentpass == '' || currentpass==null || currentpass==undefined) {
      this.notificationsComponent.addToast({title:'Alert MSG', msg:'Enter Current Password', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      flagset=0;
    }else if (newpass == '' || newpass==null || newpass==undefined) {
      this.notificationsComponent.addToast({title:'Alert MSG', msg:'Enter New Password', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      flagset=0;
    }else  if (cnfrmpass == '' || cnfrmpass==null || cnfrmpass==undefined) {
      this.notificationsComponent.addToast({title:'Alert MSG', msg:'Enter Confirm Password', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      flagset=0;
    }else if (newpass.match(this.passwordregex) == null) {
      this.notificationsComponent.addToast({title:'Error', msg:'New Password Pattern not Matched', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      this.changepasswordForm.get('newpassword').setValue('');
      flagset=0;
    }else if(newpass!=cnfrmpass){
      this.notificationsComponent.addToast({title:'Error', msg:'New Password & Confirm Password doesnot Match', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      this.changepasswordForm.get('confirmpassword').setValue('');
      flagset=0;
    }
    return flagset;
  }

  savepassword(){
    let valflag=this.validatepassword();
    if(valflag==1){ //this.user
      //this.openSuccessSwal();
      this.http.get(this.payurl+'/change-password/' + sessionStorage.getItem('indvuserid') + '/'+ this.changepasswordForm.get('currentpassword').value + '/'+ this.changepasswordForm.get('confirmpassword').value)
      .map(res => res.json()).subscribe(data =>{  alert(data+"--"+JSON.stringify(data));
        if(data== '0'){
          this.notificationsComponent.addToast({title:'Alert MSG', msg:'UserName Not Match', timeout: 5000, theme:'default', position:'top-right',type:'error'});
        }else if(data== '1'){
          this.notificationsComponent.addToast({title:'Alert MSG', msg:'Current Password Not Match', timeout: 5000, theme:'default', position:'top-right',type:'error'});
          this.changepasswordForm.get('currentpassword').setValue('');
        }else if(data== '2'){
          this.notificationsComponent.addToast({title:'Alert MSG', msg:'Current & New Password are Same', timeout: 5000, theme:'default', position:'top-right',type:'error'});
          this.changepasswordForm.get('newpassword').setValue('');this.changepasswordForm.get('confirmpassword').setValue('');
        }else if(data== '3'){
          this.notificationsComponent.addToast({title:'Success MSG', msg:'Password Changed Successfully', timeout: 5000, theme:'default', position:'top-right',type:'success'});
          setTimeout(() => {
            this.router.navigate(['/userlogin/login']);
          }, 1300);
        }else{
         this.notificationsComponent.addToast({title:'Error MSG', msg:'Password Changed Failed', timeout: 5000, theme:'default', position:'top-right',type:'error'});
        }
       });
    }
  }

  showpassflag1:boolean=false;
  showpassflag2:boolean=false;
  showpass(index){
    if(index==1){
      this.showpassflag1 = !this.showpassflag1
    }else{
      this.showpassflag2 = !this.showpassflag2
    }
    
  }
 

}
