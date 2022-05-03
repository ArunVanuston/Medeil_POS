import { Component, OnInit } from '@angular/core';
import { ManualbillingService } from '../manualbilling.service';

@Component({
  selector: 'app-viewsalesorder',
  templateUrl: './viewsalesorder.component.html',
  providers:  [ManualbillingService]
})
export class ViewsalesorderComponent implements OnInit {
  gifFail:boolean=true;
  rowsOnPage:number=10;
  manualsalesorders:any=[];
  manualsalesorderscopy:any=[];
  constructor(private manualservice:ManualbillingService) { }

  ngOnInit() {
    this.manualservice.GetManualSalesOrdersList().subscribe(data => {
      this.manualsalesorders=data;this.manualsalesorderscopy=data;
    });
    setTimeout(() => {
      this.gifFail=false;
    }, 1400);
  }

  PayStauschange(invid:any){
    var frmint={id:invid,paymentstatus:1}
    this.manualservice.UpdateSalesOrderPayStatus(JSON.stringify(frmint)).subscribe(data => {
     if(data){
       this.ngOnInit();
     }
    });
  }

  //search customers
  searchcustomers(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.manualsalesorderscopy).filter(
      item => ((item.customername.toLowerCase()).indexOf(event.toLowerCase()) !== -1 || (item.mansalesorderno.toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.manualsalesorders=srch;
    }else{
      this.manualsalesorders=this.manualsalesorderscopy;
    }
  }

}
