import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';



@Component({
    selector: 'app-usertask',
    templateUrl: './addusertask.component.html',
    styleUrls: ['./addusertask.component.css'],
    providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})


export class AddUsertaskComponent implements OnInit {

    usertask: FormGroup;
    selobj;
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
    subTaskList: any[];
    public addSubTaskArr: any = [];
    sub_task_title: any = [];
    addSubTaskBtn: boolean = false;
    saveSubTaskArr: any = [];
    opt2: boolean;

    constructor(private usertaskservice: Usertaskservice, private appComponent: AppComponent, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent) { }




    ngOnInit() {

        this.selobj = {
            userid: AppComponent.userID,
            companyid: AppComponent.companyID, branchrefid: AppComponent.branchID,
            locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
            countryrefid: AppComponent.countryID,
        };

        this.usertaskservice.getDept(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
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
        const task_priority_name = new FormControl();
        // const priority_id = new FormControl();
        const task_status_name = new FormControl("Not Started");
        // const task_status_id = new FormControl();
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
            task_priority_name:task_priority_name,
            // priority_id: priority_id,
            task_status_name:task_status_name,
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
        this.usertask.get('employeeid').setValue('opt3');
        this.usertask.get('task_priority_name').setValue('opt1');
        // this.usertask.get('priority_id').setValue('opt1');
        // this.usertask.get('task_status_id').setValue('opt1');







        this.usertaskservice.getTaskType(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.tasktype = data },
                err => {
                    console.log('Error Occured getTaskType() ');
                });


        this.usertaskservice.getTaskPriority(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.taskspriority = data },
                err => {
                    console.log('Error Occured ');
                });


        // this.subTaskList = [
        //     ["Lorem Ipsum Dolor Sit Amet"],
        //     ["Hey! How are you, i'm fine...."]
        // ];
        // this.subTaskList = [
        //     {
        //         "list": "Lorem Ipsum Dolor Sit Amet"
        //     },
        //     {
        //         "list": "Hey! How are you, i'm fine...."
        //     },
        // ];
        // this.addSubTaskArr = [
        //    "Eliminate the Tasks. ...",
        //     "Take Your Time to Plan the List. ...",
        //     "Move Important Tasks to the Beginning. ...",
        //     "Track the Recurring Tasks. ...",
        // "dfsjdfsjd jdfsd jsdfjfdjdfjsddsdsdsddfgfffffffffffffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffSimilarTasks....",
        // ["Define the Tasks in More Detail. ..."],
        // ["Do Some Prep Work in Advance. ..."],
        // ["Automate the Maintenance."]
        // ];
    }//ngOnint end

    // btnAddSubTask() {
    //     this.sub_task_title = this.usertask.get('sub_task_title').value;
    //     if (this.sub_task_title.length == 0 || this.sub_task_title.length <= 1) {
    //         this.addSubTaskBtn = false;
    //     }
    //     else if (this.sub_task_title.length > 1) {
    //         this.addSubTaskBtn = true;
    //     }



    // }


    // addSubTask() {
    //     this.sub_task_title = this.usertask.get('sub_task_title').value;
    //     if (this.sub_task_title != null || undefined) {
    //         // alert(this.sub_task_title);
    //         this.addSubTaskArr.push(this.sub_task_title);
    //         this.usertask.get('sub_task_title').reset();
    //         this.addSubTaskBtn = false;

    //         // for (let i = 0; i < this.addSubTaskArr.length; i++) {
    //         //     console.log(this.addSubTaskArr[i]);
    //         // }

    //     }
    // }

    // delSubTaskArr(index: number) {

    //     this.addSubTaskArr.splice(index, 1);

    // }



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

        else if (this.usertask.get('employeeid').value == "opt1" || 0) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter  Employee Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }

        else if (this.usertask.get('task_start_date').value == null) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please check  Start date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }

        else if (this.usertask.get('task_due_date').value == null) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please check  Due date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }
        // else if (this.usertask.get('task_status_id').value == "opt1") {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please check task status...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;

        // }
        // else if (this.usertask.get('priority_id').value == "opt1") {
        //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Priority..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //     return false;
        // }
        else if (this.usertask.get('task_priority_name').value == "opt1") {
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
        if (parseInt(employeeid) > parseInt(AppComponent.userID)) {
            this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'you cant assign a task to your senior Team members.', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            return;
        }
    }

    onSubmit() {

        if (AppComponent.companyID == 1) {
            this.usertask.get('task_status_id').setValue(1);
        }

        else if (AppComponent.companyID == 15) {
            this.usertask.get('task_status_id').setValue(7);
        }

        AppComponent.companyID
        if (this.usertask.get('employeeid').value == "opt3") {
            this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please select Employee.', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            return;
        }

        this.returnFlag = this.basicValidation();
        if (this.returnFlag) {
            if (new Date(this.usertask.controls['task_start_date'].value) > new Date(this.usertask.controls['task_due_date'].value)) {
                this.notificationsComponent.addToast({
                    title: 'Error', msg: 'Please check task due date greater than task start date....', timeout: 5000, theme:
                        'default', position: 'top-right', type: 'error'
                });
            }
            else {
                if (this.usertask.get('employeeid').value > parseInt(AppComponent.userID)) {
                    this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'please check you can assign task only to yours subortinate....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
                    return;
                }
                // alert("AppComponent.date " + AppComponent.date);
                // this.usertask.get('userid').setValue(parseInt(AppComponent.userID));
                // this.usertask.get('task_assigned_by').setValue(AppComponent.userID);
                this.usertask.get('userid').setValue(AppComponent.userID);
                this.usertask.get('clientcdate').setValue(AppComponent.date);
                this.usertask.get('task_assigned_to').setValue(this.usertask.get('employeeid').value)
                this.usertask.get('task_assigned_by').setValue(sessionStorage.getItem('indvuserid'));

                if (this.usertask.get('subdeptid').value == null || this.usertask.get('subdeptid').value == "") {
                    this.usertask.get('subdeptid').setValue("");
                    this.usertask.get('divisionid').setValue("");
                    this.usertask.get('subdivisionid').setValue("");
                }
                if (this.usertask.get('divisionid').value == null || this.usertask.get('divisionid').value == "") {
                    this.usertask.get('divisionid').setValue("");
                    this.usertask.get('subdivisionid').setValue("");
                }
                if (this.usertask.get('subdivisionid').value == null || this.usertask.get('subdivisionid').value == "") {
                    this.usertask.get('subdivisionid').setValue("");
                }


                this.usertaskservice.saveTaskAssignment(JSON.stringify(this.usertask.value)).subscribe(data => {
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

            // if (this.addSubTaskArr.length == 0)
            //     this.usertask.reset();
        }

        else if (!data) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
    }


    saveSubTask() {
        let subTaskArrLength = this.addSubTaskArr.length;
        if (subTaskArrLength != 0) {
            for (let i = 0; i < subTaskArrLength; i++) {
                this.saveSubTaskArr.push({
                    sub_task_title: this.addSubTaskArr[i],
                    employeeid: this.usertask.get('employeeid').value,
                    companyrefid: AppComponent.companyID,
                    branchrefid: AppComponent.branchID,
                    locname: AppComponent.locRefName1,
                    locrefid: AppComponent.locrefID1,
                });
            }
            this.usertaskservice.saveSubTask(this.saveSubTaskArr).subscribe(data => {
                if (data) {

                    this.notificationsComponent.addToast({ title: 'Success', msg: 'Task Saved Succesfully ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                }
            });
            this.saveSubTaskArr = [];
        }
    }







    // getSubDivision(){
    // this.usertaskservice.getSubDivision(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,
    //     this.selobj.locrefid, this.usertask.get('divid').value  ).subscribe(data =>{ this.subdept = data},
    //     err => {
    //       console.log('Error Occured ');
    //     });
    // }



    getEmployee() {

        this.usertaskservice.getEmployee(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value).subscribe(data => {
                this.empname = data;
                this.usertask.get('employeeid').setValue("opt3");
                if (this.empname == "" || null || undefined) {
                    this.empname.push(["opt3", "NA"]);
                    this.usertask.get('employeeid').setValue("opt3");
                }
                else if (this.empname != "" || null || undefined) {
                    this.usertask.get('employeeid').setValue("opt3");
                }
                else
                    this.usertask.get('employeeid').setValue("opt3");

            },
                err => {
                    console.log('Error Occured ');
                });


    }

    getSubDept() {

        this.usertaskservice.getSubDept(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value).subscribe(data => {
                this.subdept = data;
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
        this.usertaskservice.getDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid,
            this.usertask.get('deptid').value, this.usertask.get('subdeptid').value).subscribe(data => {
                this.division = data;

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


    }

    getSubDivision() {

        this.usertaskservice.getSubDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value, this.usertask.get('subdeptid').value, this.usertask.get('divisionid').value).subscribe(data => {
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


