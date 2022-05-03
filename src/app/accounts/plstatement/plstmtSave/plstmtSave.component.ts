import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { plstmtSaveService } from './plstmtSave.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { accountsSaveService } from 'app/accounts/accounts/accountsSave/accountsSave.service';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-plstmtSave',
  templateUrl: './plstmtSave.component.html',
  providers: [plstmtSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe, accountsSaveService]
})
export class plstmtSaveComponent implements OnInit {
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  registerForm: FormGroup;
  i;
  selobj;
  gifFail: boolean = true;
  totpurchase: any = 0;
  totsales: any = 0;
  grossprofit: any = 0;
  openstk: any = 0;
  closestk: any = 0;
  constructor(public translate: TranslateService,private userService: plstmtSaveService, private accservice: accountsSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
      netprofit: ['', []],
      date: [this.dateformat.transform05(Date.now()), []],
      revenue: this.formBuilder.array([]),
      expense: this.formBuilder.array([])
    });
    var frmdata = { frmint1: '', frmstr1: '', frmstr2: this.registerForm.get('date').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.accservice.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      if (data[0][1] == 1) {
        this.fixedlength = 3;
      } else { this.fixedlength = 2 }
      if (data[0][2] == 1) {
        this.aboveflag = 1;
      } else { this.aboveflag = 0 }
      if (data[0][3] == 1) {
        this.belowflag = 1;
      } else { this.belowflag = 0 }
      this.userService.viewPLAccount(JSON.stringify(frmdata)).subscribe(data => {
        this.viewRevExp(data); this.gifFail = false
      },
        errorCode => console.log(errorCode));
      this.userService.viewtotpurchase(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, AppComponent.date).subscribe(data => {
        this.totpurchase = parseFloat(data).toFixed(this.fixedlength)
      })
      this.userService.viewtotsales(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, AppComponent.date).subscribe(data => {
        this.totsales = parseFloat(data).toFixed(this.fixedlength);
      })
      this.userService.viewOpenstk(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, AppComponent.date).subscribe(data => {
        this.openstk = parseFloat(data).toFixed(this.fixedlength);
      })
      this.userService.viewClosestk(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, AppComponent.date).subscribe(data => {
        this.closestk = parseFloat(data).toFixed(this.fixedlength);
       
        setTimeout(() => {
          this.grosssfn();
        }, 2000);
      })
    });


  }
  drbaltot: any = 0;
  crbaltot: any = 0;
  totexpenses: any =0;
  totrevenue;
  viewRevExp(data: any) {
    const ctrlexp = <FormArray>this.registerForm.controls['expense'];
    for (this.i = 0; this.i < data.length; this.i++) {
      ctrlexp.push(this.formBuilder.group({
        acctype: [data[this.i][1], []],
        accname: [data[this.i][2], []],
        balance: [Math.abs(data[this.i][4] - data[this.i][3]).toFixed(this.fixedlength), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
      }));
      this.drbaltot += Math.abs(data[this.i][4] - data[this.i][3]);
      if(this.drbaltot != '' || this.drbaltot != null || this.drbaltot != undefined || this.drbaltot.isNaN()){
        this.totexpenses = this.drbaltot.toFixed(this.fixedlength);
      }else{
        this.totexpenses = (0).toFixed(this.fixedlength);
      }
      
    }
    setTimeout(() => {
      this.registerForm.get('netprofit').setValue((this.grossprofit - this.totexpenses).toFixed(this.fixedlength));
    }, 4000);
  }
  // viewRevExp(data: any) {
  //   const ctrlrev = <FormArray>this.registerForm.controls['revenue'];
  //   const ctrlexp = <FormArray>this.registerForm.controls['expense'];
  //   for (this.i = 0; this.i < data.length; this.i++) {
  //     if (data[this.i][6] == 0) {
  //       if(data[this.i][2] == 'Sales  income'){
  //              console.log("Remove")
  //       }else{
  //         ctrlrev.push(this.formBuilder.group({
  //           acctype: [data[this.i][1], []],
  //           accname: [data[this.i][2], []],
  //           balance: [Math.abs(data[this.i][4] - data[this.i][3]).toFixed(this.fixedlength), []],
  //           createdby: [this.selobj.userid, []],
  //           locrefid: [this.selobj.locrefid, []],
  //           locname: [this.selobj.locname, []],
  //           countryrefid: [this.selobj.countryrefid, []],
  //           companyrefid: [this.selobj.companyid, []],
  //           branchrefid: [this.selobj.branchrefid, []],
  //         }));
  //         this.crbaltot += Math.abs(data[this.i][4] - data[this.i][3]);
  //         this.totrevenue = this.crbaltot.toFixed(this.fixedlength);
  //       } 
  //     }
  //     if (data[this.i][6] == 1) {
  //       if(data[this.i][2] == 'Purchse Expense'){
  //         console.log("Remove")
  //  }else{
  //   ctrlexp.push(this.formBuilder.group({
  //     acctype: [data[this.i][1], []],
  //     accname: [data[this.i][2], []],
  //     balance: [Math.abs(data[this.i][4] - data[this.i][3]).toFixed(this.fixedlength), []],
  //     createdby: [this.selobj.userid, []],
  //     locrefid: [this.selobj.locrefid, []],
  //     locname: [this.selobj.locname, []],
  //     countryrefid: [this.selobj.countryrefid, []],
  //     companyrefid: [this.selobj.companyid, []],
  //     branchrefid: [this.selobj.branchrefid, []],
  //   }));
  //   this.drbaltot += Math.abs(data[this.i][4] - data[this.i][3]);
  //   this.totexpenses = this.drbaltot.toFixed(this.fixedlength);
  //  }

  //     }
  //   }
  //   this.registerForm.get('netprofit').setValue((this.crbaltot - this.drbaltot).toFixed(this.fixedlength));
  // }
  grosssfn() {

    this.grossprofit = (parseFloat(this.totsales) + parseFloat(this.closestk)) - (parseFloat(this.totpurchase) + parseFloat(this.openstk));
  }
}