import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BannedDrugService } from '../banneddruglist.service';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
//@Auther Desingraja
@Component({
  selector: 'app-banneddrug',
  templateUrl: './banneddrug.component.html',
  styleUrls: ['./banneddrug.component.css'],
  providers:[NotificationsComponent]
})
export class BanneddrugComponent implements OnInit {
  BannedDrugList:FormGroup;
  

  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  scheduleupdate: any;
  schedule: any;
  constructor(private formbuilder:FormBuilder,
              private bannedservice:BannedDrugService,
              private router:Router,
              private appcomponent:AppComponent,
              private notification:NotificationsComponent) {
    this.BannedDrugList = this.formbuilder.group({
      banneddrugstatus:[,[]]

    });
   }

  ngOnInit() {
   
    this.BannedDrugList.get('banneddrugstatus').setValue(1);

    setTimeout(() => {
      
    
    this.bannedservice.getbanneddrug(AppComponent.countryID,this.BannedDrugList.get('banneddrugstatus').value).subscribe(data => {this.data=data})

    this.gifFail=false;
  }, 3000);
  }

}
