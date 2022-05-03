import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import swal from 'sweetalert2';
import { practiceService } from '../practise.service';

@Component({
  selector: 'app-viewpractisemng',
  templateUrl: './viewpractisemng.component.html',
  styleUrls: ['./viewpractisemng.component.css'],
  providers:[practiceService]
})
export class ViewpractisemngComponent implements OnInit {
  viewpractise: any;

  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  notificationsComponent: any;

  constructor(private practiseservice:practiceService,
              private appcomponent:AppComponent,
              private router:Router,
              private notification:NotificationsComponent) { }

  ngOnInit() {

      setTimeout(() => {
        
      
    this.practiseservice.getpractise(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data=>{
      this.data=data,
      err=>{
        console.log("error is created from getpractise()");
      }
    });
    this.gifFail=false;

  }, 3000);
  }


  
  deletepract(id: any) {

    this.openSuccessSwal(id)
   
  }


  openSuccessSwal(id) {
    swal({
      title: 'Are you sure?',
      text: "It will permanently deleted !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showConfirmButton: true

    }).then(() => {
      this.practiseservice.deletepractise(id,AppComponent.companyID,AppComponent.locrefID1).subscribe(data => {
        alert(data)
        if (data == true) {
          this.notification.addToast({title:'SUCESS MESSAGE', msg:'DATA DELETED SUCESSFULLY.', timeout: 5000, theme:'default', position:'bottom-right', type:'success'});
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
          
        }
        err => {
          console.log('Error Occured on deleteHospital()');
        }
      });
    }).catch(swal.noop);
  }


}
