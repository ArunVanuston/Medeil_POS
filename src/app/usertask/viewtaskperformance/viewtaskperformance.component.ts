import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Usertaskservice } from '../usertask.service';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewtaskperformance',
  templateUrl: './viewtaskperformance.component.html',
  styleUrls: ['./viewtaskperformance.component.css'],
  providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})
export class ViewTaskPerformanceComponent implements OnInit {




  myDate = new Date();

  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public filterQuery1: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";

  wholeData: any = [];
  selobj;
  deviceObj;
  optionValue: any;
  taskstatus: any;
  data1: any;
  closeResult: string;
  remarksValue: any;
  public remarkval: string;
  remar: any;

  notStartedCount: number;
  openCount: number;
  inProgressCount: number;
  pendingCount: number;

  filtered: any = [];
  colors: number;
  completeCount: number;
  abandonCount: number;
  tskStatsArr = [];

  taskstatusArrLoaded = [];
  indexBtn: number;



  constructor(private usertaskservice: Usertaskservice,
    private notificationsComponent: NotificationsComponent,
    private modalService: NgbModal, private appComponent: AppComponent,
    private dateformat: dateFormatPipe) { }

  ngOnInit() {


    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid: AppComponent.branchID,

    };

    this.ViewTaskPerformance();







  }

  reviewPeriod(period: string) {
    if (period == "none") {
      this.ViewTaskPerformance();
    }

   
      this.usertaskservice.reviewPeriod(this.selobj.companyid, this.selobj.branchid, this.selobj.locname,
        this.selobj.locrefid, period).subscribe(data => { this.data = data },
          err => {
            console.log('Error Occured reviewPeriod()');
          });
   

  }

  // getTaskCount() {
  //   this.usertaskservice.getTaskCount(this.selobj.companyid, this.selobj.branchid,
  //     this.selobj.locname,
  //     this.selobj.locrefid, parseInt(this.selobj.userid)).subscribe(data => {
  //       this.taskcount(data);
  //     },
  //       err => {
  //         console.log('Error Occured getTaskCount()');
  //       });
  // }









  closeMod(c) {
    this.remar = '';
    this.remarkval = "";
    c('Close click');
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










  ViewTaskPerformance() {
    var frmdata1 = {
      frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid,
      companyrefid: this.selobj.companyid, locname: this.selobj.locname, branchrefid: this.selobj.branchid, employeeid: sessionStorage.getItem('indvuserid')
    };
    this.usertaskservice.ViewTaskPerformance(JSON.stringify(frmdata1)).subscribe(data => {
      this.data = data;
      this.justInitiate();
      this.deviceObj.apiname = "api/viewUserTask";
      this.deviceObj.description = "UserTask view";
      this.usertaskservice.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
        errorCode => console.log(errorCode));
    },
      errorCode => console.log(errorCode));
  }

  getTaskStatus() {
    this.usertaskservice.getTaskStatus(this.selobj.companyid, this.selobj.branchid, this.selobj.locname,
      this.selobj.locrefid).subscribe(data => {
        this.taskstatus = data;
        this.taskstatusArrLoaded = Object.assign([], this.taskstatus);
      },
        err => {
          console.log('Error Occured getTaskStatus()');
        });
  }


  // changeTaskStatus(data: any) {
  //   let dataLength = data.length;
  //   let taskStatusLength = this.taskstatus.length;
  //   let size = 5;
  //   for (let i = 0; i < dataLength; i++) {
  //     for (let j = 0; j < taskStatusLength; j++) {
  //       if (data[i][3] != this.taskstatus[j][1]) {
  //         this.tskStatsArr.push(this.taskstatus[j][0] + " " + this.taskstatus[j][1]);
  //       }
  //     }
  //   }
  //   // console.log(this.tskStatsArr);
  //   console.log(this.tskStatsArr1.push(this.chunk(this.tskStatsArr, 5)));
  // }
  // chunk(array, size) {
  //   const chunked_arr = [];
  //   let index = 0;
  //   while (index < array.length) {
  //     chunked_arr.push(array.slice(index, size + index));
  //     index += size;
  //   }
  //   return chunked_arr;
  // }

  // selected(optionVal: any) {
  //   this.optionValue = optionVal;
  // }

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
