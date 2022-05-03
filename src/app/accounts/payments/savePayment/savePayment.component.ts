import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { savePaymentService } from './savePayment.service';
import { DxDataGridComponent } from "devextreme-angular";
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-patientedit',
  templateUrl: './savePayment.component.html',
  providers: [savePaymentService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class savePaymentComponent implements OnInit {
  registerForm: FormGroup;
  cashManageForm: FormGroup;
  i;
  autoincr;
  autoval = 0;
  autoinc = 0;

  selobj;
  acctypeflag = 0;
  accounts;
  distributors = [];
  invoicenodata = [];
  returnnodata = [];
  invoiceno: boolean = false;
  returnno: boolean = false;
  parentMessage = 'sales';
  saveprocess: boolean = false;
  paymentmode;
  customers = [];
  employee = [];
  itemlength = [{}, {}, {}, {}, {}];
  total: any = 0;
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  constructor(public translate: TranslateService,private userService: savePaymentService, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder, config: NgbDropdownConfig, private router: Router) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };

    this.registerForm = this.formBuilder.group({
      typeflag: [1, []],
      paymenttype: ['opt1', []],
      ptrefno: ['', []],
      invoicenoref: ['', []],
      debitaccountemp: ['', []],
      creditaccountemp: ['', []],
      invoicename: ['', []],
      personame: ['', []],
      invoicetype: ['', []],
      vendornoref: ['', []],
      customerid: ['', []],
      employeeid: ['', []],
      date: [this.dateformat.transform05(Date.now()), []],
      invoiceDetails: this.formBuilder.array([])
    });

    this.cashManageForm = this.formBuilder.group({
      cashform: ['Purchase Invoice', []],
      cashtype: [2, []],
      paytype: ['Cash', []],
      payamount: [0, []],
      dueamount: [0, []],
      suserrefid: [sessionStorage.getItem('indvuserid'), []],
      companyid: [AppComponent.companyID, []],
      branchid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      distributorname: ['', []],
      loyaltyamount: [0, []],
      giftamount: [0, []]
    });

    var frmdata = { frmint1: '', frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewAccountsAll(JSON.stringify(frmdata)).subscribe(data => { this.accounts = data },
      errorCode => console.log(errorCode));
    this.paymode(1);
    this.userService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.distributors = [];
      for (let i = 0; i < data.length; i++) {
        this.distributors.push({ value: data[i][0], label: data[i][1] });
      }
    });
    this.userService.getCustomer(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.customers = [];
      for (let i = 0; i < data.length; i++) {
        this.customers.push({ value: data[i][0], label: data[i][1] });
      }
    });
    this.userService.getEmployee(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.employee = [];
      for (let i = 0; i < data.length; i++) {
        this.employee.push({ value: data[i][0], label: data[i][1] });
      }
    });

    this.userService.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      if (data[0][1] == 1) {
        this.fixedlength = 3;
      } else { this.fixedlength = 2 }

      if (data[0][2] == 1) {
        this.aboveflag = 1;
      } else { this.aboveflag = 0 }

      if (data[0][3] == 1) {
        this.belowflag = 1;
      } else { this.belowflag = 0 }
      this.total = (0).toFixed(this.fixedlength);
    });
  }

  validation() {
    if (this.registerForm.get('paymenttype').value == 'opt1' || this.registerForm.get('paymenttype').value == null || this.registerForm.get('paymenttype').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Payment Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.registerForm.get('typeflag').value == null || this.registerForm.get('typeflag').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Invoice Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.registerForm.get('ptrefno').value == null || this.registerForm.get('ptrefno').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Reference No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // if(this.registerForm.get('invoicenoref').value== null || this.registerForm.get('invoicenoref').value== undefined){
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Invoice No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    return true;
  }
  checkedinvoice = [];
  onSubmit() {
    let validationresponse = this.validation();
    const getData = this.registerForm.controls['invoiceDetails'];
    let setData = getData.value;
    if (validationresponse) {
      for (let p = 0; p < setData.length; p++) {
        setData[p].ptrefno = this.registerForm.get('ptrefno').value;
       
        if (setData[p].checklist) {
          if(this.registerForm.get('typeflag').value == 1 ||  this.registerForm.get('typeflag').value == 2){
            setData[p].invoicebalamt = parseFloat(setData[p].invoicebalamt) - parseFloat(setData[p].debitamount);
          }else {
            setData[p].invoicebalamt = 0;
          }
          getData.patchValue(setData);
          this.checkedinvoice.push({
            invoiceno: setData[p].invoiceno,
            invoicename: setData[p].invoicename,
            debitamount: setData[p].debitamount,
            creditamount: setData[p].creditamount,
            invoicebalamt: setData[p].invoicebalamt,
            personame: setData[p].personame,
            invoicetype: setData[p].invoicetype,
            persontype: setData[p].persontype,
            personid: setData[p].personid,
            draccname: setData[p].draccname,
            craccname: setData[p].craccname,
            debitaccount: setData[p].debitaccount,
            creditaccount: setData[p].creditaccount,
            jrnltype: setData[p].jrnltype,
            jrnlname: setData[p].jrnlname,
            calcflag: setData[p].calcflag,
            clientcdate: setData[p].clientcdate,
            clientcdate1: setData[p].clientcdate1,
            createdby: setData[p].createdby,
            locrefid: setData[p].locrefid,
            locname: setData[p].locname,
            countryrefid: setData[p].countryrefid,
            companyrefid: setData[p].companyrefid,
            branchrefid: setData[p].branchrefid,
            date: setData[p].date,
            ptrefno: setData[p].ptrefno
          })
        }
      }
  
      if(this.checkedinvoice.length>0){
        this.saveprocess = true;
        this.userService.savePayment(JSON.stringify(this.checkedinvoice)).subscribe(data => { this.savevalid(data) },
          errorCode => console.log(errorCode));
      }else{
        this.notificationsComponent.addToast({ title: 'Success', msg: 'Select Payments', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
  }

  savevalid(data: any) {
    if (data == 1) {
      this.saveCashManage();
      this.saveprocess = false;
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['/Payment/ViewPayment'])
      }, 1500);
      //this.ngOnInit();
    } else {
      this.saveprocess = false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  saveCashManage() {
    var cashtotal: number = 0;
    let paytype = this.registerForm.get('paymenttype').value;
    let payform = this.registerForm.get('typeflag').value;
    if (paytype == 'cash' || paytype == 'opt1') {
      this.cashManageForm.get('paytype').setValue('Cash');
    } else if (paytype == 'card') {
      this.cashManageForm.get('paytype').setValue('Card');
    } else if (paytype == 'cheque') {
      this.cashManageForm.get('paytype').setValue('Cheque');
    } else if (paytype == 'onlinepay') {
      this.cashManageForm.get('paytype').setValue('onlinepay');
    }
    else if (paytype == 'upi') {
      this.cashManageForm.get('paytype').setValue('upi');
    }
    if (payform == 1) {
      this.cashManageForm.get('cashform').setValue('Purchase Invoice');
    } else if (payform == 2) {
      this.cashManageForm.get('cashform').setValue('Sales Return');
    }
    const getData = this.registerForm.controls['invoiceDetails'];
    let cashvalue = getData.value;
    for (let i = 0; i < cashvalue.length; i++) {
      cashtotal += parseFloat(cashvalue[i].debitamount);
    }
    this.cashManageForm.get('payamount').setValue(cashtotal.toFixed(2));
    this.cashManageForm.get('distributorname').setValue(cashvalue[0].personame);
    this.userService.saveCashManage(JSON.stringify(this.cashManageForm.value)).subscribe(data => { },
      errorCode => console.log(errorCode));
  }

  selectinvoice(event: any) {

    if (event == 1) {
      this.invoiceno = true;
      this.returnno = false;
    }
    else if (event == 2) {
      this.returnno = true;
      this.invoiceno = false;
    }
  }
  getinvoiceno(searchValue: string) {
    var frmdata = { frmstr1: searchValue, companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locrefid: this.selobj.locrefid, locname: this.selobj.locname, frmint2: '', frmint1: '', createdby: '' };
    this.userService.viewPurchaseInvoiceNo(JSON.stringify(frmdata)).subscribe(data => {
      this.invoicenodata = [];
      for (let i = 0; i < data.length; i++) {
        this.invoicenodata.push({ value: data[i][0], label: data[i][1] });
      }
    },
      errorCode => console.log(errorCode));

  }

  getreturnno(searchValue: string) {

    var frmdata = { frmstr1: searchValue, companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locrefid: this.selobj.locrefid, locname: this.selobj.locname, frmint2: '', frmint1: '', createdby: '' };
    this.userService.viewSalesReturnNo(JSON.stringify(frmdata)).subscribe(data => {
      this.returnnodata = [];
      for (let i = 0; i < data.length; i++) {
        this.returnnodata.push({ value: data[i][0], label: data[i][1] });
      }
    },
      errorCode => console.log(errorCode));

  }
  getinvoicedetails() {
    let invoicebill = this.registerForm.get('invoicenoref').value;
    var frmdata = { frmint1: invoicebill, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewPurchaseInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServInvoiceAmt(data) },
      errorCode => console.log(errorCode));
  }
  getvendorinvdetails() {
    this.registerForm.get('typeflag').setValue(1);
    let vendorbill = this.registerForm.get('vendornoref').value;
    var frmdata = { frmint1: vendorbill, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewVendorPurchaseInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServInvoiceAmt(data) },
      errorCode => console.log(errorCode));
  }
  getcustomerretdetails() {
    this.registerForm.get('typeflag').setValue(2);
    let customerbill = this.registerForm.get('customerid').value;
    var frmdata = { frmint1: customerbill, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCustomersalesreturn(JSON.stringify(frmdata)).subscribe(data => { this.viewServInvoiceAmt(data) },
      errorCode => console.log(errorCode));
  }
  getreturndetails() {
    let returnbill = this.registerForm.get('invoicenoref').value;
    var frmdata = { frmint1: returnbill, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewSalesReturn(JSON.stringify(frmdata)).subscribe(data => { this.viewServInvoiceAmt(data) },
      errorCode => console.log(errorCode));
  }
  empname;
  getEmployeedetails() {
    this.registerForm.get('typeflag').setValue(3);
    let emp = this.registerForm.get('employeeid').value;
    let subindx = this.employee.findIndex(p => p.value == emp);
    this.empname = this.employee[subindx].label;
    this.empdetails();

  }
  empdetails() {
    const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
    getData.controls = [];
    if (this.registerForm.get('typeflag').value == 3) {
      getData.push(this.showBrandlist(
        0,
        "NA",
        0,
        this.empname,
        this.registerForm.get('employeeid').value,
        0,//invoicetype
        3, //persontype
        '', 'NA', 0, 0
      ));
    }
  }

  otherpaymentdetails() {
    this.registerForm.get('typeflag').setValue(3);
    const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
    getData.controls = [];
    getData.push(this.showBrandlist(
      0,
      "NA",
      0,
      this.registerForm.get('personame').value,
      0,
      0,//invoicetype
      4, //persontype
      '', 'NA', 0, 0
    ));

  }
  x;
  predebit: any = 0;
  viewServInvoiceAmt(data: any) {
    if (data !== undefined || data !== null) {
      const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
      getData.controls = [];
      for (this.i = 0; this.i < data.length; this.i++) {
        this.predebit = data[this.i][6];
        if (this.registerForm.get('typeflag').value == 1) {
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            3,//invoicetype
            2, //persontype
            'Creditors', '0', 4, 0
          ));
        }
        else if (this.registerForm.get('typeflag').value == 2) {
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            2,//invoicetype
            1, //persontype
            'Debtors', '0', 2, 0
          ));
        }
      }
    }
  }
  showBrandlist(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
    return this.formBuilder.group({
      invoiceno: [a1, []],
      invoicename: [a2, []],
      debitamount: [a3.toFixed(this.fixedlength), []],
      creditamount: [(0).toFixed(this.fixedlength), []],
      invoicebalamt: [a3.toFixed(this.fixedlength), []],
      personame: [a4, []],
      invoicetype: [a6, []],
      persontype: [a7, []],
      personid: [a5, []],
      draccname: [a8, []],
      craccname: [a9, []],
      debitaccount: [a10, []],
      creditaccount: [a11, []],
      jrnltype: [4, []],
      jrnlname: ['Payment', []],
      calcflag: [0, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      date: [this.dateformat.transform05(Date.now()), []],
      creditaccountemp: ['', []],
      debitaccountemp: ['', []],
      checklist: [false, []],
      ptrefno: ['', []]
    });
  }

  viewDebitAcc() {
    const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
    let setData = getData.value;
    for (let p = 0; p < setData.length; p++) {
      setData[p].draccname = this.accounts[setData[p].debitaccountemp][1];
      setData[p].debitaccount = this.accounts[setData[p].debitaccountemp][0];
      getData.patchValue(setData);
    }
  }
  viewCreditAcc() {
    const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
    let setData = getData.value;
    for (let p = 0; p < setData.length; p++) {
      setData[p].craccname = this.accounts[setData[p].creditaccountemp][1];
      setData[p].creditaccount = this.accounts[setData[p].creditaccountemp][0];
      getData.patchValue(setData);
    }
  }

  paymode(event) {
    const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
    getData.controls = [];
    this.paymentmode = event;
    this.invoiceno = true;
  }

  selectallprod(event) {
    const getData = <FormArray>this.registerForm.controls['invoiceDetails']
    if (event.target.checked) {
      for (let i = 0; i <= getData.length; i++) {
        getData.value[i].checklist = true;
        this.proselect = 1;
        getData.patchValue(getData.value);
        this.getSum();
      }
    } else {
      for (let i = 0; i <= getData.length; i++) {
        getData.value[i].checklist = false;
        this.proselect = 0;
        getData.patchValue(getData.value);
        this.getSum();
      }
    }
  }
  proselect: any = 0;
  selecprod(event, index) {
    const getData = <FormArray>this.registerForm.controls['invoiceDetails']
    if (event.target.checked) {
      getData.value[index].checklist = true;
      this.proselect = 1;
      getData.patchValue(getData.value);
      this.getSum();
    } else {
      getData.value[index].checklist = false;
      this.proselect = 0;
      getData.patchValue(getData.value);
      this.getSum();
    }
  }

  getSum() {
    let subtotal = 0;
    const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
    let setData = getData.value;
    for (let p = 0; p < setData.length; p++) {
      this.predebit += parseFloat(setData[p].debitamount);
      subtotal = subtotal + parseFloat(setData[p].debitamount);
      //setData[p].invoicebalamt=parseFloat(setData[p].invoicebalamt)-parseFloat(setData[p].debitamount);
      this.total = subtotal.toFixed(this.fixedlength);
      getData.patchValue(setData);
    }
  }
}
