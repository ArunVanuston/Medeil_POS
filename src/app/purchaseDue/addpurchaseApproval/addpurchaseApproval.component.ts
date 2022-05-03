import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { addpurchaseApprovalService } from './addpurchaseApproval.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NotificationsComponent } from '../../notifications/notifications.component';
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { addinvoiceService } from 'app/purchaseInvoice/addPurchaseinvoice/addPurchaseinvoice.services';
import { AngularEchartsDirective } from 'ngx-echarts';
import { TranslateService } from 'ng2-translate';   
@Component({
  selector: 'app-addpurchaseApproval',
  templateUrl: './addpurchaseApproval.component.html',
  styleUrls: ['./addpurchaseApproval.component.css'],
  providers: [addpurchaseApprovalService, NotificationsComponent, addinvoiceService]
})
export class addpurchaseApprovalComponent implements OnInit {
  purchaseApproval: any;
  inventoryjournal: any;
  purchasejournal: any;
  invoicenumber = [];
  p;
  h;
  itemlength = [{}, {}, {}, {}, {}];
  deviceObj: any;
  unionstate = [20934, 20936, 20940, 20948, 21773, 21775, 21776];
  taxid: number;
  taxgstid: number = 0;
  decists: any;
  purtax;
  coltax: any;
  distvalues: any;
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  constructor(public translate: TranslateService,private approvalService: addpurchaseApprovalService, private router: Router, private formBuilder: FormBuilder, 
    private notificationsComponent: NotificationsComponent, private appComponent: AppComponent, private dateformat: dateFormatPipe, private invoiceService: addinvoiceService 
    ) { translate.setDefaultLang('en');
    this.purchaseApproval = this.formBuilder.group({
      approvalno: ['', []],
      purchaseinvrefid: ['', []],
      purcapprovaldate: [this.dateformat.transform05(Date.now()), []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      shoprefid: ['', []],
      hospitalrefid: ['', []],
      warehouserefid: ['', []],
      locrefid: ['', []],
      locname: ['', []],
      grandtotal: ['',[]],
      totaldiscount: ['',[]],
      totalmargin: ['',[]],
      totaltaxamt: ['',[]],
      taxableamt: ['',[]],
      totalproduct: ['',[]],
      vendorid:['',[]],
      purcApproval: this.formBuilder.array([]),
    });

    this.inventoryjournal = this.formBuilder.group({
    //  debitaccount: [1, []],
      creditaccount: [1, []],
      debitamount: [, []],
      creditamount: [, []],
      craccname: ['Inventory', []],
     // draccname: ['Inventory', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [8, []],
      jrnlname: ['Inventory', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [1, []],
      invoicetype: [5, []],
      paymenttype: [, []],
      ptrefno: [, []],
      countryrefid: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      salesflag: [0, []],
      calcflag: [0, []],
    });
  

    this.purchasejournal = this.formBuilder.group({
      //  debitaccount: [17, []],
      creditaccount: [17, []],
      //  creditaccount: [4, []],
      debitamount: [],
      creditamount: [],
      // craccname: ['Creditors', []],
      // draccname: ['Purchase Account', []],
      craccname: ['Purchase Account', []],
      invoiceno: [],
      invoicebalamt: [],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [],
      jrnltype: [2, []],
      jrnlname: ['Purchase', []],
      bulkflag: [],
      personid: [],
      persontype: [2, []],
      invoicetype: [3, []],
      paymenttype: [],
      ptrefno: [],
      countryrefid: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      salesflag: [0, []],
      calcflag: [0, []],

    });
  }
  
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.purchaseApproval.get('purchaseinvrefid').setValue("opt1");
    this.purchaseApproval.get('companyrefid').setValue(AppComponent.companyID);
    this.purchaseApproval.get('branchrefid').setValue(AppComponent.branchID);
    this.purchaseApproval.get('shoprefid').setValue(AppComponent.shopID);
    this.purchaseApproval.get('hospitalrefid').setValue(AppComponent.hospitalID);
    this.purchaseApproval.get('warehouserefid').setValue(AppComponent.warehouseID);
    this.purchaseApproval.get('locname').setValue(AppComponent.locrefID);

    if (AppComponent.shopID != 0) {
      this.purchaseApproval.get('locrefid').setValue(AppComponent.shopID);
      this.approvalService.getApprovalinvoices(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.invoicenumber = data,
        error => {
          console.log("Error Occured On getApprovalinvoices()");
        }
      );
    } if (AppComponent.warehouseID != 0) {
      this.purchaseApproval.get('locrefid').setValue(AppComponent.warehouseID);
      this.approvalService.getApprovalinvoices(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.invoicenumber = data,
        error => {
          console.log("Error Occured On getApprovalinvoices()");
        }
      );
    } if (AppComponent.hospitalID != 0) {
      this.purchaseApproval.get('locrefid').setValue(AppComponent.hospitalID);
      this.approvalService.getApprovalinvoices(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.invoicenumber = data,
        error => {
          console.log("Error Occured On getApprovalinvoices()");
        }
      );
    }

     /*Get Tax inclusive Or Exclusive*/
     this.invoiceService.getPurchasetax(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.purtax = data,
      error => {
        console.log('Error Occured On getPurchasetax()');
      });

      this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data, this.taxid = data
      })
        this.invoiceService.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
          this.decists = data;
          if (data[0][1] == 1) {
            this.fixedlength = 3;
          } else { this.fixedlength = 2 }

          if (data[0][2] == 1) {
            this.aboveflag = 1;
          } else { this.aboveflag = 0 }

          if (data[0][3] == 1) {
            this.belowflag = 1;
          } else { this.belowflag = 0 }
        })
        
  }
  

  justInitiate() {



    this.deviceObj = {
      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      ipaddress: this.appComponent.ipAddress, 
      browsertype: this.appComponent.browser,
      ostype: this.appComponent.os,
      osversion: this.appComponent.osversion,
      apiname:"api/purchaseapproval",
      clientcdate:this.dateformat.transform04()
   
    };

   }




  getPurcAppdata(event): any {
    let id = event.target.value;
    this.getDistvalues(id)
    const setApproval = <FormArray>this.purchaseApproval.controls['purcApproval'];
    setApproval.controls = [];
    this.approvalService.getPurcApprovaldata(id).subscribe(data => {
      this.getPurcApprovaldata(data)
    },
    err => {
      console.log('Error Occured On getPurcApprovaldata()'+ err)
    });
  }

  packageount;
  quantyper;
  getPurcApprovaldata(data: any): any {   
    if (data != null || data != undefined) {
      const setApproval = <FormArray>this.purchaseApproval.controls['purcApproval'];
      setApproval.controls = [];
      for (this.h = 0; this.h < data.length; this.h++) {
        if(data[this.h][2]==0){
          this.packageount = parseInt(data[this.h][3]); 
        }else if(data[this.h][3] == 0){
          this.packageount = parseInt(data[this.h][2]);
        }
        if(data[this.h][38] == null || data[this.h][38] == '' || data[this.h][38] == 0){
          this.quantyper = 1;
        }else {
          this.quantyper = data[this.h][38];
        }
        setApproval.push(this.setPurcApprovaldata(
          data[this.h][0],
          data[this.h][1],
          data[this.h][2],
          data[this.h][3],
          data[this.h][4],
          data[this.h][5],
          data[this.h][6],
          data[this.h][7],
          data[this.h][8],
          data[this.h][9],
          data[this.h][10],
          data[this.h][11],
          data[this.h][12],
          data[this.h][13],
          data[this.h][14],
          data[this.h][15],
          data[this.h][16],
          data[this.h][17],
          data[this.h][18],
          data[this.h][19],
          data[this.h][20],
          data[this.h][21],
          data[this.h][22],
          data[this.h][23],
          data[this.h][24],
          data[this.h][25],
          data[this.h][26],
          data[this.h][27],
          data[this.h][28],
          data[this.h][29],
          data[this.h][30],
          data[this.h][31],
          data[this.h][32],
          data[this.h][33],
          data[this.h][34],
          data[this.h][35],
          data[this.h][36],
          data[this.h][37],
          data[this.h][38],
          data[this.h][39],
          data[this.h][40]
        ));
      }
    }
  }
  setPurcApprovaldata(pid: any, bname: any, bqty: any, sqty: any, tabqty: any, tqty: any, uprice: any, pdisc: any, vat: any,
    gst: any, sgst: any, cgst: any, igst: any, utgst: any, batchno: any, pprice: any, sdisc: any, mrp: any, fid: any, did: any,
    expdate: any, fboxqty: any, fstripqty: any, ftabqty: any, ftotqty: any, vatamt: any, gstamt: any, sgstamt: any, cgstamt: any, igstamt: any, utgstamt: any,batchid: any,qpprl: any,damage: any,pending: any, shelfno: any,rackno: any,boxstrip: any,striptablet: any,sellingprice: any,packunit: any): any {
    return this.formBuilder.group({
      drugproductid: [pid, []],
      brandname: [bname, []],
      boxqty: [bqty, []],
      stripqty: [sqty, []],
      tabletqty: [tabqty, []],
      qty: [(parseFloat(tqty)).toFixed(this.fixedlength), []],
      approvalqty: [0, []],
      approvedqty:[parseFloat(qpprl).toFixed(this.fixedlength),[]],
      damageqty: [damage, []],
      penddingqty: [pending, []],
      unitprice: [uprice, []],
      discount: [pdisc, []],
      vat: [vat, []],
      unitgst: [gst, []],
      unitsgst: [sgst, []],
      unitcgst: [cgst, []],
      unitigst: [igst, []],
      unitutgst: [utgst, []],
      batchname: [batchno, []],
      purchaseprice: [pprice, []],
      salesdiscount: [sdisc, []],
      mrp: [mrp, []],
      formulationid: [fid, []],
      dosageid: [did, []],
      expirydate: [expdate, []],
      freeboxqty: [fboxqty, []],
      freestripqty: [fstripqty, []],
      freetabletqty: [ftabqty, []],
      freetotalqty: [ftotqty, []],
      vatamt: [vatamt, []],
      gstamt: [gstamt, []],
      sgstamt: [sgstamt, []],
      cgstamt: [cgstamt, []],
      igstamt: [igstamt, []],
      utgstamt: [utgstamt, []],
      companyrefid: [this.purchaseApproval.get('companyrefid').value, []],
      branchrefid: [this.purchaseApproval.get('branchrefid').value, []],
      locname: [this.purchaseApproval.get('locname').value, []],
      locrefid: [this.purchaseApproval.get('locrefid').value, []],
      purchinvrefid:[this.purchaseApproval.get('purchaseinvrefid').value,[]],
      clientcdate: [AppComponent.date, []],
      batchno:[batchid,[]],
      discountamt:['',[]],
      totalproductprice:['',[]],
      shelfno:[shelfno,[]],
      rackno:[rackno,[]],
      boxperstrip:[boxstrip,[]],
      strippertablet:[this.quantyper,[]],
      sellingprice:[sellingprice],
      packageunit:[packunit],
      packagecount:[packunit],
      packcalulation:[this.packageount],
      apprpackcalulation:[0],
      apprboxperstrip:[0],
      apprstrippertablet:[this.quantyper],
    });
  }
  // approvalCalculation($event) {
  //   let totalQuantity: any = 0;
  //   let tqty: any = 0;
  //   const approvalCalc = <FormArray>this.purchaseApproval.controls['purcApproval'];
  //   let appValues = approvalCalc.value;
  //   let eVal = $event.target.value;
  //   let flag: number = 0;
  //   let chflag: number = 0;
  //   for (this.p = 0; this.p < appValues.length; this.p++) {
  //     totalQuantity = parseFloat(appValues[this.p].qty);
  //     alert(eVal)
  //     if (eVal > totalQuantity || eVal > totalQuantity || eVal > totalQuantity) {
  //       this.notificationsComponent.addToast({ title: 'Error', msg: 'Your QUANTITY Higher Than Total Quantity....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //       $event.preventDefault();
  //       $event.stopPropagation();
  //     }
  //     tqty = parseFloat(appValues[this.p].approvalqty) + parseFloat(appValues[this.p].damageqty) + parseFloat(appValues[this.p].penddingqty) + parseFloat(appValues[this.p].approvedqty);
  //     if (tqty > totalQuantity) {
  //       flag = 1;
  //     }
  //     if (flag == 1) {
  //       this.notificationsComponent.addToast({ title: 'Error', msg: 'Your TS-QUANTITY Higher Than Total Quantity....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //       $event.stopPropagation();
  //       $event.stopPropagation();
  //     }
  //     if (tqty < totalQuantity) {
  //       chflag = 2;
  //     }
  //     if (chflag == 2) {
  //       this.notificationsComponent.addToast({ title: 'Error', msg: 'Your TQ-QUANTITY Below Than Total Quantity....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //       $event.preventDefault();
  //       $event.stopPropagation();
  //     }
  //     if (true) {
  //       this.appComponent.ngOnInit();
  //       appValues[this.p].clientcdate = AppComponent.date;
  //     }
  //   }
  // }
  returnValid: any;
  saveprocess:boolean=false;
  onSubmit(): any {
    this.returnValid = this.invoiceDatavalidation();
    if (this.returnValid == true) {
      this.saveprocess=true;
      this.inventoryjournal.patchValue({
       // debitamount: this.purchaseApproval.get('grandtotal').value,
        creditamount: this.purchaseApproval.get('grandtotal').value,
        personid: this.distvalues[0][0],
        invoicebalamt: this.purchaseApproval.get('grandtotal').value
      });
      this.purchasejournal.patchValue({
        debitamount: this.purchaseApproval.get('grandtotal').value,
        //creditamount: this.invoiceForm.get('grandtotal').value,
        personid: this.distvalues[0][0],
        invoicebalamt: this.purchaseApproval.get('grandtotal').value
      });
      this.approvalService.savepurjournal(JSON.stringify(this.purchasejournal.value))
      this.approvalService.getApprovalrecord(JSON.stringify(this.purchaseApproval.value)).subscribe(
        data => {
          if (data == true) {
            const approvalCalc = <FormArray>this.purchaseApproval.controls['purcApproval'];
            this.approvalService.getApprovaldata(JSON.stringify(approvalCalc.value)).subscribe(
              data => {
                if (data == true) {
                  this.saveprocess=false;
                  this.justInitiate();
                  this.deviceObj.apiname = "api/savepurchaseApprovaldata";
                   this.approvalService.deviceDetails(JSON.stringify(this.deviceObj))
                      .subscribe(data => { },
                        errorCode => console.log(errorCode)); 

                        
                  this.purchaseApproval.get('purchaseinvrefid').setValue("opt1");
                  approvalCalc.controls = [];
                  
                  //this.router.navigate(['']);
                  this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                  setTimeout(() => {
                    this.router.navigate(['/PurchaseDue/ViewPurchaseDue']);
                  }, 500);
                }else {
                  this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }
              },
              err => console.log('Error Occured On getPurcinvoice()')
            );
            // this.approvalService.Saveinvjrnl(JSON.stringify(this.inventoryjournal.value)).subscribe(
            //   data => {
            //     if(data == 1){
                
            //     }
            //   }
            // )
           
          }
        });
    }
    //this.ngOnInit();
  }

  invoiceDatavalidation(): Boolean {
    const approvalCalc = <FormArray>this.purchaseApproval.controls['purcApproval'];
    let appValues = approvalCalc.value;
    if (appValues == '' || appValues == null || appValues.length== 0) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Approval Data Is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else{
      for (this.j = 0; this.j < appValues.length; this.j++) {
        if (appValues[this.j].shelfno == '' || appValues[this.j].shelfno == null || appValues[this.j].shelfno == undefined) {
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Enter Shelf No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          return false;
        }else if (appValues[this.j].rackno == 0 || appValues[this.j].rackno == null || appValues[this.j].rackno == undefined) {
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Enter Rack No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          return false;
        }else if (appValues[this.j].approvalqty == 0 || appValues[this.j].approvalqty == null || appValues[this.j].approvalqty == '' || appValues[this.j].approvalqty == undefined) {
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Enter Valid Approve Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          return false;
        }
        appValues[this.j].boxperstrip = parseFloat(appValues[this.j].apprboxperstrip).toFixed(this.fixedlength);
        appValues[this.j].strippertablet = parseFloat(appValues[this.j].apprstrippertablet).toFixed(this.fixedlength);
        appValues[this.j].boxqty = parseFloat(appValues[this.j].apprpackcalulation).toFixed(this.fixedlength);
      }
    }
    return true;
  }

  



   /* Get Strip(S  Stripperbox ) and Box(B Quantityperstrip) Quantity */
   getSBQuantity(id: number) {
    this.invoiceService.getSBQuantity(id).subscribe(data => { this.sbQuantity = data },
      error => {
        console.log("Error Occured on getSBQuantity");
      })
  }

   /**Table calculation Start **/
   i;
   j;
   m;
   imagepath: string;
   sbQuantity = [];
   getSum() {
     /** Declare Given Table Datas**/
     let txtproduct: number = 0;
     let txttabletquantity: any = 0;
     let txtstripquantity: any = 0;
     let txtboxquantity: any = 0;
     let txtPurprice: any = 0;
     let txtitemamt: any = 0;
     let txttabletfree: any = 0;
     let txtstripfree: any = 0;
     let txtboxfree: any = 0;
     let txtgst: any = 0;
     let txtdiscount: any = 0;
     let textmargin: any = 0;
     let txtsgst: any = 0;
     let txtcgst: any = 0;
     let txtigst: any = 0;
     let txtutgst: any = 0;
     let txtvat: any = 0;
     /** To set and calculate Given Table Datas into total values(formcontrolname) **/
     let totalproduct: any = 0;
     let totalQuantity: any = 0;
     let itemamt: any = 0;
     let totalFree: any = 0;
     let totalGst: any = 0;
     let totalDiscount: any = 0;
     let totalMargin: any = 0;
     let totalAmount: any = 0;
     let totalSgst: any = 0;
     let totalCgst: any = 0;
     let totalIgst: any = 0;
     let totalUtgst: any = 0;
     let totalVat: any = 0;
     let taxableAmt: any = 0;
     const getData = <FormArray>this.purchaseApproval.controls['purcApproval'];
     let setData = getData.value;
     let purcTax: any = this.purtax;
     let k: number = 0;
     let Stripperbox: any;
     let Quantityperstrip: any;
     let totalgsts: any;
     let overallgst: any = 0;
     let invoicetax: any;
     let roundedamnt: any;
     let roundvalue: any;
     for (this.j = 0; this.j < setData.length; this.j++) {
    //   this.getSBQuantity(setData[this.j].drugproductid);
       Stripperbox = setData[this.j].apprboxperstrip;
       console.log("Stripperbox>>>>"+Stripperbox)
       Quantityperstrip = setData[this.j].apprstrippertablet;
       if (setData[this.j].dosageid == '') {
         setData[this.j].dosageid = 0;
       }
       /* To Get Total Products */
       if (parseInt(setData.length) !== null) {
         txtproduct = parseInt(setData.length);
       }
       /* Tablet Quantity */
       if (setData[this.j].tabletqty == '' || parseFloat(setData[this.j].tabletqty) == null) {
         setData[this.j].tabletqty = 0.00;
         txttabletquantity = 0;
       }
       else {
         txttabletquantity = parseFloat(setData[this.j].tabletqty);
       }
       /* Strip Quantity */
       if (setData[this.j].stripqty == '' || parseFloat(setData[this.j].stripqty) == null) {
         setData[this.j].stripqty = 0;
         txtstripquantity = 0;
       }
       else {
         txtstripquantity = parseFloat(setData[this.j].stripqty) * Quantityperstrip * Stripperbox;
       }
       /* Box Quantity */
       if (setData[this.j].boxqty == '' || parseFloat(setData[this.j].boxqty) == null) {
         setData[this.j].boxqty = 0;
         txtboxquantity = 0;
       }
       else {
         txtboxquantity = parseFloat(setData[this.j].boxqty) * Stripperbox * Quantityperstrip;
         txtboxquantity = parseFloat(setData[this.j].apprpackcalulation) * Stripperbox * Quantityperstrip;
        // setData[this.j].boxqty = setData[this.j].apprpackcalulation;
         console.log(txtboxquantity)
       }
       /* Free Tablet Quantity*/
       if (setData[this.j].freetabletqty == '' || parseFloat(setData[this.j].freetabletqty) == null) {
         setData[this.j].freetabletqty = 0;
         txttabletfree = 0;
       }
       else {
         txttabletfree = parseFloat(setData[this.j].freetabletqty);
       }
       /* Free Strip Quantity*/
       if (setData[this.j].freestripqty == '' || parseFloat(setData[this.j].freestripqty) == null) {
         setData[this.j].freestripqty = 0;
         txtstripfree = 0;
       }
       else {
         txtstripfree = parseFloat(setData[this.j].freestripqty) * Quantityperstrip * Stripperbox;
       }
       /* Free Box Quantity */
       if (setData[this.j].freeboxqty == '' || parseFloat(setData[this.j].freeboxqty) == null) {
         setData[this.j].freeboxqty = 0.00;
         txtboxfree = 0;
       }
       else {
         txtboxfree = parseFloat(setData[this.j].freeboxqty) * Stripperbox * Quantityperstrip;
       }
       /* GST Calculation  */
       if (setData[this.j].unitsgst == '' || setData[this.j].unitsgst == null) {
         txtsgst = 0;
         setData[this.j].unitsgst = 0;
       }
       else {
         txtsgst = parseFloat(setData[this.j].unitsgst);
       }
       if (setData[this.j].unitcgst == '' || setData[this.j].unitcgst == null) {
         setData[this.j].unitcgst = 0;
         txtcgst = 0;
       }
       else {
         txtcgst = parseFloat(setData[this.j].unitcgst);
       }
       if (setData[this.j].unitigst == '' || setData[this.j].unitigst == null) {
         setData[this.j].unitigst = 0;
         txtigst = 0;
       }
       else {
         txtigst = parseFloat(setData[this.j].unitigst);
       }
       if (setData[this.j].unitutgst == '' || setData[this.j].unitutgst == null) {
         setData[this.j].unitutgst = 0;
         txtutgst = 0.00;
       }
       else {
         txtutgst = parseFloat(setData[this.j].unitutgst);
       }
       if (setData[this.j].unitgst == '' || setData[this.j].unitgst == null) {
        setData[this.j].unitgst = 0;
         txtgst = 0
       }
       else {
        txtgst =parseFloat(setData[this.j].unitgst);
       }
       /* VAT Calculation */
       if (setData[this.j].vat == '' || setData[this.j].vat == null) {
         setData[this.j].vat = 0;
         txtvat = 0;
       }
       else {
         txtvat = parseFloat(setData[this.j].vat);
       }
       /*Discount Calculation*/
       if (setData[this.j].discount == '' || setData[this.j].discount == null) {
         txtdiscount = 0;
         setData[this.j].discount = 0;
       }
       else {
         txtdiscount = (setData[this.j].totalproductprice * setData[this.j].salesdiscount) / 100;
       }
    
       /* Purchase Price */
       
      
         txtPurprice = setData[this.j].purchaseprice;
       
     let qtycheck: any;

     qtycheck = parseFloat(setData[this.j].qty) - parseFloat(setData[this.j].approvedqty)
        
     
        setData[this.j].approvalqty = (parseFloat(txttabletquantity) + parseFloat(txtstripquantity) + parseFloat(txtboxquantity)).toFixed(this.fixedlength);

 if(parseInt(setData[this.j].approvalqty) > parseInt(qtycheck)){
  this.notificationsComponent.addToast({ title: 'Warning', msg: 'Approvalqty Qty not more than Total Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
  setData[this.j].approvalqty = 0;
 }
        // setData[this.j].approvalqty = parseInt(setData[this.j].qty);
                            
 
       /* Row Wise itemamt Amount */
       setData[this.j].totalproductprice = parseFloat(setData[this.j].apprpackcalulation)  * txtPurprice;
       
       setData[this.j].vatamt = (txtvat * txtPurprice * (setData[this.j].apprpackcalulation)) / 100;
       setData[this.j].gstamt = (txtgst * txtPurprice * (setData[this.j].apprpackcalulation)) / 100;
       setData[this.j].sgstamt = (txtsgst * txtPurprice * (setData[this.j].apprpackcalulation)) / 100;
       setData[this.j].cgstamt = (txtcgst * txtPurprice * (setData[this.j].apprpackcalulation)) / 100;
       setData[this.j].igstamt = (txtigst * txtPurprice * (setData[this.j].apprpackcalulation)) / 100;
       setData[this.j].utgstamt = (txtutgst * txtPurprice * (setData[this.j].apprpackcalulation)) / 100;
    //  setData[this.j].qty = txttabletquantity + txtstripquantity + txtboxquantity;
     //  setData[this.j].qty = (parseFloat(setData[this.j].approvalqty) - (parseFloat(setData[this.j].penddingqty) + parseFloat(setData[this.j].damageqty) ));        //
      // setData[this.j].tabletqty = (parseFloat(setData[this.j].approvalqty) - (parseFloat(setData[this.j].penddingqty) + parseFloat(setData[this.j].damageqty) )) ;  //temporary calculation .. it wwill be changed , when added box, strip and tablet calculation part
       setData[this.j].freetotalqty = txttabletfree + txtstripfree + txtboxfree;
       setData[this.j].discountamt = txtdiscount;
 
       
       if(this.taxid == null && this.taxgstid == 0){
        totalgsts = 0;
        setData[this.j].gstamt = 0;
        setData[this.j].sgstamt = 0;
        setData[this.j].cgstamt = 0;
        setData[this.j].igstamt = 0;
        setData[this.j].utgstamt = 0;
        setData[this.j].vatamt = 0;
      }else if(this.taxid == 1){
        totalgsts = setData[this.j].gstamt;
      }
      else if(this.taxid == 2 || this.taxgstid == 1){
        totalgsts = setData[this.j].sgstamt + setData[this.j].cgstamt + setData[this.j].igstamt;
      }
      else if(this.taxid == 2 || this.taxgstid == 2){
        totalgsts = setData[this.j].cgstamt + setData[this.j].igstamt + setData[this.j].utgstamt;
      }
      else if(this.taxid == 0){
        totalgsts = setData[this.j].vatamt;
      }
 
       textmargin = setData[this.j].mrp - (txtPurprice - txtdiscount);
       //  if(this.coltax[0] == 0){
       //   setData[this.j].vatamt = setData[this.j].vatamt;
       //   totalgsts = 0;
       // // setData[this.j].amount  += parseFloat(setData[this.j].vatamt);
       //  }else if(this.coltax[0] == 1){
       //   totalgsts = totalgsts;
       //   setData[this.j].vatamt = 0;
       //  }
       setData[this.j].totalproductprice += parseFloat(totalgsts);
      
 
 
       //setData[this.j].amount -= parseFloat(setData[this.j].discountamt);
       /* To Patch values Row wise */
       
       /* Toatl Calculation*/
       totalproduct = txtproduct;
       totalQuantity += txttabletquantity + txtstripquantity + txtboxquantity;
       totalFree += txttabletfree + txtstripfree + txtboxfree;
       totalDiscount += txtdiscount;
 
       // totalCgst += (txtcgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
       // totalSgst += (txtsgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
       // totalGst += (txtgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
       ///  if(this.coltax[0] == 1){
 
       overallgst += totalgsts
       // totalVat = 0; 
 
       // }else if(this.coltax[0] == 0){
       //  totalVat += setData[this.j].vatamt
       //  overallgst = 0
       // }
       // invoicetax = parseFloat(overallgst) + parseFloat(totalVat);
 
       // totalIgst =+ (txtigst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
       //totalUtgst =+ (txtutgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
       itemamt += setData[this.j].totalproductprice;
       totalMargin +=  textmargin;
       if (purcTax == '0') {
         taxableAmt = ((txtPurprice * (setData[this.j].apprpackcalulation)) - txtdiscount * 100) / 100 + totalGst;
         totalAmount = itemamt - totalDiscount;
       }
       else {
         taxableAmt = (txtPurprice * (setData[this.j].apprpackcalulation)) - txtdiscount;
         totalAmount = (itemamt - totalDiscount) + totalGst;
 
       }
    
     setData[this.j].totalproductprice = setData[this.j].totalproductprice.toFixed(this.fixedlength);
 
       // alert(totalAmount);
       getData.patchValue(setData);
    
       // alert("a1"+totalAmount)
       
       //roundedamnt = (Math.round(totalAmount * 10) / 10);
       // alert("a2"+roundedamnt);
       //roundvalue = roundedamnt.toFixed() - totalAmount.toFixed(2)
       /* To Set value from Table calculation Final Values on Input types*/
    
         this.purchaseApproval.get('totaldiscount').setValue(totalDiscount.toFixed(this.fixedlength));
         this.purchaseApproval.get('totalmargin').setValue(totalMargin.toFixed(this.fixedlength));
         this.purchaseApproval.get('totaltaxamt').setValue(overallgst.toFixed(this.fixedlength));
         this.purchaseApproval.get('taxableamt').setValue(taxableAmt.toFixed(this.fixedlength));
         this.purchaseApproval.get('totalproduct').setValue(totalproduct.toFixed(this.fixedlength));

        if(this.decists[0][2] == 1 ){
           roundedamnt = Math.ceil(totalAmount);
           roundvalue = roundedamnt - totalAmount;
          }else if(this.decists[0][3] == 1){
           roundedamnt = Math.floor(totalAmount);
           roundvalue = roundedamnt - totalAmount;
          }else{
            roundedamnt = totalAmount.toFixed(2);
          }
         this.purchaseApproval.get('grandtotal').setValue(roundedamnt)
       
     
   
     }
   
 
   }

   getDistvalues(data: any) {
    this.approvalService.getVendordetails(data).subscribe(data => {
      this.distvalues = data
      //taxation Concept
      if (this.coltax[0][0] == 0) {
        if (this.distvalues[0][5] != null && this.distvalues[0][5] == AppComponent.countryID) {
          this.taxid = 0;
        } else {
          this.taxid = null;
        }

      }
      if (this.coltax[0][0] == 1) {
        if (this.distvalues[0][5] != null && this.distvalues[0][5] == AppComponent.countryID) {

          this.taxid = 1;
        } else {
          this.taxid = null;
        }
      }
      if (this.coltax[0][0] == 2) {
        if (this.distvalues[0][5] != null && this.distvalues[0][5] == AppComponent.countryID) {
          // this.taxgstid=1;
          for (this.i = 0; this.i < this.unionstate.length; this.i++) {
            if (this.distvalues[0][6] == this.unionstate[this.i]) {
              //  this.taxid=0;
              this.taxid = 2;
              this.taxgstid = 2;
              break;
            } else {
              this.taxid = 2;
              this.taxgstid = 1;
            }
          }
        } else {
          this.taxid = null;
          this.taxgstid = 0;
        }
      }
    },
    error => {
      console.log('Error Occured on getDistvalues()' + error);
    });


    // $("#colvathide").hide();
    // $('.colvathide').hide();
    // $("#colhide").hide();
    // $('.colhide').hide();
    // $("#colindgsthide").show();
    // $('.colindgsthide').show();

  }
}