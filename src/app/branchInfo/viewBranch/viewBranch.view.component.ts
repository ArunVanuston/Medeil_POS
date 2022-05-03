import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { branchviewService } from './viewBranch.view.services';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  selector: 'app-viewBranch',
  templateUrl: './viewBranch.view.component.html',
  providers: [branchviewService, NotificationsComponent]
})

export class viewbranchComponent implements OnInit {
  public data = [];
  totalRec: number;
  page: number = 1;
  size: number = 10;
  sendpage: number;
  
  gifFail: boolean=true;
  constructor(private viewBranch: branchviewService, private router: Router, private notificationsComponent: NotificationsComponent) { }

  ngOnInit() {
    this.sendpage = this.page - 1; 
    setTimeout(() => {
    this.viewBranch.viewBranch(this.sendpage, this.size).subscribe(data => { 
      this.data = data, this.totalRec = data.totalElements; },
      err => {
        console.log('Error get values from services in Branch Component');
      });
      this.gifFail=false;
    },3000);
  }

  // deleteBranch(id: number) {
  //   this.viewBranch.deleteBranch(id).subscribe(data => console.log(JSON.stringify(data)),
  //     errorCode => console.log(errorCode));
  //     this.viewBranch.viewBranch().subscribe(data => {this.data = data});
  //     //window.location.href = '/ branchInfo/viewBranch';
  // }


  send(pageno: any) {

    this.sendpage = pageno - 1;
    this.viewBranch.viewBranch(this.sendpage, this.size)
      .subscribe(data => {
      this.data = data, this.totalRec = data.totalElements;
      },
        err => {
          console.log('Error Occured On viewBranch()');
        });



  }


  deleteBranch(id: number) {
    //alert(id);
     
    var answer = confirm("Delete data?");
    if (answer) {
    this.viewBranch.deleteBranch(id).subscribe(data => {
     // alert(data);
      if (data == 1) {
        //alert("Branch  is succesfully Deleted");
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        setTimeout(() => {
          this.ngOnInit();
          //window.location.href = '/Registration/ViewBranchRegistration';
         // this.router.navigate(['Registration/ViewBranchRegistration']);
        }, 2000);
      }
    }
    );
  }
}

}
