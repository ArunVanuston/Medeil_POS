import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { paymentoutstandingService } from './paymentoutstanding.service';

@Component({
  selector: 'app-paymentoutstanding',
  templateUrl: './paymentoutstanding.component.html',
  styleUrls: ['./paymentoutstanding.component.css'],
  providers:[paymentoutstandingService]
})
export class PaymentoutstandingComponent implements OnInit {
  public data:any;
  public rowOnPage:number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder:string = "desc";
  gifFail: boolean=true;
  constructor(private Service:paymentoutstandingService,private dateformat: dateFormatPipe) { }

  ngOnInit() {
    this.Service.Getpaymentout(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,this.dateformat.transform05(Date.now())).subscribe(data => {this.data = data,
      this.gifFail=false
    },
      err=> {
        console.log('Error Occured View Picking');
      });
     
  }

}
