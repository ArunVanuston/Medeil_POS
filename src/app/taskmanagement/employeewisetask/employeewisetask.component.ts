import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { EmployeeWiseTaskServices } from './employeewisetask.services';





@Component({
    selector: 'app-employeewisetask',
    templateUrl: './employeewisetask.component.html',
    styleUrls: ['./employeewisetask.component.css'],
    providers: [NotificationsComponent, EmployeeWiseTaskServices]
})
export class EmployeeWiseTaskComponent implements OnInit {

    employeeWiseTaskForm: FormGroup;
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
        yes: 1,
    }

    // selecttasks = [];


    selecttasks = [[1, "User"], [2, "Pending"], [3, "Completed"]];

    viewdata = [];

    constructor(private formBuilder: FormBuilder,
        private notificationsComponent: NotificationsComponent,
        private employeeWiseTaskServices: EmployeeWiseTaskServices
    ) {
    }


    ngOnInit() {
        this.employeeWiseTaskForm = this.formBuilder.group({

            tasktype: [, []],
            selecttask: [, []],
            selectdept: [, []],
            selectemp: [, []],
        })


        this.getTaskType();

    }


    getTaskType() {


        this.selecttasks = [[1, "User"], [2, "Pending"], [3, "Completed"]];

        this.viewdata = [[1, "TSK100", "User Task", "Process", "13/05/2020", "Shiva"], [2, "TSK101"]];
        this.employeeWiseTaskServices.getTaskType(JSON.stringify(this.obj)).subscribe(data => {
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