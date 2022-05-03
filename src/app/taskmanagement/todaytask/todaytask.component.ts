import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { TodayTaskServices } from './todaytask.services';





@Component({
    selector: 'app-todaytask',
    templateUrl: './todaytask.component.html',
    styleUrls: ['./todaytask.component.css'],
    providers: [NotificationsComponent, TodayTaskServices]
})
export class TodayTaskComponent implements OnInit {

    TodayTaskForm: FormGroup;
    // obj: any;

    public data = [];
    public rowsOnPage: number = 10;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "desc";
    viewinactivedata: any;
    timer: any;


    obj = {
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,

    }

    // selecttasks = [];


    selecttasks = [[1, "User"], [2, "Pending"], [3, "Completed"]];

    viewdata = [];

    constructor(private formBuilder: FormBuilder,
        private notificationsComponent: NotificationsComponent, private todayTaskServices: TodayTaskServices
    ) {
    }

    ngOnInit() {



        this.TodayTaskForm = this.formBuilder.group({

            selecttask: [, []],
            // tasktype: [, []],
            // selectdept: [, []],
            // selectemp: [, []],

        });


        this.getTaskType();

        this.TodayTaskForm.get('selecttask').setValue(0);
    }





    getTaskType() {

        this.selecttasks = [[1, "User"], [2, "Pending"], [3, "Completed"]];

        this.viewdata = [[1, "TSK100", "User Task", "Process", "13/05/2020", "Shiva"], [2, "TSK101"]];

        this.todayTaskServices.getTaskType(JSON.stringify(this.obj)).subscribe(data => {
            error => {
                console.log(error);
            }
        });
    }

    // getSelectTask(){

    // }
    // getSelectDept(){

    // }
    // getSelectEmp(){

    // }












}