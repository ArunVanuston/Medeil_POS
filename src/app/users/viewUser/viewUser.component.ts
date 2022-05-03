import { UsersService } from '../users.service';
import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-viewsUser',
  templateUrl: './viewUser.component.html',
  providers: [NotificationsComponent]
})
export class userView implements OnInit {
  public data: any;
  totalRec: number;
  page: number = 1;
  size: number = 10;
  sendpage: number;
  gifFail: boolean=true;
 
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(public translate: TranslateService,private service: UsersService, private notificationsComponent: NotificationsComponent, private rout: Router) { translate.setDefaultLang('en'); }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    setTimeout(() => {
    this.service.viewUserDatas(AppComponent.companyID).subscribe(data=> {
      this.data = data
      }, err => {
      console.log("Error occured on viewUser()");
    });
    this.gifFail=false;
  },3000);

  }


  adduser() {
    this.rout.navigate(['User/AddUser']);
  }

}
