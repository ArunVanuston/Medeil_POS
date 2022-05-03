import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { QrcodeSettingsService } from '../qrcodesettings.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-viewqrcode',
  templateUrl: './viewqrcode.component.html',
  styleUrls: ['./viewqrcode.component.css']
})


export class ViewqrcodeComponent implements OnInit {
  qrcodeForm: FormGroup;
  stockdata=[];
  invoicedata=[];
  invoicedatacopy=[];


  //for qrcode image view
  imgURL: any ;
  noimage:any;
  qrcodeshow:boolean=false;
  private readonly imageType: any = 'data:image/*;base64,';

  constructor(private formBuilder: FormBuilder,private qrcodeService: QrcodeSettingsService,private notificationsComponent:NotificationsComponent,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.qrcodeForm = this.formBuilder.group({
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
    this.qrcodeService.searchstocksall(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
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
            this.qrcodeForm.get('formselect').setValue(false);
            this.qrcodeForm.get('purchaseselect').setValue(false);
            this.qrcodeService.searchstocksall(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
              this.stockdata=data },
              error => { console.log(error) 
               //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
               });
          }else if(id==2){
            this.qrcodeForm.get('stockselect').setValue(false);
            this.qrcodeForm.get('purchaseselect').setValue(false);
          }else if(id==3){
            this.qrcodeForm.get('stockselect').setValue(false);
            this.qrcodeForm.get('formselect').setValue(false);
            this.getDistributors();
          }else{
        this.selectedtype='';
      }
    }
  }


  //stock wise
  searchstock(searchvalue: any) {
    if(searchvalue.length>0){
      this.qrcodeService.searchstocks(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,searchvalue).subscribe(data => { 
        this.stockdata=data },
        error => { console.log(error) 
         //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
         });
    }else{
        this.qrcodeService.searchstocksall(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
          this.stockdata=data },
          error => { console.log(error) 
           //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
           });
      }
  
    }

    StockqrcodeimageView(stockid,qrlabel){
      this.qrcodeService.viewStockQrcodeimage(stockid).subscribe(data => {
        if(data.content == "no image"){
          this.qrcodeshow=false;
          this.imgURL='';
          this.noimage="No Image to Preview";
        }else{
          this.qrcodeshow=true;
          this.noimage='';
          this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
        }
      } , 
        err => {console.log("Error occured on viewStock()"+err);
        this.qrcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }); 
    }
  

  //form wise view
  selectedform:any;
  formselect(formid){
    this.selectedform=formid;
    if(formid==1){
      this.qrcodeService.getpurchaseinvoicedetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==2){
      this.qrcodeService.getsalesinvoicedetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==3){
      this.qrcodeService.getdeliverychallandetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==4){
      this.qrcodeService.getgatepassdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==5){
      this.qrcodeService.getpurchaseorderdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }else if(formid==6){
      this.qrcodeService.getsalesorderdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.invoicedata=data,this.invoicedatacopy=data },
        error => { console.log(error)});
    }
  }


  //qrcode image view
  SalesInvoiceqrcodeimageView(invoiceid){
    this.qrcodeService.viewSalesinvoiceQrcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.qrcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.qrcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.qrcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  PurchaseInvoiceqrcodeimageView(invoiceid){
    this.qrcodeService.viewPurchaseinvoiceQrcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.qrcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.qrcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.qrcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  DeliveryChallanqrcodeimageView(invoiceid){
    this.qrcodeService.viewDeliverychallanQrcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.qrcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.qrcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.qrcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  GatePassqrcodeimageView(invoiceid){
    this.qrcodeService.viewGatePassQrcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.qrcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.qrcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.qrcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }

  PurchaseOrderqrcodeimageView(invoiceid){
    this.qrcodeService.viewPurchaseOrderQrcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.qrcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.qrcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.qrcodeshow=false;
      this.imgURL='';
      this.noimage="No Image to Preview";
    }); 
  }
  
  SalesOrderqrcodeimageView(invoiceid){
    this.qrcodeService.viewSalesOrderQrcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.qrcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.qrcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.qrcodeshow=false;
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
    this.qrcodeService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1)
    .subscribe(data => {this.distributors = data});
  }

  distinvoiceitems=[];
  distname:any;
  distributorinvoice(distid){
    this.qrcodeForm.get('distinvoiceno').setValue('opt1');
    let distindex= this.distributors.findIndex(p => p[0] == distid);
    this.distname=this.distributors[distindex][1];
    this.qrcodeService.getdistributorinvoice(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1,distid)
    .subscribe(data => {this.distinvoiceitems = data});
  }

  distinvoiceproducts=[];
  
  distributorinvoiceproducts(distinvoiceid){
    this.qrcodeService.getdistributorinvoiceproducts(distinvoiceid).subscribe(data => {
      this.distinvoiceproducts = data});
  }

  PurchaseProductqrcodeimageView(invoiceid){
    this.qrcodeService.viewDistPurchaseProductQrcodeimage(invoiceid).subscribe(data => {
      if(data.content == "no image"){
        this.qrcodeshow=false;
        this.imgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.qrcodeshow=true;
        this.noimage='';
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }
    } , 
      err => {console.log("Error occured on viewStock()"+err);
      this.qrcodeshow=false;
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
    this.qrcodeService.viewStockQrcodeimage(stockid).subscribe(data => {
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
    }); 
  }

  printviewpurchase(invoiceid){
    this.printimageview=true;
    this.printcount=[];
    this.printcount.push({});  
    this.qrcodeService.viewDistPurchaseProductQrcodeimage(invoiceid).subscribe(data => {
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
      this.qrcodeshow=false;
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
  }
  

}
