import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { AddAssignServices } from './addassigntask.services';




@Component({
    selector: 'app-addassigntask',
    templateUrl: './addassigntask.component.html',
    styleUrls: ['./addassigntask.component.css'],
    providers: [NotificationsComponent, AddAssignServices]
})
export class AddAssignTaskComponent implements OnInit {

    addAssignTaskForm: FormGroup;
    // obj: any;


    obj = {
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        yes: 1,
    }


    constructor(private formBuilder: FormBuilder,
        private notificationsComponent: NotificationsComponent,
        private addAssignServices: AddAssignServices) {
    }

    ngOnInit() {
        this.addAssignTaskForm = this.formBuilder.group({

            tasktype: [, []],
            selecttask: [, []],
            selectdept: [, []],
            selectemp: [, []],
        })


        this.getTaskType();

    }





    getTaskType() {



        this.addAssignServices.getTaskType(JSON.stringify(this.obj)).subscribe(data => {

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