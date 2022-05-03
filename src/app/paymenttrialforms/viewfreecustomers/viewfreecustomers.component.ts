import { Component, OnInit } from '@angular/core';
import { PaymentTrialService } from '../paymenttrialforms.service';

@Component({
  selector: 'app-viewfreecustomers',
  templateUrl: './viewfreecustomers.component.html',
  styleUrls: ['./viewfreecustomers.component.css']
})
export class ViewfreecustomersComponent implements OnInit {
  rowsOnPage:number=10;
  gifFail:boolean=true;
  customerlists=[];
  customerlistscopy=[];
  constructor(private paytrialservice:PaymentTrialService) { }

  ngOnInit() {
    this.paytrialservice.getFreeEditionCustomers().subscribe(data => {
      this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
      });
    
    setTimeout(() => {
      this.gifFail=false;
    },2100)
  }


   //search customers
   searchcustomers(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.customerlistscopy).filter(
      item => ((item[1].toLowerCase()).indexOf(event.toLowerCase()) !== -1 || (item[3].toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.customerlists=srch;
    }else{
      this.customerlists=this.customerlistscopy;
    }
   
  }

}
