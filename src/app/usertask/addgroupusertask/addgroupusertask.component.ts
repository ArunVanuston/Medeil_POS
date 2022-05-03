import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';



@Component({
    selector: 'app-groupusertask',
    templateUrl: './addgroupusertask.component.html',
    styleUrls: ['./addgroupusertask.component.css'],
    providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})


export class AddGroupUsertaskComponent implements OnInit {


    taskdropdownSettings = {};
    tasktitlearr = [];
    taskTitleService: any = [];

    employeedropdownSettings = {};
    employeearr = [];
    employeeService: any = [];

    usertask: FormGroup;
    selobj;
    selobj1;
    selobj2;
    dept: any;
    subdept: any;
    division: any;
    subdivision: any;
    returnFlag: boolean;
    tasktype: any;
    taskspriority: any;
    empname: any;

    pdf: boolean = false;
    xls: boolean = false;
    doc: boolean = false;


    signimgURL: any;
    signmessage: string;
    signphoto: File;
    signshowimage: boolean = false;
    signshoweyeslash: boolean = false;
    signshoweye: boolean = true;
    signresponse: any;
    fileName: any;
    fileextension: any;

    deviceObj;

    i: number;
    j: number;
    wholeData: any = [];
    task_titleDummyArr: any = [];




    constructor(private usertaskservice: Usertaskservice, private appComponent: AppComponent, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent) { }





    ngOnInit() {

        this.selobj = {
            userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
            locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
            companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID
        };

        this.selobj1 = {
            companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
            locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
        };



        this.usertaskservice.getDept(this.selobj.companyrefid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.dept = data },
                err => {
                    console.log('Error Occured ');
                });





        const companyrefid = new FormControl();
        const branchrefid = new FormControl();
        const locname = new FormControl();
        const locrefid = new FormControl();
        const subdivisionid = new FormControl();
        // const task_type_id = new FormControl();
        const task_number = new FormControl('0');
        const task_title = new FormControl();
        const sub_task_title = new FormControl();

        const deptid = new FormControl();
        const subdeptid = new FormControl();
        const divisionid = new FormControl();
        const employeeid = new FormControl();
        const task_start_date = new FormControl();
        const task_due_date = new FormControl();
        const task_start_time = new FormControl();
        const task_due_time = new FormControl();
        const priority_id = new FormControl();
        // const task_status_id = new FormControl(0);
        const createdby = new FormControl(0);
        const modifiedby = new FormControl(0);
        const description = new FormControl();
        const status = new FormControl(0);
        // const completed_date = new FormControl('0');
        // const response_date = new FormControl('0');
        const clientcdate = new FormControl(this.dateformat.transform04());
        //const clientmdate = new FormControl('0');
        // const createddate = new FormControl();
        // const modifieddate = new FormControl();
        const task_assigned_by = new FormControl(0);
        const task_assigned_to = new FormControl(0);
        const task_modified_by = new FormControl(0);
        const group_task_flag = new FormControl(0);
        const userid = new FormControl();
        const pdf = new FormControl();
        const xls = new FormControl();
        const doc = new FormControl();
        const docid = new FormControl();

        const deselect = new FormControl();
        //const document_title = new FormControl();
        // const related_document= new FormControl();





        this.usertask = new FormGroup({


            subdivisionid: subdivisionid,
            // task_type_id: task_type_id,
            task_number: task_number,
            task_title: task_title,
            sub_task_title: sub_task_title,
            deptid: deptid,
            subdeptid: subdeptid,
            divisionid: divisionid,
            employeeid: employeeid,
            task_start_date: task_start_date,
            task_due_date: task_due_date,
            task_start_time: task_start_time,
            task_due_time: task_due_time,
            priority_id: priority_id,
            // task_status_id: task_status_id,
            createdby: createdby,
            modifiedby: modifiedby,
            description: description,
            status: status,
            // completed_date: completed_date,
            // response_date: response_date,
            clientcdate: clientcdate,
            // clientmdate: clientmdate,
            //  createddate: createddate,
            //  modifieddate: modifieddate,
            //  related_document:related_document,
            // document_title: document_title,
            task_assigned_by: task_assigned_by,
            task_assigned_to: task_assigned_to,
            task_modified_by: task_modified_by,
            group_task_flag: group_task_flag,
            userid: userid,
            companyrefid: companyrefid,
            branchrefid: branchrefid,
            locname: locname,
            locrefid: locrefid,

            pdf: pdf,
            xls: xls,
            doc: doc,


            docid: docid,
            deselect: deselect


        });

        this.usertask.get('companyrefid').setValue(AppComponent.companyID);
        this.usertask.get('branchrefid').setValue(AppComponent.branchID);
        this.usertask.get('locname').setValue(AppComponent.locrefID);
        this.usertask.get('locrefid').setValue(AppComponent.shopID);


        // this.usertask.get('task_type_id').setValue('opt1');
        this.usertask.get('deptid').setValue('opt1');
        this.usertask.get('subdeptid').setValue('0');
        this.usertask.get('divisionid').setValue('0');
        this.usertask.get('subdivisionid').setValue('0');
        // this.usertask.get('employeeid').setValue('opt1');
        this.usertask.get('priority_id').setValue('opt1');
        // this.usertask.get('task_status_id').setValue('opt1');






        this.usertaskservice.getTaskType(this.selobj.companyrefid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.tasktype = data },
                err => {
                    console.log('Error Occured getTaskType() ');
                });


        this.usertaskservice.getTaskPriority(this.selobj.companyrefid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.taskspriority = data },
                err => {
                    console.log('Error Occured ');
                });

        this.employeedropdownSettings = {
            maxHeight: 400,
            singleSelection: false,
            text: "---Select Employee---",
            badgeShowLimit: 1,
            classes: "myclass custom-class"
        };




        this.usertaskservice.getTaskTitle(this.selobj1).subscribe(data => { this.taskTitleService = data, this.getTaskTitle() },
            err => {
                console.log('Error Occured getTaskTitle');
            });


        this.taskdropdownSettings = {
            maxHeight: 400,
            singleSelection: false,
            text: "---Select Task Title---",
            badgeShowLimit: 1,
            classes: "myclass custom-class"
        };




    }//ngOnit end


    getEmployeeDropDown() {
        this.selobj2 = {
            companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
            locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
            deptid: this.usertask.get('deptid').value,
        };
        this.usertaskservice.getEmployeeDrop(this.selobj2).subscribe(data => {
            this.employeeService = data,

                this.getEmployeeDrop()
        },
            err => {
                console.log('Error Occured getEmployeeDrop');
            });

    }

    getTaskTitle() {
        this.tasktitlearr = [];
        for (this.i = 0; this.i < this.taskTitleService.length; this.i++) {
            this.tasktitlearr.push({ id: this.taskTitleService[this.i][0], itemName: this.taskTitleService[this.i][1] });
        }
    }


    getEmployeeDrop() {
        this.employeearr = [];
        for (this.j = 0; this.j < this.employeeService.length; this.j++) {
            this.employeearr.push({ id: this.employeeService[this.j][0], itemName: this.employeeService[this.j][1] });
        }
    }



    basicValidation(): boolean {

        if (this.usertask.get('task_title').value == null) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Task Title....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }
        else if (this.usertask.get('deptid').value == "opt1") {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Department....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }
        // else if (this.usertask.get('subdeptid').value == "opt1") {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Sub Department..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;
        // }
        // else if (this.usertask.get('divisionid').value == "opt1") {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Division..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;
        // }
        // else if (this.usertask.get('subdivisionid').value == "opt1") {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter  Sub Division..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;
        // }

        // else if (this.usertask.get('task_start_time').value == null) {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please check Start Time..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;
        // }
        // else if (this.usertask.get('task_due_time').value == null) {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please check  Due Time..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;
        // }

        // else if (this.usertask.get('employeeid').value == "" ) {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter  Employeename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;
        // }

        else if (this.usertask.get('task_start_date').value == null || this.usertask.get('task_start_date').value == "") {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please check  Start date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }

        else if (this.usertask.get('task_due_date').value == null || this.usertask.get('task_due_date').value == "") {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please check  Due date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }

        // else if (this.usertask.get('task_status_id').value == "opt1") {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please check task status...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;
        // }

        else if (this.usertask.get('priority_id').value == "opt1") {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Priority..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }

        return true;
    }


    fileType(event: any) {



        if (event.value == 'pdf') {

            this.pdf = true; this.xls = false; this.doc = false;
            this.usertask.get('pdf').setValue(true);

            this.usertask.get('xls').setValue(false);
            this.usertask.get('doc').setValue(false);

            this.usertask.get('deselect').setValue(false);



        }


        else if (event.value == 'xls') {
            this.pdf = false; this.xls = true; this.doc = false;


            this.usertask.get('pdf').setValue(false);
            this.usertask.get('xls').setValue(true);
            this.usertask.get('doc').setValue(false);
            this.usertask.get('deselect').setValue(false);

        }


        else if (event.value == 'doc') {

            this.pdf = false; this.xls = false; this.doc = true;
            this.usertask.get('pdf').setValue(false);
            this.usertask.get('xls').setValue(false);
            this.usertask.get('doc').setValue(true);
            this.usertask.get('deselect').setValue(false);

        }




        else if (event.value == 'deselect') {

            this.usertask.get('pdf').setValue(false);
            this.usertask.get('xls').setValue(false);
            this.usertask.get('doc').setValue(false);



            this.pdf = false; this.xls = false; this.doc = false;


        }



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
            clientcdate: this.dateformat.transform04(),

            logintime: ' 2019-12-10  16:27:42',
            logouttime: ' 2019-12-10  16:27:42',
            duration: '12',

        };

    }

    taskAssignmentToEmployees() {

        let employeeid = this.usertask.get('employeeid').value;
        let employeeLength = employeeid.length;
        for (let i = 0; i < employeeLength; i++) {
            if (employeeid[i].id > AppComponent.userID) {
                // alert(employeeid[i].id);
                this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please check you can assign task only to yours subortinate....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
                return;
            }

        }
    }





    onSubmit() {

        let employeeid = this.usertask.get('employeeid').value;

        if (employeeid == null || employeeid == "" || employeeid == undefined) {
            this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please select Employees Name....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' }); return;
        }



        // for (this.i = 0; this.i < task_title.length; this.i++) {
        //     this.task_titleDummyArr.push({
        //         task_title: task_title[this.i].id, employeeid: employeeid[this.i].id,
        //         locrefid: this.selobj.locrefid, locname: this.selobj.locname
        //     });
        // }
        // console.log(this.task_titleDummyArr);
        // if (task_title.length != employeeid.length) {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'Please check Task and assigned employee should be equal', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

        //     return;
        // }



        this.returnFlag = this.basicValidation();
        if (this.returnFlag) {
            if (new Date(this.usertask.controls['task_start_date'].value) > new Date(this.usertask.controls['task_due_date'].value)) {
                this.notificationsComponent.addToast({
                    title: 'Error', msg: 'Please check task due date greater than task start date....', timeout: 5000, theme:
                        'default', position: 'top-right', type: 'error'
                });
            }





            else {
                this.wholeData = [];
                let employeeid = this.usertask.get('employeeid').value;
                let EmplLength = employeeid.length;
                if (EmplLength == 0) {
                    this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please select Employees Name....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' }); return;
                }
                for (this.i = 0; this.i < EmplLength; this.i++) {

                    if (employeeid[this.i].id > AppComponent.userID) {
                        // alert(employeeid[this.i].id);
                        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please check you can assign task only to yours subortinate....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
                        return;
                    }

                    else {

                        console.log(employeeid[this.i].id);

                        this.wholeData.push({

                            employeeid: employeeid[this.i].id,
                            task_assigned_to: employeeid[this.i].id,
                            task_title: this.usertask.get('task_title').value,
                            sub_task_title: this.usertask.get('sub_task_title').value,
                            task_assigned_by: AppComponent.userID,
                            deptid: this.usertask.get('deptid').value,
                            subdeptid: this.usertask.get('subdeptid').value,
                            divisionid: this.usertask.get('divisionid').value,
                            subdivisionid: this.usertask.get('subdivisionid').value,
                            priority_id: this.usertask.get('priority_id').value,
                            task_start_date: this.usertask.get('task_start_date').value,
                            task_due_date: this.usertask.get('task_due_date').value,
                            task_start_time: this.usertask.get('task_start_time').value,
                            task_due_time: this.usertask.get('task_due_time').value,
                            description: this.usertask.get('description').value,
                            userid: AppComponent.userID,
                            clientcdate: AppComponent.date,
                            createdby: 0,
                            modifiedby: 0,
                            status: 0,
                            companyrefid: this.usertask.get('companyrefid').value,
                            branchrefid: this.usertask.get('branchrefid').value,
                            locname: this.usertask.get('locname').value,
                            locrefid: this.usertask.get('locrefid').value,
                        });



                    }
                }

                if (this.usertask.get('subdeptid').value == null || this.usertask.get('subdeptid').value == "") {
                    this.wholeData.push({
                        subdeptid: "",
                        divisionid: "",
                        subdivisionid: "",
                    })
                }

                if (this.usertask.get('divisionid').value == null || this.usertask.get('divisionid').value == "") {
                    this.wholeData.push({
                        divisionid: "",
                        subdivisionid: "",
                    })
                }
                if (this.usertask.get('subdivisionid').value == null || this.usertask.get('subdivisionid').value == "") {
                    this.wholeData.push({
                        subdivisionid: "",
                    })
                }

                this.usertaskservice.saveGroupTaskAssignment(JSON.stringify(this.wholeData)).subscribe(data => {
                    this.savevalid(data);
                });




            }

        }


    }


    signChange(event: any) {


        alert(event.target.value);



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


            if (event.target.files[0].size < 5000000) {
                // Fill file variable with the file content
                this.signphoto = event.target.files[0];
                this.fileName = this.signphoto.name;
                this.fileextension = this.fileName.split('.').pop();
                this.usertask.get('docid').setValue(this.fileextension);

                // // Instantiate an object to read the file content
                // let reader = new FileReader();
                // //To read Encrypted file and send url to display in html
                // reader.readAsDataURL(this.signphoto);
                // reader.onload = (_event) => {
                //     this.signimgURL = reader.result;

            }
        }

        else {
            this.signmessage = "Max file Size 5MB Only & Check File Format";
        }
    }

    signshow() {
        this.signshowimage = true;
        this.signshoweyeslash = true;
        this.signshoweye = false;
    }

    signhide() {
        this.signshowimage = false;
        this.signshoweyeslash = false;
        this.signshoweye = true;
    }

    signreset() {


        (<HTMLInputElement>document.getElementById("signfile")).value = '';
        this.signimgURL = '';
        this.signshowimage = false;
        this.signshoweyeslash = false;
        this.signshoweye = true;
        this.signmessage = '';
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


    savevalid(data: any) {
        if (data) {
            this.saveFile();
            this.justInitiate();
            this.deviceObj.apiname = "api/saveTaskAssignment";
            this.deviceObj.description = "Task Assignment Created";
            this.usertaskservice.deviceDetails(JSON.stringify(this.deviceObj)).subscribe(data => { },
                errorCode => console.log(errorCode));





            this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

        } else if (!data) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
    }







    // getSubDivision(){

    // this.usertaskservice.getSubDivision(this.selobj.companyrefid,this.selobj.branchrefid,this.selobj.locname,
    //     this.selobj.locrefid, this.usertask.get('divid').value  ).subscribe(data =>{ this.subdept = data},
    //     err => {
    //       console.log('Error Occured ');
    //     });


    // }

    getEmployee() {

        this.usertaskservice.getEmployee(this.selobj.companyrefid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value).subscribe(data => {
                this.empname = data
                if (this.empname == "" || null || undefined) {
                    this.empname.push([0, "NA"]);
                }
            },
                err => {
                    console.log('Error Occured ');
                });

    }

    getSubDept() {
        this.usertaskservice.getSubDept(this.selobj.companyrefid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value).subscribe(data => {
                this.subdept = data
                this.getDivision();

                if (this.subdept == "" || this.subdept == null || this.subdept == undefined) {
                    this.subdept.push([0, "NA"]);
                    this.division.push([0, "NA"]);
                    this.subdivision.push([0, "NA"]);
                    this.usertask.get('subdeptid').setValue('0');
                    this.usertask.get('divisionid').setValue('0');
                    this.usertask.get('subdivisionid').setValue('0');

                }
                else {
                    this.getDivision();
                    this.usertask.get('subdeptid').setValue('0');
                    this.usertask.get('divisionid').setValue('0');
                    this.usertask.get('subdivisionid').setValue('0');
                }


            },
                err => {
                    console.log('Error Occured ');
                });
    }

    getDivision() {
        this.usertaskservice.getDivision(this.selobj.companyrefid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value, this.usertask.get('subdeptid').value).subscribe(data => {
                this.division = data
                if (this.division == "" || this.division == null || this.division == undefined) {
                    this.division.push([0, "NA"]);
                    this.usertask.get('divisionid').setValue('0');
                    this.subdivision = [];
                    this.subdivision.push([0, "NA"]);
                    this.usertask.get('subdivisionid').setValue('0');

                }

                else {
                    this.subdivision.push([0, "NA"]);
                    this.usertask.get('subdivisionid').setValue('0');
                }
            },
                err => {
                    console.log('Error Occured ');
                });

        if (this.usertask.get('subdeptid').value == "" || this.usertask.get('subdeptid').value == null || this.usertask.get('subdeptid').value == undefined)
            this.subdivision.push([0, "NA"]);


    }

    getSubDivision() {
        this.usertaskservice.getSubDivision(this.selobj.companyrefid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value,
            this.usertask.get('subdeptid').value, this.usertask.get('divisionid').value).subscribe(data => {
                this.subdivision = data;
                if (this.subdivision == "" || null || undefined) {
                    this.subdivision.push([0, "NA"]);
                    this.usertask.get('subdivisionid').setValue('0');
                }


            },
                err => {
                    console.log('Error Occured ');
                });


    }



}


