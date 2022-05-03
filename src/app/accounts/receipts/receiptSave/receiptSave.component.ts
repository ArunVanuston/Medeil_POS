import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { receiptSaveService } from './receiptSave.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-receiptSave',
  templateUrl: './receiptSave.component.html',
  providers: [receiptSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class receiptSaveComponent implements OnInit {
  registerForm: FormGroup;
  cashManageForm: FormGroup;
  i;
  autoincr;
  autoval = 0;
  autoinc = 0;
  autodata = [];
  selobj;
  acctypeflag = 0;
  accounts;
  invoicenodata = [];
  returnnodata = [];
  customerdata = [];
  employee = [];
  distributors = [];
  invoiceno: boolean=false;
  returnno: boolean=false;
  parentMessage = 'sales';
  saveprocess:boolean = false;
  total: any = 0;
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  receipt;
  itemlength = [{}, {}, {}, {}, {}];
  constructor(public translate: TranslateService,private userService: receiptSaveService,private router: Router, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
      typeflag: ['', []],
      paymenttype: ['', []],
      ptrefno: ['', []],
      debitaccountemp: ['', []],
      creditaccountemp: ['', []],
      date: [this.dateformat.transform05(Date.now()), []],
      invoicename: ['', []],
      personame: ['', []],
      invoicetype: ['', []],
      invoicenoref:['',[]],
      vendornoref: ['', []],
      customerid: ['', []],
      employeeid: ['', []],
      invoiceDetails:this.formBuilder.array([]),
      duepaytable:this.formBuilder.array([]),
      //    journal : this.formBuilder.array([
      //    ]),
    });
    this.cashManageForm = this.formBuilder.group({
      cashform:['Purchase Return',[]],
      cashtype:[1,[]],
      paytype:['Cash',[]],
      payamount:[0,[]],
      dueamount:[0,[]],
      suserrefid:[sessionStorage.getItem('indvuserid'),[]],
      companyid:[AppComponent.companyID,[]],
      branchid:[AppComponent.branchID,[]],
      locname:[AppComponent.locRefName1,[]],
      locrefid:[AppComponent.locrefID1,[]],
      distributorname:['',[]],
      loyaltyamount:[0,[]],
      giftamount:[0,[]]
    });
    this.registerForm.get('paymenttype').setValue('opt1');
    this.registerForm.get('typeflag').setValue(1);
    this.receiptmode(1);
    var frmdata = { frmint1: '', frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewAccountsAll(JSON.stringify(frmdata)).subscribe(data => { this.accounts = data },
      errorCode => console.log(errorCode));

      this.userService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.distributors = [];
        for (let i = 0; i < data.length; i++) {
          this.distributors.push({ value: data[i][0], label: data[i][1] });
        }
      });
      this.userService.getCustomer(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.customerdata = [];
        for (let i = 0; i < data.length; i++) {
          this.customerdata.push({ value: data[i][0], label: data[i][1] });
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
  selectinvoice(event:any){
     
    if(event==1){
      this.invoiceno=true;
      this.returnno=false;
    } 
    else if(event==2){
      this.returnno=true;
      this.invoiceno=false;
    }
  }
  getinvoiceno(searchValue: string) {
    
    var frmdata = { frmstr1: searchValue, companyid:this.selobj.companyid,branchrefid:this.selobj.branchrefid, locrefid: this.selobj.locrefid, locname: this.selobj.locname, frmint2: '', frmint1: '', createdby: '' };
      this.userService.viewSalesInvoiceNo(JSON.stringify(frmdata)).subscribe(data => { 
        this.invoicenodata = [];
        for (let i = 0; i < data.length; i++) {
          this.invoicenodata.push({ value: data[i][0], label: data[i][1] });
        }
       },
        errorCode => console.log(errorCode));
     
  }
  getreturnno(searchValue: string) {
    
    var frmdata = { frmstr1: searchValue,companyid:this.selobj.companyid,branchrefid:this.selobj.branchrefid, locrefid: this.selobj.locrefid, locname: this.selobj.locname,frmint2: '', frmint1: '', createdby: '' };
      this.userService.viewPurchaseReturnNo(JSON.stringify(frmdata)).subscribe(data => { 
        this.returnnodata = [];
        for (let i = 0; i < data.length; i++) {
          this.returnnodata.push({ value: data[i][0], label: data[i][1] });
        }
       },
        errorCode => console.log(errorCode));
     
  }
  // searchallcustomers(searchvalue: any) {
  //   let searchallcustomers = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, searchvalue };
  //   this.userService.searchallcustomers(JSON.stringify(searchallcustomers)).subscribe(data => { 
  //     this.customerdata = [];
  //     for (let i = 0; i < data.length; i++) {
  //       this.customerdata.push({ value: data[i][0], label: data[i][1] });
  //     }
  //    },
  //     errorCode => console.log(errorCode));
  // }
  getinvoicedetails(){
    let invoicebill=this.registerForm.get('invoicenoref').value; 
          var frmdata = { frmint1: invoicebill, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewSalesInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServInvoiceAmt(data) },
    errorCode => console.log(errorCode));
  }

  getcustomerinvdetails(){
    let vendorbill=this.registerForm.get('customerid').value;
    var frmdata = { frmint1: vendorbill, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCustomerSalesInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServInvoiceAmt(data) },
    errorCode => console.log(errorCode));
  }

  getcustomerpendinglists(){
    let vendorbill=this.registerForm.get('customerid').value;
    var frmdata = { frmint1: vendorbill, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.getPendingPayLists(JSON.stringify(frmdata)).subscribe(data => {
      console.log("saleslist:"+JSON.stringify(data));
     this.bindpendingpay(data) 
    },error => {
      //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
    });
  }

  duecheckedinvoice = [];
  bindpendingpay(data){
    var duereturntotal:number=0;
    const control = <FormArray>this.registerForm.controls['duepaytable'];
    let setData = control.value;
    control.controls=[];
    for (let i = 0; i < data.length; i++) {
      control.insert(0, this.formBuilder.group({
      id:[data[i][0],[]],
      creditaccount: [2, []],
      debitaccount: ['', []],
      debitamount: [, []],
      creditamount: [parseFloat(data[i][5]).toFixed(2), []],
      creditamountdummy: [parseFloat(data[i][5]).toFixed(2), []],
      draccname: ['', []],
      craccname: ['Debtors', []],
      invoiceno: [data[i][2], []],
      invoicename: [data[i][3], []],
      invoicebalamt: [0, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: ['', []],
      jrnltype: [5, []],
      jrnlname: ['Receipt', []],
      bulkflag: ['', []],
      personid: [this.registerForm.get('customerid').value, []],
      persontype: [1, []],
      invoicetype: [1, []],
      paymenttype: [this.registerForm.get('paymenttype').value, []],
      ptrefno: ['', []],
      createdby: [sessionStorage.getItem('indvuserid'), []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      calcflag: [0, []],
      checklist: [false, []]
      }));
      duereturntotal += parseFloat(data[i][5]);
    }
    this.total = duereturntotal.toFixed(2);
  }

  checkeddue(index){
    const getData = <FormArray>this.registerForm.controls['duepaytable'];
    let setData = getData.value;
    var duepayreturntotal=0;
    setData[index].checklist= !setData[index].checklist;
    getData.patchValue(setData);
    this.duecheckedinvoice = setData.filter((value, index) => {
      return value.checklist
    });
    //parseFloat(this.duecheckedinvoice.creditamount);
    for (let p = 0; p < this.duecheckedinvoice.length; p++) {
      duepayreturntotal += parseFloat(this.duecheckedinvoice[p].creditamount);
    } 
    this.total=duepayreturntotal.toFixed(2);
  }
  
  paycalculate(index){
    var duepayreturntotal=0;
    const getData = <FormArray>this.registerForm.controls['duepaytable'];
    let setData = getData.value;
    setData[index].invoicebalamt= parseFloat(setData[index].creditamountdummy)-parseFloat(setData[index].creditamount);
    getData.patchValue(setData);
    for (let p = 0; p < setData.length; p++) {
      duepayreturntotal += parseFloat(setData[p].creditamount);
    }
    this.total=duepayreturntotal.toFixed(2);
  }

  PayDue(){
    var duepayreturntotal=0;
    let refno=this.registerForm.get('ptrefno').value;
    let paytype=this.registerForm.get('paymenttype').value;
    const getData = <FormArray>this.registerForm.controls['duepaytable'];
    let setData = getData.value;
    if(refno == '' || refno == null || refno == undefined){
      this.notificationsComponent.addToast({ title: 'Error MSG', msg:'Enter Refefrence No', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
    }else if(paytype=='opt1' || paytype == '' || paytype == null || paytype == undefined){
      this.notificationsComponent.addToast({ title: 'Error MSG', msg:'Select Payment Type', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
    }else{
        this.duecheckedinvoice=[];
        // setData[p].ptrefno = this.SalesinvoiceForm.get('dueptrefno').value;
        // getData.patchValue(setData);
        this.duecheckedinvoice = setData.filter((value, index) => {
          return value.checklist
        });
        if(this.duecheckedinvoice.length>0){
          for (let p = 0; p < this.duecheckedinvoice.length; p++){
            this.duecheckedinvoice[p].ptrefno=refno;
            this.duecheckedinvoice[p].paymenttype=paytype;
          }
          this.userService.saveSalesReceipt(JSON.stringify(this.duecheckedinvoice)).subscribe(data => { 
            if(data==1){
              this.saveCashManage(1);
              this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              var frmdata = { frmint1: this.registerForm.get('customerid').value, frmdbl1:this.total, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
              setTimeout(() => {
                this.router.navigate(['/Receipt/ViewReceipt'])
              },1300);
              this.userService.UpdateCustBalance(JSON.stringify(frmdata)).subscribe(data => {
                if(data){
                  //this.notificationsComponent.addToast({ title: 'Success MSG', msg:'Balance Updated Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
                }
               },
              error => {
                //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
              });
              
            }
           },
          errorCode => console.log(errorCode));
        }else{
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      }
  }

  getreturndetails(){
    let returnbill=this.registerForm.get('invoicenoref').value;
    var frmdata = { frmint1: returnbill, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewPurchaseReturn(JSON.stringify(frmdata)).subscribe(data => { this.viewServInvoiceAmt(data) },
    errorCode => console.log(errorCode));
  }

  validation(){
    if(this.registerForm.get('paymenttype').value=='opt1' || this.registerForm.get('paymenttype').value== null || this.registerForm.get('paymenttype').value== undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Payment Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if(this.registerForm.get('typeflag').value== null || this.registerForm.get('typeflag').value== undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Invoice Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  checkedinvoice = [];
  onSubmit() {
    let validationresponse=this.validation();
    const getData = this.registerForm.controls['invoiceDetails'];
    let setData = getData.value;
    if (validationresponse) {
      for (let p = 0; p < setData.length; p++) {
        setData[p].ptrefno = this.registerForm.get('ptrefno').value;
        getData.patchValue(setData);
        if (setData[p].checklist) {
          if(this.receipt==5){
            setData[p].invoicebalamt=setData[p].creditamount;
          }
          if(this.registerForm.get('typeflag').value==2){
            setData[p].invoicebalamt=0;
          }
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
      this.saveprocess = true;
      this.userService.saveReceipt(JSON.stringify(this.checkedinvoice)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }
  }

  savevalid(data: any) {
    if (data == 1) {
      if(this.registerForm.get('typeflag').value==2){
        this.saveCashManage(2);
      }
      this.saveprocess = false;
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['/Receipt/ViewReceipt'])
      }, 500);
    } else {
      this.saveprocess = false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  saveCashManage(index){
    var cashtotal: number = 0;
    let paytype=this.registerForm.get('paymenttype').value;
    if(paytype==1||paytype=='opt1'){
      this.cashManageForm.get('paytype').setValue('Cash');
    }else if(paytype==2){
      this.cashManageForm.get('paytype').setValue('Card');
    }else if(paytype==3){
      this.cashManageForm.get('paytype').setValue('Cheque');
    }
    const getData=this.registerForm.controls['invoiceDetails'];
    let cashvalue=getData.value;
    if(index==1){
      for(let i=0;i< this.duecheckedinvoice.length;i++){
        cashtotal+=parseFloat(this.duecheckedinvoice[i].creditamount);
      }
      this.cashManageForm.get('cashform').setValue('Credit Sales Pay'); 
      this.cashManageForm.get('distributorname').setValue(this.duecheckedinvoice[0].personame);
    }else{
      for(let i=0;i<cashvalue.length;i++){
        cashtotal+=parseFloat(cashvalue[i].debitamount);
      }
      this.cashManageForm.get('cashform').setValue('Purchase Return');
      this.cashManageForm.get('distributorname').setValue(cashvalue[0].draccname);
    }
    this.cashManageForm.get('payamount').setValue(cashtotal.toFixed(2));
    
    this.userService.saveCashManage(JSON.stringify(this.cashManageForm.value)).subscribe(data => {},
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

  otherreceiptdetails() {
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
  viewServInvoiceAmt(data: any) {
    if (data !== undefined || data !== null) {
      let flag: number = 0;
      
      const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
      getData.controls = [];
      for (this.i = 0; this.i < data.length; this.i++) {
        if (this.registerForm.get('typeflag').value == 1){
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            1,//invoicetype
            1, //persontype
            '0', 'Debtors',0,2
          ));
        }
       else if (this.registerForm.get('typeflag').value == 2){
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            4,//invoicetype
            2, //persontype
            '0', 'Creditors',0,4
          ));
        }
        
        
      }
     
    }
  }
  showBrandlist(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) {
    return this.formBuilder.group({
      invoiceno: [a1, []],
      invoicename:[a2,[]],
      debitamount: [(0).toFixed(), []],
      creditamount: [a3.toFixed(), []],
      invoicebalamt: [a3.toFixed(), []],
      personame: [a4,[]],
      invoicetype: [a6,[]],
      persontype: [a7,[]],
      personid: [a5, []],
      draccname:[a8,[]],
      craccname:[a9,[]],
      debitaccount:[a10,[]],
      creditaccount:[a11,[]],
      jrnltype:[5,[]],
      jrnlname:['Receipt',[]],
      calcflag: [0,[]],
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
 

  // viewDebitAcc() {
  //   this.registerForm.get('draccname').setValue(this.accounts[this.registerForm.get('debitaccountemp').value][1]);
  //   this.registerForm.get('debitaccount').setValue(this.accounts[this.registerForm.get('debitaccountemp').value][0]);
  // }
  // viewCreditAcc() {
  //   this.registerForm.get('craccname').setValue(this.accounts[this.registerForm.get('creditaccountemp').value][1]);
  //   this.registerForm.get('creditaccount').setValue(this.accounts[this.registerForm.get('creditaccountemp').value][0]);
  // }

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

  receiptmode(event) {
    const getData = <FormArray>this.registerForm.controls['invoiceDetails'];
    getData.controls = [];
    this.receipt = event;
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
      if (setData[p].checklist) {
        subtotal = subtotal + parseFloat(setData[p].creditamount);
        this.total = subtotal.toFixed(this.fixedlength);
      }
    }
  }
}
