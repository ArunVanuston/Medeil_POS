import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { securitymonitoringService } from '../securitymonitoring.service';
import { providers } from 'ng2-toasty';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-userloginhistory',
  templateUrl: './userloginhistory.component.html',
  styleUrls: ['./userloginhistory.component.css'],
  providers:[NotificationsComponent,securitymonitoringService]
})
export class UserloginhistoryComponent implements OnInit {

  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  // LoginHistoryForm:FormGroup;
  constructor(private formbuilder:FormBuilder,private notification:NotificationsComponent,
              private router:Router,private seservice:securitymonitoringService,
              private appcomponent:AppComponent) { }

  ngOnInit() {

    this.seservice.getloginhistory().subscribe(data =>{this.data = data},
      err => {
        console.log('Error in User Login history Service');
      });
      
    }
  
}
