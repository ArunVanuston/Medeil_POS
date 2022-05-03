import { EmployeeService } from '../emp.services';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import 'jquery';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-viewEmployee',
  templateUrl: './viewEmployee.component.html',
  styleUrls: ['./viewEmployee.component.css'],
  providers: [EmployeeService, NotificationsComponent]
})


export class viewEmployeeComponent implements OnInit {
  parentMessage="purchase"
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;

  constructor(private userService: EmployeeService, private route: Router, private notificationsComponent: NotificationsComponent) {
  }
  ngOnInit() {
    if (AppComponent.usertype == "\"SuperAdmin\" ") {

      setTimeout(() => {
      this.userService.employeeView().subscribe(data => { this.data = data },
        err => {
          console.log('Error in view Employee Service');
        });
        this.gifFail=false;
      },3000);
    } 
    else
     {
      setTimeout(() => {
      this.userService.employeeViewByID(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.data = data },
        err => {
          console.log('Error in view Employee Service');
        });
        this.gifFail=false;
      },3000);
    }

  }

  private employeeDelete(id: number): void {
         
    // var answer = confirm("Delete data?");
    // if (answer) {
    this.userService.employeeDelete(id).subscribe(data => {
      //alert("Employee " + data);
      if (data == 1) {
        // alert("Employee  is succesfully Deleted");
        //window.location.reload();
        // window.location.replace('employeeinfo/viewEmployee');
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
    });
  
  }

  opensaveSwal(id:number) {
    swal({
      title: 'Do you want Delete this Employee Details?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(() => {
     
      this.employeeDelete(id);
    
    
      
    }).catch(swal.noop);
  }
  
 

}







