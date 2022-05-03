import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { PrescriptionApprovalService } from '../prescriptionapproval/prescriptionapproval.service';

@Component({
  selector: 'app-viewpresdigital',
  templateUrl: './viewpresdigital.component.html',
  styleUrls: ['./viewpresdigital.component.css'],
  providers:[PrescriptionApprovalService]
})
export class ViewpresdigitalComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;

  constructor(private prescrepservice: PrescriptionApprovalService) { }

  ngOnInit() {

    setTimeout(() => {
      this.prescrepservice.viewprescription(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(
        data => {
          this.data = data
        })
        this.gifFail=false;
      },3000);
  }
  
}
