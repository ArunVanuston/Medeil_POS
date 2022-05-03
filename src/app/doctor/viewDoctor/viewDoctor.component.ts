import { DoctorService } from '../doctor.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import swal from 'sweetalert2';
import { TranslateService } from 'ng2-translate';

@Component({
  /**@Author Ajith Kumar**/
  selector: 'viewDoctor',
  templateUrl: './viewDoctor.component.html',
  styleUrls: ['./viewDoctor.component.css'],
  providers: [NotificationsComponent]
})
export class DoctorlistComponent implements OnInit {

  parentMessage = "sales";
  // @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;


  public data: any;
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean = true;
  constructor(public translate: TranslateService,private router: Router, private doctorService: DoctorService, private notificationsComponent: NotificationsComponent) { translate.setDefaultLang('en'); }


  ngOnInit(): void {
    this.translate.use(localStorage.getItem('language'));
    setTimeout(() => {
      this.doctorService.viewDoctor(AppComponent.companyID, AppComponent.branchID).subscribe(data => this.data = data,
        err => {
          console.log('Error Occured On view Doctor()');
        });
      this.gifFail = false;
    }, 3000);
  }


  public scrollRight(): void {
    document.querySelector('div.middle').scrollLeft += 150;
    // alert(get);
    //get.nativeElement.scrollBy({ left: (get.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(get): void {
    document.querySelector('div.middle').scrollLeft -= 150;
    //get.nativeElement.scrollBy({ left: (get.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }




  deleteDoctor(id: any) {
    this.openSuccessSwal(id)
    // var answer = confirm("Delete data?");
    // if (answer) {

    // }
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
      this.doctorService.deleteDoctor(id).subscribe(data => {
        if (data == 1) {
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
           
          },1000);
        }
        else {
          this.ngOnInit();
        }
      });
      this.ngOnInit()
    }).catch(swal.noop);
  }












}
