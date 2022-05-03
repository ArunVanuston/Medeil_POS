import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-viewusertask',
  templateUrl: './viewusertask.component.html',
  styleUrls: ['./viewusertask.component.css'],
  providers: [Usertaskservice, NotificationsComponent]
})
export class ViewusertaskComponent implements OnInit {



  viewusertask: FormGroup;

  public rowsOnPage: number = 10;
  public sortBy: string = "";
  public sortOrder: string = "desc";

  selobj;
  dept: any;
  subdept: any;
  division: any;
  subdivision: any;
  empname: any;
  taskstatus: any;
  taskspriority: any;
  data: any;
  tasktype: any;
  retrunFlag: boolean ;










  constructor(private usertaskservice: Usertaskservice, private notificationsComponent: NotificationsComponent) { }

  ngOnInit() {
  

   alert(this.data);

    const task_type_id = new FormControl("opt1", Validators.required);


    const task_number = new FormControl('0');
    const task_title = new FormControl();
    const deptid = new FormControl("opt1", Validators.required);
    const subdeptid = new FormControl();
    const divisionid = new FormControl();
    const subdivisionid = new FormControl();
    const employeeid = new FormControl(0);
    const task_start_date = new FormControl();
    const task_due_date = new FormControl();
    const task_start_time = new FormControl();
    const task_due_time = new FormControl();
    const priority_id = new FormControl();
    const task_status_id = new FormControl(0);
    const createdby = new FormControl(0);
    const modifiedby = new FormControl(0);
    const description = new FormControl();
    const status = new FormControl(0);
    const createddate = new FormControl();
    const modifieddate = new FormControl();
    const task_assigned_by = new FormControl('0');
    const task_assigned_to = new FormControl('0');
    const task_modified_by = new FormControl('0');
    const group_task_flag = new FormControl('0');
    const companyrefid = new FormControl();
    const branchrefid = new FormControl();
    const locname = new FormControl();
    const locrefid = new FormControl();


    this.viewusertask = new FormGroup({



      task_type_id: task_type_id,
      task_number: task_number,
      task_title: task_title,
      deptid: deptid,
      subdeptid: subdeptid,
      divisionid: divisionid,
      subdivisionid: subdivisionid,
      employeeid: employeeid,
      task_start_date: task_start_date,
      task_due_date: task_due_date,
      task_start_time: task_start_time,
      task_due_time: task_due_time,
      priority_id: priority_id,
      task_status_id: task_status_id,
      createdby: createdby,
      modifiedby: modifiedby,
      description: description,
      status: status,
      // completed_date: completed_date,
      // response_date: response_date,
      // clientcdate: clientcdate,
      // clientmdate: clientmdate,
      createddate: createddate,
      modifieddate: modifieddate,
      //  related_document:related_document,
      // document_title: document_title,
      task_assigned_by: task_assigned_by,
      task_assigned_to: task_assigned_to,
      task_modified_by: task_modified_by,
      group_task_flag: group_task_flag,
      companyrefid: companyrefid,
      branchrefid: branchrefid,
      locname: locname,
      locrefid: locrefid


    });


    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID, branchrefid: AppComponent.branchID
    };




    this.viewusertask.get('task_type_id').setValue('opt1');


    this.viewusertask.get('companyrefid').setValue(AppComponent.companyID);
    this.viewusertask.get('branchrefid').setValue(AppComponent.branchID);
    this.viewusertask.get('locname').setValue(AppComponent.locrefID);
    this.viewusertask.get('locrefid').setValue(AppComponent.shopID);
    this.viewusertask.get('deptid').setValue('opt1');
    this.viewusertask.get('subdeptid').setValue('opt1');
    this.viewusertask.get('divisionid').setValue('opt1');
    this.viewusertask.get('subdivisionid').setValue('opt1');
    this.viewusertask.get('task_assigned_to').setValue('opt1');
    this.viewusertask.get('priority_id').setValue('opt1');
    this.viewusertask.get('task_status_id').setValue('opt1');


    this.usertaskservice.getTaskType(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid).subscribe(data => { this.tasktype = data },
        err => {
          console.log('Error Occured getTaskType() ');
        });


    this.usertaskservice.getDept(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid).subscribe(data => { this.dept = data },
        err => {
          console.log('Error Occured  getDept()');
        });



    this.usertaskservice.getTaskPriority(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid).subscribe(data => { this.taskspriority = data },
        err => {
          console.log('Error Occured ');
        });


    this.usertaskservice.getTaskStatus(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid).subscribe(data => { this.taskstatus = data },
        err => {
          console.log('Error Occured ');
        });

      

  }//ngOninit end











  getSubDept() {

    this.usertaskservice.getSubDept(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.viewusertask.get('deptid').value).subscribe(data => { this.subdept = data },
        err => {
          console.log('Error Occured ');
        });


  }
  getDivision() {

    this.usertaskservice.getDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.viewusertask.get('deptid').value, this.viewusertask.get('subdeptid').value).subscribe(data => { this.division = data },
        err => {
          console.log('Error Occured ');
        });


  }

  getSubDivision() {

    this.usertaskservice.getSubDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.viewusertask.get('deptid').value, this.viewusertask.get('subdeptid').value, this.viewusertask.get('divisionid').value).subscribe(data => { this.subdivision = data },
        err => {
          console.log('Error Occured ');
        });


  }



  getAssignEmployee() {

    this.usertaskservice.getAssignEmployee(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.viewusertask.get('subdivisionid').value).subscribe(data => { this.empname = data },
        err => {
          console.log('Error Occured ');
        });


  }



  basicValidation(): boolean {


    


    if (this.viewusertask.get('deptid').value ==  "opt1" ) {



      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Department....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }


    else if (this.viewusertask.get('subdeptid').value == "opt1" ) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Sub Department..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.viewusertask.get('divisionid').value == "opt1" ) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Division..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.viewusertask.get('subdivisionid').value == "opt1" ) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter  Sub Division..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.viewusertask.get('task_assigned_to').value == "opt1" ) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Employee..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.viewusertask.get('priority_id').value == "opt1" ) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Task Priority..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.viewusertask.get('task_status_id').value == "opt1" ) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Task Status..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }


    return true;

  }



  getTableValues() {

    //alert("data "+this.data);

    this.retrunFlag = this.basicValidation();


    if (this.retrunFlag ) {



      let obj = {
        deptid: this.viewusertask.get('deptid').value,
        employeeid: this.viewusertask.get('task_assigned_to').value,
        priority_id: this.viewusertask.get('priority_id').value,
        task_status_id: this.viewusertask.get('task_status_id').value,
        task_type_id: this.viewusertask.get('task_type_id').value,

        // subdeptid: this.viewusertask.get('subdeptid').value,
        // divisionid: this.viewusertask.get('divisionid').value,
        // subdivisionid: this.viewusertask.get('subdivisionid').value,



        companyrefid: this.selobj.companyid,
        branchrefid: this.selobj.branchrefid,
        locname: this.selobj.locname,
        locrefid: this.selobj.locrefid

      }


      this.usertaskservice.getTableValues(JSON.stringify(obj)).subscribe(data => {
        this.data = data

        if (this.data == null || undefined || "") {

          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please check all fields filled', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }

      },
        err => {
          console.log('Error Occured getTableValues');
        });




    }// getTableValues






  }









}