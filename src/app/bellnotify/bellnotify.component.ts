import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { BellnotifyService } from './bellnotify.service';

@Component({
  selector: 'app-bellnotify',
  templateUrl: './bellnotify.component.html',
  providers:[BellnotifyService]
})
export class BellnotifyComponent implements OnInit {
  bellnotifyForm:FormGroup;
  countrylist=[];
  constructor(private formBuilder: FormBuilder,private notifyservice:BellnotifyService,private notificationsComponent: NotificationsComponent) { }
 
  ngOnInit() {
    this.bellnotifyForm=this.formBuilder.group({
      msgTitle: ['', []],
      msgDescription: ['', []],  
      msgUrl:['',[]],
      msgType:['opt1',[]],
      countryId:['opt1',[]],
      editionId:['opt1',[]],
      createdOn:[sessionStorage.getItem('indvuserid'),[]],
      userId:[0,[]]
    });

    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1 };
    this.notifyservice.getcountry(JSON.stringify(frmdata)).subscribe(data => { this.countrylist = data,
        err => {
          console.log('Error occured On getcountry()');
        }
    });
  }

  notifyValidate(){
    let msgtitle=this.bellnotifyForm.get('msgTitle').value;
    let country=this.bellnotifyForm.get('countryId').value;
    let edition=this.bellnotifyForm.get('editionId').value;
    let msgtype=this.bellnotifyForm.get('msgType').value;
    let msgdesc=this.bellnotifyForm.get('msgDescription').value;
    if(msgtitle==''||msgtitle==null||msgtitle==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Enter Notification Title.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      return false;
    }else if(country=='opt1'||country==''||country==null||country==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Select Country', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      return false;
    }else if(edition=='opt1'||edition==''||edition==null||edition==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Select Edition', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      return false;
    }else if(msgtype=='opt1'||msgtype==''||msgtype==null||msgtype==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Select Notification Send', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      return false;
    }else if(msgdesc==''||msgdesc==null||msgdesc==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Enter Notification Description.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      return false;
    }
    return true;
  }

  SaveNotifyRecord(){
    let valflag=this.notifyValidate();
    if(valflag){
      let msgtype=this.bellnotifyForm.get('msgType').value;
      if(msgtype==1){
        this.bellnotifyForm.get('countryId').setValue(0);
        this.bellnotifyForm.get('editionId').setValue(0);
      }else if(msgtype==2){
        this.bellnotifyForm.get('editionId').setValue(0);
      }else if(msgtype==3){
        this.bellnotifyForm.get('countryId').setValue(0);
      }
      this.notifyservice.SaveNotifyRecord(this.bellnotifyForm.value).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'Success MESSAGE', msg: 'Notification Saved Successfully.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          this.ngOnInit();
        }
        err => {
          console.log('Error occured On getcountry()');
        }
      });
    }
  }


}
