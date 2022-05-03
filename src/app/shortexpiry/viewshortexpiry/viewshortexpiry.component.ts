import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShortexpiryService } from '../shortexpiry.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router'; 
import { TranslateService } from 'ng2-translate';  

@Component({
  selector: 'app-viewshortexpiry',
  templateUrl: './viewshortexpiry.component.html',
  styleUrls: ['./viewshortexpiry.component.css'],
  providers:[NotificationsComponent]
})
export class ViewshortexpiryComponent implements OnInit {
  ViewShortExpiry:FormGroup;

  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  scheduleupdate: any;
  schedule: any;
  itemlength=[{},{},{},{},{},{},{}]
  

  constructor(private appcomponent:AppComponent,
              private formbuilder:FormBuilder,
              private shortexpiryservice:ShortexpiryService,
              private router:Router,public translate: TranslateService,
              private notification:NotificationsComponent) {translate.setDefaultLang('en'); 

                
            
               }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.ViewShortExpiry = this.formbuilder.group({
      shortexptype:['',[]]
    })
setTimeout(() => {
  

    this.shortexpiryservice.getshortexpdata(AppComponent.companyID,
      AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{this.data = data})
      this.gifFail=false;
    }, 3000);
   }
  //  passvalue
getdata(event,passvalue){
  if(event.target.checked){
    this.shortexpiryservice.getshortexpdata(AppComponent.companyID,
    AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{this.data = data})
  }
 
  }

}