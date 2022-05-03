import { Component, OnInit } from '@angular/core';
import { PaymentTrialService } from '../paymenttrialforms.service';

@Component({
  selector: 'app-viewtrialcustomers',
  templateUrl: './viewtrialcustomers.component.html',
  styleUrls: ['./viewtrialcustomers.component.css']
})
export class ViewtrialcustomersComponent implements OnInit {
  rowsOnPage:number=10;
  customerlists=[];
  customerlistscopy=[];
  gifFail:boolean=true;
  constructor(private paytrialservice:PaymentTrialService) { }

  ngOnInit() {
    this.paytrialservice.getAllTrialCustomers().subscribe(data => {
      this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
    });

    setTimeout(() => {
      this.gifFail=false;
    },2100)
  }

  selectededition:any;
  selectedition(selvalue){
    this.selectededition=selvalue;  //Trial Customers
      if(selvalue==1){
        this.paytrialservice.getBronzeTrialCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selvalue==2){
        this.paytrialservice.getSilverTrialCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selvalue==3){
        this.paytrialservice.getGoldTrialCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selvalue==4){
        this.paytrialservice.getPlatinumTrialCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }
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
