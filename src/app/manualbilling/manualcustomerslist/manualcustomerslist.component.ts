import { Component, OnInit } from '@angular/core';
import { ManualbillingService } from '../manualbilling.service';

@Component({
  selector: 'app-manualcustomerslist',
  templateUrl: './manualcustomerslist.component.html',
  providers:[ManualbillingService]
})
export class ManualcustomerslistComponent implements OnInit {
  
  constructor(private manualservice:ManualbillingService) { }
  rowsOnPage:number=10;
  manualcustomers:any=[];
  manualcustomerscopy:any=[];
  plandetails:any=[];
  gifFail:boolean=true;
  ngOnInit() {
    this.manualservice.GetManualCustomers().subscribe(data => {
      this.manualcustomers=data;this.manualcustomerscopy=data;});
    setTimeout(() => {
      this.gifFail=false;
    },2100)
  }

  plandetailsflag:boolean=false;
  manualplanid:any;
  getplandetails(planid:any){
    this.plandetailsflag=true;
    this.manualplanid=planid;
    this.manualservice.GetManualPlanDetails(planid).subscribe(data => {this.plandetails=data;});
  }

  //search customers
  searchcustomers(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.manualcustomerscopy).filter(
      item => ((item.customername.toLowerCase()).indexOf(event.toLowerCase()) !== -1 || (item.emailid.toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.manualcustomers=srch;
    }else{
      this.manualcustomers=this.manualcustomerscopy;
    }
  }

}
