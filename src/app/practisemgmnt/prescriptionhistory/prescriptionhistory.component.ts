import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { PrescriptionApprovalService } from '../prescriptionapproval/prescriptionapproval.service';

@Component({
  selector: 'app-prescriptionhistory',
  templateUrl: './prescriptionhistory.component.html',
  styleUrls: ['./prescriptionhistory.component.css']
})
export class PrescriptionhistoryComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;

  constructor(private prescrepservice: PrescriptionApprovalService) { }

  ngOnInit() {

    setTimeout(() => {
      this.prescrepservice.getprescriptionhistory(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(
        data => {
          this.data = data
        })
        this.gifFail=false;
      },3000);
  }

}
