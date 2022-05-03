import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { loyalitycusttypeService } from '../loyalitycusttype.service';

@Component({
  selector: 'app-viewcustype',
  templateUrl: './viewcustype.component.html',
  styleUrls: ['./viewcustype.component.css'],
  providers:[loyalitycusttypeService]
})
export class ViewcustypeComponent implements OnInit {
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  constructor(private loyalitycusttypeservice:loyalitycusttypeService,
              private appcomponent:AppComponent) { }
           
            

  ngOnInit() {

    setTimeout(() => {
      
  
    this.loyalitycusttypeservice.getcustype(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.data = data
    }) 
    this.gifFail=false;
  }, 3000); 
 }

}
