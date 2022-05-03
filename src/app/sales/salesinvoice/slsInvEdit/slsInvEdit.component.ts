import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { slsInvEditService } from './slsInvEdit.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-patientedit',
  templateUrl: './slsInvEdit.component.html',
  providers: [slsInvEditService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class slsInvEditComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
  registerForm: FormGroup;
  id: number;
  private sub: any;
  slsinvno = [];
  errors = [];
  images = [];
  i;
  autoincr;
  autoval = 0;
  autoinc = 0;
  autodata = [];
  autodatacopy = [];
  selobj;
  drgid;
  barcodeflag;
  editdata = [];
  priceflag = 3;
  truncatepos;
  deviceObj: any;
  constructor(private userService: slsInvEditService, private router: Router, private dateformat: dateFormatPipe,
     private formBuilder: FormBuilder,  config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent,
     private route: ActivatedRoute,private appComponent: AppComponent) {
    config.autoClose = false;
  }

  ngOnInit() {
    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.registerForm = this.formBuilder.group({
      id: [, []],
      salesbilltype: [, []],
      salesbillno: [, []],
      billdate: [, []],
      customerrefid: [, []],
      doctorrefid: [, []],
      totalamount: [, []],
      totalitems: [, []],
      totaldiscount: [, []],
      taxableamt: [, []],
      totaltaxamt: [, []],
      totalinclamt: [, []],
      totalexclamt: [, []],
      grandtotal: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      customername: [, []],
      invoiceno: [, []],
      autonamenew: [, []],
      subtotal: [, []],
      roundoff: [, []],
      barcode: [, []],
      prescpath: [, []],
      paymenttype: [, []],
      ptrefno: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      date: [, []],
      invdispflag: [, []],
      custinvoiceno: [, []],
      freeflag: [, []],
      gstflag: [1, []],
      frgstflag: [1, []],
      scitizenflag: [, []],
      phycapflag: [, []],
      phydiscountflag: [, []],
      disctaxflag: [, []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],
      invoice: this.formBuilder.array([
      ]),
      dummy: this.formBuilder.array([
      ]),
    });
    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSalesInvoices(JSON.stringify(frmdata)).subscribe(data => { this.slsinvno = data },
      errorCode => console.log(errorCode));
    this.userService.viewSISalesInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServSalesInvoice(data) },
      errorCode => console.log(errorCode));
    this.userService.viewSIProducts(JSON.stringify(frmdata)).subscribe(data => { this.viewServSIProducts(data) },
      errorCode => console.log(errorCode));
    this.userService.viewSalesInvoiceAll(JSON.stringify(frmdata)).subscribe(data => { this.editdata = data },
      errorCode => console.log(errorCode));
    this.userService.viewSITaxSettings(JSON.stringify(frmdata)).subscribe(data => {
      this.registerForm.get('gstflag').setValue(data[0][0])
      , this.registerForm.get('frgstflag').setValue(data[0][1])
    },
      errorCode => console.log(errorCode));
    this.images = [];
    $(document).ready(function () {
      $('.image').hide();
    });
    $('.boxname ').hide();
    this.init();
    if (this.id) {
      this.registerForm.get('invdispflag').setValue(1);
    } else {
      this.registerForm.get('invdispflag').setValue(0);
    }
  }


  ClosePresc() {
    $('.image ').hide();
  }

  viewsPresc() {
    this.images = [['api/slsinv/viewPresImage?search=' + this.registerForm.get('prescpath').value]];
    $('.image ').show();
  }

  autofocusin() {
    this.autoincr = setInterval(() => {
      if (this.registerForm.get('autonamenew').value) {
        $('#autolist').show();
        if (this.autoval == this.registerForm.get('autonamenew').value) {
          this.autoinc += 1;
        } else {
          this.autoinc = 0;
        }
        this.autoval = this.registerForm.get('autonamenew').value;
        if (this.autoinc < 1) {
          var frmdata = {  frmint1: '', frmstr1: this.registerForm.get('autonamenew').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid,branchrefid: this.selobj.branchrefid };
          this.userService.viewSIProductNames(JSON.stringify(frmdata)).subscribe(data => { this.autodata = data },
            errorCode => console.log(errorCode));
        }
      } else {
        $('#autolist').hide();
      }
    }, 610);
  }

  autofocusout() {
    if (this.registerForm.get('autonamenew').value) {
    } else {
      $('#autolist').hide();
    }
    clearInterval(this.autoincr);
  }

  autokeyselect(event: KeyboardEvent, articleId: number) {
    var autoincrflag: number;
    if (event.keyCode == 38) {
      var autoincrflag = articleId - 1;
      if (autoincrflag == 0) {
        $("#autoname").focus();
      } else {
        $("#autolist li:nth-child(" + autoincrflag + ") input").focus();
      }
    }
    if (event.keyCode == 40) {
      var autoincrflag = articleId + 1;
      $("#autolist li:nth-child(" + autoincrflag + ") input").focus();
    }
    if (event.keyCode == 13) {
      this.drgid = articleId - 1;
      this.autodatacopy = this.autodata;
      $('.boxname ').show();
      $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus();
    }
    this.barcodeflag = 0;
  }

  viewBarcodeProd(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.barcodeflag = 1;
      $('.boxname ').show();
      $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus();
    }
  }

  viewStock(event: KeyboardEvent, stktype: number) {
    var autoincrflag: number;
    if (event.keyCode == 38) {
      autoincrflag = stktype - 1;
      $("#autolistnew li:nth-child(" + autoincrflag + ") input").focus();
    }
    if (event.keyCode == 40) {
      autoincrflag = stktype + 1;
      $("#autolistnew li:nth-child(" + autoincrflag + ") input").focus();
    }
    if (event.keyCode == 13) {
      if (this.barcodeflag == 0) {
        var drg = this.autodatacopy[this.drgid][1];
        var bth = this.autodatacopy[this.drgid][2];
        var frmdata = { frmint1: drg, frmint2: bth, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
        this.userService.viewSIProductName(JSON.stringify(frmdata)).subscribe(data => { this.viewServWareHouseStock(data, stktype) },
          errorCode => console.log(errorCode));
        $("#autoname").focus();
        $('.boxname ').hide();
        this.registerForm.get('autonamenew').setValue('');
        this.autodatacopy = [];
      } else if (this.barcodeflag == 1) {
        var frmdata1 = { frmint1: '', frmstr1: this.registerForm.get('barcode').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
        this.userService.viewBarCodeProd(JSON.stringify(frmdata1)).subscribe(data => { this.viewServWareHouseStock(data, stktype) },
          errorCode => console.log(errorCode));
        $('.boxname ').hide();
        $(".barcode").focus();
        this.registerForm.get('barcode').setValue('');
      }
    }
  }

  viewServWareHouseStock(data: any, stktype: any) {
    var conversionfactor;
    var unitprice;
    var indtabprice;
    if (this.priceflag == 1) {
      indtabprice = data[0][4];
    } else if (this.priceflag == 2) {
      indtabprice = data[0][23];
    } else if (this.priceflag == 3) {
      indtabprice = data[0][24];
    }
    const control = <FormArray>this.registerForm.controls['invoice'];
    if (stktype == 1) {
      conversionfactor = data[0][11];
      unitprice = indtabprice * data[0][11];
    } else if (stktype == 2) {
      conversionfactor = data[0][12];
      unitprice = indtabprice * data[0][12];
    } else if (stktype == 3) {
      conversionfactor = 1;
      unitprice = indtabprice;
    }
    for (this.i = 0; this.i < data.length; this.i++) {
      control.insert(0, this.formBuilder.group({
        id: [, []],
        salesrefid: [this.registerForm.get('id').value, []],
        drugproductid: [data[this.i][1], []],
        batchrefid: [data[this.i][2], []],
        totalqty: [0, []],
        totalfreeqty: [, []],
        unitprice: [unitprice, []],
        mrp: [data[this.i][5], []],
        expirydate: [data[this.i][20], []],
        unitdiscount: [, []],
        unitvat: [data[this.i][10], []],
        unitsgst: [data[this.i][6], []],
        unitcgst: [data[this.i][7], []],
        unitigst: [data[this.i][8], []],
        discountamt: [, []],
        vatamt: [, []],
        sgstamt: [, []],
        cgstamt: [, []],
        igstamt: [, []],
        subtotal: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drgtyp: stktype,
        gstflag: [this.registerForm.get('gstflag').value, []],
        frgstflag: [this.registerForm.get('frgstflag').value, []],
        freeflag: [, []],
        priceflag: [, []],
        discflag: [, []],
        discautoflag: [, []],
        convfactor: [conversionfactor, []],
        indvqty: [, []],
        indvfreeqty: [, []],
        crntstkqty: [data[this.i][3], []],
        productname: [data[this.i][0], []],
        calcflag: [0, []],
        dbflag: [, []],
        delflag: [false, []],
        soqty: [, []],
        soremainqty: [, []],
        batchname: [data[this.i][19], []],
        stkmainrefid: [data[this.i][22], []],
      }));
    }
  }

      
  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}


  onSubmit() {
    var valflag: Number = 0;
    valflag = this.validnew();
    const control = <FormArray>this.registerForm.controls['invoice'];
    var answer = confirm("Save data?");
    if (answer && valflag == 0) {
      this.userService.saveSalesInvoice(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveSIProducts(data) },
        errorCode => console.log(errorCode));
        window.location.href="[SalesInvoice/SalesMaintenance]";
    }
  }

  saveSIProducts(data: any) {
    const control = <FormArray>this.registerForm.controls['invoice'];
    if (data == 1) {
      this.userService.saveSIProducts(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }
  }

  savevalid(data: any) {
    if (data == 1) {

      this.devicedetails();
      this.deviceObj.apiname="api/slsinv/updateSalesInvoice";
      this.deviceObj.description="Update SalesInvoice";

      this.userService.editdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clear();
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  deleteValid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Deleted Succesfully    ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      //  this.clear() ; 
      this.router.navigateByUrl("/SalesInvoice/SalesMaintenance");
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: ' Not Delted', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  calc(e) {
    if (e.keyCode == 9) {
      this.calcGST();
    }
  }
  // calcGST() {
  //   const control = <FormArray>this.registerForm.controls['invoice'];
  //   var sprod = control.value;
  //   var preqty: number = 0;
  //   var preprodprice: number = 0;
  //   var prefree: number = 0;
  //   var premrp: number = 0;
  //   var predisc: number = 0;
  //   var presgst: number = 0;
  //   var precgst: number = 0;
  //   var preigst: number = 0;
  //   var pretotprice: number = 0;
  //   var pretotfreeprice: number = 0;
  //   var pretotmrp: number = 0;
  //   var discount: number = 0;
  //   var sgstamt: number = 0;
  //   var cgstamt: number = 0;
  //   var igstamt: number = 0;
  //   var totdiscount: number = 0;
  //   var totsgstamt: number = 0;
  //   var totcgstamt: number = 0;
  //   var totigstamt: number = 0;
  //   var totutgstamt: number = 0;
  //   var totgstamt: number = 0;
  //   var totaltaxableamt: number = 0;
  //   var totaltaxamt: number = 0;
  //   var totalincamt: number = 0;
  //   var totalexclamt: number = 0;
  //   var grandtotal: number = 0;
  //   var totalproduct: number = 0;
  //   var totqty: number = 0;
  //   var subtotal: number = 0;
  //   var convfactor: number = 0;
  //   var gstflag: number = 0;
  //   var frgstflag: number = 0;
  //   var freeflag: number = 0;
  //   var prevat: number = 0;
  //   var totvatamt: number = 0;
  //   var vatamt: number = 0;
  //   var prodcount: number = 0;
  //   var inv;
  //   for (this.i = 0; this.i < sprod.length; this.i++) {
  //     if (sprod[this.i].calcflag != 1) {
  //       if (parseInt(sprod[this.i].indvqty)) {
  //         preqty = parseInt(sprod[this.i].indvqty);
  //       } else {
  //         preqty = 0;
  //       }
  //       if (parseInt(sprod[this.i].indvfreeqty)) {
  //         prefree = parseInt(sprod[this.i].indvfreeqty);
  //       } else {
  //         prefree = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitprice)) {
  //         preprodprice = parseInt(sprod[this.i].unitprice);
  //       } else {
  //         preprodprice = 0;
  //       }
  //       if (parseInt(sprod[this.i].mrp)) {
  //         premrp = parseInt(sprod[this.i].mrp);
  //       } else {
  //         premrp = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitdiscount)) {
  //         predisc = parseInt(sprod[this.i].unitdiscount);
  //       } else {
  //         predisc = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitvat)) {
  //         prevat = parseInt(sprod[this.i].unitvat);
  //       } else {
  //         prevat = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitsgst)) {
  //         presgst = parseInt(sprod[this.i].unitsgst);
  //       } else {
  //         presgst = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitcgst)) {
  //         precgst = parseInt(sprod[this.i].unitcgst);
  //       } else {
  //         precgst = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitigst)) {
  //         preigst = parseInt(sprod[this.i].unitigst);
  //       } else {
  //         preigst = 0;
  //       }
  //       if (parseInt(sprod[this.i].gstflag)) {
  //         gstflag = parseInt(sprod[this.i].gstflag);
  //       } else {
  //         gstflag = 0;
  //       }
  //       if (parseInt(sprod[this.i].frgstflag)) {
  //         frgstflag = parseInt(sprod[this.i].frgstflag);
  //       } else {
  //         frgstflag = 0;
  //       }
  //       if (parseInt(sprod[this.i].freeflag)) {
  //         freeflag = parseInt(sprod[this.i].freeflag);
  //       } else {
  //         freeflag = 0;
  //       }
  //       if (parseInt(sprod[this.i].convfactor)) {
  //         convfactor = parseInt(sprod[this.i].convfactor);
  //       } else {
  //         convfactor = 0;
  //       }
  //       if (freeflag == 0) {
  //         sprod[this.i].indvfreeqty = 0;
  //         discount = 0;
  //         prefree = 0;
  //       } else {
  //         prodcount += 1;
  //       }
  //       sprod[this.i].subtotal = preqty * preprodprice;
  //       sprod[this.i].totalqty = convfactor * preqty;
  //       sprod[this.i].totalfreeqty = convfactor * prefree;
  //       pretotprice = preqty * preprodprice;
  //       discount = (pretotprice * predisc) / 100;
  //       if (gstflag == 1) {
  //         if (frgstflag == 1) {
  //           vatamt = ((pretotprice - discount) * prevat) / 100;
  //           sgstamt = ((pretotprice - discount) * presgst) / 100;
  //           cgstamt = ((pretotprice - discount) * precgst) / 100;
  //           igstamt = ((pretotprice - discount) * preigst) / 100;
  //         }
  //         else if (frgstflag == 2) {
  //           vatamt = (((preqty + prefree) * preprodprice - discount) * prevat) / 100;
  //           sgstamt = (((preqty + prefree) * preprodprice - discount) * presgst) / 100;
  //           cgstamt = (((preqty + prefree) * preprodprice - discount) * precgst) / 100;
  //           igstamt = (((preqty + prefree) * preprodprice - discount) * preigst) / 100;
  //         }
  //       }
  //       else if (gstflag == 2) {
  //         vatamt = (((preqty * preprodprice)) / (100 + prevat)) * (prevat);
  //         sgstamt = (preqty + prefree) * (premrp - (premrp / (1 + presgst / 100)));
  //         cgstamt = (preqty + prefree) * (premrp - (premrp / (1 + precgst / 100)));
  //         igstamt = (preqty + prefree) * (premrp - (premrp / (1 + preigst / 100)));
  //       }
  //       if (freeflag == 1 || freeflag == 0) {
  //         sprod[this.i].vatamt = vatamt;
  //         sprod[this.i].sgstamt = sgstamt;
  //         sprod[this.i].cgstamt = cgstamt;
  //         sprod[this.i].igstamt = igstamt;
  //         totvatamt += vatamt;
  //         totsgstamt += sgstamt;
  //         totcgstamt += cgstamt;
  //         totigstamt += igstamt;
  //       }
  //       if (freeflag == 1) {
  //         totalproduct = prodcount;
  //         totqty += preqty;
  //         subtotal += pretotprice;
  //         totdiscount += discount;
  //       }
  //     }
  //   }
  //   totgstamt = totsgstamt + totcgstamt + totigstamt + totvatamt;
  //   if (this.registerForm.get('disctaxflag').value == true) {
  //     grandtotal = subtotal - totgstamt - totdiscount;
  //   } else if (this.registerForm.get('disctaxflag').value == false && this.registerForm.get('gstflag').value == 2) {
  //     grandtotal = subtotal - totdiscount;
  //   } else if (this.registerForm.get('gstflag').value == 1) {
  //     grandtotal = subtotal + totgstamt - totdiscount;
  //   }
  //   if (gstflag == 0) {
  //     totalincamt = grandtotal;
  //   } else {
  //     totalexclamt = grandtotal;
  //   }
  //   totaltaxableamt = subtotal;
  //   totaltaxamt = totgstamt;
  //   control.patchValue(sprod);
  //   this.registerForm.patchValue({
  //     totalitems: prodcount,
  //     totaldiscount: totdiscount.toFixed(this.truncatepos),
  //     totaltaxamt: totaltaxamt.toFixed(this.truncatepos),
  //     taxableamt: totaltaxableamt.toFixed(this.truncatepos),
  //     totalinclamt: totalincamt.toFixed(this.truncatepos),
  //     totalexclamt: totalexclamt.toFixed(this.truncatepos),
  //     grandtotal: grandtotal.toFixed(this.truncatepos),
  //     createdby: this.selobj.userid,
  //     locrefid: this.selobj.locrefid,
  //     locname: this.selobj.locname,
  //     totalamount: subtotal,
  //   });
  // }


  // calcGST() {
  //   const control = <FormArray>this.registerForm.controls['invoice'];
  //   var sprod = control.value;
  //   var preqty: number = 0;
  //   var preprodprice: number = 0;
  //   var prefree: number = 0;
  //   var premrp: number = 0;
  //   var predisc: number = 0;
  //   var prevat: number = 0;
  //   var presgst: number = 0;
  //   var precgst: number = 0;
  //   var preigst: number = 0;
  //   var pretotprice: number = 0;
  //   var pretotfreeprice: number = 0;
  //   var pretotmrp: number = 0;
  //   var discount: number = 0;
  //   var vatamt: number = 0;
  //   var sgstamt: number = 0;
  //   var cgstamt: number = 0;
  //   var igstamt: number = 0;
  //   var totdiscount: number = 0;
  //   var totvatamt: number = 0;
  //   var totsgstamt: number = 0;
  //   var totcgstamt: number = 0;
  //   var totigstamt: number = 0;
  //   var totutgstamt: number = 0;
  //   var totgstamt: number = 0;
  //   var totaltaxableamt: number = 0;
  //   var totaltaxamt: number = 0;
  //   var totalincamt: number = 0;
  //   var totalexclamt: number = 0;
  //   var grandtotal: number = 0;
  //   var totalproduct: number = 0;
  //   var totqty: number = 0;
  //   var subtotal: number = 0;
  //   var convfactor: number = 0;
  //   var gstflag: number = 0;
  //   var frgstflag: number = 0;
  //   var freeflag: number = 0;
  //   var prodcount: number = 0;
  //   var prodcount: number = 0;
  //   var precustdisc: number = 0;
  //   var inv;
  //   if (parseInt(this.registerForm.get('custdiscamt').value) > 0) {
  //     this.registerForm.get('discautoflag').setValue(1);
  //   } else {
  //     this.registerForm.get('discautoflag').setValue(0);
  //     this.registerForm.get('custdiscamt').setValue(0);
  //   }
  //   for (this.i = 0; this.i < sprod.length; this.i++) {
  //     if (parseInt(sprod[this.i].indvqty)) {
  //       preqty = parseFloat(sprod[this.i].indvqty);
  //     } else {
  //       preqty = 0;
  //     }
  //     if (parseFloat(sprod[this.i].unitprice)) {
  //       preprodprice = parseFloat(sprod[this.i].unitprice);
  //     } else {
  //       preprodprice = 0;
  //     }
  //     if (parseInt(sprod[this.i].freeflag)) {
  //       freeflag = parseInt(sprod[this.i].freeflag);
  //     } else {
  //       freeflag = 0;
  //     }
  //     pretotprice = preqty * preprodprice;
  //     if (freeflag == 1) {
  //       subtotal += pretotprice;
  //     }
  //   }
  //   precustdisc = (this.registerForm.get('custdiscamt').value / subtotal) * 100;
  //   subtotal = 0;
  //   pretotprice = 0;
  //   for (this.i = 0; this.i < sprod.length; this.i++) {
  //     if (sprod[this.i].calcflag != 1) {
  //       if (parseInt(sprod[this.i].indvqty)) {
  //         preqty = parseInt(sprod[this.i].indvqty);
  //       } else {
  //         preqty = 0;
  //       }
  //       if (parseInt(sprod[this.i].indvfreeqty)) {
  //         prefree = parseInt(sprod[this.i].indvfreeqty);
  //       } else {
  //         prefree = 0;
  //       }
  //       if (parseFloat(sprod[this.i].unitprice)) {
  //         preprodprice = parseFloat(sprod[this.i].unitprice);
  //       } else {
  //         preprodprice = 0;
  //       }
  //       if (parseInt(sprod[this.i].mrp)) {
  //         premrp = parseInt(sprod[this.i].mrp);
  //       } else {
  //         premrp = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitdiscount)) {
  //         predisc = parseInt(sprod[this.i].unitdiscount);
  //       } else {
  //         predisc = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitsgst)) {
  //         presgst = parseInt(sprod[this.i].unitsgst);
  //       } else {
  //         presgst = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitcgst)) {
  //         precgst = parseInt(sprod[this.i].unitcgst);
  //       } else {
  //         precgst = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitigst)) {
  //         preigst = parseInt(sprod[this.i].unitigst);
  //       } else {
  //         preigst = 0;
  //       }
  //       if (parseInt(sprod[this.i].gstflag)) {
  //         gstflag = parseInt(sprod[this.i].gstflag);
  //       } else {
  //         gstflag = 0;
  //       }
  //       if (parseInt(sprod[this.i].frgstflag)) {
  //         frgstflag = parseInt(sprod[this.i].frgstflag);
  //       } else {
  //         frgstflag = 0;
  //       }
  //       if (parseInt(sprod[this.i].freeflag)) {
  //         freeflag = parseInt(sprod[this.i].freeflag);
  //       } else {
  //         freeflag = 0;
  //       }
  //       if (parseInt(sprod[this.i].unitvat)) {
  //         prevat = parseInt(sprod[this.i].unitvat);
  //       } else {
  //         prevat = 0;
  //       }
  //       if (parseInt(sprod[this.i].convfactor)) {
  //         convfactor = parseInt(sprod[this.i].convfactor);
  //       } else {
  //         convfactor = 0;
  //       }
  //       if (freeflag == 0) {
  //         sprod[this.i].indvfreeqty = 0;
  //         discount = 0;
  //         prefree = 0;
  //       } else {
  //         prodcount += 1;
  //       }
  //       if (this.registerForm.get('discautoflag').value == 1) {
  //         sprod[this.i].unitdiscount = precustdisc;
  //         predisc = precustdisc;
  //       }
  //       sprod[this.i].subtotal = (preqty * preprodprice).toFixed(2);
  //       sprod[this.i].totalqty = convfactor * preqty;
  //       sprod[this.i].totalfreeqty = convfactor * prefree;
  //       pretotprice = preqty * preprodprice;
  //       discount = (pretotprice * predisc) / 100;
  //       if (gstflag == 1) {
  //         if (frgstflag == 1) {
  //           vatamt = ((pretotprice - discount) * prevat) / 100;
  //           sgstamt = ((pretotprice - discount) * presgst) / 100;
  //           cgstamt = ((pretotprice - discount) * precgst) / 100;
  //           igstamt = ((pretotprice - discount) * preigst) / 100;
  //         }
  //         else if (frgstflag == 2) {
  //           vatamt = (((preqty + prefree) * preprodprice - discount) * prevat) / 100;
  //           sgstamt = (((preqty + prefree) * preprodprice - discount) * presgst) / 100;
  //           cgstamt = (((preqty + prefree) * preprodprice - discount) * precgst) / 100;
  //           igstamt = (((preqty + prefree) * preprodprice - discount) * preigst) / 100;
  //         }
  //       }
  //       else if (gstflag == 2) {
  //         vatamt = (((preqty * preprodprice)) / (100 + prevat)) * (prevat);
  //         sgstamt = (preqty + prefree) * (premrp - (premrp / (1 + presgst / 100)));
  //         cgstamt = (preqty + prefree) * (premrp - (premrp / (1 + precgst / 100)));
  //         igstamt = (preqty + prefree) * (premrp - (premrp / (1 + preigst / 100)));
  //       }
  //       if (this.registerForm.get('disctaxflag').value == true) {
  //         discount = ((pretotprice - vatamt) * predisc) / 100;
  //       } else if (this.registerForm.get('disctaxflag').value == false) {
  //         discount = (pretotprice * predisc) / 100;
  //       }
  //       if (freeflag == 0 || freeflag == 1) {
  //         sprod[this.i].vatamt = vatamt;
  //         sprod[this.i].sgstamt = sgstamt;
  //         sprod[this.i].cgstamt = cgstamt;
  //         sprod[this.i].igstamt = igstamt;
  //         totvatamt += vatamt;
  //         totsgstamt += sgstamt;
  //         totcgstamt += cgstamt;
  //         totigstamt += igstamt;
  //       }
  //       if (freeflag == 1) {
  //         totalproduct = prodcount;
  //         totqty += preqty;
  //         subtotal += pretotprice;
  //         totdiscount += discount;
  //       }
  //     }
  //   }
  //   totgstamt = totsgstamt + totcgstamt + totigstamt + totvatamt;
  //   if (this.registerForm.get('disctaxflag').value == true) {
  //     grandtotal = subtotal - totgstamt - totdiscount;
  //   } else if (this.registerForm.get('disctaxflag').value == false && this.registerForm.get('gstflag').value == 2) {
  //     grandtotal = subtotal - totdiscount;
  //   } else if (this.registerForm.get('gstflag').value == 1) {
  //     grandtotal = subtotal + totgstamt - totdiscount;
  //   }
  //   if (gstflag == 0) {
  //     totalincamt = grandtotal;
  //   } else {
  //     totalexclamt = grandtotal;
  //   }
  //   totaltaxableamt = subtotal;
  //   totaltaxamt = totgstamt;
  //   control.patchValue(sprod);
  //   this.registerForm.patchValue({
  //     totalitems: totalproduct,
  //     totaldiscount: totdiscount.toFixed(2),
  //     totaltaxamt: totaltaxamt.toFixed(2),
  //     taxableamt: totaltaxableamt.toFixed(2),
  //     totalinclamt: totalincamt.toFixed(this.truncatepos),
  //     totalexclamt: totalexclamt.toFixed(this.truncatepos),
  //     grandtotal: grandtotal.toFixed(2),
  //     createdby: this.selobj.userid,
  //     locrefid: this.selobj.locrefid,
  //     locname: this.selobj.locname,
  //     totalamount: subtotal.toFixed(2),
  //   });
  // }




  calcGST() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var sprod = control.value;
    var preqty: number = 0;
    var preprodprice: number = 0;
    var prefree: number = 0;
    var premrp: number = 0;
    var predisc: number = 0;
    var presgst: number = 0;
    var precgst: number = 0;
    var preigst: number = 0;
    var pretotprice: number = 0;
    var pretotfreeprice: number = 0;
    var pretotmrp: number = 0;
    var discount: number = 0;
    var sgstamt: number = 0;
    var cgstamt: number = 0;
    var igstamt: number = 0;
    var totdiscount: number = 0;
    var totsgstamt: number = 0;
    var totcgstamt: number = 0;
    var totigstamt: number = 0;
    var totutgstamt: number = 0;
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
    var frgstflag: number = 0;
    var freeflag: number = 0;
    var prevat: number = 0;
    var totvatamt: number = 0;
    var vatamt: number = 0;
    var prodcount: number = 0;
    var inv;

    for (this.i = 0; this.i < sprod.length; this.i++) {
      if (sprod[this.i].calcflag != 1) {
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
          preprodprice = parseInt(sprod[this.i].unitprice);
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
        if (parseInt(sprod[this.i].unitvat)) {
          prevat = parseInt(sprod[this.i].unitvat);
        } else {
          prevat = 0;
        }
        if (parseInt(sprod[this.i].unitsgst)) {
          presgst = parseInt(sprod[this.i].unitsgst);
        } else {
          presgst = 0;
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
        if (parseInt(sprod[this.i].convfactor)) {
          convfactor = parseInt(sprod[this.i].convfactor);
        } else {
          convfactor = 0;
        }
        if (freeflag == 0) {
          sprod[this.i].indvfreeqty = 0;
          discount = 0;
          prefree = 0;
        } else {
          prodcount += 1;
        }
        sprod[this.i].subtotal = (preqty * preprodprice).toFixed(2);
        sprod[this.i].totalqty = convfactor * preqty;
        sprod[this.i].totalfreeqty = convfactor * prefree;
        pretotprice = preqty * preprodprice;
        discount = (pretotprice * predisc) / 100;
        if (gstflag == 1) {
          if (frgstflag == 1) {
            vatamt = ((pretotprice - discount) * prevat) / 100;
            sgstamt = ((pretotprice - discount) * presgst) / 100;
            cgstamt = ((pretotprice - discount) * precgst) / 100;
            igstamt = ((pretotprice - discount) * preigst) / 100;
          }
          else if (frgstflag == 2) {
            vatamt = (((preqty + prefree) * preprodprice - discount) * prevat) / 100;
            sgstamt = (((preqty + prefree) * preprodprice - discount) * presgst) / 100;
            cgstamt = (((preqty + prefree) * preprodprice - discount) * precgst) / 100;
            igstamt = (((preqty + prefree) * preprodprice - discount) * preigst) / 100;
          }
        }
        else if (gstflag == 2) {
          vatamt = (((preqty * preprodprice)) / (100 + prevat)) * (prevat);
          sgstamt = (preqty + prefree) * (premrp - (premrp / (1 + presgst / 100)));
          cgstamt = (preqty + prefree) * (premrp - (premrp / (1 + precgst / 100)));
          igstamt = (preqty + prefree) * (premrp - (premrp / (1 + preigst / 100)));
        }
        if (freeflag == 1 || freeflag == 0) {
          sprod[this.i].vatamt = vatamt;
          sprod[this.i].sgstamt = sgstamt;
          sprod[this.i].cgstamt = cgstamt;
          sprod[this.i].igstamt = igstamt;
          totvatamt += vatamt;
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


    totgstamt = totsgstamt + totcgstamt + totigstamt + totvatamt;
    if (this.registerForm.get('disctaxflag').value == true) {
      grandtotal = subtotal - totgstamt - totdiscount;
    } else if (this.registerForm.get('disctaxflag').value == false && this.registerForm.get('gstflag').value == 2) {
      grandtotal = subtotal - totdiscount;
    } else if (this.registerForm.get('gstflag').value == 1) {
      grandtotal = subtotal + totgstamt - totdiscount;
    }
    if (gstflag == 0) {
      totalincamt = grandtotal;
    } else {
      totalexclamt = grandtotal;
    }
    totaltaxableamt = subtotal;
    totaltaxamt = totgstamt;
    control.patchValue(sprod);
    this.registerForm.patchValue({
      totalitems: prodcount,
      totaldiscount: totdiscount.toFixed(this.truncatepos),
      totaltaxamt: totaltaxamt.toFixed(this.truncatepos),
      taxableamt: totaltaxableamt.toFixed(this.truncatepos),
      totalinclamt: totalincamt.toFixed(this.truncatepos),
      totalexclamt: totalexclamt.toFixed(this.truncatepos),
      grandtotal: grandtotal.toFixed(this.truncatepos),
      createdby: this.selobj.userid,
      locrefid: this.selobj.locrefid,
      locname: this.selobj.locname,
      totalamount: subtotal,
    });
  }








  viewEdit() {
    this.viewSISalesInvoice();
    this.viewSIProducts();
  }
  viewSISalesInvoice() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSISalesInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServSalesInvoice(data) },
      errorCode => console.log(errorCode));
  }
  viewSIProducts() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSIProducts(JSON.stringify(frmdata)).subscribe(data => { this.viewServSIProducts(data) },
      errorCode => console.log(errorCode));
  }
  viewServSalesInvoice(data: any) {
    var v = 0;
    this.registerForm.patchValue({
      id: data[0][v++],
      salesbilltype: data[0][v++],
      salesbillno: data[0][v++],
      billdate: data[0][v++],
      customerrefid: data[0][v++],
      doctorrefid: data[0][v++],
      totalamount: data[0][v++],
      totalitems: data[0][v++],
      totaldiscount: data[0][v++],
      taxableamt: data[0][v++],
      totaltaxamt: data[0][v++],
      totalinclamt: data[0][v++],
      totalexclamt: data[0][v++],
      grandtotal: data[0][v++],
      createdby: data[0][v++],
      locrefid: this.selobj.locrefid,
      locname: this.selobj.locname,
      prescpath: data[0][v++],
      paymenttype: data[0][v++],
      ptrefno: data[0][v++],
      customername: data[0][v++],
      clientcdate: data[0][v],
      clientcdate1: data[0][v++],
      date: data[0][v++],
      custinvoiceno: data[0][v++],
    });
  }
  viewServSIProducts(data: any) {
    const control = <FormArray>this.registerForm.controls['invoice'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init();
    var v = 0;
    for (this.i = 0; this.i < data.length; this.i++) {
      v = 1;
      control.insert(0, this.formBuilder.group({
        id: [data[this.i][v++], []],
        salesrefid: [data[this.i][v++], []],
        drugproductid: [data[this.i][v++], []],
        batchrefid: [data[this.i][v++], []],
        totalqty: [data[this.i][v++], []],
        totalfreeqty: [data[this.i][v++], []],
        unitprice: [data[this.i][v++], []],
        mrp: [data[this.i][v++], []],
        expirydate: [data[this.i][v++], []],
        unitdiscount: [data[this.i][v++], []],
        unitvat: [data[this.i][v++], []],
        unitsgst: [data[this.i][v++], []],
        unitcgst: [data[this.i][v++], []],
        unitigst: [data[this.i][v++], []],
        discountamt: [data[this.i][v++], []],
        vatamt: [data[this.i][v++], []],
        sgstamt: [data[this.i][v++], []],
        cgstamt: [data[this.i][v++], []],
        igstamt: [data[this.i][v++], []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        subtotal: [(data[this.i][v++]).toFixed(2), []],
        drgtyp: [data[this.i][v++], []],
        gstflag: [data[this.i][v++], []],
        frgstflag: [data[this.i][v++], []],
        freeflag: [data[this.i][v++], []],
        priceflag: [data[this.i][v++], []],
        discautoflag: [data[this.i][v++], []],
        indvqty: [data[this.i][v++], []],
        indvfreeqty: [data[this.i][v++], []],
        convfactor: [data[this.i][v++], []],
        crntstkqty: [data[this.i][v++], []],
        clientcdate: [data[this.i][v], []],
        clientcdate1: [data[this.i][v++], []],
        productname: [data[this.i][0], []],
        calcflag: [0, []],
        dbflag: [1, []],
        delflag: [false, []],
        batchname: [data[this.i][v++], []],
        stkmainrefid: [data[this.i][v++], []],
      }));
    }
  }
  init() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var data = [[], []];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        salesprdtid: [, []],
        salesrefid: [, []],
        drugproductid: [, []],
        batchrefid: [, []],
        totalqty: [, []],
        totalfreeqty: [, []],
        unitprice: [, []],
        mrp: [, []],
        expirydate: [, []],
        unitdiscount: [, []],
        unitvat: [, []],
        unitsgst: [, []],
        unitcgst: [, []],
        unitigst: [, []],
        discountamt: [, []],
        vatamt: [, []],
        sgstamt: [, []],
        cgstamt: [, []],
        igstamt: [, []],
        subtotal: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drgtyp: [, []],
        gstflag: [, []],
        frgstflag: [, []],
        freeflag: [, []],
        priceflag: [, []],
        discautoflag: [, []],
        convfactor: [, []],
        indvqty: [, []],
        indvfreeqty: [, []],
        crntstkqty: [, []],
        productname: [, []],
        calcflag: [1, []],
        delflag: [false, []],
        stkmainrefid: [, []],
      }));
    }
  }
  deleteSalesInvoice() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    var answer = confirm("Delete data?");
    if (answer) {
      this.userService.deleteSalesInvoice(JSON.stringify(frmdata)).subscribe(data => { this.deleteValid(data) },
        errorCode => console.log(errorCode));
    }
  }
  remove() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    const controlrem = <FormArray>this.registerForm.controls['dummy'];
    var valorg = control.value;
    for (this.i = 0; this.i < valorg.length; this.i++) {
      if (((parseInt(valorg[this.i].calcflag) != 1) && (valorg[this.i].delflag != true)) || (valorg[this.i].dbflag == 1)) {
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
    this.init();
  }
  validnew(): Number {
    var valflag = 0;
    const control = <FormArray>this.registerForm.controls['invoice'];
    var invoicedata = control.value;
    for (this.i = 0; this.i < invoicedata.length; this.i++) {
      if (parseInt(invoicedata[this.i].totalqty) > parseInt(invoicedata[this.i].crntstkqty)) {
        valflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Qty > Stkqty  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
    return valflag;
  }
  clear() {
    this.ngOnInit();
  }
}
