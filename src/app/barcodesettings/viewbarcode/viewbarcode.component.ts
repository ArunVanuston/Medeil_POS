import { Component, OnInit } from '@angular/core';
import { BarcodeSettingsService } from '../barcodesettings.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-viewbarcode',
  templateUrl: './viewbarcode.component.html',
  styleUrls: ['./viewbarcode.component.css']
})
export class ViewbarcodeComponent implements OnInit {
  barcodeForm: FormGroup;
  stockdata=[];
  invoicedata=[];
  invoicedatacopy=[];

  //for barcode image view
  imgURL: any ;
  noimage:any;
  barcodeshow:boolean=false;
  private readonly imageType: any = 'data:image/*;base64,';

  constructor(private formBuilder: FormBuilder,private barcodeService: BarcodeSettingsService,private notificationsComponent:NotificationsComponent,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.barcodeForm = this.formBuilder.group({
      //for checkbox select
      stockselect:[true,[]],
      formselect:['',[]],
      purchaseselect:['',[]],

      //send stockvaluesvalues
      id:['',[]],
      drugproductid:[,[]],

      //send product values
      formid:['opt1',[]],
      invoiceno:['',[]],

      //purchase products
      distributorid:['opt1',[]],
      distinvoiceno:['opt1',[]]

    });

    this.barcodeService.searchstocksall(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
      this.stockdata=data },
      error => { console.log(error) 
       //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
       });
  }

  selectedtype:any=1;
  selecttype(event,id){
      if(event.target.checked){
          this.selectedtype=id;
          if(id==1){
            this.barcodeForm.get('formselect').setValue(false);
            this.barcodeForm.get('purchaseselect').setValue(false);
            this.barcodeService.searchstocksall(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
              this.stockdata=data },
              error => { console.log(error) 
               //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
               });
          }else if(id==2){
            this.barcodeForm.get('stockselect').setValue(false);
            this.barcodeForm.get('purchaseselect').setValue(false);
          }else if(id==3){
            this.barcodeForm.get('stockselect').setValue(false);
            this.barcodeForm.get('formselect').setValue(false);
            this.getDistributors();
          }else{
        this.selectedtype='';
      }
    }
  }


  //stock wise
  searchstock(searchvalue: any) {
    if(searchvalue.length>0){
      this.barcodeService.searchstocks(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,searchvalue).subscribe(data => { 
        this.stockdata=data },
        error => { console.log(error) 
         //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
         });
    }else{
      this.barcodeService.searchstocksall(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.stockdata=data },
        error => { console.log(error) 
         //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
         });
      }

    }

    StockBarcodeimageView(stockid){
      this.barcodeService.viewStockBarcodeimage(stockid).subscribe(data => {
        if(data.content == "no image"){
          this.barcodeshow=false;
          this.imgURL='';
          this.noimage="No Image to Preview";
        }else{
          this.barcodeshow=true;
          this.noimage='';
          this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
        }
      } , 
        err => {console.log("Error occured on viewStock()"+err);
        this.barcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }); 
    }
  

  //form wise view
  selectedform:any;
  formselect(formid){
    this.selectedform=formid;
    if(formid==1){
      this.barcodeService.getpurchaseinvoicedetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==2){
      this.barcodeService.getsalesinvoicedetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==3){
      this.barcodeService.getdeliverychallandetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==4){
      this.barcodeService.getgatepassdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==5){
      this.barcodeService.getpurchaseorderdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==6){
      this.barcodeService.getsalesorderdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }
  }


  //barcode image view
  SalesInvoiceBarcodeimageView(invoiceid){
    this.barcodeService.viewSalesinvoiceBarcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.barcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.barcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  PurchaseInvoiceBarcodeimageView(invoiceid){
    this.barcodeService.viewPurchaseinvoiceBarcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.barcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.barcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  DeliveryChallanBarcodeimageView(invoiceid){
    this.barcodeService.viewDeliverychallanBarcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.barcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.barcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  PurchaseOrderBarcodeimageView(invoiceid){
    this.barcodeService.viewPurchaseorderBarcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.barcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.barcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  } 
  
  SalesOrderBarcodeimageView(invoiceid){
    this.barcodeService.viewSalesorderBarcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.barcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.barcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }  
  
  GatePassBarcodeimageView(invoiceid){
    this.barcodeService.viewGatepassBarcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.barcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.barcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }




  searchinvoice(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.invoicedatacopy).filter(
      item => ((item[1].toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.invoicedata=srch;
    }else{
      this.invoicedata=this.invoicedatacopy;
    }
   
  }

  //purchase products wise  3type

  distributors=[];
  getDistributors(){
    this.barcodeService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1)
    .subscribe(data => {this.distributors = data});
  }

  distinvoiceitems=[];
  distname:any;
  distributorinvoice(distid){
    this.barcodeForm.get('distinvoiceno').setValue('opt1');
    let distindex= this.distributors.findIndex(p => p[0] == distid);
    this.distname=this.distributors[distindex][1];
    this.barcodeService.getdistributorinvoice(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1,distid)
    .subscribe(data => {this.distinvoiceitems = data});
  }

  distinvoiceproducts=[];
  distributorinvoiceproducts(distinvoiceid){
    this.barcodeService.getdistributorinvoiceproducts(distinvoiceid).subscribe(data => {
      this.distinvoiceproducts = data});
  }

  PurchaseProductBarcodeimageView(invoiceid){
    this.barcodeService.viewDistPurchaseProductBarcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.barcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.barcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  printimageview:boolean=false;
  printimgurl:any
  printcount=[]
  countenable:boolean=false;
  printviewstock(stockid){
    this.printimageview=true;
    this.printcount=[];
    this.printcount.push({});
    this.barcodeService.viewStockBarcodeimage(stockid).subscribe(data => {
      if(data.content == "no image"){
        this.printimgurl='';
        this.noimage="No Image to Preview";
        this.countenable=false;
      }else{
        this.noimage='';
        this.printimgurl = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content);
        this.countenable=true;
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  printviewpurchase(invoiceid){
    this.printimageview=true;
    this.printcount=[];
    this.printcount.push({});  
    this.barcodeService.viewDistPurchaseProductBarcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.printimgurl='';
        this.noimage="No Image to Preview";
        this.countenable=false;
      }else{
        this.noimage='';
        this.printimgurl = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content);
        this.countenable=true;
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.barcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  printcountchange(count){
    this.printcount=[];
    for(let i=0;i<=count-1;i++){
      this.printcount.push({});
    }
  }

  //print option enable
  winprint(){
    var w = window.open();
    w.document.open();
    w.document.write(document.getElementById("printarea").innerHTML);
    w.document.close();
    w.print();
    //w.close();
  }


}
