import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-pendingtasks',
  templateUrl: './pendingtasks.component.html',
  styleUrls: ['./pendingtasks.component.css'],
  providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})
export class PendingtasksComponent implements OnInit {
  deviceObj;

  selobj;
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";

  constructor(private usertaskservice: Usertaskservice, private notificationsComponent: NotificationsComponent,

    private appComponent: AppComponent, private dateformat: dateFormatPipe
  ) { }
  ngOnInit() {


    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, companyid: AppComponent.companyID, 
      branchid: AppComponent.branchID, statusm:10, statuss:4
    };

    this.viewPendingTask();




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




  viewPendingTask() {

    let frmdata1 = {
      frmint1: '', frmstr1: '', createdby: '',
      locrefid: this.selobj.locrefid,
      companyrefid: this.selobj.companyid, locname: this.selobj.locname, 
      branchrefid: this.selobj.branchid,
      task_status_id: this.selobj.statusm
    };


    let frmdata2 = {
      frmint1: '', frmstr1: '', createdby: '',
      locrefid: this.selobj.locrefid,
      companyrefid: this.selobj.companyid, locname: this.selobj.locname, branchrefid: this.selobj.branchid,
      task_status_id: this.selobj.statuss
    };

    if (this.selobj.companyid == 15) {
      this.usertaskservice.viewPendingTask(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },
        errorCode => console.log(errorCode));

      this.justInitiate();
      this.deviceObj.apiname = "api/viewPendingTask";
      this.deviceObj.description = "PendingTask view";
      this.usertaskservice.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
        errorCode => console.log(errorCode));
    }

    else if  (this.selobj.companyid == 1) {
      this.usertaskservice.viewPendingTask(JSON.stringify(frmdata2)).subscribe(data => { this.data = data },
        errorCode => console.log(errorCode));

      this.justInitiate();
      this.deviceObj.apiname = "api/viewPendingTask";
      this.deviceObj.description = "PendingTask view";
      this.usertaskservice.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
        errorCode => console.log(errorCode));
    }



  }


}
