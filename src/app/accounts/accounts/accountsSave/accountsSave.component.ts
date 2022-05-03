import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { accountsSaveService } from './accountsSave.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-accountsSave',
  templateUrl: './accountsSave.component.html',
  providers: [accountsSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class accountsSaveComponent implements OnInit {
  registerForm: FormGroup;
  parentMessage = "sales";
  acctype = [];
  netprofit = 0;
  i;
  inc = 1;
  selobj;
  gifFail: boolean=true;
  saveprocess:boolean=false;
  fixedlength:any;
  aboveflag:any;
  belowflag:any;
  
  constructor(public translate: TranslateService,private userService: accountsSaveService, private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
      accountno: ['', []],
      accountname: ['', []],
      accounttype: ['opt1', []],
      accbalance: [0, []],
      accdescription:[],
      date: [this.dateformat.transform05(Date.now()), []],
      accounts: this.formBuilder.array([
      ]),
      balance: this.formBuilder.array([
      ]),
    });
    $(document).ready(function () {
    });
    var frmdata = { frmint1: '', frmstr1: '', frmstr2: this.registerForm.get('date').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewAccountType(JSON.stringify(frmdata)).subscribe(data => { this.acctype = data },
      errorCode => console.log(errorCode));
    // this.userService.viewBalanceSheet(JSON.stringify(frmdata)).subscribe(data => { this.viewServBalanceSheet(data) },
    //   errorCode => console.log(errorCode));
    this.userService.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>{ 
      if(data[0][1]==1){
        this.fixedlength=3;
      }else{this.fixedlength=2}

      if(data[0][2]==1){
        this.aboveflag=1;
      }else{this.aboveflag=0}

      if(data[0][3]==1){
        this.belowflag=1;
      }else{ this.belowflag=0}
      this.userService.Newbalanceshet(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.registerForm.get('date').value).subscribe(data => {
        this.viewServBalanceSheet(data);
        this.gifFail = false;
      },
        err => { console.log(err) });
    });
  }

  selacctypename:any;
  setBalflag() {
    //  var id = this.registerForm.get('accounttype').value;
    //this.registerForm.get('accounttype').setValue(this.acctype[id][1]);
    let actypeid = this.registerForm.get('accounttype').value;
    let subindx= this.acctype.findIndex(p => p[0]==actypeid);
    // this.registerForm.get('balcalcflag').setValue(this.acctype[subindx][1]);
    // this.registerForm.get('accbalflag').setValue(this.acctype[subindx][3]);
    this.selacctypename=this.acctype[subindx][2];
  }

  accountenable: any = 0;
  addaccount(){
      this.accountenable = 1;
  }

  accountlists = [];
  onSubmit() {
    // let validationresponse = this.validation();
    // if (validationresponse == true) {
      this.accountlists = [];
      const control = <FormArray>this.registerForm.controls['accounts'];
      let setData = control.value;
      for (let p = 0; p < setData.length; p++) {
        this.accountlists.push({
          accountid: setData[p].accid,
          accountno: setData[p].accountno,
          accountname: setData[p].accname,
          accounttype: setData[p].accounttypeno,
          accbalance: setData[p].openingbal,
          //balcalcflag: setData[p].balcalcflag,  /* doubt on this process*/
          accbalflag: setData[p].accbalflag,
          accounttypeno: setData[p].accounttypeno,
          createdby: this.selobj.userid,
          locrefid: this.selobj.locrefid,
          locname: this.selobj.locname,
          countryrefid: this.selobj.countryrefid,
          companyrefid: this.selobj.companyid,
          branchrefid: this.selobj.branchrefid,
          clientcdate: this.dateformat.transform04(),
          clientcdate1: this.dateformat.transform04(),
          date: this.dateformat.transform05(Date.now()),
          id: setData[p].accautoid,
          status:setData[p].status
        })
      }
      var valflag = 0;
      
      if ( valflag == 0) {
        this.saveprocess=true;
        this.userService.saveAccount(JSON.stringify(this.accountlists)).subscribe(data => { this.savevalid(data) },
          errorCode => console.log(errorCode));
      }
  }

  validation() {
    if (this.registerForm.get('accountno').value == null || this.registerForm.get('accountno').value == "" || this.registerForm.get('accountno').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'AccountNo is Required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    else if (this.registerForm.get('accounttype').value == 'opt1' || this.registerForm.get('accounttype').value == null || this.registerForm.get('accounttype').value == "" || this.registerForm.get('accountno').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'AccountType is Required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    else if (this.registerForm.get('accountname').value == null || this.registerForm.get('accountname').value == "" || this.registerForm.get('accountname').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'AccountName is Required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  savevalid(data: any) {
    if (data == 1) {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.ngOnInit();
    } else {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  saveClosetempAccounts() {
        this.saveprocess=true;
      const ctrlbal = <FormArray>this.registerForm.controls['balance'];
      this.userService.saveAccBalance(JSON.stringify(ctrlbal.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
  }

  saveTempAccTrnsfer() {
    var frmdata = { frmint1: '', frmdbl1: this.netprofit, frmstr2: this.registerForm.get('date').value, frmstr3: this.registerForm.get('nexto').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.saveTempAccTrnsfer(JSON.stringify(frmdata)).subscribe(data => { this.savevalid(data) },
      errorCode => console.log(errorCode));
  }

  accountcheck(){
    const control = <FormArray>this.registerForm.controls['accounts'];
    let setData = control.value;
    for(let p = 0;p<setData.length;p++){
      if(setData[p].accname == this.registerForm.get('accountname').value){
        this.notificationsComponent.addToast({ title: 'Warning', msg: this.registerForm.get('accountname').value+' Already Exists', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        this.registerForm.get('accountname').setValue('');
      }
    }
  }

  pushaccounttable() {
    const control = <FormArray>this.registerForm.controls['accounts'];
    if(this.registerForm.get('accountname').value != '' && this.registerForm.get('accbalance').value != null && this.registerForm.get('accounttype').value != 'opt1'){
      control.push(this.pushtable(
        this.registerForm.get('accountno').value,
        this.registerForm.get('accounttype').value,
        this.registerForm.get('accountname').value,
        this.registerForm.get('accbalance').value,
        this.registerForm.get('accdescription').value,
        this.selacctypename,))
    }else{
      this.notificationsComponent.addToast({ title: 'Warning', msg: 'AccountName,AccountBalance and AccountType Not Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
  }
  
  pushtable(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any) {
    return this.formBuilder.group({
      accountno: a1,
      accounttypeno: a2,
      accname: a3,
      openingbal:a4,
      accbalance:'',
      closingbal:'',
      status:1,
      accdescription:a5,
      acctypename: a6,
    })
  }
  viewServBalanceSheet(data: any) {
    const control = <FormArray>this.registerForm.controls['accounts'];
    const ctrlbal = <FormArray>this.registerForm.controls['balance'];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        accid: [data[this.i][0], []],
        acctypename: [data[this.i][1], []],
        accname: [data[this.i][2], []],
        closingbal: [Math.abs(parseFloat(data[this.i][4]) - parseFloat(data[this.i][3])).toFixed(this.fixedlength), []],
        accbalflag: [data[this.i][5], []],
        openingbal: [parseFloat(data[this.i][6]).toFixed(this.fixedlength), []],
        accountno: [data[this.i][7], []],
        accounttypeno: [data[this.i][8], []],
        balcalcflag: [data[this.i][9], []],
        accautoid:[data[this.i][10], []],
        from: ['', []],
        todate: [this.dateformat.transform05(Date.now()), []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        status:['',[]]
      }));
      ctrlbal.push(this.formBuilder.group({
        accid: [data[this.i][0], []],
        acctypename: [data[this.i][1], []],
        accname: [data[this.i][2], []],
        closingbal: [Math.abs(parseFloat(data[this.i][4]) - parseFloat(data[this.i][3])).toFixed(this.fixedlength), []],
        accbalflag: [data[this.i][5], []],
        openingbal: [parseFloat(data[this.i][6]), []],
        from: ['', []],
        todate: [this.dateformat.transform05(Date.now()), []],
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
}