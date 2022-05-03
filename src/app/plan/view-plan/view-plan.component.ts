import { Component, OnInit } from '@angular/core';
import { planService } from '../add-plan/add-plan.service';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.css'],
  providers:[planService]
})
export class ViewPlanComponent implements OnInit {
  public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";  
  constructor(private planService: planService) { }

  ngOnInit() {
   this.planService.getplandetails(0).subscribe(data => this.data = data,
    err=> console.log("Error on getplandetails()"))
  }

  getplantype(evalue){
    this.planService.getplandetails(evalue).subscribe(data => this.data = data,
      err=> console.log("Error on getplandetails()"))
  }

}
