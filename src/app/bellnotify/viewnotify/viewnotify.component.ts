import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { BellnotifyService } from '../bellnotify.service';

@Component({
  selector: 'app-viewnotify',
  templateUrl: './viewnotify.component.html',
  providers:[NotificationsComponent,BellnotifyService]
})
export class viewnotifyComponent implements OnInit {
  rowsOnPage:number=10;

  notifylists=[];
  notifylistscopy=[];
 
  gifFail:boolean=true;
  constructor(private notifyservice:BellnotifyService,private fb: FormBuilder,private notificationsComponent: NotificationsComponent) { }

  ngOnInit() { 
    this.notifyservice.ViewNotifications().subscribe(data => {
      this.notifylists=data, this.notifylistscopy=data },error => { console.log(error) 
    });
    setTimeout(() => {
      this.gifFail=false;
    },2100)
  }

  // getclientwise(){
  //   this.notifyservice.ViewClientNotifications(291,2).subscribe(data => {
  //    this.notifylistscopy=data },error => { console.log(error) 
  //   });
  // }

  //search titles
  searchtitle(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.notifylistscopy).filter(
      item => ((item.msgTitle.toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.notifylists=srch;
    }else{
      this.notifylists=this.notifylistscopy;
    }
  }

  


}
