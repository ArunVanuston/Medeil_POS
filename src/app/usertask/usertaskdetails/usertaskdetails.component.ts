import { Component, OnInit } from '@angular/core';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-usertaskdetails',
  templateUrl: './usertaskdetails.component.html',
  styleUrls: ['./usertaskdetails.component.css'],
  providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})
export class UsertaskdetailsComponent implements OnInit {


  taskid: any;
  private taskValue: any;
  usertaskdetails: FormGroup;
  public rowsOnPage: number = 10;
  public sortBy: string = "";
  public sortOrder: string = "desc";

  selobj;
  username: string;
  appendval: any;
  showuser: boolean = false;
  public message: any;
  signshowimage: boolean;
  signmessage: string;
  signphoto: any;
  signimgURL: string | ArrayBuffer;
  deviceObj;
  constructor(private usertaskservice: Usertaskservice, private appComponent: AppComponent,
    private dateformat: dateFormatPipe, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private notificationsComponent: NotificationsComponent, private app: AppComponent) {
  }



  ngOnInit() {

    this.taskValue = this.route.params.subscribe(params => {
      this.taskid = +params['id'];
    });


    // this.taskid = this.route.snapshot.paramMap.get('id');

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID, branchrefid: AppComponent.branchID
    };






    this.usertaskservice.getTaskValues(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.taskid).subscribe(data => this.getTaskData(data),









        error => {
          console.log('Error occured in getTaskValues()')
        });




    this.usertaskservice.getAssignedBy(this.taskid).subscribe(data => {

      if (data) {


        this.usertaskdetails.get('task_assigned_by').setValue(data);
      }
    },
      error => {
        console.log('Error occured in getTaskValues()')
      });



    this.usertaskservice.getAssignedTo(this.taskid).subscribe(data => {
      if (data) {
        this.usertaskdetails.get('task_assigned_to').setValue(data);
        this.username = data;
      }

    },
      error => {
        console.log('Error occured in getTaskValues()')
      });


    //

    this.usertaskservice.getTaskComment(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid).subscribe(data => { this.message = data },
        error => {
          console.log('Error occured in getTaskComment()')
        });




    this.usertaskdetails = this.formBuilder.group({

      task_id: ['', []], task_number: ['', []], task_type_id: ['', []], task_title: ['', []], deptid: ['', []],
      subdeptid: ['', []], divisionid: ['', []], subdivisionid: ['', []], employeeid: ['', []], task_start_date: ['', []],
      task_due_date: ['', []], priority_id: ['', []], task_status_id: ['', []], createdby: ['', []], modifiedby: ['', []],
      companyrefid: ['', []], branchrefid: ['', []], locname: ['', []], locrefid: ['', []], description: ['', []], status: ['', []],
      completed_date: ['', []], response_date: ['', []], clientcdate: [this.dateformat.transform04(), []], clientmdate: ['', []], createddate: ['', []],
      modifieddate: ['', []], task_assigned_by: ['', []], task_assigned_to: ['', []], task_modified_by: ['', []],
      group_task_flag: ['', []], task_start_time: ['', []], task_due_time: ['', []],

      taskcomments: ['', []],
      appendval: ['', []],
    });

    //this.app.getTaskData();


  } // ngOnInit end



  userActivity() {

    this.justInitiate();
    this.deviceObj.apiname = "api/viewPendingTask";
    this.deviceObj.description = "PendingTask view";
    this.usertaskservice.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
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




  getTaskData(data: any) {

    this.userActivity();

    let k;
    let temp: number = 0;
    if (data !== undefined || data !== null) {
      for (k = 0; k < data.length; k++) {
        this.usertaskdetails.patchValue(this.fetchEidtdata(
          data[k][0],
          data[k][1],
          data[k][2],
          data[k][3],
          data[k][4],
          data[k][5],
          data[k][6],
          data[k][7],
          data[k][8],
          data[k][9],
          data[k][10]

        ));
      }
    }
  }


  fetchEidtdata(arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any, arg7: any, arg8: any, arg9: any, arg10: any) {

    return {


      task_type_id: arg0,
      task_assigned_by: arg1,
      task_assigned_to: arg2,
      createddate: arg3,
      task_due_date: arg4,
      completed_date: arg5,
      priority_id: arg6,
      response_date: arg7,
      task_status_id: arg8,
      description: arg9,
      task_id: arg10
    }
  }





  postComment() {

    // || this.usertaskdetails.get('taskcomments').value != undefined || this.usertaskdetails.get('taskcomments').value != ''

    if (this.usertaskdetails.get('taskcomments').value != null) {


      this.usertaskdetails.get('appendval').setValue(this.usertaskdetails.get('taskcomments').value);

      this.appendval = this.usertaskdetails.get('taskcomments').value;

      this.usertaskdetails.get('taskcomments').reset();

      // this.showuser = true;


      let obj = {
        employee_id: AppComponent.userID, locrefid: AppComponent.locrefID1,
        locname: AppComponent.locRefName1,
        companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
        comment: this.appendval,
        clientcdate: this.usertaskdetails.get('clientcdate').value,
        task_id: this.usertaskdetails.get('task_id').value

      }
      this.usertaskservice.saveUserTaskComment(JSON.stringify(obj)).subscribe(data => {
        if (data) {
          this.usertaskservice.getTaskComment(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { (this.message = data) },
              error => {
                console.log('Error occured in getTaskComment()')
              });
        }

      });

    }

    else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'please check the comment', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.showuser = false;
    }


  }



  signChange(event: any) {

    this.signmessage = "";

    // when the load event is fired and the file not empty
    if (event.target.files && event.target.files.length > 0) {


      //Check & Print Type Error Message
      //  var mimeType = event.target.files[0].type;
      //  if (mimeType.match(/image\/*/ ||/pdf\/*/ ||/jpg\/*/||/png\/*/ ||/jpeg\/*/||/gif\/*/) == null) {
      //    this.signshowimage=false;
      //    this.signmessage = "Please choose file appropriate format like(pdf,jpg, png,jpeg).";
      //     return;
      //  }







      if (event.target.files[0].size < 500000) {

        // Fill file variable with the file content
        this.signphoto = event.target.files[0];


        // Instantiate an object to read the file content
        let reader = new FileReader();

        //To read Encrypted file and send url to display in html
        reader.readAsDataURL(this.signphoto);
        reader.onload = (_event) => {
          this.signimgURL = reader.result;
        }

      }

      else {
        this.signmessage = "Max file Size 500KB Only & Check File Format";
      }


    }

  }



  saveFile() {

    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.signphoto);

    // Launch post request Service Call
    this.usertaskservice.saveFile(body).subscribe((data) => {

      //Employee image  notification start
      if (data == true) {

        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & EMPLOYEE IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        // this.myForm.reset();
        // (<HTMLInputElement>document.getElementById("imagefile")).value = '';
      }
      else {

        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & EMPLOYEE IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
      //Employee image  notification end

    });

  }






}