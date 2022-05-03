import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QrcodeSettingsService } from '../qrcodesettings.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { Router } from '@angular/router'; 
import { TranslateService } from 'ng2-translate';  

@Component({
  selector: 'app-generateqrcode',
  templateUrl: './generateqrcode.component.html',
  styleUrls: ['./generateqrcode.component.css']
})


export class GenerateqrcodeComponent implements OnInit {
  qrcodeForm: FormGroup;
  stockitems=[];
  invoiceitems=[];
  parentMessage="sales";
  constructor(public translate: TranslateService,private formBuilder: FormBuilder,private qrcodeService: QrcodeSettingsService,
    private notificationsComponent:NotificationsComponent,private router: Router) {translate.setDefaultLang('en'); }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.qrcodeForm = this.formBuilder.group({
      //for checkbox select
      stockselect:['',[]],
      formselect:['',[]],
      purchaseselect:['',[]],
      stockwiseselect:['',[]],
      distwiseselect:['',[]],
      
      //send stockvaluesvalues
      id:['',[]],
      drugproductid:[,[]],
      mrp:[0,[]],
      brandname:[,[]],
      //send product values
      formid:['opt1',[]],
      invoiceno:['',[]],

      //form wise positions
      qrcodeposition:['',[]],

      //distributor wise
      distributorid:['',[]],
      distinvoiceno:['',[]],
      distinvoiceproductno:['',[]],

      qrcode:['opt1',[]],
      qrcodeheight:[0,[]],
      qrcodewidth:[0,[]],
      companyid: [AppComponent.companyID, []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
          
     // smsenablearray: this.formBuilder.array([]),
    });
  }

  selectedtype:any;
  selecttype(event,id){
      if(event.target.checked){
          this.selectedtype=id;
          if(id==1){
            this.qrcodeForm.get('formselect').setValue(false);
            this.qrcodeForm.get('purchaseselect').setValue(false);
          }else if(id==2){
            this.qrcodeForm.get('stockselect').setValue(false);
            this.qrcodeForm.get('purchaseselect').setValue(false);
            this.qrcodeForm.get('distributorid').setValue('');
          }else if(id==3){
            this.qrcodeForm.get('stockselect').setValue(false);
            this.qrcodeForm.get('formselect').setValue(false);
            this.getDistributors();  //load distributors
            this. distinvoiceitems=[];
            this.qrcodeForm.get('distributorid').setValue('');
          }
      }else{
        this.selectedtype='';
      }
  }

   //stockwise form process
   selectedstocktype:any;
   selectstock(event,id){
     if(event.target.checked){
       this.selectedstocktype=id;
       this.qrcodeForm.get('id').setValue('');
       this.stockitems = [];
       if(id==1){
         this.qrcodeForm.get('distwiseselect').setValue(false);
       }else if(id==2){
         this.qrcodeForm.get('stockwiseselect').setValue(false);
       }
     }else{
       this.selectedstocktype='';
     }
   }
 
   productsview:boolean=false;
   stockproducts=[];
   loadstockproducts(){
     this.productsview=true;
     this.qrcodeService.searchstocksall(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
       this.stockproducts=data },
       error => { console.log(error) 
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        });
   }
 
   insertstockproducts(stockid,mrp,bname){
     this.qrcodeForm.get('drugproductid').setValue(stockid);
     this.qrcodeForm.get('mrp').setValue(mrp);
     this.qrcodeForm.get('brandname').setValue(bname);
     this.productsview=false;
     this.qrcodeForm.get("id").setValue(stockid);
   }
 
  //set qrcode size
  setqrcodedimension(){
    let qrstr=this.qrcodeForm.get('qrcode').value;
    var res = qrstr.split("*");
    this.qrcodeForm.get('qrcodeheight').setValue(res[0]);
    this.qrcodeForm.get('qrcodewidth').setValue(res[1]);
  }

  // get Searched Sales invoice Customers
  searchstock(searchvalue: any) {
    this.qrcodeService.searchstocks(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,searchvalue).subscribe(data => { 
      this.pushallstocks(data) },
      error => { console.log(error) 
       //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
       });

    }

  //Get Stock date wise
  calculatedate:any;
  getstockdatewise(date:any){
    let d1=new Date(date);
    let d2=new Date();
    var diff = d2.getTime() - d1.getTime();
    this.calculatedate=Math.floor(diff / (1000 * 60 * 60 * 24));
    if(this.calculatedate>7){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Date Between Week 7 Days', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      this.qrcodeService.datewisestocks(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,date).subscribe(data => { 
        this.pushallstocks(data)},
        error => { console.log(error) 
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        });
    }
   
  }


  //bind or push All Customers details in select option
  pushallstocks(data) {
    this.stockitems = [];
    for (let i = 0; i < data.length; i++) {
      this.stockitems.push({ value: data[i][0], label: data[i][2],drugid: data[i][1],mrp: data[i][3],shopname: data[i][5] });
    }
  }

  setstockqrcodedetails(){
    let stockid=this.qrcodeForm.get('id').value;
    let stockindex = this.stockitems.findIndex(p => p.value == stockid);
    this.qrcodeForm.get('drugproductid').setValue(this.stockitems[stockindex].drugid);
    this.qrcodeForm.get('mrp').setValue(this.stockitems[stockindex].mrp);
    this.qrcodeForm.get('brandname').setValue(this.stockitems[stockindex].label);
  }

  stockqrcodevalidate(){
    let stockid=this.qrcodeForm.get('id').value;
    let qrheight= this.qrcodeForm.get('qrcodeheight').value;
    let qrwidth= this.qrcodeForm.get('qrcodewidth').value;
    if(stockid==''||stockid==null||stockid==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Stock Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(qrheight=='opt1'||qrheight==''||qrwidth=='opt1'||qrwidth==''){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Height & Width', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  loadinglabel:any;
  generatestockqrcode(){
    let reflag=this.stockqrcodevalidate();
    if(reflag){
      this.loadinglabel="Qrcode Generating!..";
      this.qrcodeService.generatestockQrcode(JSON.stringify(this.qrcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'QrCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/qrcodesetting/viewqrcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'QrCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => { this.loadinglabel="Qrcode Generating Failed!."; console.log(error)});
    }
    
  }


  //form wise generate
  selectedform:any;
  formselect(formid){
    this.selectedform=formid;
    if(formid==1){
      this.getDistributors();  //load distributors
      this. distinvoiceitems=[];
      this.qrcodeForm.get('distributorid').setValue('');
    }else if(formid==2){
      this.qrcodeService.getsalesinvoicedetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }else if(formid==3){
      this.qrcodeService.getdeliverychallandetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }else if(formid==4){
      this.qrcodeService.getgatepassdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }else if(formid==5){
      this.qrcodeService.getpurchaseorderdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }else if(formid==6){
      this.qrcodeService.getsalesorderdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }
  }


  //bind or push All Invoice details in select option
  pushallinvoice(data) {
    this.invoiceitems = [];
    for (let i = 0; i < data.length; i++) {
      this.invoiceitems.push({ value: data[i][0], label: data[i][1] });
    }
  }


  formqrcodevalidate(){
    let formid=this.qrcodeForm.get('formid').value;
    let invoiceno=this.qrcodeForm.get('invoiceno').value;
    let qrheight= this.qrcodeForm.get('qrcodeheight').value;
    let qrwidth= this.qrcodeForm.get('qrcodewidth').value;
    let position= this.qrcodeForm.get('qrcodeposition').value;
    if(formid=='opt1'||formid==''||formid==null){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Form Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(invoiceno==''||invoiceno==null||invoiceno==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Invoice No', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(qrheight=='opt1'||qrheight==''||qrwidth=='opt1'||qrwidth==''){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Height & Width', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(position==''||position==null||position==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select any Position to Fit', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  generatePurchaseInvoiceqrcode(){
    let reflag=this.formqrcodevalidate();
    if(reflag){
      this.loadinglabel="Qrcode Generating!..";
      this.qrcodeForm.get('id').setValue(this.qrcodeForm.get('invoiceno').value);
      this.qrcodeService.generatepurchaseinvoiceQrcode(JSON.stringify(this.qrcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'QrCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/qrcodesetting/viewqrcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'QrCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Qrcode Generating Failed!."; console.log(error)});
    }
  }

  generateSalesInvoiceqrcode(){
    let reflag=this.formqrcodevalidate();
    if(reflag){
      this.loadinglabel="Qrcode Generating!..";
      this.qrcodeForm.get('id').setValue(this.qrcodeForm.get('invoiceno').value);
      this.qrcodeService.generatesalesinvoiceQrcode(JSON.stringify(this.qrcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'QrCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/qrcodesetting/viewqrcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'QrCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Qrcode Generating Failed!."; console.log(error)});
    }
  }

  generateDeliveryChallanqrcode(){
    let reflag=this.formqrcodevalidate();
    if(reflag){
      this.loadinglabel="Qrcode Generating!..";
      this.qrcodeForm.get('id').setValue(this.qrcodeForm.get('invoiceno').value);
      this.qrcodeService.generatedeliverychallanQrcode(JSON.stringify(this.qrcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'QrCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/qrcodesetting/viewqrcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'QrCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Qrcode Generating Failed!."; console.log(error)});
    }
  }

  generateGatePassqrcode(){
    let reflag=this.formqrcodevalidate();
    if(reflag){
      this.loadinglabel="Qrcode Generating!..";
      this.qrcodeForm.get('id').setValue(this.qrcodeForm.get('invoiceno').value);
      this.qrcodeService.generategatepassQrcode(JSON.stringify(this.qrcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'QrCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/qrcodesetting/viewqrcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'QrCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Qrcode Generating Failed!."; console.log(error)});
    }
  }

  generatePurchaseOrderqrcode(){
    let reflag=this.formqrcodevalidate();
    if(reflag){
      this.loadinglabel="Qrcode Generating!..";
      this.qrcodeForm.get('id').setValue(this.qrcodeForm.get('invoiceno').value);
      this.qrcodeService.generatepurchaseorderQrcode(JSON.stringify(this.qrcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'QrCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/qrcodesetting/viewqrcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'QrCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => { this.loadinglabel="Qrcode Generating Failed!."; console.log(error)});
    }
  } 
  
  generateSalesOrderqrcode(){
    let reflag=this.formqrcodevalidate();
    if(reflag){
      this.loadinglabel="Qrcode Generating!..";
      this.qrcodeForm.get('id').setValue(this.qrcodeForm.get('invoiceno').value);
      this.qrcodeService.generatesalesrderQrcode(JSON.stringify(this.qrcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'QrCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/qrcodesetting/viewqrcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'QrCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Qrcode Generating Failed!."; console.log(error)});
    }
  }

  //distributor wise generate API's
  distributors=[];
  getDistributors(){
    this.qrcodeService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.distributors = [];
      for (let i = 0; i < data.length; i++) {
        this.distributors.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }

  //get invocie by distriibutor
  distinvoiceitems=[];
  distributorinvoice(){
    let distid=this.qrcodeForm.get('distributorid').value;
    this.qrcodeService.getdistributorinvoice(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1,distid).subscribe(data => {
      this.distinvoiceitems = [];
      for (let i = 0; i < data.length; i++) {
        this.distinvoiceitems.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }

  //get invocie products by distriibutor
  distinvoiceproducts=[];
  distributorinvoiceproducts(){
    let distinvoiceid=this.qrcodeForm.get('distinvoiceno').value;
    this.qrcodeService.getdistributorinvoiceproducts(distinvoiceid).subscribe(data => {
      this.distinvoiceproducts = [];
      for (let i = 0; i < data.length; i++) {
        this.distinvoiceproducts.push({ value: data[i][0], label: data[i][2] });
      }
    });
  }

  distributorqrcodevalidate(){
    let distid=this.qrcodeForm.get('distributorid').value;
    let invoiceno=this.qrcodeForm.get('distinvoiceno').value;
    let invoiceprodno=this.qrcodeForm.get('distinvoiceproductno').value;
    let qrheight= this.qrcodeForm.get('qrcodeheight').value;
    let qrwidth= this.qrcodeForm.get('qrcodewidth').value;
    if(distid==''||distid==null||distid==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Distributor Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(invoiceno==''||invoiceno==null||invoiceno==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Invoice No', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(invoiceprodno==''||invoiceprodno==null||invoiceprodno==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Invoice Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(qrheight=='opt1'||qrheight==''||qrwidth=='opt1'||qrwidth==''){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Height & Width', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  //generate qrcode for Purchase Products
  generatePurchaseProductqrcode(){
    let reflag=this.distributorqrcodevalidate();
    if(reflag){
      this.loadinglabel="Qrcode Generating!..";
      this.qrcodeForm.get('id').setValue(this.qrcodeForm.get('distinvoiceproductno').value);
      this.qrcodeService.generatepurchaseproductQrcode(JSON.stringify(this.qrcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'QrCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/qrcodesetting/viewqrcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'QrCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Qrcode Generating Failed!."; console.log(error)});
    }
  }


}
