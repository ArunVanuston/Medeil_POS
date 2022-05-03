import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EditionService } from '../edition.service';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
declare var $: any;
@Component({
  selector: 'app-viewedition',
  templateUrl: './viewedition.component.html',
  styleUrls: ['./viewedition.component.css'],
  providers: [NotificationsComponent]
})
export class VieweditionComponent implements OnInit, AfterViewInit {
  public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";  totalRec: number;
  page: number = 1;
  size: number = 10;
  sendpage: number;

  checkEdition: any;
  constructor(private editionService: EditionService, private router: Router, private notificationsComponent: NotificationsComponent) {

  }

  ngOnInit(): void {

    this.sendpage = this.page - 1; 

    // this.editionService.getedition(this.sendpage, this.size).subscribe(data => {
    //   this.data = data, this.totalRec = data.totalElements;
    //   },
    //     err => {
    //       console.log('Error Occured On getedition()');
    //     });
  }

  geteditiontype(event){

    if (event == 0) {
      this.editionService.getedition(event).subscribe(data => {
        this.data = data, this.totalRec = data.totalElements;
        },
          err => {
            console.log('Error Occured On getedition()');
          }); } else {
            this.editionService.getedition(event).subscribe(data => {
              this.data = data, this.totalRec = data.totalElements;
              },
                err => {
                  console.log('Error Occured On getedition()');
                }); }
   
  }





  addEdition() {
    this.router.navigate(['Edition/AddEdition']);
  }

  assignmoduleDetails(id: number) {
    this.router.navigate(['Edition/editiondetails'], { queryParams: { editionId: id } });
  }

  geAssignmodule(eid: any, sid: any) {
    this.editionService.checkEditionid(eid).subscribe(data => {
      this.checkEdition = data;
      if (data == true) {
        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'Already Module Assigned..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
      else {
        this.router.navigate(['Edition/editiondetails'], { queryParams: { editionId: eid, subDomainID: sid } });
      }
    },
      err => {
        console.log('Error Occured On checkEditionid()');
      });
  }
  ngAfterViewInit() {


  }

}
