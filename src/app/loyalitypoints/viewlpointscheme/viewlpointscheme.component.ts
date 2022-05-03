import { Component, OnInit } from '@angular/core';
import { loyalitysettingsService } from '../loyalitypoints.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-viewlpointscheme',
  templateUrl: './viewlpointscheme.component.html',
  styleUrls: ['./viewlpointscheme.component.css'],
  providers:[loyalitysettingsService]
})
export class ViewlpointschemeComponent implements OnInit {

  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;

  constructor(private loyalityservice:loyalitysettingsService,
              private router:Router,
              private formbuilder:FormBuilder,
              private appcomponent:AppComponent) { }
   
  ngOnInit() {

    setTimeout(() => {
      

    this.loyalityservice.getpointsview(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{this.data = data},
      err =>{
        console.log("Error Occur in Getpointsview")
      });
      this.gifFail=false;
    }, 3000);
  }

}
