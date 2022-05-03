import { Component, OnInit } from '@angular/core';
import { securitymonitoringService } from '../securitymonitoring.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-userlock',
  templateUrl: './userlock.component.html',
  styleUrls: ['./userlock.component.css'],
  providers:[NotificationsComponent,securitymonitoringService]
})
export class UserlockComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;

  UserlockFrom:FormGroup;
  lock: any;
 

  constructor(private semonitoringservice:securitymonitoringService,
              private formbuilder:FormBuilder,
              private notification:NotificationsComponent,
              private router:Router,
              private appcomponent:AppComponent) { }

  ngOnInit() {






    this.semonitoringservice.getuserdata().subscribe(data => {this.data = data
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'User not available..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }

  islock(val:any){
    this.semonitoringservice.updatetolock(val).subscribe(data =>{data
      if(data == true){
        this.ngOnInit();
      }});
   
  }

isunlock(val1:any){
  this.semonitoringservice.updatetounlock(val1).subscribe(data =>{data
  if(data == true){
    this.ngOnInit();
  }});
}



opensaveSwal(val:any) {
  swal({
    title: 'Do you want Lock this User?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(() => {
    
    this.islock(val);
  
  
    
  }).catch(swal.noop);
}

opensaveSwal1(val1:any) {
  swal({
    title: 'Do you want Unlock this User?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(() => {
  
    this.isunlock(val1);
  
  
    
  }).catch(swal.noop);
}

}
