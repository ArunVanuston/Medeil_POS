import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { flowstmtSaveService } from './flowstmtSave.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { accountsSaveService } from 'app/accounts/accounts/accountsSave/accountsSave.service';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-flowstmtSave',
  templateUrl: './flowstmtSave.component.html',
  providers: [flowstmtSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe,accountsSaveService]
})
export class flowstmtSaveComponent implements OnInit {
  gifFail: boolean = true;
  parentMessage = "sales";
  registerForm: FormGroup;
  i;
  selobj;
  fixedlength:any;
  aboveflag:any;
  belowflag:any;
  constructor(public translate: TranslateService,private userService: flowstmtSaveService,private accservice: accountsSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
      dist: ['', []],
      stkexpno: ['', []],
      clientcdate: [this.dateformat.transform04(), []],
      date: [this.dateformat.transform05(Date.now()), []],
      flowstmt: this.formBuilder.array([
      ]),
    });
    $(document).ready(function () {
    });
    var frmdata = { frmint1: '', frmstr1: '', frmstr2: this.registerForm.get('date').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.accservice.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>{ 
      if(data[0][1]==1){
        this.fixedlength=3;
      }else{this.fixedlength=2}

      if(data[0][2]==1){
        this.aboveflag=1;
      }else{this.aboveflag=0}

      if(data[0][3]==1){
        this.belowflag=1;
      }else{ this.belowflag=0}
      this.userService.viewCashFlowStmt(JSON.stringify(frmdata)).subscribe(data => { this.viewServCashFlowStmt(data); this.gifFail = false },
        errorCode => console.log(errorCode));
    });
   
  }
  onSubmit() {
  }
  viewServCashFlowStmt(data: any) {
    const control = <FormArray>this.registerForm.controls['flowstmt'];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        acctype: [data[this.i][1], []],
        accname: [data[this.i][2], []],
        balance: [parseFloat(data[this.i][3]).toFixed(this.fixedlength), []],
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