import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { stkexpEditService } from './stkexpEdit.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import swal from 'sweetalert2';
import { TranslateService } from 'ng2-translate';   

@Component({
  selector: 'app-stkexpEdit',
  templateUrl: './stkexpEdit.component.html',
  providers: [stkexpEditService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]

})
export class stkexpEditComponent implements OnInit {
  alertmsgs:any;
  registerForm: FormGroup;
  id: number;
  private sub: any;
  i;
  selobj;
  editdata = [];
  tolocname1 = [];
  tolocrefid1 = [];
  returnValid: any;
  constructor(public translate: TranslateService,private router: Router, private userService: stkexpEditService, private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private route: ActivatedRoute) { translate.setDefaultLang('en');

    config.autoClose = false;
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.userService.getLoctype().subscribe(data => this.tolocname1 = data,
      err => {
        console.log('Error on getLoctype')
      });

    this.registerForm = this.formBuilder.group({
      formno: [, []],
      date: [, []],
      id: [, []],
      invdispflag: [, []],
      tolocname: ['0', []],
      tolocrefid: ['0', []],
      stkexp: this.formBuilder.array([

      ]),


      dummy: this.formBuilder.array([

      ]),

    });

    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    this.userService.viewStockExpiry(JSON.stringify(frmdata)).subscribe(data => { this.viewServStockExpiry(data) },
      errorCode => console.log(errorCode));

    this.userService.viewStockExpAll(JSON.stringify(frmdata)).subscribe(data => { this.editdata = data },
      errorCode => console.log(errorCode));

    $(document).ready(function () {



    });


    this.init();
    if (this.id) {
      this.registerForm.get('invdispflag').setValue(1);
    } else {
      this.registerForm.get('invdispflag').setValue(0);

    }
    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.userService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);

  }


  getlocrefname() {

    this.userService.getlocrefid(this.registerForm.get('tolocname').value).subscribe(data => this.tolocrefid1 = data,
      err => {
        console.log('Error on tolocrefid')
      });
  }
  k;
  saveprocess: boolean = false;
  onSubmit() {

    this.returnValid = this.expiryvalidation();
    if (this.returnValid == true) {
      const control = <FormArray>this.registerForm.controls['stkexp'];
      let setData = control.value;
      for (this.k = 0; this.k < setData.length; this.k++) {
        setData[this.k].tolocname = this.registerForm.get('tolocname').value;
        setData[this.k].tolocrefid = this.registerForm.get('tolocrefid').value;

      }
      this.saveprocess = true;
      this.userService.saveStockExpiry(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
      setTimeout(() => {
        this.router.navigate(['ExpiredStock/ViewExpiredStock']);
      }, 2000);
    }

  }

  expiryvalidation(): Boolean {

    const control = <FormArray>this.registerForm.controls['stkexp'];
    let setData = control.value;

    for (this.k = 0; this.k < setData.length; this.k++) {

      if (setData[this.k].actualstockqty < setData[this.k].expstockqty) {
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.enteredqtyishigherthanavailableqty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false
      }

    }




    return true;
  }

  // expiryvalidation(): Boolean {
  //   throw new Error("Method not implemented.");
  // }


  savevalid(data: any) {
    if (data == 1) {

      this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.dataupdatedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.saveprocess = false;
    } else {

      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotupdated, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  viewEdit() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };


    this.userService.viewStockExpiry(JSON.stringify(frmdata)).subscribe(data => { this.viewServStockExpiry(data),alert(data) },
      errorCode => console.log(errorCode));
  }

  viewServStockExpiry(data: any) {


    const control = <FormArray>this.registerForm.controls['stkexp'];
    var w = 0;
    while (control.length !== 0) {
      control.removeAt(0);
    }

    this.init();

    for (this.i = 0; this.i < data.length; this.i++) {
      w = 3;

      control.insert(0, this.formBuilder.group({
        id: [data[this.i][w++], []],
        stkexpid: [data[this.i][w++], []],
        drugproductid: [data[this.i][w++], []],
        batchnumber: [data[this.i][w++], []],
        expirydate: [data[this.i][w++], []],
        actualstockqty: [data[this.i][w++], []],
        expboxqty: [data[this.i][w++], []],
        expstripqty: [data[this.i][w++], []],
        exptabqty: [data[this.i][w++], []],
        expstockqty: [data[this.i][w++], []],
        stkexpno: [data[this.i][w++], []],
        boxconvstk: [data[this.i][w++], []],
        stripconvstk: [data[this.i][w++], []],
        clientcdate: [data[this.i][w], []],
        clientcdate1: [data[this.i][w++], []],
        tolocname: ['0', []],
        tolocrefid: ['0', []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],

        drugname: [data[this.i][2], []],
        dbflag: [1, []],
        delflag: [false, []],
        calcflag: [0, []],

      }));
    }

    this.registerForm.get('id').setValue(data[0][4]);
    this.registerForm.get('formno').setValue(data[0][0]);

    this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][1]));


  }
  calc(e) {


    this.calcStocKExp();

  }
  calcStocKExp() {


    const control = <FormArray>this.registerForm.controls['stkexp'];

    var ind = control.value;
    var boxqty: number = 0;
    var stripqty: number = 0;
    var tabqty: number = 0;
    var qty: number = 0;

    var boxconvstk: number = 0;
    var stripconvstk: number = 0;


    for (this.i = 0; this.i < ind.length; this.i++) {
      if (parseInt(ind[this.i].calcflag) != 1) {

        if (parseInt(ind[this.i].expboxqty)) {
          boxqty = parseInt(ind[this.i].expboxqty);
        } else {
          boxqty = 0;
        }

        if (parseInt(ind[this.i].expstripqty)) {
          stripqty = parseInt(ind[this.i].expstripqty);
        } else {
          stripqty = 0;
        }


        if (parseInt(ind[this.i].exptabqty)) {
          tabqty = parseInt(ind[this.i].exptabqty);
        } else {
          tabqty = 0;
        }

        if (parseInt(ind[this.i].boxconvstk)) {
          boxconvstk = parseInt(ind[this.i].boxconvstk);

        } else {
          boxconvstk = 0;
        }


        if (parseInt(ind[this.i].stripconvstk)) {
          stripconvstk = parseInt(ind[this.i].stripconvstk);

        } else {

          stripconvstk = 0;
        }


        ind[this.i].expstockqty = boxqty * boxconvstk + stripqty * stripconvstk + tabqty;


      }

    }

    control.patchValue(ind);

  }

  deleteStockExpiry() {

    this.saveprocess = true;
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };


    this.userService.deleteStockExpiry(JSON.stringify(frmdata)).subscribe(data => {
      data
      if (data == 1) {
        this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.datadeletedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.saveprocess = false;
        this.router.navigate(['/ExpiredStock/ViewExpiredStock']);
      }
      else {
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.notdeleted, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
    this.saveprocess = false;



  }

  remove() {
    const control = <FormArray>this.registerForm.controls['stkexp'];
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
    return valflag;
  }



  init() {
    const control = <FormArray>this.registerForm.controls['stkexp'];
    var data = [[]];


    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({



        stkexpproid: [, []],
        stkexprefid: [, []],
        drugproductid: [, []],
        batchrefid: [, []],

        actualstockqty: [, []],
        expboxqty: [, []],
        expstripqty: [, []],
        exptabqty: [, []],
        expstockqty: [, []],
        boxconvstk: [, []],
        stripconvstk: [, []],
        clientcdate: [, []],
        clientcdate1: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        drugname: [, []],
        calcflag: [1, []],
        delflag: [false, []],
      }));
    }
  }





  opensaveSwal() {
    swal({
      title: 'Do you want Delete this?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(() => {
      // alert("rahja")
      this.deleteStockExpiry();



    }).catch(swal.noop);
  }
}