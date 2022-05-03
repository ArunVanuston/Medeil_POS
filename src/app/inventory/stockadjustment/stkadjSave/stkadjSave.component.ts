import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { stkadjSaveService } from './stkadjSave.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { AppComponent } from '../../../app.component';
declare var $: any
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { TranslateService } from 'ng2-translate';   
@Component({
  selector: 'app-stkadjSave',
  templateUrl: './stkadjSave.component.html',
  providers: [stkadjSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class stkadjSaveComponent implements OnInit {
  alertmsgs:any;
  parentMessage='sales';
  registerForm: FormGroup;
  i;
  autoincr;
  autoval = 0;
  autoinc = 0;
  autodata = [];
  selobj;
  extrow=[{},{},{},{},{}];

  constructor(public translate: TranslateService,private userService: stkadjSaveService,
    private dateformat: dateFormatPipe,
    private notificationsComponent: NotificationsComponent,
    private formBuilder: FormBuilder, config: NgbDropdownConfig) {translate.setDefaultLang('en');
    config.autoClose = false;
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.registerForm = this.formBuilder.group({
      autonamenew: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      date: [this.dateformat.transform05(Date.now()), []],
      stkadj: this.formBuilder.array([]),
      dummy: this.formBuilder.array([]),
    });
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    $(document).ready(function () {
      $('#autolist').hide();
    });
    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.userService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
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
          var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
          this.userService.viewSTWareHouseStocks(JSON.stringify(frmdata)).subscribe(data => { this.autodata = data },
            errorCode => console.log(errorCode));
        }
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
    var nr: number;
    if (event.keyCode == 13) {
      var drg = this.autodata[articleId][3];
      var bth = this.autodata[articleId][1];
      var frmdata = { frmint1: drg, frmint2: bth, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
      this.userService.viewSTWareHouseStock(JSON.stringify(frmdata)).subscribe(data => { this.viewServWareHouseStock(data) },
        errorCode => console.log(errorCode));
      $("#autoname").focus();
      this.registerForm.get('autonamenew').setValue('');
      this.autodata = [];
    }
  }
  viewServWareHouseStock(data: any) {
    var i = 0;
    const control = <FormArray>this.registerForm.controls['stkadj'];
    for (this.i = 0; this.i < data.length; this.i++) {
      i = 0;
      control.insert(0, this.formBuilder.group({
        stkadjautoid: [, []],
        stkadjid: [, []],
        drugproductid: [data[this.i][1], []],
        batchrefid: [data[this.i][2], []],
        actualstock: [data[this.i][3], []],
        physicalboxstock: [0, []],
        physicalstripstock: [0, []],
        physicaltabstock: [0, []],
        physicalstock: [0, []],
        adjustedstock: [0, []],
        actualstkvalue: [data[this.i][3] * data[this.i][4], []],
        physicalstkvalue: [0, []],
        adjustedstkvalue: [0, []],
        remarks: [0, []],
        unitstkvalue: [data[this.i][4], []],
        boxconvstk: [data[this.i][5], []],
        stripconvstk: [data[this.i][6], []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drugname: [data[this.i][0], []],
        calcflag: [0, []],
        delflag: [false, []],
      }));
    }
  }
  onSubmit() {
  
    const control = <FormArray>this.registerForm.controls['stkadj'];
 
      this.userService.saveStockAdjust(JSON.stringify(control.value)).subscribe(data => { 
        if (data == 1) {
          this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        } else {
          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        } },
        errorCode => console.log(errorCode));
        this.ngOnInit();
  
  }
 
  calc(e) {
    this.calcAdjustVal();
  }
  calcAdjustVal() {
    const control = <FormArray>this.registerForm.controls['stkadj'];
    var stk = control.value;
    var boxqty: number = 0;
    var stripqty: number = 0;
    var tabqty: number = 0;
    var qty: number = 0;
    var boxconvstk: number = 0;
    var stripconvstk: number = 0;
    var actualstock: number = 0;
    var physicalstock: number = 0;
    var unitstkvalue: number = 0;
    for (this.i = 0; this.i < stk.length; this.i++) {
      if (parseInt(stk[this.i].calcflag) != 1) {
        if (parseInt(stk[this.i].physicalboxstock)) {
          boxqty = parseInt(stk[this.i].physicalboxstock);
        } else {
          boxqty = 0;
        }
        if (parseInt(stk[this.i].physicalstripstock)) {
          stripqty = parseInt(stk[this.i].physicalstripstock);
        } else {
          stripqty = 0;
        }
        if (parseInt(stk[this.i].physicaltabstock)) {
          tabqty = parseInt(stk[this.i].physicaltabstock);
        } else {
          tabqty = 0;
        }
        if (parseInt(stk[this.i].boxconvstk)) {
          boxconvstk = parseInt(stk[this.i].boxconvstk);
        } else {
          boxconvstk = 0;
        }
        if (parseInt(stk[this.i].stripconvstk)) {
          stripconvstk = parseInt(stk[this.i].stripconvstk);
        } else {
          stripconvstk = 0;
        }
        if (parseInt(stk[this.i].actualstock)) {
          actualstock = parseInt(stk[this.i].actualstock);
        } else {
          actualstock = 0;
        }
        if (parseInt(stk[this.i].physicalstock)) {
          physicalstock = parseInt(stk[this.i].physicalstock);
        } else {
          physicalstock = 0;
        }
        if (parseInt(stk[this.i].unitstkvalue)) {
          unitstkvalue = parseInt(stk[this.i].unitstkvalue);
        } else {
          unitstkvalue = 0;
        }
        if (physicalstock > actualstock) {
          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.physicalstockvalueisgreaterthenactualstock, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        physicalstock = boxqty * boxconvstk + stripqty * stripconvstk + tabqty;
        stk[this.i].physicalstock = physicalstock;
        stk[this.i].adjustedstock = actualstock - physicalstock;
        stk[this.i].actualstkvalue = (actualstock * unitstkvalue).toFixed(2);
        stk[this.i].physicalstkvalue = (physicalstock * unitstkvalue).toFixed(2);
        stk[this.i].adjustedstkvalue = ((actualstock * unitstkvalue) - (physicalstock * unitstkvalue)).toFixed(2);
      }
    }
    control.patchValue(stk);
  }
  remove() {
    const control = <FormArray>this.registerForm.controls['stkadj'];
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
  valid(): Number {
    var valflag = 0;
    return valflag;
  }
 
  set1() {
    localStorage.setItem('currentUser', JSON.stringify({ userid: '0', locrefid: 1, locname: 2, companyid: '0' }));
  }
  set2() {
    localStorage.setItem('currentUser', JSON.stringify({ userid: 0, locrefid: 0, locname: 0, companyid: 0 }));
  }
}