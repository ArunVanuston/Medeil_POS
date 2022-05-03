import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { Usertaskservice } from '../usertask.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';



@Component({
    selector: 'app-empReview',
    templateUrl: './employeereview.component.html',
    styleUrls: ['./employeereview.component.css'],
    providers: [Usertaskservice, NotificationsComponent, dateFormatPipe]
})


export class EmployeeReviewComponent implements OnInit {


    selobj;
    deviceObj;
    empValues: any;
    term: String;
    taskId: number;
    jobKnowRating: any;
    workQuaRating: any;
    attendRating: any;
    dependRating: any;
    communRating: any;
    returnFlag: boolean;
    comment: any;
    empInformation: any;
    empCode: any;
    empName: any;
    overAllRatings: any;
    data: any;


    constructor(private usertaskservice: Usertaskservice, private router:Router, private route: ActivatedRoute, private appComponent: AppComponent, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent) { }




    ngOnInit() {


        this.empValues = this.route.params.subscribe(params => {
            this.term = params['term'];
            this.taskId = +params['taskId'];
        });


        // console.log(this.term + " " + this.taskId);


        this.selobj = {
            userid: AppComponent.userID,
            companyid: AppComponent.companyID, branchrefid: AppComponent.branchID,
            locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
            countryrefid: AppComponent.countryID,
        };


        this.getInformation(this.term, this.taskId);

    }//ngOnint end






    jobKnowledge(id, value) {
        let myCheckbox = document.getElementsByName("myCheckboxj");
        Array.prototype.forEach.call(myCheckbox, (el) => {
            el.checked = false;
        });
        id.checked = true;
        this.jobKnowRating = value;
        console.log(value)
    }



    workQuality(id, value) {
        let myCheckbox = document.getElementsByName("myCheckboxw");
        Array.prototype.forEach.call(myCheckbox, (el) => {
            el.checked = false;
        });
        id.checked = true;
        this.workQuaRating = value;
        console.log(value)
    }

    attendance(id, value) {
        let myCheckbox = document.getElementsByName("myCheckboxa");
        Array.prototype.forEach.call(myCheckbox, (el) => {
            el.checked = false;
        });
        id.checked = true;
        this.attendRating = value;
        console.log(value)
    }
    Communication(id, value) {
        let myCheckbox = document.getElementsByName("myCheckboxc");
        Array.prototype.forEach.call(myCheckbox, (el) => {
            el.checked = false;
        });
        id.checked = true;
        this.communRating = value;
        console.log(value)
    }

    Dependability(id, value) {
        let myCheckbox = document.getElementsByName("myCheckboxd");
        Array.prototype.forEach.call(myCheckbox, (el) => {
            el.checked = false;
        });
        id.checked = true;
        this.dependRating = value;
        console.log(value)
    }


    overAllRating() {
        let overall = parseInt(this.jobKnowRating) + parseInt(this.workQuaRating) + parseInt(this.attendRating) + parseInt(this.dependRating) + parseInt(this.communRating);

        this.overAllRatings = overall / 5;

        // console.log(this.overAllRatings);
    }


    getInformation(term: String, taskId: number) {
        this.usertaskservice.getEmpInfo(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, taskId).subscribe(data => {
                this.empInformation = data
                if (this.empInformation) {
                    this.empCode = this.empInformation[0][0];
                    this.empName = this.empInformation[0][1];
                    this.term = term;
                }
            },
                err => {
                    console.log('Error Occured getEmpInfo()');
                });
    }





    onSubmit() {

        this.returnFlag = this.basicValidation();
        if (this.returnFlag) {

            let empEvalReview = {
                employeecode: this.empCode,
                employeename: this.empName,
                reviewperiod: this.term,
                rating: this.overAllRatings,
                comment: this.comment,
                companyrefid: AppComponent.companyID,
                branchrefid: AppComponent.branchID,
                locname: AppComponent.locRefName1,
                locrefid: AppComponent.locrefID1,
            }

            this.usertaskservice.saveEmpEvaluation(empEvalReview).subscribe(data => {
                this.data = data
                if (this.data) {
                    this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

                    this.router.navigate(['UserTask/viewManagerRev']);
                  

                }
                else
                    this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });


            },
                err => {
                    console.log('Error Occured saveEmpEvaluation()');
                });
        }

    }


    maxlengthTxtArea() {
        let comment = this.comment;
        console.log(comment);
        if (comment.length > 1999 && comment.length < 2001) {
            if (comment.length == 2000)
                this.notificationsComponent.addToast({ title: 'Error', msg: 'You can type only 2000 caharacters....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

        }
    }




    basicValidation(): boolean {

        if (this.jobKnowRating == null || this.jobKnowRating == undefined) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please select Job Knowledge....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            // alert(1);
            return false;
        }
        else if (this.workQuaRating == null || this.workQuaRating == undefined) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please select Work Quality....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }

        else if (this.attendRating == null || this.attendRating == undefined) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please select Attendance....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }


        else if (this.dependRating == null || this.dependRating == undefined) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please select Communication....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }

        else if (this.communRating == null || this.communRating == undefined) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please select Dependability....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }


        return true;

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










}


