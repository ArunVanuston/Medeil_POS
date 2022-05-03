import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { savePRService } from './savePR.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import { TranslateService } from 'ng2-translate';
@Component({
  selector: 'app-patientedit',
  templateUrl: './savePR.component.html',
  providers: [savePRService, NotificationsComponent, NgbDropdownConfig, dateFormatPipe]
})
export class savePRComponent implements OnInit {
  parentMessage = "sales";
  registerForm: FormGroup;
  registerForm1: FormGroup;
  invoices = [];
  vendorname = [];
  coltax: any;
  i;
  selobj;
  deviceObj;
  fieldhide: any;
  taxid: number;
  taxgstid: number = 0;
  unionstate = [20934, 20936, 20940, 20948, 21773, 21775, 21776]
  decists: any;
  itemlength = [{}, {}, {}, {}, {}, {}];
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  constructor(private userService: savePRService,private router: Router, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, 
    private notificationsComponent: NotificationsComponent, private appComponent: AppComponent,public translate: TranslateService) {
      translate.setDefaultLang('en');
      config.autoClose = false;
  }
  
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };
    this.registerForm = this.formBuilder.group({
      id: ['', []],
      prno: ['', []],
      invoiceno: ['', []],
      vendorid: ['', []],
      totalamount: [, []],
      totalitems: [, []],
      // totalproduct:[,[]],
      totaldiscount: [, []],
      taxableamt: [, []],
      totaltaxamt: [, []],
      totalinclamt: [, []],
      totalexclamt: [, []],
      grandtotal: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      subtotal: [, []],
      roundoff: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      prdate: [this.dateformat.transform05(Date.now()), []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],
      totalstripqty: ['', []],
      totaltabqty: ['', []],
      totaldiscountamt: ['', []],
      totaltaxableamt: ['', []],
      totalsubtotal: ['', []],
      roundedoff: ['', []],
      cashdiscount: ['',[]],
      cashdiscountpercent: ['',[]],
      invoice: this.formBuilder.array([
      ]),
      dummy: this.formBuilder.array([
      ]),
    });
    this.registerForm1 = this.formBuilder.group({
     // debitaccount: [2, []],
      debitaccount: [20, []],
      debitamount: [, []],
      creditamount: [, []],
     // draccname: ['Accounts  Receivable', []],
      draccname: ['Purchase Return', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [7, []],
      jrnlname: ['DebitNote', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [2, []],
      invoicetype: [4, []],
      paymenttype: [, []],
      ptrefno: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      salesflag: [1, []],
      calcflag: [0, []],
    });
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewMedcInvoices(JSON.stringify(frmdata)).subscribe(data => { this.invoices = data },
      errorCode => console.log(errorCode));
    $(document).ready(function () {
    });

    this.userService.getFieldhide(AppComponent.companyID, AppComponent.branchID,
      AppComponent.shopID, AppComponent.locrefID)
      .subscribe(data => { this.coltax = data },
        error => {
          console.log('Error Occured On getFieldhide()');
        });

    this.userService.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
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
      this.registerForm.get('totalitems').setValue((0).toFixed(this.fixedlength));
      this.registerForm.get('totaldiscountamt').setValue((0).toFixed(this.fixedlength));
      this.registerForm.get('totaltaxableamt').setValue((0).toFixed(this.fixedlength));
      this.registerForm.get('totaltaxamt').setValue((0).toFixed(this.fixedlength));
      this.registerForm.get('roundedoff').setValue((0).toFixed(this.fixedlength));
      this.registerForm.get('totalsubtotal').setValue((0).toFixed(this.fixedlength));
      this.registerForm.get('grandtotal').setValue((0).toFixed(this.fixedlength));
    });
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
      devicetype: this.appComponent.devicetype,
      apiname: '',
      description: '',
      clientcdate: this.dateformat.transform04()

    };

  }

  saveprocess:boolean=false;
  onSubmit() {
    var valflag: Number = 0;
    valflag = this.validnew();
    if (valflag == 0) {
      this.registerForm.get('vendorid').setValue(this.vendorname)
      this.saveprocess=true;
      this.userService.savePurchReturn(JSON.stringify(this.registerForm.value)).subscribe(data => { this.savePrProducts(data), this.saveDebitNote(data) },
        errorCode => console.log(errorCode));
    }
  }
  savePrProducts(data: any) {
    const control = this.registerForm.controls['invoice'];
    this.userService.savePrProducts(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
      errorCode => console.log(errorCode));
  }
  saveDebitNote(data: any) {
    this.registerForm1.patchValue({
     debitamount: this.registerForm.get('grandtotal').value,
      // creditamount: this.registerForm.get('grandtotal').value,
      personid: this.registerForm.get('vendorid').value,
    });
    this.userService.saveDebitNote(JSON.stringify(this.registerForm1.value)).subscribe(data => {  },
      errorCode => console.log(errorCode));
  }
  
  savevalid(data: any) {
    if (data == 1) {


      this.justInitiate();
      this.deviceObj.apiname = "api/pr/savePurchReturn";
      this.deviceObj.description = "PurchaseReturn Created";

      this.userService.deviceDetails(JSON.stringify(this.deviceObj))
        .subscribe(data => { },
          errorCode => console.log(errorCode));



          this.saveprocess=false;




      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['PurchaseReturn/ViewPurchaseReturn']);
      }, 2000);
    } else {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  calc(event) {
    // alert(event.keyCode)
    if (event.keyCode == 9) {

      this.calcGST();
    }
  else  if (event.keyCode == 13) {

      this.calcGST();
    }
  }

  calcGST() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var sprod = control.value;
    var preqty: any = 0;
    var preprodprice: any = 0;
    var prefree: any = 0;
    var premrp: any = 0;
    var predisc: any = 0;
    var presgst: any = 0;
    var precgst: any = 0;
    var preigst: any = 0;
    var pretotprice: any = 0;
    var pretotfreeprice: any = 0;
    var pretotmrp: any = 0;
    var discount: any = 0;
    var sgstamt: any = 0;
    var cgstamt: any = 0;
    var igstamt: any = 0;
    var totdiscount: any = 0;
    var totsgstamt: any = 0;
    var totalgstamt: any = 0;
    var totcgstamt: any = 0;
    var totigstamt: any = 0;
    var totutgstamt: any = 0;
    var totgstamt: any = 0;
    var totaltaxableamt: any = 0;
    var totaltaxamt: any = 0;
    var totalincamt: any = 0;
    var totalexclamt: any = 0;
    var grandtotal: any = 0;
    var totalproduct: any = 0;
    var totqty: any = 0;
    var subtotal: any = 0;
    var convfactor: any = 0;
    var gstflag: any = 0;
    var freeflag: any = 0;
    var frgstflag: any = 0;
    var prevat: any = 0;
    var pregst: any = 0;
    var preugst: any = 0;
    var totvatamt: any = 0;
    var vatamt: any = 0;
    var gstamt: any = 0;
    var ugstamt: any = 0;
    var prodcount: any = 0;
    var boxconvstk: any = 0;
    var stripconvstk: any = 0;
    var boxquantity: any = 0;
    var stripquantity: any = 0;
    var tabletquantity: any = 0;
    var roundedamnt: any = 0;
    var roundvalue: any = 0;
    var inv;
    for (this.i = 0; this.i < sprod.length; this.i++) {
      if (sprod[this.i].calcflag != 1) {

        if (parseFloat(sprod[this.i].indvqty)) {
          preqty = parseFloat(sprod[this.i].indvqty);
          //    alert(preqty);
        } else {
          preqty = 0;
        }
        if (parseFloat(sprod[this.i].indvfreeqty)) {
          prefree = parseFloat(sprod[this.i].indvfreeqty);
        } else {
          prefree = 0;
        }
        if (parseFloat(sprod[this.i].unitprice)) {
          preprodprice = parseFloat(sprod[this.i].unitprice);
          //  alert(preprodprice)
        } else {
          preprodprice = 0;
        }
        if (parseFloat(sprod[this.i].mrp)) {
          premrp = parseFloat(sprod[this.i].mrp);
        } else {
          premrp = 0;
        }
        if (parseFloat(sprod[this.i].discount)) {
          predisc = parseFloat(sprod[this.i].discount);
        } else {
          predisc = 0;
        }
        if (parseFloat(sprod[this.i].unitsgst)) {
          presgst = parseFloat(sprod[this.i].unitsgst);
        } else {
          presgst = 0;
        }
        if (parseFloat(sprod[this.i].unitcgst)) {
          precgst = parseFloat(sprod[this.i].unitcgst);
        } else {
          precgst = 0;
        }
        if (parseFloat(sprod[this.i].unitigst)) {
          preigst = parseFloat(sprod[this.i].unitigst);
        } else {
          preigst = 0;
        }
        if (parseFloat(sprod[this.i].gstflag)) {
          gstflag = parseFloat(sprod[this.i].gstflag);
        } else {
          gstflag = 0;
        }
        if (parseFloat(sprod[this.i].frgstflag)) {
          frgstflag = parseFloat(sprod[this.i].frgstflag);
        } else {
          frgstflag = 0;
        }
        if (parseFloat(sprod[this.i].freeflag)) {
          freeflag = parseFloat(sprod[this.i].freeflag);
        } else {
          freeflag = 0;
        }
        if (parseFloat(sprod[this.i].unitvat)) {
          prevat = parseFloat(sprod[this.i].unitvat);
        }
        else {
          prevat = 0;
        }
        if (parseFloat(sprod[this.i].unitgst)) {
          pregst = parseFloat(sprod[this.i].unitgst);
        }
        else {
          pregst = 0;
        } if (parseFloat(sprod[this.i].unitugst)) {
          preugst = parseFloat(sprod[this.i].unitugst);
        }
        else {
          preugst = 0;
        }
        if (parseFloat(sprod[this.i].convfactor)) {
          convfactor = parseFloat(sprod[this.i].convfactor);
          //  alert(convfactor);
        } else {
          convfactor = 0;
        }
        if (parseFloat(sprod[this.i].boxconvstk)) {
          boxconvstk = parseFloat(sprod[this.i].boxconvstk);
        } else {
          boxconvstk = 0;
        }
        if (parseFloat(sprod[this.i].stripconvstk)) {
          stripconvstk = parseFloat(sprod[this.i].stripconvstk);
        } else {
          stripconvstk = 0;
        }
        if (parseFloat(sprod[this.i].boxquantity)) {
          boxquantity = parseFloat(sprod[this.i].boxquantity);
        } else {
          boxquantity = 0;
        }
        if (parseFloat(sprod[this.i].stripquantity)) {
          stripquantity = parseFloat(sprod[this.i].stripquantity);
        } else {
          stripquantity = 0;
        }
        if (parseFloat(sprod[this.i].tabletquantity)) {
          tabletquantity = parseFloat(sprod[this.i].tabletquantity);
        } else {
          tabletquantity = 0;
        }
        freeflag = 1;
        if (freeflag == 0) {
          discount = 0;
          prefree = 0;
        } else {
          prodcount += 1;
        }
        

        // preqty = (boxquantity * boxconvstk * stripconvstk) + (stripquantity * stripconvstk) + tabletquantity;

        preqty = (boxquantity * boxconvstk * stripconvstk);
        if(preqty > sprod[this.i].crntpiqty){
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Return Qty > Purchase Qty  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        if (this.decists[0][0] == 1) {
          sprod[this.i].totalquantity = preqty.toFixed(2);
          sprod[this.i].totalfreeqty = (convfactor * prefree).toFixed(2);
          sprod[this.i].subtotal = (boxquantity * preprodprice).toFixed(2);
        } else if (this.decists[0][1] == 1) {
          sprod[this.i].totalquantity = preqty.toFixed(3);
          sprod[this.i].totalfreeqty = (convfactor * prefree).toFixed(3);
          sprod[this.i].subtotal = (boxquantity * preprodprice).toFixed(3);
        }
        pretotprice = boxquantity * preprodprice;
        discount = (pretotprice * predisc) / 100;
        if (gstflag == 0) { /* *Tax calculation .. which is exclusive or inclusive tax */
          if (frgstflag == 0) { /* Free Product Tax calculation */
            vatamt = ((pretotprice - discount) * prevat) / 100;
            gstamt = ((pretotprice - discount) * pregst) / 100;
            ugstamt = ((pretotprice - discount) * preugst) / 100;
            sgstamt = ((pretotprice - discount) * presgst) / 100;
            cgstamt = ((pretotprice - discount) * precgst) / 100;
            igstamt = ((pretotprice - discount) * preigst) / 100;
          }
          else {
            vatamt = (((boxquantity + prefree) * preprodprice - discount) * prevat) / 100;
            gstamt = (((boxquantity + prefree) * preprodprice - discount) * pregst) / 100;
            ugstamt = (((boxquantity + prefree) * preprodprice - discount) * preugst) / 100;
            sgstamt = (((boxquantity + prefree) * preprodprice - discount) * presgst) / 100;
            cgstamt = (((boxquantity + prefree) * preprodprice - discount) * precgst) / 100;
            igstamt = (((boxquantity + prefree) * preprodprice - discount) * preigst) / 100;
          }
        }
        else {
          vatamt = (boxquantity + prefree) * (premrp - (premrp / (1 + prevat / 100)));
          gstamt = (boxquantity + prefree) * (premrp - (premrp / (1 + pregst / 100)));
          ugstamt = (boxquantity + prefree) * (premrp - (premrp / (1 + preugst / 100)));
          sgstamt = (boxquantity + prefree) * (premrp - (premrp / (1 + presgst / 100)));
          cgstamt = (boxquantity + prefree) * (premrp - (premrp / (1 + precgst / 100)));
          igstamt = (boxquantity + prefree) * (premrp - (premrp / (1 + preigst / 100)));
        }
        if (freeflag == 1 || freeflag == 0) { /* Add Free Product Calculation */
          sprod[this.i].vatamt = vatamt;
          sprod[this.i].gstamt = gstamt;
          sprod[this.i].ugstamt = ugstamt;
          sprod[this.i].sgstamt = sgstamt;
          sprod[this.i].cgstamt = cgstamt;
          sprod[this.i].igstamt = igstamt;
          totvatamt += vatamt;
          totutgstamt += ugstamt;
          totalgstamt += gstamt;
          totsgstamt += sgstamt;
          totcgstamt += cgstamt;
          totigstamt += igstamt;
        }
        if (freeflag == 1) {
          totalproduct = prodcount;
          totqty += preqty;
          subtotal += pretotprice;
          totdiscount += discount;
        }
      }


    }


    if (this.taxid == null && this.taxgstid == 0) {
      totgstamt = 0;
    } else if (this.taxid == 1) {
      totgstamt = totalgstamt;
    }
    else if (this.taxid == 2 || this.taxgstid == 1) {
      totgstamt = totsgstamt + totcgstamt + totigstamt
    }
    else if (this.taxid == 2 || this.taxgstid == 2) {
      totgstamt = totutgstamt + totcgstamt + totigstamt
    }
    else if (this.taxid == 0) {
      totgstamt = totvatamt
    }



    grandtotal = subtotal + totgstamt - totdiscount;
    if (gstflag == 0) {
      totalincamt = grandtotal;
    } else {
      totalexclamt = grandtotal;
    }
   

    // if (this.decists[0][0] == 1) {
    //   totalproduct.toFixed(2);
    //   totqty.toFixed(2);
    //   subtotal.toFixed(2);
    //   totdiscount.toFixed(2);
    //   totaltaxableamt.toFixed(2);
    //   totaltaxamt.toFixed(2);
    //   roundedamnt;
    //   roundvalue.toFixed(2);
    // } else if (this.decists[0][1] == 1) {
    //   totalproduct.toFixed(3);
    //   totqty.toFixed(3);
    //   subtotal.toFixed(3);
    //   totdiscount.toFixed(3);
    //   totaltaxableamt.toFixed(3);
    //   totaltaxamt.toFixed(3);
    //   roundedamnt;
    //   roundvalue.toFixed(3);
    // }

    // roundedamnt = (Math.round(grandtotal * 10) / 10);
    // // alert("a2"+roundedamnt);
    // roundvalue = roundedamnt.toFixed() - grandtotal.toFixed(2)
    control.patchValue(sprod);
    totaltaxableamt = subtotal - totdiscount;
    totaltaxamt = totgstamt;
    grandtotal -= ((parseFloat(this.registerForm.get('cashdiscountpercent').value)/100) * grandtotal);
    totaltaxamt -= ((parseFloat(this.registerForm.get('cashdiscountpercent').value)/100) * totaltaxamt);
    grandtotal = parseFloat(grandtotal) - parseFloat(this.registerForm.get('cashdiscount').value);
       if (this.decists[0][2] == 1) {
      roundedamnt = Math.round(grandtotal)
      roundvalue = roundedamnt - grandtotal;
      // roundvalue = grandtotal % 1;
      // roundedamnt = grandtotal.toFixed() + 1;
      // roundvalue = roundedamnt-grandtotal;
    } else if (this.decists[0][3] == 1) {
      roundedamnt = Math.round(grandtotal);
      roundvalue = roundedamnt - grandtotal;
      //  roundvalue = grandtotal % 1;
      //  roundedamnt = grandtotal.toFixed();
      //  roundvalue = roundedamnt-grandtotal;
    } else {
      roundedamnt = grandtotal;
    }
   
      this.registerForm.patchValue({
        totalitems: totalproduct.toFixed(this.fixedlength),
        totaldiscountamt: totdiscount.toFixed(this.fixedlength),
        totaltaxableamt: totaltaxableamt.toFixed(this.fixedlength),
        totaltaxamt: totaltaxamt.toFixed(this.fixedlength),
        totalinclamt: totalincamt,
        totalexclamt: totalexclamt,
        grandtotal: roundedamnt.toFixed(this.fixedlength),
        createdby: this.selobj.userid,
        locrefid: this.selobj.locrefid,
        locname: this.selobj.locname,
        totalsubtotal: subtotal.toFixed(this.fixedlength),
        roundedoff: roundvalue.toFixed(this.fixedlength)
      });    
    
  }
  viewPInvoiceProduct() {
    this.viewPurchInvoice();
    this.viewPiProduct();
  }
  viewPurchInvoice() {
    // var frmdata = { frmint1: this.registerForm.get('invoiceno').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var frmdata1 = { piid: this.registerForm.get('invoiceno').value }
    // this.userService.viewMedcInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServMedcInvoice(data) },
    //   errorCode => console.log(errorCode));
    this.userService.viewVendorName(JSON.stringify(frmdata1)).subscribe(data => {
      this.vendorname = data[0][0]; 
      this.registerForm.get('vendorid').setValue(data[0][1]);
        this.registerForm.get('cashdiscount').setValue(data[0][5]);
          this.registerForm.get('cashdiscountpercent').setValue(data[0][6]);
      //taxation Concept
      if (this.coltax[0][0] == 0) {
        if (data[0][2] != null && data[0][2] == AppComponent.countryID) {
          this.taxid = 0;
        } else {
          this.taxid = null;
        }
        // $("#colvathide").show();
        // $('.colvathide').show();
        // $("#colhide").hide();
        // $('.colhide').hide();
        // $("#colindgsthide").hide();
        // $('.colindgsthide').hide();
      }
      if (this.coltax[0][0] == 1) {
        if (data[0][2] != null && data[0][2] == AppComponent.countryID) {
          this.taxid = 1;
        } else {
          this.taxid = null;
        }
        // $("#colvathide").hide();
        // $('.colvathide').hide();
        // $("#colhide").show();
        // $('.colhide').show();
        // $("#colindgsthide").hide();
        // $('.colindgsthide').hide();
      }
      if (this.coltax[0][0] == 2) {
        if (data[0][2] != null && data[0][2] == AppComponent.countryID) {
          // this.taxgstid=1;
          for (this.i = 0; this.i < this.unionstate.length; this.i++) {
            if (data[0][3] == this.unionstate[this.i]) {
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
      errorCode => console.log(errorCode));
  }
  viewPiProduct() {
    var frmdata = { frmint1: this.registerForm.get('invoiceno').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewPiProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServPiProduct(data) },
      errorCode => console.log(errorCode));
  }
  viewServMedcInvoice(data: any) {
    this.registerForm.get('vendorid').setValue(data[0][1]);
  }
  viewServPiProduct(data: any) {
    const control = <FormArray>this.registerForm.controls['invoice'];
    control.controls = [];
    var v = 0;
    for (this.i = 0; this.i < data.length; this.i++) {
      v = 1;
      control.push(this.formBuilder.group({
        prproductid: [],
        prrefid: [],
        productname: [data[this.i][0], []],
        drugproductid: [data[this.i][1], []],
        batchname: [data[this.i][2], []],
        unitprice: [parseFloat(data[this.i][3]).toFixed(this.fixedlength), []],
        subtotal: [parseFloat(data[this.i][4]).toFixed(this.fixedlength), []],
        mrp: [data[this.i][5], []],
        unitvat: [data[this.i][6], []],
        unitsgst: [data[this.i][7], []],
        unitcgst: [data[this.i][8], []],
        unitigst: [data[this.i][9], []],
        igstamt: [],
        pirefid: [data[this.i][10], []],

        // piqty: [data[this.i][0], []],
        crntpiqty: [parseFloat(data[this.i][11]).toFixed(this.fixedlength), []],
        crntstkqty: [parseFloat(data[this.i][12]).toFixed(this.fixedlength), []],
        stkboxconvstk: [parseFloat(data[this.i][13]).toFixed(this.fixedlength), []],
        boxconvstk: [(0).toFixed(this.fixedlength), []],
        stripconvstk: [data[this.i][14], []],
        piprodrefid: [data[this.i][15], []],
        discount: [data[this.i][16], []],
        batchrefid: [data[this.i][17], []],
        unitgst: [data[this.i][18], []],
        unitugst: [data[this.i][19], []],
        gstamt: [],
        ugstamt: [],
        stkboxquantity: [parseFloat(data[this.i][20]).toFixed(this.fixedlength), []],
        boxquantity: [(0).toFixed(this.fixedlength), []],
        // stripquantity: [data[this.i][21], []],
        // tabletquantity: [data[this.i][22], []],
        stripquantity: [0, []],
        tabletquantity: [0, []],
        totalquantity: [0, []],
        vatamt: [],
        sgstamt: [],
        cgstamt: [],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        //  subtotal: [, []],
        gstflag: [0, []],
        calcflag: [0, []],
        delflag: [false, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        packageunit:[data[this.i][26]],
        status:[0]
      }));
    }
  }

  remove(index) {
    const getData = <FormArray>this.registerForm.controls['invoice'];
    getData.removeAt(index);
    this.calcGST();
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
      this.registerForm.reset();
      this.ngOnInit();
    }
   
   
  }
  validnew(): Number {
    var valflag = 0;
    const control = <FormArray>this.registerForm.controls['invoice'];
    var invoicedata = control.value;
    for (this.i = 0; this.i < invoicedata.length; this.i++) {
      if (parseFloat(invoicedata[this.i].totalquantity) > parseFloat(invoicedata[this.i].crntpiqty)) {
        valflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Return Qty > Purchase Qty  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      if(parseFloat(invoicedata[this.i].totalquantity) == parseFloat(invoicedata[this.i].crntpiqty)){
        invoicedata[this.i].status = '1';
        control.patchValue(invoicedata);
      }
    }
    return valflag;
  }
  clear() {
    this.ngOnInit();
  }
}