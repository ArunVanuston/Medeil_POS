import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { blncesheetSaveService } from './blncesheetSave.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-blncesheetSave',
  templateUrl: './blncesheetSave.component.html',
  providers: [blncesheetSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class blncesheetSaveComponent implements OnInit {
  registerForm: FormGroup;
  i;
  selobj;
  gifFail: boolean = true;
  parentMessage = "sales";
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  closestk: any = 0;
  constructor(public translate: TranslateService,private userService: blncesheetSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }

  partnerbalance:any=0;
  ngOnInit() {

    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };

    this.registerForm = this.formBuilder.group({
      date: [this.dateformat.transform05(Date.now()), []],
      asset: this.formBuilder.array([]),
      liability: this.formBuilder.array([]),
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
    });

   
    setTimeout(() => {
      this.userService.GetPartnerBalance(0,AppComponent.locRefName1, AppComponent.locrefID1).
      subscribe(data => {
        this.partnerbalance=data;
      });
      setTimeout(() => {
        this.userService.Newbalanceshet(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.registerForm.get('date').value).subscribe(data => {
          this.viewbalsheet(data);
          this.gifFail = false;
          this.userService.viewClosestk(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, AppComponent.date).subscribe(data => {
            this.closestk = parseFloat(data).toFixed(this.fixedlength);
            this.PushclosingStock();
          })
        },
          errorCode => console.log(errorCode));
      },1800);
    
    }, 1200);

  }
  PushclosingStock() {
    const getData = <FormArray>this.registerForm.controls['asset'];
    getData.push(this.formBuilder.group({
      balance: this.closestk,
      accname: 'Closing Stock'
    }))
    this.getSum();
  }
  totasset: any =0;
  totliability: any = 0;
  getSum(){
    const getData = <FormArray>this.registerForm.controls['asset'];
    let setData = getData.value;
    const getData1 = <FormArray>this.registerForm.controls['liability'];
    let setData1 = getData1.value;
    for(let p = 0;p<setData.length;p++){
      this.totasset += parseFloat(setData[p].balance);
      this.totasset.toFixed(this.fixedlength);
    }
    for(let p = 0;p<setData1.length;p++){
      this.totliability += parseFloat(setData1[p].balance);
      this.totliability.toFixed(this.fixedlength);
    }
  }

  viewbalsheet(data: any) {

    const ctrlrev = <FormArray>this.registerForm.controls['asset'];
    const ctrlexp = <FormArray>this.registerForm.controls['liability'];

    for (this.i = 0; this.i < data.length; this.i++) {


      if (data[this.i][8] == 1) {
        ctrlrev.push(this.formBuilder.group({
          acctype: [data[this.i][1], []],
          accname: [data[this.i][2], []],
          balance: [data[this.i][12].toFixed(this.fixedlength), []],
          createdby: [this.selobj.userid, []],
          locrefid: [this.selobj.locrefid, []],
          locname: [this.selobj.locname, []],
          countryrefid: [this.selobj.countryrefid, []],
          companyrefid: [this.selobj.companyid, []],
          branchrefid: [this.selobj.branchrefid, []],
          debitamt: [data[this.i][3].toFixed(this.fixedlength), []],
          creditamt: [data[this.i][4].toFixed(this.fixedlength), []]
        }));

      }
      if (data[this.i][8] == 2) {
        var balanceamt=0;
        if (data[this.i][0] == 60) {
          balanceamt=parseFloat(data[this.i][11])+parseFloat(this.partnerbalance);
        }else{
          balanceamt=data[this.i][11];
        }
        ctrlexp.push(this.formBuilder.group({
          acctype: [data[this.i][1], []],
          accname: [data[this.i][2], []],
          balance: [balanceamt.toFixed(this.fixedlength), []],
          createdby: [this.selobj.userid, []],
          locrefid: [this.selobj.locrefid, []],
          locname: [this.selobj.locname, []],
          countryrefid: [this.selobj.countryrefid, []],
          companyrefid: [this.selobj.companyid, []],
          branchrefid: [this.selobj.branchrefid, []],
          debitamt: [data[this.i][3].toFixed(this.fixedlength), []],
          creditamt: [data[this.i][4].toFixed(this.fixedlength), []]
        }));

      }

    }
  }

}