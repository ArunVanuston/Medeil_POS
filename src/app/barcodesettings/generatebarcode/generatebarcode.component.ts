import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { BarcodeSettingsService } from '../barcodesettings.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-generatebarcode',
  templateUrl: './generatebarcode.component.html',
  styleUrls: ['./generatebarcode.component.css']
})
export class GeneratebarcodeComponent implements OnInit {
  parentMessage="sales";
  barcodeForm: FormGroup;
  stockitems=[];
  invoiceitems=[];

  constructor(public translate: TranslateService,private formBuilder: FormBuilder,private barcodeService: BarcodeSettingsService,
    private notificationsComponent:NotificationsComponent,private router: Router) { translate.setDefaultLang('en');}

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.barcodeForm = this.formBuilder.group({
      //for checkbox select
      stockselect:['',[]],
      formselect:['',[]],
      purchaseselect:['',[]],
      stockwiseselect:['',[]],
      distwiseselect:['',[]],
      
      //send stockvaluesvalues
      id:[,[]],
      drugproductid:[,[]],
      mrp:[0,[]],
      brandname:['s',[]],
      shopname:['s',[]],
      //send product values
      formid:['opt1',[]],
      invoiceno:[,[]],

      //form wise positions
      barcodeposition:['',[]],
    
      //distributor wise
      distributorid:['',[]],
      distinvoiceno:['',[]],
      distinvoiceproductno:['',[]],

      barcode:['opt1',[]],
      barcodeheight:[0,[]],
      barcodewidth:[0,[]],
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
            this.barcodeForm.get('formselect').setValue(false);
            this.barcodeForm.get('purchaseselect').setValue(false);
          }else if(id==2){
            this.barcodeForm.get('stockselect').setValue(false);
            this.barcodeForm.get('purchaseselect').setValue(false);
            this.barcodeForm.get('distributorid').setValue('');
          }else if(id==3){
            this.barcodeForm.get('stockselect').setValue(false);
            this.barcodeForm.get('formselect').setValue(false);
            this.getDistributors();  //load distributors
            this. distinvoiceitems=[];
            this.barcodeForm.get('distributorid').setValue('');
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
      this.barcodeForm.get('id').setValue('');
      this.stockitems = [];
      if(id==1){
        this.barcodeForm.get('distwiseselect').setValue(false);
      }else if(id==2){
        this.barcodeForm.get('stockwiseselect').setValue(false);
      }
    }else{
      this.selectedstocktype='';
    }
  }

  productsview:boolean=false;
  stockproducts=[];
  loadstockproducts(){
    this.productsview=true;
    this.barcodeService.searchstocksall(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
      this.stockproducts=data },
      error => { console.log(error) 
       //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
       });
  }

  insertstockproducts(stockid,stockname,mrp,shopname){
    this.barcodeForm.get('drugproductid').setValue(stockid);
    this.barcodeForm.get('brandname').setValue(stockname);
    this.barcodeForm.get('mrp').setValue(mrp);
    this.barcodeForm.get('shopname').setValue(shopname);
    this.productsview=false;
    this.barcodeForm.get("id").setValue(stockid);
  }

  //set barcode size
  setbarcodedimension(){
    let barstr=this.barcodeForm.get('barcode').value;
    var res = barstr.split("*");
    this.barcodeForm.get('barcodeheight').setValue(res[0]);
    this.barcodeForm.get('barcodewidth').setValue(res[1]);
  }

  // get Searched Sales invoice Customers
  searchstock(searchvalue: any) {
    this.barcodeService.searchstocks(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,searchvalue).subscribe(data => { 
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
    this.barcodeService.datewisestocks(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,date).subscribe(data => { 
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
      this.stockitems.push({ value: data[i][0], label: data[i][2],drugid: data[i][1],mrp: data[i][3],shopname: data[i][5]});
    }
  }

  setstockbarcodedetails(){
    let stockid=this.barcodeForm.get('id').value;
    let stockindex = this.stockitems.findIndex(p => p.value == stockid);
    //alert(stockid+"--"+stockindex+"--"+this.stockitems[stockindex].drugid)
    this.barcodeForm.get('drugproductid').setValue(this.stockitems[stockindex].drugid);
    this.barcodeForm.get('brandname').setValue(this.stockitems[stockindex].label);
    this.barcodeForm.get('mrp').setValue(this.stockitems[stockindex].mrp);
    this.barcodeForm.get('shopname').setValue(this.stockitems[stockindex].shopname);
  }

  stockbarcodevalidate(){
    let stockid=this.barcodeForm.get('id').value;
    let barheight= this.barcodeForm.get('barcodeheight').value;
    let barwidth= this.barcodeForm.get('barcodewidth').value;
    if(stockid==''||stockid==null||stockid==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Stock Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(barheight=='opt1'||barheight==''||barwidth=='opt1'||barwidth==''){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Height & Width', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  loadinglabel:any;
  generatestockbarcode(){
    //this.barcodeForm.get('id').setValue(this.barcodeForm.get('drugproductid').value)
    let reflag=this.stockbarcodevalidate();
    if(reflag){
      this.loadinglabel="Barcode Generating!..";
      this.barcodeService.generatestockbarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'BarCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/barcodesetting/viewbarcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'BarCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => { this.loadinglabel="Barcode Generating Failed!."; console.log(error)});
    }
    
  }


  //form wise generate
  selectedform:any;
  formselect(formid){
    this.selectedform=formid;
    this.barcodeForm.get('id').setValue('');
    if(formid==1){
      this.getDistributors();  //load distributors
      this. distinvoiceitems=[];
      this.barcodeForm.get('distributorid').setValue('');
    }else if(formid==2){
      this.barcodeService.getsalesinvoicedetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }else if(formid==3){
      this.barcodeService.getdeliverychallandetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }else if(formid==4){
      this.barcodeService.getgatepassdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }else if(formid==5){
      this.barcodeService.getpurchaseorderdetails(15,12,1,18 /*AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1*/).subscribe(data => { 
        this.pushallinvoice(data) },
        error => { console.log(error)});
    }else if(formid==6){
      this.barcodeService.getsalesorderdetails(15,12,1,18 /*AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1*/).subscribe(data => { 
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


  formbarcodevalidate(){
    let formid=this.barcodeForm.get('formid').value;
    let invoiceno=this.barcodeForm.get('invoiceno').value;
    let barheight= this.barcodeForm.get('barcodeheight').value;
    let barwidth= this.barcodeForm.get('barcodewidth').value;
    let position= this.barcodeForm.get('barcodeposition').value;
    if(formid=='opt1'||formid==''||formid==null){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Form Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(invoiceno==''||invoiceno==null||invoiceno==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Invoice No', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(barheight=='opt1'||barheight==''||barwidth=='opt1'||barwidth==''){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Height & Width', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    else if(position==''||position==null||position==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select any Position to Fit', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  generatePurchaseInvoicebarcode(){
    let reflag=this.formbarcodevalidate();
    if(reflag){
      this.loadinglabel="Barcode Generating!..";
      this.barcodeForm.get('id').setValue(this.barcodeForm.get('invoiceno').value);
      this.barcodeService.generatepurchaseinvoicebarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'BarCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/barcodesetting/viewbarcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'BarCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => { this.loadinglabel="Barcode Generating Failed!."; console.log(error)});
    }
  }

  generateSalesInvoicebarcode(){
    let reflag=this.formbarcodevalidate();
    if(reflag){
      this.loadinglabel="Barcode Generating!..";
      this.barcodeForm.get('id').setValue(this.barcodeForm.get('invoiceno').value);
      this.barcodeService.generatesalesinvoicebarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'BarCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/barcodesetting/viewbarcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'BarCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Barcode Generating Failed!."; console.log(error)});
    }
  }

  generateDeliveryChallanbarcode(){
    let reflag=this.formbarcodevalidate();
    if(reflag){
      this.loadinglabel="Barcode Generating!..";
      this.barcodeForm.get('id').setValue(this.barcodeForm.get('invoiceno').value);
      this.barcodeService.generatedeliverychallanbarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'BarCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/barcodesetting/viewbarcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'BarCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => { this.loadinglabel="Barcode Generating Failed!.";console.log(error)});
    }
  }

  generateGatePassbarcode(){
    let reflag=this.formbarcodevalidate();
    if(reflag){
      this.loadinglabel="Barcode Generating!..";
      this.barcodeForm.get('id').setValue(this.barcodeForm.get('invoiceno').value);
      this.barcodeService.generategatepassbarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'BarCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/barcodesetting/viewbarcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'BarCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Barcode Generating Failed!."; console.log(error)});
    }
  }
  
  generatePurchaseOrderbarcode(){
    let reflag=this.formbarcodevalidate();
    if(reflag){
      this.loadinglabel="Barcode Generating!..";
      this.barcodeForm.get('id').setValue(this.barcodeForm.get('invoiceno').value);
      this.barcodeService.generatepurchaseorderbarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'BarCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/barcodesetting/viewbarcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'BarCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Barcode Generating Failed!."; console.log(error)});
    }
  }
  
  generateSalesOrderbarcode(){
    let reflag=this.formbarcodevalidate();
    if(reflag){
      this.loadinglabel="Barcode Generating!..";
      this.barcodeForm.get('id').setValue(this.barcodeForm.get('invoiceno').value);
      this.barcodeService.generatesalesorderbarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'BarCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/barcodesetting/viewbarcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'BarCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Barcode Generating Failed!."; console.log(error)});
    }
  }


  //distributor wise generate API's
  distributors=[];
  getDistributors(){
    this.barcodeService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.distributors = [];
      for (let i = 0; i < data.length; i++) {
        this.distributors.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }

  //get invocie by distriibutor
  distinvoiceitems=[];
  distributorinvoice(){
    let distid=this.barcodeForm.get('distributorid').value;
    this.barcodeService.getdistributorinvoice(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1,distid).subscribe(data => {
      this.distinvoiceitems = [];
      for (let i = 0; i < data.length; i++) {
        this.distinvoiceitems.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }

  //get invocie products by distriibutor
  distinvoiceproducts=[];
  distributorinvoiceproducts(){
    let distinvoiceid=this.barcodeForm.get('distinvoiceno').value;
    this.barcodeService.getdistributorinvoiceproducts(distinvoiceid).subscribe(data => {
      this.distinvoiceproducts = [];
      for (let i = 0; i < data.length; i++) {
        this.distinvoiceproducts.push({ value: data[i][0], label: data[i][2] });
      }
    });
  }

  distributorbarcodevalidate(){
    let distid=this.barcodeForm.get('distributorid').value;
    let invoiceno=this.barcodeForm.get('distinvoiceno').value;
    let invoiceprodno=this.barcodeForm.get('distinvoiceproductno').value;
    let barheight= this.barcodeForm.get('barcodeheight').value;
    let barwidth= this.barcodeForm.get('barcodewidth').value;
    if(distid==''||distid==null||distid==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Distributor Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(invoiceno==''||invoiceno==null||invoiceno==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Invoice No', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(invoiceprodno==''||invoiceprodno==null||invoiceprodno==undefined){
      this.notificationsComponent.addToast({ title: 'alert MSG', msg:'Select Invoice Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(barheight=='opt1'||barheight==''||barwidth=='opt1'||barwidth==''){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Height & Width', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  //generate barcode for Purchase Products
  generatePurchaseProductbarcode(){
    let reflag=this.distributorbarcodevalidate();
    if(reflag){
      this.loadinglabel="Barcode Generating!..";
      this.barcodeForm.get('id').setValue(this.barcodeForm.get('distinvoiceproductno').value);
      this.barcodeService.generatepurchaseproductbarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'SUCCESS MSG', msg:'BarCode Generated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.selectedtype='';
          this.loadinglabel='';
          this.router.navigate(['/barcodesetting/viewbarcode']);
          //this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'BarCode not Generated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },error => {this.loadinglabel="Barcode Generating Failed!."; console.log(error)});
    }
  }


}
