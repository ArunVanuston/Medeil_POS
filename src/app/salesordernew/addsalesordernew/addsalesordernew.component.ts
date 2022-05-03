import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { salesOrderServicenew } from '../salesordernew.services';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { TranslateService } from 'ng2-translate';

declare var $: any;
@Component({
  selector: 'app-addSalesOrder',
  templateUrl: './addsalesordernew.component.html',
  styleUrls: ['./addsalesordernew.component.css'],
  providers:[salesOrderServicenew]
})
export class addsalesOrderComponentnew implements OnInit {
  @ViewChild('drugfocus') drugfocus: ElementRef;
  @ViewChild('boxqtyfocus') boxqtyfocus: ElementRef;
  //@ViewChild('boxstripfocus') boxstripfocus: ElementRef;
  parentMessage="sales";
  itemlength=[{},{},{},{},{}]
  @ViewChild("qty") qty: any;
  salesOrderForm: any;
  searchProducts = [];
  dataSource = [];
  patientlist = [];
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  pattern: any = '^[0-9]+(\.[0-9]{1,3})?$';
  destination = [];
  sotype=[];
  selobj;
  deviceObj;
  starttime: String;
  endtime: String;
  seconds: number;
  prodlist: any;
  newprodlength=[{},{},{},{}]

  constructor(public translate: TranslateService,private salesOrderService: salesOrderServicenew, private notificationsComponent: NotificationsComponent,
    private fb: FormBuilder, private route: Router, private appComponent: AppComponent,private dateformat: dateFormatPipe) {
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    translate.setDefaultLang('en');
    
    this.salesOrderForm = this.fb.group({
      orderdate: [this.dateformat.transform05(Date.now()), []],
      drugproductid: ['', []],
      deliverytype: ['opt1', []],
      patientid: ['opt1', []],
      mobileno:['',[]],
      quantity: ['', [Validators.pattern(this.textnumbers)]],
      salesorderno: ['', []],
      totalitem: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      clientcdate: ['', []],
      fromlocname: [this.selobj.locname, []],
      fromlocrefid: [this.selobj.locrefid, []],
      tolocname: [1, []],
      tolocrefid: [AppComponent.locrefID1, []],
      sotype: ['opt1', []],
      soinfo: ['', []],
      salesstatus: [1, []],
      trackorder:['',[]],
      products: this.fb.array([]),
      newproducts: this.fb.array([]),
    });

  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));

    this.starttime=this.dateformat.transform06();
    this.dataSource = [];
    this.salesOrderForm.get('companyrefid').setValue(AppComponent.companyID);
    this.salesOrderForm.get('branchrefid').setValue(AppComponent.branchID);
    this.salesOrderForm.get('locname').setValue(AppComponent.locRefName1);
    this.salesOrderForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.newproductflag=false;
    this.salesOrderService.getsotype().subscribe(data => this.sotype = data,
      err => {
        console.log('Error Occured ');
       });
    this.salesOrderService.patientList(AppComponent.companyID, AppComponent.branchID,  AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => { this.patientlist = data },
        err => {
          console.log('Error occured On patientList()');
    });
      this.autoIncrement(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID);
  }

  autoIncrement(cid: any, bid: any, lrefid: any, lname: any) {
    this.salesOrderService.autoIcrement(cid, bid, lrefid, lname).subscribe(data => {
      this.salesOrderForm.get('salesorderno').setValue(data.toString())
    },
      err => {
        console.log('Error occured On autoIcrement()');
      });
  }

  selectedIndex: number = -1;
  selecteddrug: any;
  searcheddrugvalues = [];
  searchProduct(searchValue: string) {
    if (searchValue.length > 0) {
      if (this.salesOrderForm.get('patientid').value=='opt1' || this.salesOrderForm.get('patientid').value=='' || this.salesOrderForm.get('patientid').value == null || this.salesOrderForm.get('patientid').value==undefined) {
        this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Distributor', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
        this.selectedIndex = -1;
        this.selecteddrug = '';
        this.drugfocus.nativeElement.value = "";
        this.salesOrderForm.get('quantity').setValue('');
      }else {
        let searchdrugdata = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, searchvalue: searchValue, searchid:1 };
        this.salesOrderService.searchdrug(JSON.stringify(searchdrugdata)).subscribe(data => {
          if(data.length > 0) {
            this.searcheddrugvalues = data;
          }else {
            this.searcheddrugvalues.length = 0;
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            this.drugfocus.nativeElement.value = "";
            this.salesOrderForm.get('quantity').setValue('');
          }
        });
      }
    }else{
      this.searcheddrugvalues.length = 0;
      this.drugfocus.nativeElement.value = "";
      this.salesOrderForm.get('quantity').setValue('');
    }
  }

  selectedItem=[];
  qtyref:any;
  drugkeyselect(event: KeyboardEvent,event1) {
    //up 38 down 40
    //event.preventDefault();
    if (event.keyCode == 40) {
      if (this.selectedIndex == this.searcheddrugvalues.length - 1) {
        this.selectedIndex = 0;
        this.selectedItem = this.searcheddrugvalues[this.selectedIndex];
      } else {
        this.selectedItem = this.searcheddrugvalues[++this.selectedIndex];
      }
    }

    else if (event.keyCode == 38) {
      if (this.selectedIndex <= 0) {
        this.selectedIndex = this.searcheddrugvalues.length - 1;
        this.selectedItem = this.searcheddrugvalues[this.selectedIndex];
      }else {
        this.selectedItem = this.searcheddrugvalues[--this.selectedIndex];
      }
    }
    else if (event.keyCode == 13 || event.keyCode == 9) {
      if(event1.length<1){
        this.drugfocus.nativeElement.focus();
      }else{
        this.selectedIndex = -1;
        this.salesOrderForm.get('drugproductid').setValue(this.selectedItem[1].toString());
        //this.selecteddrugdata(this.selectedItem);
        this.searcheddrugvalues.length = 0;
        this.selecteddrug = this.selectedItem[0] + " - " + this.selectedItem[1]+ " : " + this.selectedItem[3];
        this.qtyref = this.selectedItem[3];
        this.drugfocus.nativeElement.value = "";
        this.salesOrderForm.get('quantity').setValue('');
        this.boxqtyfocus.nativeElement.focus();
      }
    }
  }

  //drug click selected
  selecteddrugdata(drugdata){
    this.selectedIndex = -1;
    this.salesOrderForm.get('drugproductid').setValue(drugdata[1].toString());
    this.selecteddrug = drugdata[0] + " - " + drugdata[1]+ " : " +drugdata[3];
    this.qtyref =drugdata[3];
    this.searcheddrugvalues.length = 0;
    this.drugfocus.nativeElement.value = "";
    this.salesOrderForm.get('quantity').setValue('');
    this.boxqtyfocus.nativeElement.focus();
  }
  
  setprodfocus() {
    this.drugfocus.nativeElement.focus();
  }


  //mob view products
  blurviewproducts(event){
    console.log("blur call:"+event.target.value);
    if(event.target.value.match('^[0-9.]+$') == null){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter only Numbers', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.salesOrderForm.get('quantity').setValue('');
      this.boxqtyfocus.nativeElement.focus();
    }else{
      let uqty=this.salesOrderForm.get('quantity').value;
      if(uqty==''||uqty==null||uqty==undefined){
        this.salesOrderForm.get('quantity').setValue('');
        this.boxqtyfocus.nativeElement.focus();
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Qty not to be Empyty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }else{
        if(uqty>0){
          if(this.qtyref>=uqty ){
            this.salesOrderService.getsalesProdcut(this.salesOrderForm.get('drugproductid').value).subscribe(data => { this.getProoductData(data) });
          }else{
            this.boxqtyfocus.nativeElement.focus();
            this.salesOrderForm.get('quantity').setValue('');
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Unit Qty > Current Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          }
        }else{
          this.salesOrderForm.get('quantity').setValue('');
          this.boxqtyfocus.nativeElement.focus();
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Qty not to be Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      }
    }
  }

  getProductInfo(event) {
    console.log("product call:"+event.target.value);
    if(event.target.value.match('^[0-9.]+$') == null){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter only Numbers', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.salesOrderForm.get('quantity').setValue('');
      this.boxqtyfocus.nativeElement.focus();
    }else{
      let uqty = this.salesOrderForm.get('quantity').value;
      if (event.keyCode == 9 || event.keyCode == 13) {
        if(uqty==''||uqty==null||uqty==undefined){
          this.salesOrderForm.get('quantity').setValue('');
          this.boxqtyfocus.nativeElement.focus();
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Qty not to be Empyty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }else{
          if (uqty > 0) {
            if (this.qtyref >= uqty) {
              this.salesOrderService.getsalesProdcut(this.salesOrderForm.get('drugproductid').value).subscribe(data => { this.getProoductData(data) });
            }else{
              this.salesOrderForm.get('quantity').setValue('');
              this.boxqtyfocus.nativeElement.focus();
              this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Unit Qty > Current Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }
          }else{
            this.salesOrderForm.get('quantity').setValue('');
              this.boxqtyfocus.nativeElement.focus();
              this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Qty not to be Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
        }
      }
    } 
  }

  inc = 0;
  getProoductData(data: any) {
    let flag: number = 0;
    if (data !== null || data !== undefined) {
      const getData = <FormArray>this.salesOrderForm.controls['products'];
      let sourceData1 = getData.value;
      for (let k = 0; k < data.length; k++) {
        for (let c = 0; c < sourceData1.length; c++) {
          if (data[k][3] == sourceData1[c].drugproductid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[k][0].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        } else {
          getData.push(this.setProoductData(
            data[k][0],
            data[k][1],
            data[k][2],
            data[k][3]
          ));
          // this.showSaleorder(this.dataSource)
          this.inc += 1;
        }
      }
      this.salesOrderForm.get('quantity').setValue('');
      this.drugfocus.nativeElement.value = "";
      this.drugfocus.nativeElement.focus();
    }
  }
  
  setProoductData(d0: any, d1: any, d2: any, d3: any) {
  
    return this.fb.group({
      ID: this.inc,
      sno: this.inc + 1,
      drugproductid: d3,
      productname: d0,
      dosage: d1,
      formulation: d2,
      totalqty: this.salesOrderForm.get('quantity').value,
      boxqty: 0,
      stripqty: 0,
      tabletqty: 0,
      companyrefid:AppComponent.companyID,
      branchrefid:AppComponent.branchID,
      locname:AppComponent.locRefName1,
      locrefid:AppComponent.locrefID1,
    });
  }

  salesordervalidate(){
    let patient=this.salesOrderForm.get('patientid').value;
    let deliverytype=this.salesOrderForm.get('deliverytype').value;
    let sotype=this.salesOrderForm.get('sotype').value;
    if(patient=='opt1'||patient==''||patient==null||patient==undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Customer Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(deliverytype=='opt1'||deliverytype==''||deliverytype==null||deliverytype==undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Delivery Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(sotype=='opt1'||sotype==''||sotype==null||sotype==undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Sales Order Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  public flag: boolean = false;
  saveprocess:boolean=false;
  onSubmit() {
    let valflag=this.salesordervalidate();
    if(valflag){
      this.salesOrderForm.get('clientcdate').setValue(this.dateformat.transform04());
      const getData = <FormArray>this.salesOrderForm.controls['products'];
     let data: any = getData.value
      this.salesOrderForm.get('totalitem').setValue(data.length);

      this.saveprocess=true;
      this.salesOrderService.createSalesorder(JSON.stringify(this.salesOrderForm.value)).subscribe(data => {
        if (data == true) {
          this.salesOrderService.createSaleRecord(JSON.stringify(getData.value)).subscribe(data => {
           
            if (data == true) {
              this.saveprocess=false;
              this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Data Saved Successfully.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              this.route.navigate(['SalesOrder/SalesOrderHistory']);
            }
          });
        } else {
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SalesOrder Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },
        err => {
          this.saveprocess=false;
          console.log('Error Occured On createSalesorder()');
        })
    }
  }


  viewOrder() {
    this.route.navigate(['SalesOrder/SalesOrderHistory']);
  }


  removeRow(index: number) {
     const getData = <FormArray>this.salesOrderForm.controls['products'];
     getData.removeAt(index);
     let removeVal = getData.value;
     if (removeVal == null || removeVal == '') {
       getData.reset();
     //  this.ngOnInit();
     }
  }

  getprodinfo(){
    if(this.salesOrderForm.get('quantity').value.match(this.textnumbers) == null){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter only Numbers', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.boxqtyfocus.nativeElement.value = "";
      this.boxqtyfocus.nativeElement.focus();
    }else if(this.salesOrderForm.get('quantity').value==''|| this.salesOrderForm.get('quantity').value==null || this.salesOrderForm.get('quantity').value==undefined || this.salesOrderForm.get('quantity').value<1){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Qty not be Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.boxqtyfocus.nativeElement.value = "";
      this.boxqtyfocus.nativeElement.focus();
    }else {
      this.salesOrderService.getsalesProdcut(this.salesOrderForm.get('drugproductid').value).subscribe(data => { this.getProoductData(data) });
    }
  }

  /* Add New Products */

  initformarray() {
    return this.fb.group({
      brandname: ['', []],
      remarks: ['', []],
      /*Login Details */
      companyid: [this.selobj.companyid, []],
      branchid: [this.selobj.branchrefid, []],
      locname: [this.selobj.locname, []],
      locrefid: [this.selobj.locrefid, []],
      countryid:[AppComponent.countryID,[]],
      createdby: [sessionStorage.getItem('indvuserid'), []],
    });
  }

  newproductflag:boolean=false;
  addNewProduct() {
    this.newproductflag=true;
    this.initformarray();
    const control = <FormArray>this.salesOrderForm.controls['newproducts'];
    control.controls = [];
    control.push(this.initformarray());
  }

  validnewproduct() {
    var valflag = 1;
    const control = <FormArray>this.salesOrderForm.controls['newproducts'];
    let setData = control.value;
    for (let i = 0; i < setData.length; i++) {
      if (setData[i].brandname == '' || setData[i].brandname == null || setData[i].brandname == undefined) {
        valflag = 0;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Please Fill Created Empty Fields', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        break;
      }
    }
    return valflag;
  }

  insertnewrow() {
    const control = <FormArray>this.salesOrderForm.controls['newproducts'];
    let valflag = this.validnewproduct();
    if (valflag == 1) {
      control.push(this.initformarray());
    }
  }

  removenewprodrow(indexid) {
    const control = <FormArray>this.salesOrderForm.controls['newproducts'];
    control.removeAt(indexid);
  }

  saveNewProduct() {
    const saveData = <FormArray>this.salesOrderForm.controls['newproducts'];
    //let getproductdetails = { locname: this.selobj.locname, locrefid: this.selobj.locrefid, productid: this.drugidcopy, batchid: this.batchidcopy };
    this.salesOrderService.saveNewProduct(JSON.stringify(saveData.value)).subscribe(data => {
      if (data) {
        this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Product Saved Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        this.newproductflag = false;
      }
    },error => {
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      });

  }

  /* Add New Product End */
  
}
