import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Usertaskservice } from '../usertask.service';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewindividualtasks',
  templateUrl: './viewindividualtasks.component.html',
  styleUrls: ['./viewindividualtasks.component.css'],
  providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})
export class viewIndividualTasksComponent implements OnInit {



  btnBool: boolean;
  selectControl: FormControl = new FormControl()
  public remarks = new FormControl()
  public completeDate: any;
  myDate = new Date();

  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
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
      locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid: AppComponent.branchID
    };

    this.viewUserTask();

    this.selectControl.setValue("opt0");

    this.getTaskStatus();

    this.getTaskCount();

  }



  getTaskCount() {
    this.usertaskservice.getTaskCount(this.selobj.companyid, this.selobj.branchid,
      this.selobj.locname,
      this.selobj.locrefid, sessionStorage.getItem('indvuserid')).subscribe(data => {
        this.taskcount(data);

      },
        err => {
          console.log('Error Occured getTaskCount()');
        });
  }

  taskcount(data: any) {
    if (data) {


      let length = data.length;

      let countNS = 0;
      let countO = 0;
      let countIP = 0;
      let countP = 0;
      let countC = 0;
      let countA = 0;

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

        else if (countC == 0 || undefined) {
          this.abandonCount = 0;
        }

        // alert(this.notStartedCount);
        // console.log("norm " + data[i][0]);

      }


    }
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






  popUp(ind: number) {
    this.indexBtn = ind;
  }



  onComplete(val) {

    if (this.selectControl.value == "opt0") {
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please update task status....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return;
    }
    if (new Date(val[8]) == undefined || new Date(val[8]) == null) {
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please update completed date....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return;
    }
    if (new Date(val[8]) < new Date(val[6])) {
      this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please check completed date should not lesser than start date....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return;
    }

    let date1 = new Date(val[6]);
    let dateLet = date1.setDate(date1.getDate() + 1);
    let datePlusOne = this.dateformat.transform02(dateLet);

    let startDate = val[6];
    let dueDate = val[7];
    let completedDate = val[8];

    // let middleDate = (startDate + dueDate / 2);

    // console.log("m " + middleDate);

    console.log("startDate :" + startDate + " " + "datePlusOne :" + datePlusOne + "  " + "dueDate :" + dueDate + " " + "completedDate :" + completedDate);

    // alert("startDate :" + startDate + " " + "datePlusOne :" + datePlusOne + "  " + "dueDate :" + dueDate + " " + "completedDate :" + completedDate);
    // if (new Date(val[6]) == new Date(val[8])) {
    //   this.colors = 1;
    // }

    if (startDate == completedDate) {
      this.colors = 1;
    }
    // else if (startDate < datePlusOne && completedDate == dueDate || datePlusOne < dueDate && completedDate == dueDate) {

    else if (datePlusOne == completedDate || completedDate < dueDate) {
      this.colors = 2;
    }
    else if (completedDate > dueDate) {
      this.colors = 3;
    }
    // alert(this.colors);
    this.wholeData = [];
    val[3] = this.selectControl.value;
    if (val[8] == null) {
      val[8] = this.dateformat.transform02(Date.now());
      // val[3] = this.selectControl.value;
      // employeeid: val[5],
      this.wholeData.push({
        // task_title: val[1], task_priority_name: val[2],
        // task_assigned_by: val[4],
        // task_start_date: val[6], task_due_date: val[7],
        // task_id: val[9],
        completed_date: val[8], task_status_name: val[3], task_assigned_by: sessionStorage.getItem('indvuserid'),
        companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
        task_number: val[0], colors: this.colors, remarks: this.remarkval
      });

      let obj = Object.assign({}, ...this.wholeData);
      Object.keys(obj).forEach(key => obj[key] == undefined || obj[key] == "" ? delete obj[key] : {});

      this.usertaskservice.updateViewIndividualTask(obj).subscribe(data1 => {
        this.data1 = data1;
        this.indexBtn = -1;
        this.selectControl.setValue("opt0");
        if (this.data1) {
          this.viewUserTask();

          this.remarkval = "";
          this.remar = "";
          this.selectControl.setValue("opt0");


          console.log("Val 1 " + val);
          console.log(this.wholeData);
          val = [];
          val = {};
        }
      });
    }

    else {
      val[3] = this.selectControl.value;
      // console.log("Val 2" + val);
      // employeeid: val[5],
      this.wholeData.push({
        //  task_title: val[1], task_priority_name: val[2],
        // task_assigned_by: val[4], 
        // task_start_date: val[6], task_due_date: val[7],    task_id: val[9],
        completed_date: val[8], task_status_name: val[3], task_assigned_by: sessionStorage.getItem('indvuserid'),
        companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
        task_number: val[0], colors: this.colors, remarks: this.remarkval
      });

      console.log("else");
      let obj = Object.assign({}, ...this.wholeData);
      Object.keys(obj).forEach(key => obj[key] == undefined || obj[key] == "" ? delete obj[key] : {});

      this.usertaskservice.updateViewIndividualTask(obj).subscribe(data1 => {
        this.data1 = data1;
        this.selectControl.setValue("opt0");
        if (this.data1) {
          this.indexBtn = -1;
          this.viewUserTask();
          this.remarkval = "";
          this.remar = "";
          this.selectControl.setValue("opt0");
          console.log(this.wholeData);
          val = [];
          val = {};
        }
      });
    }


  }





  viewUserTask() {

    var frmdata1 = {
      frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid,
      companyrefid: this.selobj.companyid, locname: this.selobj.locname, branchrefid: this.selobj.branchid, employeeid: sessionStorage.getItem('indvuserid')
    };

    this.usertaskservice.viewUserTask(JSON.stringify(frmdata1)).subscribe(data => {
      this.data = data;
      this.getTaskCount();
      this.justInitiate();


      this.deviceObj.apiname = "api/viewUserTask";
      this.deviceObj.description = "UserTask view";
      this.usertaskservice.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
        errorCode => console.log(errorCode));

    },
      errorCode => console.log(errorCode));
  }

  getTaskStatus() {
    this.taskstatus = [["Not Started", "Not Started"], ["Open", "Open"], ["In Progress", "In Progress"], ["Pending", "Pending"],
    ["Complete", "Complete"], ["Abandon", "Abandon"]];
    this.taskstatusArrLoaded = Object.assign([], this.taskstatus);

  }

  // getTaskStatus() {

  //   this.usertaskservice.getTaskStatus(this.selobj.companyid, this.selobj.branchid, this.selobj.locname,
  //     this.selobj.locrefid).subscribe(data => {
  //       this.taskstatus = data;
  //       this.taskstatusArrLoaded = Object.assign([], this.taskstatus);
  //     },
  //       err => {
  //         console.log('Error Occured getTaskStatus()');
  //       });
  // }


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

  taskStatusId(val) {
    // alert(val)
    this.taskstatus = [];
    this.taskstatus = this.taskstatusArrLoaded.filter(value => value[1] != val)
  }





}
