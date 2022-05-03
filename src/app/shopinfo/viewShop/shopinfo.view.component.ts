import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { shopviewService } from './shopinfo.view.services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  /**@Author Ajith Kumar**/
  selector: 'app-viewShop',
  templateUrl: './shopinfo.view.component.html',
  providers: [shopviewService, NotificationsComponent]
})

export class viewshopComponent implements OnInit, AfterViewInit {
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean = true;

  constructor(private viewShop: shopviewService, private router: Router, private notificationsComponent: NotificationsComponent, private sanitizer: DomSanitizer) { }

  imgview: any;
  dataList = [];
  ngOnInit() {

    setTimeout(() => {
      this.viewShop.viewShop(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.bindprintdata(data)
      },
        err => {
          console.log('Error get values from services in view Component');
        })
      this.gifFail = false;
    }, 3000);
  }


  private readonly imageType: any = 'data:image/*;base64,';
  bindprintdata(data) {
    this.data = [];

    for (let i = 0; i < data.length; i++) {
      if (data[0].imageurl == 'No_Image') {
        this.data.push({
          shopname: data[0].imagevalues[i][0], ownerName: data[0].imagevalues[i][1], address: data[0].imagevalues[i][2], country: data[0].imagevalues[i][4], mobilenumber: data[0].imagevalues[i][5],
          emailid: data[0].imagevalues[i][6], logo: 'noimage'});
      } else {
        this.data.push({
          shopname: data[0].imagevalues[i][0], ownerName: data[0].imagevalues[i][1], address: data[0].imagevalues[i][2], country: data[0].imagevalues[i][4], mobilenumber: data[0].imagevalues[i][5],
          emailid: data[0].imagevalues[i][6], logo: this.sanitizer.bypassSecurityTrustUrl(this.imageType + data[0].imageurl)});

      }
    }
  }
  deleteShop(id: number) {

    var answer = confirm("Delete data?");
    if (answer) {
      this.viewShop.deleteShop(id).subscribe(data => console.log(JSON.stringify(data)),
        errorCode => console.log(errorCode));
      this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
      setTimeout(() => {
        this.ngOnInit();
        //this.router.navigate(['Registration/ViewShopRegistration']);
      }, 2000);
      // this.router.navigate(['Registration/ViewShopRegistration']);  //SELVA
    }
  }

  changeRoute(event) {
  }
  ngAfterViewInit() {

  }
}
