import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { loyalitysettingsService } from '../loyalitypoints.service';

@Component({
  selector: 'app-customerpoints',
  templateUrl: './customerpoints.component.html',
  styleUrls: ['./customerpoints.component.css'],
  providers:[loyalitysettingsService]
})
export class CustomerpointsComponent implements OnInit {
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;

  constructor(private loyalityservice:loyalitysettingsService,private appcomponenet:AppComponent) { }

  ngOnInit() {
   
    setTimeout(() => {
      
    
    this.loyalityservice.getcustloyality(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.data =data
  
    })
    this.gifFail=false;
  }, 3000);
  }
 

}
