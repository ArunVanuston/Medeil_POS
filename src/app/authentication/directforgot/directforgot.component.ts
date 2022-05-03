import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-directforgot',
  templateUrl: './directforgot.component.html',
  styleUrls: ['./directforgot.component.css'],
  providers:[NotificationsComponent]
})

export class DirectforgotComponent implements OnInit {
  directforgotForm:FormGroup;
  passwordregex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");  //^[A-Z]
 
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private notificationsComponent: NotificationsComponent,
    private http: Http,private router: Router) { }
  user:any;
  baseResUrl2 = environment.medauthbackend.baseResUrl2;
  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user');
    this.directforgotForm = this.fb.group({
      //phone: ['', []],
      newpassword: ['', []],
      confirmpassword: ['', []],
      //enteredpassword:['',[]],
    });
  }

  validatepassword(){
    var flagset=1;
    var newpass=this.directforgotForm.get('newpassword').value;
    var cnfrmpass=this.directforgotForm.get('confirmpassword').value;
    if (newpass.match(this.passwordregex) == null) {
      this.notificationsComponent.addToast({title:'Error', msg:'Password Pattern not Matched', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      this.directforgotForm.get('confirmpassword').setValue('');
      flagset=0;
    }else if(newpass!=cnfrmpass){
      this.notificationsComponent.addToast({title:'Error', msg:'New Password & Confirm Password doesnot Match', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      this.directforgotForm.get('confirmpassword').setValue('');
      flagset=0;
    }
    return flagset;
  }

  savepassword(){
    let valflag=this.validatepassword();
    if(valflag==1){ //this.user
      //this.openSuccessSwal();
      this.http.get(this.baseResUrl2+'/user-new-password-create/' + this.user + '/'+ this.directforgotForm.get('confirmpassword').value).map(res => res).subscribe(data =>{
        let datamsg = JSON.stringify(data);
        let val=datamsg.split(":")[1].substring(1,5);
        if(val== "true"){
         this.openSuccessSwal();
        }else{
         this.notificationsComponent.addToast({title:'Error', msg:'Password Reset Failed', timeout: 5000, theme:'default', position:'top-right',type:'error'});
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
      title: 'PassWord Setup SuccessFully!',
      type: 'success',
      confirmButtonColor: '#dd333382',
      confirmButtonText: 'Exit!..',
    }).then(() => {
        this.router.navigate(['/userlogin/login']);
      }).catch(swal.noop);
  }
 

}
