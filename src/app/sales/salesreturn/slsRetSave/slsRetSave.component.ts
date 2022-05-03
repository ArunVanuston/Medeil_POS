import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { slsRetSaveService } from './slsRetSave.service';
import { DxDataGridComponent } from "devextreme-angular";
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-slsRetSave',
  templateUrl: './slsRetSave.component.html',
  providers: [slsRetSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class slsRetSaveComponent implements OnInit {
  parentMessage="sales";
  itemlength=[{},{},{},{},{}];
  registerForm: FormGroup;
  registerForm1: FormGroup;
  invoices = [];
  i;
  selobj;
  truncatepos:number = 2;
  constructor(private userService: slsRetSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent, private router: Router,public translate: TranslateService) {
    config.autoClose = false;

    translate.setDefaultLang('en')
  }
  unionstate = [20934, 20936, 20940, 20948, 21773, 21775, 21776];
  stateID:any=0;
  ngOnInit() {

    this.translate.use(localStorage.getItem('language'));

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSalesInvoiceNo(JSON.stringify(frmdata)).subscribe(data => { this.invoices = data },
    errorCode => console.log(errorCode));

    this.registerForm = this.formBuilder.group({
      srid: [, []],
      srno: [, []],
      srdate: [, []],
      invoiceno: ['opt1', []],
      customerrefid: [, []],
      doctorrefid: [, []],
      totalamount: [(0).toFixed(2), []],
      totalitems: [0, []],
      totaldiscount: [(0).toFixed(2), []],
      taxableamt: [(0).toFixed(2), []],
      totaltaxamt: [(0).toFixed(2), []],
      totalinclamt: [, []],
      totalexclamt: [, []],
      grandtotal: [(0).toFixed(2), [Validators.min(1)]],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      customername: [, []],
      autonamenew: [, []],
      subtotal: [, []],
      roundoff: [(0).toFixed(2), []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      date: [this.dateformat.transform05(Date.now()), []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],
      invoice: this.formBuilder.array([
      ]),
      dummy: this.formBuilder.array([
      ]),
    });

    this.registerForm1 = this.formBuilder.group({
      creditaccount: [21, []],
     // creditaccount: [2, []],
      debitamount: [, []],
      creditamount: [, []],
      craccname: ['Sales Return', []],
     // craccname: ['Accounts Receivable', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [6, []],
      jrnlname: ['CreditNote', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [1, []],
      invoicetype: [2, []],
      paymenttype: [, []],
      ptrefno: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      purcflag: [1, []],
      calcflag: [0, []],
    });
    
    //Get Shop Info
    this.userService.viewShop(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
      if(data!==null || data !==''|| data!==undefined){
        this.stateID=data[0].imagevalues[0][11];
      }else{
        this.stateID=0;
      }
    },err=>{this.stateID=0});

    setTimeout(() => {
      this.userService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
        if(data==null||data==''||data==undefined){
          this.taxid=2;
          this.taxgstid = 1;
        }else{
          this.taxid = data[0][0];
          this.taxgstid = 0;
          if (this.taxid == 2) {
            for (this.i = 0; this.i < this.unionstate.length; this.i++) {
              if (this.stateID == this.unionstate[this.i]) {
                this.taxid=2;
                this.taxgstid = 2;
                break;
              } else {
                this.taxid = 2;
                this.taxgstid = 1;
              }
            }
          }
        } 
      },err=>{this.taxid=2; this.taxgstid = 1;});
      
      this.userService.getfixedroudoff(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>{
        if(data[0][1]==1){
          this.truncatepos=3;
        }else{this.truncatepos=2};
      });
    }, 2300);
  
  }

  validnew(): Number {
    var valflag = 1;
    const control = <FormArray>this.registerForm.controls['invoice'];
    var invoicedata = control.value;
    if(this.registerForm.get('customername').value=='opt1'||this.registerForm.get('customername').value==null||this.registerForm.get('customername').value==''){
      this.notificationsComponent.addToast({ title: 'Alert', msg: 'Select Sales Return No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      for (this.i = 0; this.i < invoicedata.length; this.i++) {
        if (invoicedata[this.i].indvqty == 0 || invoicedata[this.i].indvqty== null || invoicedata[this.i].indvqty =='') {
          valflag = 0;
          this.notificationsComponent.addToast({ title: 'Alert', msg: 'Return Qty not be Zero 0r Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }else if (parseInt(invoicedata[this.i].indvqty) > parseInt(invoicedata[this.i].siqty)) {
          valflag = 0;
          this.notificationsComponent.addToast({ title: 'Alert', msg: 'Return Qty > Invoice Qty  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      }
    }
    return valflag;
  }

  saveprocess:boolean=false;
  onSubmit() {
    let gtotal=this.registerForm.get('grandtotal').value;
    if(gtotal>0){
      var valflag: Number = 0;
      valflag = this.validnew();
      const control = <FormArray>this.registerForm.controls['invoice'];
      if(valflag == 1) {
          this.saveprocess=true;
          this.userService.saveSalesReturn(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveSrProducts(data), this.saveCreditNote(data) },
          errorCode => {this.saveprocess=false; console.log(errorCode)});
      }
    }else{
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Make Return Total', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  saveSrProducts(data: any) {
    const control = <FormArray>this.registerForm.controls['invoice'];
    if (data == 1) {
      this.userService.saveSrProducts(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => {this.saveprocess=false; console.log(errorCode)});
    }
  }

  saveCreditNote(data: any) {
    this.registerForm1.patchValue({
      // debitamount: this.registerForm.get('grandtotal').value,
     creditamount: this.registerForm.get('grandtotal').value,
      personid: this.registerForm.get('customerrefid').value,
    });
    if (data == 1) {
      this.userService.saveCreditNote(JSON.stringify(this.registerForm1.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }
  }

  savevalid(data: any) {
    if (data == 1) {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved SuccessFully ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.ngOnInit();
      setTimeout(() => {
        this.router.navigate(['SalesReturn/ViewSalesReturn']);
      }, 2000);
    } else {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
 
  calcGST() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var sprod = control.value;
    var preqty: number = 0;
    var preprodprice: number = 0;
    var prefree: number = 0;
    var premrp: number = 0;
    var predisc: number = 0;
    var presgst: number = 0;
    var pregst: number = 0;
    var preugst: number = 0;
    var precgst: number = 0;
    var preigst: number = 0;
    var pretotprice: number = 0;
    var disctotprice:number=0;
    var pretotfreeprice: number = 0;
    var pretotmrp: number = 0;
    var discount: number = 0;
    var sgstamt: number = 0;
    var ugstamt: number = 0;
    var cgstamt: number = 0;
    var igstamt: number = 0;
    var totdiscount: number = 0;
    var totsgstamt: number = 0;
    var totcgstamt: number = 0;
    var totigstamt: number = 0;
    var totutgstamt: number = 0;
    var totalgstamt: number = 0;
    var totgstamt: number = 0;
    var totaltaxableamt: number = 0;
    var totaltaxamt: number = 0;
    var totalincamt: number = 0;
    var totalexclamt: number = 0;
    var grandtotal: number = 0;
    var totalproduct: number = 0;
    var totqty: number = 0;
    var subtotal: number = 0;
    var convfactor: number = 0;
    var gstflag: number = 0;
    var freeflag: number = 0;
    var frgstflag: number = 0;
    var prevat: number = 0;
    var totvatamt: number = 0;
    var vatamt: number = 0;
    var gstamt: number = 0;
    var totgst: number = 0;
    var consolidategst:number=0;
    var prodcount: number = 0;
    var gtotalcount: number=0;
    var inv;
    for (this.i = 0; this.i < sprod.length; this.i++) {
      sprod[this.i].totalqty=sprod[this.i].indvqty;
      gtotalcount=sprod[this.i].indvqty;
      if (sprod[this.i].calcflag != 1) {
        if(sprod[this.i].indvqty>sprod[this.i].siqty){
          this.notificationsComponent.addToast({ title: 'Alert', msg: 'Return Qty > Invoice Qty  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          sprod[this.i].indvqty='';
          sprod[this.i].subtotal=0.00;
        }else{
          if (parseInt(sprod[this.i].indvqty)) {
            preqty = parseInt(sprod[this.i].indvqty);
          } else {
            preqty = 0;
          }
          if (parseInt(sprod[this.i].indvfreeqty)) {
            prefree = parseInt(sprod[this.i].indvfreeqty);
          } else {
            prefree = 0;
          }
          if (parseInt(sprod[this.i].unitprice)) {
            preprodprice = parseFloat(sprod[this.i].unitprice);
          } else {
            preprodprice = 0;
          }
          if (parseInt(sprod[this.i].mrp)) {
            premrp = parseInt(sprod[this.i].mrp);
          } else {
            premrp = 0;
          }
          if (parseInt(sprod[this.i].unitdiscount)) {
            predisc = parseInt(sprod[this.i].unitdiscount);
          } else {
            predisc = 0;
          }
          if (parseInt(sprod[this.i].unitsgst)) {
            presgst = parseInt(sprod[this.i].unitsgst);
          } else {
            presgst = 0;
          }
          if (parseInt(sprod[this.i].unitugst)) {
            preugst = parseInt(sprod[this.i].unitugst);
          } else {
            preugst = 0;
          }
          if (parseInt(sprod[this.i].unitcgst)) {
            precgst = parseInt(sprod[this.i].unitcgst);
          } else {
            precgst = 0;
          }
          if (parseInt(sprod[this.i].unitigst)) {
            preigst = parseInt(sprod[this.i].unitigst);
          } else {
            preigst = 0;
          }
          if (parseInt(sprod[this.i].gstflag)) {
            gstflag = parseInt(sprod[this.i].gstflag);
          } else {
            gstflag = 0;
          }
          if (parseInt(sprod[this.i].frgstflag)) {
            frgstflag = parseInt(sprod[this.i].frgstflag);
          } else {
            frgstflag = 0;
          }
          if (parseInt(sprod[this.i].freeflag)) {
            freeflag = parseInt(sprod[this.i].freeflag);
          } else {
            freeflag = 0;
          }
          if (parseInt(sprod[this.i].unitvat)) {
            prevat = parseInt(sprod[this.i].unitvat);
          } else {
            prevat = 0;
          }
          if (parseInt(sprod[this.i].unitgst)) {
            pregst = parseInt(sprod[this.i].unitgst);
          } else {
            pregst = 0;
          }
          if (parseInt(sprod[this.i].convfactor)) {
            convfactor = parseInt(sprod[this.i].convfactor);
          } else {
            convfactor = 0;
          }
          freeflag = 1;
          if (freeflag == 0) {
            discount = 0;
            prefree = 0;
          } else {
            prodcount += 1;
          }
          sprod[this.i].subtotal = (preqty * preprodprice).toFixed(this.truncatepos);
         // sprod[this.i].totalqty = convfactor * preqty;
         // sprod[this.i].totalfreeqty = convfactor * prefree;
          pretotprice = preqty * preprodprice;
        
          if(predisc>0){
            disctotprice = pretotprice -(pretotprice * predisc/100);
          }else{
            disctotprice = pretotprice;
          }
          if(this.taxid == null && this.taxgstid == 0){
            gstamt =0.00;
            sgstamt =0.00;
            cgstamt =0.00;
            igstamt =0.00;
            ugstamt =0.00;
            totaltaxamt=0.00;
          }else if(this.taxid==1){
            gstamt = (disctotprice * pregst) / (100 + pregst);
            totaltaxamt +=gstamt;
          }else if(this.taxgstid == 1){
            consolidategst=precgst+presgst+preigst;
            totgst=(disctotprice * consolidategst) / (100 + consolidategst);
            totaltaxamt += totgst;
          }else if(this.taxgstid == 2){
            consolidategst=precgst+preugst+preigst;
            totgst=(disctotprice * consolidategst) / (100 + consolidategst);
            totaltaxamt += totgst;
          }else{
            vatamt = (disctotprice * prevat) / (100 + prevat);
            totaltaxamt += vatamt;
          }

          // if (gstflag == 1) {
          //   if (frgstflag == 1) {
          //     vatamt = ((pretotprice - discount) * prevat) / 100;
          //     gstamt = ((pretotprice - discount) * pregst) / 100;
          //     sgstamt = ((pretotprice - discount) * presgst) / 100;
          //     ugstamt = ((pretotprice - discount) * preugst) / 100;
          //     cgstamt = ((pretotprice - discount) * precgst) / 100;
          //     igstamt = ((pretotprice - discount) * preigst) / 100;
          //   }
          //   else if (frgstflag == 2) {
          //     vatamt = (((preqty + prefree) * preprodprice - discount) * prevat) / 100;
          //     gstamt = (((preqty + prefree) * preprodprice - discount) * pregst) / 100;
          //     sgstamt = (((preqty + prefree) * preprodprice - discount) * presgst) / 100;
          //     ugstamt = (((preqty + prefree) * preprodprice - discount) * preugst) / 100;
          //     cgstamt = (((preqty + prefree) * preprodprice - discount) * precgst) / 100;
          //     igstamt = (((preqty + prefree) * preprodprice - discount) * preigst) / 100;
          //   }
          // }else if (gstflag == 2) {
          //   vatamt = (preqty + prefree) * (premrp - (premrp / (1 + prevat / 100)));
          //   gstamt = (preqty + prefree) * (premrp - (premrp / (1 + pregst / 100)));
          //   sgstamt = (preqty + prefree) * (premrp - (premrp / (1 + presgst / 100)));
          //   ugstamt = (preqty + prefree) * (premrp - (premrp / (1 + preugst / 100)));
          //   cgstamt = (preqty + prefree) * (premrp - (premrp / (1 + precgst / 100)));
          //   igstamt = (preqty + prefree) * (premrp - (premrp / (1 + preigst / 100)));
          // }

          // if (freeflag == 1 || freeflag == 0) {
          //   sprod[this.i].vatamt = vatamt;
          //   sprod[this.i].gstamt = gstamt;
          //   sprod[this.i].sgstamt = sgstamt;
          //   sprod[this.i].ugstamt = ugstamt;
          //   sprod[this.i].cgstamt = cgstamt;
          //   sprod[this.i].igstamt = igstamt;
          //   totvatamt += vatamt;
          //   totalgstamt += gstamt;
          //   totsgstamt += sgstamt;
          //   totutgstamt += ugstamt;
          //   totcgstamt += cgstamt;
          //   totigstamt += igstamt;
          // }
          // if (freeflag == 1) {
          //   totalproduct = prodcount;
          //   totqty += preqty;
          //   subtotal += pretotprice;
          //   totdiscount += discount;
          // }
        }
      }
      discount += (pretotprice * predisc) / 100;
      subtotal += pretotprice;
      grandtotal = subtotal - discount;
      totaltaxableamt = subtotal;
      //grandtotal = subtotal + totgstamt - totdiscount;
      //totaltaxamt = totgstamt;
      control.patchValue(sprod);
      this.registerForm.patchValue({
        totalitems: prodcount,
        totaldiscount: discount.toFixed(this.truncatepos),
        taxableamt: totaltaxableamt.toFixed(this.truncatepos),
        totaltaxamt: totaltaxamt.toFixed(this.truncatepos),
        totalinclamt: totalincamt.toFixed(this.truncatepos),
        totalexclamt: totalexclamt.toFixed(this.truncatepos),
        grandtotal: grandtotal.toFixed(this.truncatepos),
        roundoff: (grandtotal - Number(grandtotal.toFixed(this.truncatepos))).toFixed(this.truncatepos),
        createdby: this.selobj.userid,
        locrefid: this.selobj.locrefid,
        locname: this.selobj.locname,
        totalamount: subtotal.toFixed(this.truncatepos),
        totalqty:gtotalcount
      });
    }

    //totgstamt = totsgstamt + totcgstamt + totigstamt + totvatamt + totutgstamt + totalgstamt;
   
    // if(gstflag == 0){
    //   totalincamt = grandtotal;
    // }else{
    //   totalexclamt = grandtotal;
    // }
   
  }

  viewSInvoiceProduct() {
    this.viewSalesInvoice();
    this.viewSIProduct();
  }

  viewSalesInvoice() {
    var frmdata = { frmint1: this.registerForm.get('invoiceno').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSalesInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServMedcInvoice(data) },
      errorCode => console.log(errorCode));
  }

  viewSIProduct() {
    var frmdata = { frmint1: this.registerForm.get('invoiceno').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSIProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServSiProduct(data) },
      errorCode => console.log(errorCode));
  }

  
  taxid: number;
  taxgstid: number = 0;
  viewServMedcInvoice(data: any) {
    this.registerForm.get('customername').setValue(data[0][18]);
    this.registerForm.get('customerrefid').setValue(data[0][4]);
  }
  
  viewServSiProduct(data: any) {
    var v = 0;
    const control = <FormArray>this.registerForm.controls['invoice'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
  
    for (this.i = 0; this.i < data.length; this.i++) {
      control.insert(0, this.formBuilder.group({
        srproductid: [, []],
        srrefid: [, []],
        productname: [data[this.i][0], []],
        sirefid: [data[this.i][1], []],
        drugproductid: [data[this.i][2], []],
        batchrefid: [data[this.i][3], []],
        totalqty: [data[this.i][4], []],
        unitprice: [parseFloat(data[this.i][5]).toFixed(this.truncatepos), []],
        mrp: [data[this.i][6], []],
        expirydate: [data[this.i][7], []],
        unitdiscount: [data[this.i][8], []],
        unitvat: [data[this.i][9], []],
        unitsgst: [data[this.i][10], []],
        unitcgst: [data[this.i][11], []],
        unitigst: [data[this.i][12], []],
        dummy2: ['', []],
        discountamt: [data[this.i][13], []],
        vatamt: [data[this.i][14], []],
        sgstamt: [data[this.i][15], []],
        cgstamt: [data[this.i][16], []],
        igstamt: [data[this.i][17], []],
        subtotal: [data[this.i][18], []],
        drgtyp: [data[this.i][19], []],
        gstflag: [data[this.i][20], []],
        frgstflag: [data[this.i][21], []],
        convfactor: [data[this.i][22], []],
        crntsiqty: [data[this.i][23], []],
        crntstkqty: [data[this.i][24], []],
        sinvrefid: [data[this.i][25], []],
        siqty: [data[this.i][26], []],
        indvqty: [, []],
        calcflag: [0, []],
        delflag: [false, []],
        batchname: [data[this.i][27], []],
        stkmainrefid: [data[this.i][28], []],
        siprodrefid: [data[this.i][29], []],
        unitugst: [data[this.i][30], []],
        ugstamt: [data[this.i][31], []],
        unitgst: [data[this.i][32], []],
        gstamt: [data[this.i][33], []],
        totalinvoiceqty: [data[this.i][34], []],
        prevreturnnqty: [data[this.i][35], []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
      }));
    }
  }
  
  remove(indexid){
    const control = <FormArray>this.registerForm.controls['invoice'];
    control.removeAt(indexid);
    this.calcGST();
  }

  removeold() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    const controlrem = <FormArray>this.registerForm.controls['dummy'];
    
    var valorg = control.value;
    for (this.i = 0; this.i < valorg.length; this.i++) {
      if ((parseInt(valorg[this.i].calcflag) != 1) && (valorg[this.i].delflag != true)) {
        controlrem.insert(0, control.at(this.i));
      }
    }
    while (control.length !== 0) {
      control.removeAt(0);
    }
    for (this.i = 0; this.i < controlrem.value.length; this.i++) {
      control.insert(0, controlrem.at(this.i));
    }
    while (controlrem.length !== 0) {
      controlrem.removeAt(0);
    }
  }
 
 
}