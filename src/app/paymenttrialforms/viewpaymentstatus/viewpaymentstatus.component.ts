import { Component, OnInit } from '@angular/core';
import { PaymentTrialService } from '../paymenttrialforms.service';

@Component({
  selector: 'app-viewpaymentstatus',
  templateUrl: './viewpaymentstatus.component.html',
  styleUrls: ['./viewpaymentstatus.component.css']
})
export class ViewpaymentstatusComponent implements OnInit {
  rowsOnPage:number=10;
  paymentlists=[];
  paymentlistscopy=[];
  accountid:any;
  subscriptionid:any;
  planid:any;
  customerid:any;
  gifFail:boolean=true;
  constructor(private paytrialservice:PaymentTrialService) { }

  ngOnInit() {
    this.paytrialservice.ViewAllPayments().subscribe(data => {
      this.paymentlists=data, this.paymentlistscopy=data },error => { console.log(error) 
      });
    setTimeout(() => {
        this.gifFail=false;
    },2100)
  }

  paymentdetails:boolean=false;
  sendpaydetails(acid,subid,planid,cusid){
    this.paymentdetails=true;
    this.accountid=acid;
    this.subscriptionid=subid;
    this.planid=planid;
    this.customerid=cusid;
  }

  //search customers
  searchcustomers(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.paymentlistscopy).filter(
      item => ((item[1].toLowerCase()).indexOf(event.toLowerCase()) !== -1 || (item[2].toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.paymentlists=srch;
    }else{
      this.paymentlists=this.paymentlistscopy;
    }
  }

  //search by paytype
  paymenttype:any;
  selectedpaytype(paytype){
    this.paymenttype=paytype;
    if(paytype=='All'){
      this.paymentlists=this.paymentlistscopy;
    }else{
      let srch = Object.assign([], this.paymentlistscopy).filter(
        item => ((item[0].toLowerCase()).indexOf(paytype.toLowerCase()) !== -1));
        this.paymentlists=srch;
    }
  }

}
