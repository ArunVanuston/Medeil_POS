import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { loyalitysettingsService } from '../loyalitypoints.service';
import { LoyalitypointsettingsComponent } from '../loyalitypointsettings/loyalitypointsettings.component';

@Component({
  selector: 'app-viewgiftcard',
  templateUrl: './viewgiftcard.component.html',
  styleUrls: ['./viewgiftcard.component.css'],
  providers:[loyalitysettingsService,NotificationsComponent]
})
export class ViewgiftcardComponent implements OnInit {
 
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;

  constructor(private appcomponent:AppComponent,
              private formbuilder:FormBuilder,
              private viewgiftservise:loyalitysettingsService,
              private router:Router,
              private notification:NotificationsComponent) { }

  ngOnInit() {

    setTimeout(() => {
      
  
    this.viewgiftservise.viewgiftproduct(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.data= data
     
    });
    this.gifFail=false;
  }, 3000);

    // this.viewgiftservise.viewgiftprice(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
    //   this.data= data
    // });
  }


}
