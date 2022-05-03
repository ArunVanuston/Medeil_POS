import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Usertaskservice } from '../usertask.service';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-viewmytasks',
  templateUrl: './viewmytasks.component.html',
  styleUrls: ['./viewmytasks.component.css'],
  providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})
export class ViewmytasksComponent implements OnInit {





  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


    selobj;
    deviceObj;

  constructor(private usertaskservice: Usertaskservice, private notificationsComponent: NotificationsComponent, private appComponent: AppComponent, private dateformat: dateFormatPipe) { }

  ngOnInit() {


    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid:AppComponent.branchID };

this.viewUserTask();


  }



viewUserTask(){



  var frmdata1 = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
  companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };

  this.usertaskservice.viewUserTask(JSON.stringify(frmdata1)).subscribe(data => { this.data = data,

    this.justInitiate();
    this.deviceObj.apiname = "api/viewUserTask";
    this.deviceObj.description = "UserTask view";
    this.usertaskservice.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
      errorCode => console.log(errorCode));
  
  },


    errorCode => console.log(errorCode));










}



justInitiate() {



  this.deviceObj = {
    userid: AppComponent.userID,
    companyrefid: AppComponent.companyID,
    branchrefid: AppComponent.branchID,
    locname: AppComponent.locRefName1,
    locrefid: AppComponent.locrefID1,
    ipaddress: this.appComponent.ipAddress,
    browsertype: this.appComponent.browser,
    ostype: this.appComponent.os,
    osversion: this.appComponent.osversion,
    devicetype: this.appComponent.devicetype,
    apiname: '',
    description: '',
    clientcdate: this.dateformat.transform04()

  };

}




}
