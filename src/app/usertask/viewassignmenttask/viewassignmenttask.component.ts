import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Usertaskservice } from '../usertask.service';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewassignmenttask',
  templateUrl: './viewassignmenttask.component.html',
  styleUrls: ['./viewassignmenttask.component.css'],
  providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})
export class ViewAssignmentTaskComponent implements OnInit {





  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


  selobj;
  deviceObj;
  remarkval: any;
  remarksValue: any;
  remar: any;
  closeResult: string;
  wholeData: any = {};
  notStartedCount: number;
  openCount: number;
  inProgressCount: number;
  pendingCount: number;
  completeCount: number;
  abandonCount: number;
  totTskCot: number;

  countHigh: number;
  countMedium: number;
  countLow: number;

  constructor(private usertaskservice: Usertaskservice, private modalService: NgbModal, private notificationsComponent: NotificationsComponent, private appComponent: AppComponent, private dateformat: dateFormatPipe) { }

  ngOnInit() {


    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid: AppComponent.branchID
    };

    this.viewAssignedTask();

    this.getTaskCount();

    this.getPriority();
  }



  viewAssignedTask() {



    var frmdata1 = {
      frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid,
      companyrefid: this.selobj.companyid, locname: this.selobj.locname, branchrefid: this.selobj.branchid,
      employeeid: sessionStorage.getItem('indvuserid')
    };

    this.usertaskservice.viewAssignedTask(JSON.stringify(frmdata1)).subscribe(data => {
      this.data = data,

        this.justInitiate();
      this.deviceObj.apiname = "api/viewUserTask";
      this.deviceObj.description = "UserTask view";
      this.usertaskservice.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
        errorCode => console.log(errorCode));

    },


      errorCode => console.log(errorCode));

  }



  onComplete(val) {

    if (this.remarkval == null || undefined || this.remarkval.length == 0) {
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'Please give remarks.', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return;
    }

    this.wholeData.push({
      task_number: val[0],
      remarks: this.remarkval,
      companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
    })

  }

  maxlength(remVal) {
    let remarkValLength = remVal;
    // console.log(this.remarksValue.length);
    if (remarkValLength > 299 && remarkValLength < 301) {
      if (remarkValLength == 300)
        setTimeout(() => {
          this.notificationsComponent.addToast({ title: 'Error', msg: 'You can type only 300 caharacters....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

        }, 1000);
    }
  }




  closeMod(c) {
    this.remar = '';
    this.remarkval = "";
    c('Close click');
  }


  openRemarksModal(event, openRemModal) {

    if (event == "javascript:;") {
      event = 'openRemMod';

    }
    if (event == 'openRemMod') {
      this.open(openRemModal);
    }
    else {
      return;
    }
  }



  open(openRemModal) {

    this.modalService.open(openRemModal).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },

      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      });
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  saveRemarks(c) {

    this.remarkval = this.remarksValue
    this.remarkval = this.remar;

    if (this.remarkval == null || undefined || this.remarkval.length == 0)
      this.notificationsComponent.addToast({
        title: 'Error',
        msg: 'Please give remarks....', timeout: 5000, theme: 'default',
        position: 'top-right', type: 'error'
      });
    if (this.remarkval.length > 0)
      c('Close click');
    this.remar = "";
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


  getTaskCount() {
    this.usertaskservice.getTaskCount(this.selobj.companyid, this.selobj.branchid,
      this.selobj.locname,
      this.selobj.locrefid, sessionStorage.getItem('indvuserid')).subscribe(data => {
        this.taskCount(data);
        // parseInt(this.selobj.userid)
      },
        err => {
          console.log('Error Occured getTaskCount()');
        });
  }






  taskCount(data: any) {
    if (data) {

      let length = data.length;

      let countNS = 0;
      let countO = 0;
      let countIP = 0;
      let countP = 0;
      let countC = 0;
      let countA = 0;

      this.notStartedCount = 0;
      this.openCount = 0;
      this.inProgressCount = 0;
      this.pendingCount = 0;
      this.completeCount = 0;
      this.abandonCount = 0;


      for (let i = 0; i < length; i++) {

        if (data[i][0] == "Not Started") {
          countNS++;
          this.notStartedCount = countNS;

        }

        else if (countNS == 0 || undefined) {
          this.notStartedCount = 0;
        }

        if (data[i][0] == "Open") {
          countO++;
          this.openCount = countO;

        }
        else if (countO == 0 || undefined) {
          this.openCount = 0;
        }

        if (data[i][0] == "In Progress") {
          countIP++;
          this.inProgressCount = countIP;

        }
        else if (countIP == 0 || undefined) {
          this.inProgressCount = 0;
        }
        if (data[i][0] == "Pending") {
          countP++;
          this.pendingCount = countP;

        }
        else if (countP == 0 || undefined) {
          this.pendingCount = 0;
        }

        if (data[i][0] == "Complete") {
          countC++;
          this.completeCount = countC;

        }

        else if (countC == 0 || undefined) {
          this.completeCount = 0;
        }

        if (data[i][0] == "Abandon") {
          countA++;
          this.abandonCount = countA;

        }

        else if (countA == 0 || undefined) {
          this.abandonCount = 0;
        }

        // alert(this.notStartedCount);
        // console.log("norm " + data[i][0]);

      }

      this.totTskCot = this.notStartedCount + this.openCount + this.inProgressCount + this.pendingCount + this.completeCount + this.abandonCount;
    }
  }


  getPriority() {
    this.usertaskservice.getPriority(this.selobj.companyid, this.selobj.branchid,
      this.selobj.locname,
      this.selobj.locrefid, sessionStorage.getItem('indvuserid')).subscribe(data => {
        this.taskPriority(data);

        // parseInt(this.selobj.userid)
      },
        err => {
          console.log('Error Occured getPriority()');
        });
  }

  taskPriority(data: any) {
    if (data) {

      let length = data.length;


      let countL = 0;
      let countM = 0;
      let countH = 0;

      for (let i = 0; i < length; i++) {

        if (data[i][0] =="Low") {
          countL++;
          this.countLow = countL;

        }

        else if (countL == 0 || undefined) {
          this.countLow = 0;
        }

        if (data[i][0] == "Medium") {
          countM++;
          this.countMedium = countM;

        }
        else if (countM == 0 || undefined) {
          this.countMedium = 0;
        }

        if (data[i][0] == "High") {
          countH++;
          this.countHigh = countH;

        }
        else if (countH == 0 || undefined) {
          this.countHigh = 0;
        }
      }
    }
  }







}
