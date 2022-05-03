import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { editPaymentService } from './editPayment.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-patientedit',
  templateUrl: './editPayment.component.html',
  providers: [editPaymentService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})

export class editPaymentComponent {
  registerForm: FormGroup;
  private sub: any;
  id: number;
  i;
  selobj;
  editdata = [];
  itemlength = [{}, {}, {}, {}, {}];
  constructor(public translate: TranslateService,private userService: editPaymentService, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent,
    private formBuilder: FormBuilder, config: NgbDropdownConfig, private route: ActivatedRoute, private router: Router) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.registerForm = this.formBuilder.group({
      formno: ['', []],
      formdate: ['', []],
      paymenttype: ['', []],
      ptrefno: ['', []],
      date: ['', []],
      id: ['', []],
      invdispflag: ['', []],
      journal: this.formBuilder.array([]),
    });

    $(document).ready(function () { });

    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewPayment(JSON.stringify(frmdata)).subscribe(data => { this.viewServPayment(data) },
      errorCode => console.log(errorCode));
    this.userService.viewPaymentAll(JSON.stringify(frmdata)).subscribe(data => { this.editdata = data },
      errorCode => console.log(errorCode));

    if (this.id) {
      this.registerForm.get('invdispflag').setValue(1);
    } else {
      this.registerForm.get('invdispflag').setValue(0);
    }
    this.init();
  }

  validation(){
    if(this.registerForm.get('id').value=='opt1' || this.registerForm.get('id').value== null || this.registerForm.get('id').value== undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Payment Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if(this.registerForm.get('paymenttype').value=='opt1' || this.registerForm.get('paymenttype').value== null || this.registerForm.get('paymenttype').value== undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Payment Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  onSubmit() {

    let validationresponse=this.validation();
    if(validationresponse){
    const control = <FormArray>this.registerForm.controls['journal'];
      this.userService.savePayment(JSON.stringify(control.value[0])).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
     
   }

  }

  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['/Payment/ViewPayment'])
      }, 1500);
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  deletePayment() {

    let validationresponse=this.validation();
    if(validationresponse){
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var answer = confirm("Delete data?");
    if (answer) {
      this.userService.deletePayment(JSON.stringify(frmdata)).subscribe(data => { this.deleteValid(data) },
        errorCode => console.log(errorCode));
      }
    }
  }

  deleteValid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Delted Succesfully    ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.ngOnInit();
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: ' Not Delted', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  viewEdit() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewPayment(JSON.stringify(frmdata)).subscribe(data => { this.viewServPayment(data) },
      errorCode => console.log(errorCode));
  }

  viewServPayment(data: any) {
    const control = <FormArray>this.registerForm.controls['journal'];
    var w = 0;
    while (control.length !== 0) {
      control.removeAt(0);
    }
    //this.init();
    for (this.i = 0; this.i < data.length; this.i++) {
      control.insert(0, this.formBuilder.group({
        id: [data[this.i][w++], []],
        journalno: [data[this.i][w++], []],
        date: [data[this.i][w++], []],
        debitaccount: [data[this.i][w++], []],
        creditaccount: [data[this.i][w++], []],
        debitamount: [data[this.i][w++].toFixed(2), []],
        creditamount: [data[this.i][w++], []],
        draccname: [data[this.i][w++], []],
        craccname: [data[this.i][w++], []],
        invoiceno: [data[this.i][w++], []],
        invoicebalamt: [data[this.i][w++], []],
        clientcdate: [data[this.i][w], []],
        clientcdate1: [data[this.i][w++], []],
        cashflag: [data[this.i][w++], []],
        jrnlname: [data[this.i][w++], []],
        bulkflag: [data[this.i][w++], []],
        delflag: [data[this.i][w++], []],
        personid: [data[this.i][w++], []],
        persontype: [data[this.i][w++], []],
        invoicetype: [data[this.i][w++], []],
        paymenttype: [data[this.i][w++], []],
        ptrefno: [data[this.i][w++], []],
        invoicename: [data[this.i][w++], []],
        personame: [data[this.i][w++], []],
        jrnltype: [data[this.i][w++], []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        personname: ['', []],
        calcflag: [0, []],
      }));
    }
    this.registerForm.get('id').setValue(data[0][0]);
    this.registerForm.get('formno').setValue(data[0][1]);
    this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][2]));
    this.registerForm.get('paymenttype').setValue(data[0][19]);
    this.registerForm.get('ptrefno').setValue(data[0][20]);
  }



  init() {
    const control = <FormArray>this.registerForm.controls['journal'];
    var data = [[]];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        id: ['', []],
        journalno: ['', []],
        dummy1: ['', []],
        debitaccount: ['', []],
        creditaccount: ['', []],
        debitamount: ['', []],
        creditamount: ['', []],
        draccname: ['', []],
        craccname: ['', []],
        invoiceno: ['', []],
        invoicebalamt: ['', []],
        clientcdate: ['', []],
        clientcdate1: ['', []],
        cashflag: ['', []],
        jrnlname: ['', []],
        bulkflag: ['', []],
        calcflag: [1, []],
      }));
    }
  }

}
