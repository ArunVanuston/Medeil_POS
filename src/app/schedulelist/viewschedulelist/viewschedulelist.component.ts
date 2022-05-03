import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { SchedulelistService } from '../schedulelist.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//**@Author Desing Raja**//
@Component({
  selector: 'app-viewschedulelist',
  templateUrl: './viewschedulelist.component.html',
  styleUrls: ['./viewschedulelist.component.css'],
  providers:[NotificationsComponent]
})
export class ViewschedulelistComponent implements OnInit {
  Schedulelist:FormGroup;
  



  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  scheduleupdate: any;
  schedule: any;
  

  constructor(private formbulder:FormBuilder,private modalService: NgbModal,
    private router:Router,
    private appcomponent:AppComponent,
    private scheduleservice:SchedulelistService,
    private notification:NotificationsComponent,
   ) {
      this.Schedulelist = this.formbulder.group({

        productid:[,[]],
        productname:[,[]],
        schedule:[,[]],
        scheduleid:[,[]]

      });
     }
//Raja
  ngOnInit() {
   
    setTimeout(() => {
    this.scheduleservice.getscheduledata(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data = data
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'Data not listed..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      this.gifFail=false;
    });
  }, 3000);

  }

  schedullist(){
    this.scheduleservice.getschedule().subscribe(data => {
      this.schedule = data
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'Data not listed..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }

  schedulechange(popupname,codeval){
    this.Schedulelist.get('productid').setValue(codeval);
    // this.Schedulelist.get('schedule').setValue(scheduleval);
    this.openmain(popupname);
  }

//popup properties
closeResult: string;
openmain(popupname) {
  this.modalService.open(popupname).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    
    return 'by pressing ESC';
  
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
 
}

editschedule(c){
this.scheduleservice.editschedule(this.Schedulelist.get('scheduleid').value,this.Schedulelist.get('productid').value).subscribe(data =>{this.scheduleupdate = data
if(data == true){
 
  this.notification.addToast({ title: 'Success', msg: 'Data Save Successfully ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
  c('Close click');
  this.ngOnInit();
}})
}



}
