import { Component, OnInit } from '@angular/core';
import { PaymentTrialService } from '../paymenttrialforms.service';

@Component({
  selector: 'app-viewcustomerslist',
  templateUrl: './viewcustomerslist.component.html',
  styleUrls: ['./viewcustomerslist.component.css']
})
export class ViewcustomerslistComponent implements OnInit {
  customerlists=[];
  customerlistscopy=[];
  constructor(private paytrialservice:PaymentTrialService) { }

  ngOnInit() {
  }

  selectedtype:any;
  selecttype(event,selval){
    this.selectedtype=selval;
    this.selectededition='';
    if(event.target.checked){
      if(selval==1){
        this.paytrialservice.getFreeEditionCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selval==2){
        this.paytrialservice.getAllTrialCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selval==3){
        this.paytrialservice.getAllEditionCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selval==4){
        this.paytrialservice.getAllTrialPaidCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }
    }
  }

  selectededition:any;
  selectedition(selvalue){
    this.selectededition=selvalue;
    if(this.selectedtype==2){   //Trial Customers
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
    }else if(this.selectedtype==3){    //Paid Edition Customers
      if(selvalue==1){
        this.paytrialservice.getBronzeEditionCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selvalue==2){
        this.paytrialservice.getSilverEditionCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selvalue==3){
        this.paytrialservice.getGoldEditionCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }else if(selvalue==4){
        this.paytrialservice.getPlatinumEditionCustomers().subscribe(data => {
          this.customerlists=data, this.customerlistscopy=data },error => { console.log(error) 
          });
      }
    }
  }


  //search customers
  searchcustomers(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.customerlistscopy).filter(
      item => ((item[1].toLowerCase()).indexOf(event.toLowerCase()) !== -1 || (item[2].toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.customerlists=srch;
    }else{
      this.customerlists=this.customerlistscopy;
    }
   
  }

}
