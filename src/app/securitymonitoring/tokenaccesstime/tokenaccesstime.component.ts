import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { securitymonitoringService } from '../securitymonitoring.service';
import { AppComponent } from 'app/app.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tokenaccesstime',
  templateUrl: './tokenaccesstime.component.html',
  styleUrls: ['./tokenaccesstime.component.css'],
  providers:[NotificationsComponent,securitymonitoringService]
})
export class TokenaccesstimeComponent implements OnInit {
  i: number;
  atv: any;
  rtv: any;
  data: any;
 

  constructor(private formbuilder:FormBuilder, 
              private notification:NotificationsComponent,
              private router:Router,
              private smservice:securitymonitoringService,
              private appcomponent:AppComponent) { }
  
              TokenaccesstimForm:FormGroup;
  ngOnInit() {
    this.TokenaccesstimForm = this.formbuilder.group({

      client_id:['',[]],
      resource_ids:['',[]],
      scope:['',[]],
      access_token_validity:['',[]],
      refresh_token_validity:['',[]]

    });

    this.smservice.gettokendetails().subscribe(data =>{
      this.tokendetails(data),this.atv=data[0][3],this.rtv =data[0][3]
    })
  }

  tokendetails(data:any){
    if (data !== undefined || data !== null) {
      for (this.i = 0; this.i < data.length; this.i++) {
        this.TokenaccesstimForm.patchValue(this.fetchtoken(
          data[this.i][0],
          data[this.i][1],
          data[this.i][2],
          data[this.i][3],
          data[this.i][4]
        ));
      }
    }
  }
  fetchtoken(cientid:any,resourceid:any,scope:any,accessvalidity:any,refreshvalidity:any){
    return{
      client_id:cientid,
      resource_ids:resourceid,
      scope:scope,
      access_token_validity:accessvalidity,
      refresh_token_validity:refreshvalidity

    }
  }

onSubmit(){
  this.smservice.savetime(this.TokenaccesstimForm.get('client_id').value,this.TokenaccesstimForm.get('access_token_validity').value,this.TokenaccesstimForm.get('refresh_token_validity').value).
                subscribe(data =>{this.data=data
                if(this.data == true){
                  // this.notification.addToast({ title: 'Error Message', msg: 'Updated Succeessfully!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                  this.openSuccessSwal();
                }
                 else{
                  this.notification.addToast({ title: 'Error Message', msg: 'Not Updated!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                 }
                
                })
}
 
 
openSuccessSwal() {
  swal({
    title: 'Good job!',
    text: "Data Updated Sucessfully",
    type: 'success'
  }).catch(swal.noop);
}

// opensaveSwal1() {
//   swal({
//     title: 'Do you want Update?',
//     type: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes'
//   }).then(() => {
  
//     this.onSubmit();
  
  
    
//   }).catch(swal.noop);
}

