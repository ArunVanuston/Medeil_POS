import { Component, OnInit } from '@angular/core';
import { ManualbillingService } from '../manualbilling.service';

@Component({
  selector: 'app-viewsalesinvoicemanual',
  templateUrl: './viewsalesinvoicemanual.component.html',
  providers: [ManualbillingService]
})
export class ViewsalesinvoicemanualComponent implements OnInit {
  gifFail:boolean=true;
  rowsOnPage:number=10;
  manualsalesinvoice=[];
  manualsalesinvoicecopy=[];
  constructor(private manualservice:ManualbillingService) { }

  ngOnInit() {
  this.manualservice.GetManualSalesInvoiceList().subscribe(data => {
    this.manualsalesinvoice=data;this.manualsalesinvoicecopy=data;
    });

    setTimeout(() => {
      this.gifFail=false;
    }, 2300);
  }

  productdetails=[];
  productdetailsflag:boolean=false;
  getproductdetails(indexid:any){
    this.productdetailsflag=true;
    this.manualservice.GetManualSalesInvoiceProducts(indexid).subscribe(data => {
      if(data){
        this.productdetails=[];
        this.productdetails=data;
      }
    },errorCode => console.log(errorCode));
  }

}
