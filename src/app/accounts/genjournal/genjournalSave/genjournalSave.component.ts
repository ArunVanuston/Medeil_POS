import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { genjournalSaveService } from './genjournalSave.service';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-genjournalSave',
  templateUrl: './genjournalSave.component.html',
  providers: [genjournalSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})

export class genjournalSaveComponent implements OnInit {
  registerForm: FormGroup;
  i;
  autoincr;
  autoval = 0;
  autoinc = 0;
  autodata = [];
  selobj;
  acctypeflag = 0;
  accounts;
  customers = [];
  employee = [];
  distributors = [];
  itemlength = [{}, {}, {}, {}, {}];
  debittotal: any = 0;
  credittotal: any = 0;
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  jrnlmodel: any = 1;
  
  constructor(public translate: TranslateService,private router: Router,private userService: genjournalSaveService, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }
test(event){
  this.jrnlmodel = event;
  if( this.jrnlmodel == 0){
    this.registerForm.get('adjbalflag').setValue(false);
    this.journaldetails()
  }else{
    this.registerForm.get('adjbalflag').setValue(true);
  }
}
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
     
      paymenttype: ['', []],
      ptrefno: ['', []],
      journalno: ['', []],
      debitaccountemp: ['', []],
      creditaccountemp: ['', []],
      invoicename: ['', []],
      personame: ['', []],
      invoicetype: ['', []],
      adjbalflag: [true, []],
      journalperson: ['', []],
      date: [this.dateformat.transform05(Date.now()), []],
      journalDetails: this.formBuilder.array([])
    });
    var frmdata = { frmint1: '', frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewAccountsAll(JSON.stringify(frmdata)).subscribe(data => { this.accounts = data },
      errorCode => console.log(errorCode));
    $(document).ready(function () {
      $(".autolistall1").hide();
    });
    this.genmode(1);
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
      this.debittotal = (0).toFixed(this.fixedlength);
      this.credittotal = (0).toFixed(this.fixedlength);
    });
  }

  onSubmit() {
    const getData = <FormArray>this.registerForm.controls['journalDetails'];
    let setData = getData.value;
    for (let p = 0; p < setData.length; p++) {
      setData[p].ptrefno = this.registerForm.get('ptrefno').value;
      getData.patchValue(setData);
    }
      this.userService.saveGenJournal(JSON.stringify(setData)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
  }

  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
     // this.ngOnInit();
     setTimeout(() => {
      this.router.navigate(['/GeneralJournal/ViewGeneralJournal'])
    }, 500);
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  
  viewDebitAcc() {
    const getData = <FormArray>this.registerForm.controls['journalDetails'];
    let setData = getData.value;
    for (let p = 0; p < setData.length; p++) {
      setData[p].draccname = this.accounts[setData[p].debitaccountemp][1];
      setData[p].debitaccount = this.accounts[setData[p].debitaccountemp][0];
      getData.patchValue(setData);
    }
  }
  viewCreditAcc() {
    const getData = <FormArray>this.registerForm.controls['journalDetails'];
    let setData = getData.value;
    for (let p = 0; p < setData.length; p++) {
      setData[p].craccname = this.accounts[setData[p].creditaccountemp][1];
      setData[p].creditaccount = this.accounts[setData[p].creditaccountemp][0];
      getData.patchValue(setData);
    }
  }
  
  journalmode: any = 1;
  genmode(event) {
    const getData = <FormArray>this.registerForm.controls['journalDetails'];
    getData.controls = [];
    this.journalmode = event;
  }

  journaldetails() {
    if(this.registerForm.get('personame').value!=='' || this.jrnlmodel == 0){
      if( this.jrnlmodel == 0){
        const getData = <FormArray>this.registerForm.controls['journalDetails'];
        getData.controls = [];
      }
      const getData = <FormArray>this.registerForm.controls['journalDetails'];
      
       getData.push(
         this.formBuilder.group({
          invoiceno: ['', []],
         invoicename: ['', []],
         debitamount: [(0).toFixed(this.fixedlength), []],
         creditamount: [(0).toFixed(this.fixedlength), []],
         invoicebalamt: [(0).toFixed(this.fixedlength), []],
         personame: [this.registerForm.get('personame').value, []],
         journalperson: [this.jrnlname, []],
         invoicetype: ['', []],
         persontype: ['', []],
         personid: ['', []],
         draccname: ['', []],
         craccname: ['', []],
         debitaccount: ['', []],
         creditaccount: ['', []],
         jrnltype: [1, []],
         jrnlname: ['Journal', []],
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
         ptrefno: ['', []],
         adjbalflag:[this.registerForm.get('adjbalflag').value,[]]
         })
       );
       this.getSum();
    }
   
  }



  jrnlname;
  journalpersonfn(){
    let jrnlpersonid=this.registerForm.get('journalperson').value;
    if(this.journalmode == 1){
      let subindx= this.distributors.findIndex(p => p.value==jrnlpersonid);
      this.jrnlname = this.distributors[subindx].label
    }
    if(this.journalmode == 2){
      let subindx= this.customers.findIndex(p => p.value==jrnlpersonid);
      this.jrnlname = this.customers[subindx].label
    }
    if(this.journalmode == 3){
      let subindx= this.employee.findIndex(p => p.value==jrnlpersonid);
      this.jrnlname = this.employee[subindx].label
    }
 
  }

  removerow(i: any){
    const getData = <FormArray>this.registerForm.controls['journalDetails'];
    getData.removeAt(i);
    this.getSum();
  }

  getSum() {
    let subtotal = 0;
    let subtotal2 = 0;
    const getData = <FormArray>this.registerForm.controls['journalDetails'];
    let setData = getData.value;
    for (let p = 0; p < setData.length; p++) {
        subtotal = subtotal + parseFloat(setData[p].debitamount);
        subtotal2 = subtotal2 + parseFloat(setData[p].creditamount);
        this.debittotal = subtotal.toFixed(this.fixedlength);
        this.credittotal = subtotal2.toFixed(this.fixedlength);
    }
  }
}