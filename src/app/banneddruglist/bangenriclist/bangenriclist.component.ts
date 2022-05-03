import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BannedDrugService } from '../banneddruglist.service';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-bangenriclist',
  templateUrl: './bangenriclist.component.html',
  styleUrls: ['./bangenriclist.component.css'],
  providers:[NotificationsComponent]
})
export class BangenriclistComponent implements OnInit {
  BannedGeneric:FormGroup;
  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  constructor(private formbuilder:FormBuilder,
               private bannedservice:BannedDrugService,
               private router:Router,
               private appcomponent:AppComponent,
               private notification:NotificationsComponent) {

    this.BannedGeneric=this.formbuilder.group({


    })
                }

  ngOnInit() {
    setTimeout(() => {
 
    this.bannedservice.getbannedgeneric(AppComponent.countryID).subscribe(data=>{this.data=data
    })
    this.gifFail=false;
         
  }, 3000);
  }

}
