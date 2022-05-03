
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { stkexpSaveService } from './stkexpSave.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { AppComponent } from '../../../app.component';
import swal from 'sweetalert2'; 
import { TranslateService } from 'ng2-translate';   



@Component({
  selector: 'app-stkexpSave',
  templateUrl: './stkexpSave.component.html',
  providers: [stkexpSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})


export class stkexpSaveComponent implements OnInit {
  alertmsgs:any;
  parentMessage = 'sales';
  expirylength=[{},{},{},{},{},{}];
  registerForm: FormGroup;
  selobj;
  i;
  tolocname1 = [];
  tolocrefid1 = [];
  returnValid: any;
  val: any;
  dest: any;
  data: any;
  constructor(public translate: TranslateService,private userService: stkexpSaveService, private formBuilder: FormBuilder, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private router: Router) { translate.setDefaultLang('en');
    this.registerForm = this.formBuilder.group({
      tolocname: ['0', []],
      tolocrefid: ['0', []],
      totalamount: ['', []],
      date: [this.dateformat.transform05(Date.now()), []],
      expretpercentage: [, []],
      stkexp: this.formBuilder.array([]),

    });


  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };

    this.viewMainstockExpiry();
    this.userService.getLoctype().subscribe(data => this.tolocname1 = data,
      err => {
        console.log('Error on getLoctype')
      });
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

      var valflag: Number = 0;
      const control = <FormArray>this.registerForm.controls['stkexp'];
      let setData = control.value;
      for (this.k = 0; this.k < setData.length; this.k++) {

        setData[this.k].tolocname = this.registerForm.get('tolocname').value;
        setData[this.k].tolocrefid = this.registerForm.get('tolocrefid').value;
        setData[this.k].totalamt = this.registerForm.get('totalamount').value;
      }

      valflag = this.validnew();

      if (valflag == 0) {
        this.saveprocess = true;
        this.userService.saveStockExpiry(JSON.stringify(control.value)).subscribe(data => {
          this.data = data

          if (data == 1) {
            this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            this.saveprocess = false;
            this.router.navigate(['/ExpiredStock/ViewExpiredStock']);
          }
          else {
            this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
        })
      }
    }
    else {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
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


  viewServMainstockExpiry(data: any) {
    // alert(data)
    const control = <FormArray>this.registerForm.controls['stkexp'];

    var i = 0; while (control.length !== 0) {
      control.removeAt(0);
    }


    // this.init();

    for (this.i = 0; this.i < data.length; this.i++) {
      i = 0;
      control.insert(0, this.formBuilder.group({
        stkexpproid: [, []],
        stkexprefid: [, []],
        drugproductid: [data[this.i][1], []],
        batchrefid: [data[this.i][8], []],
        actualstockqty: [data[this.i][3], []],
        expboxqty: [, []],
        expstripqty: [, []],
        exptabqty: [, []],
        expstockqty: [, []],
        boxconvstk: [data[this.i][5], []],
        stripconvstk: [data[this.i][6], []],
        expirydate: [data[this.i][7], []],
        batchnumber: [data[this.i][2], []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        tolocname: ['0', []],
        tolocrefid: ['0', []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drugname: [data[this.i][0], []],
        unitprice: [data[this.i][9], []],
        purchaseinvrefid: [data[this.i][10], []],
        vendorid: [data[this.i][11], []],
        totprice: [, []],
        calcflag: [0, []],
        totalamt: ['0', []],
        delflag: [false, []],
        stockid: [data[this.i][10], []]
      }));
    }
  }

  gettotalamount() {
    const control = <FormArray>this.registerForm.controls['stkexp'];
    let setData = control.value;
    var totamt: number = 0;
    for (let p = 0; p < setData.length; p++) {
      if (setData[p].delflag) {
        totamt = setData[p].totprice + totamt;

      }
    }
    this.registerForm.get('totalamount').setValue(totamt.toFixed(2));
  }
  viewMainstockExpiry() {
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid, branchrefid: this.selobj.branchrefid };
    this.userService.viewMainstockExpiry(JSON.stringify(frmdata)).subscribe(data => { this.viewServMainstockExpiry(data) }, errorCode => console.log(errorCode));

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
    var utprice: number = 0;
    var qty: number = 0;
    var boxconvstk: number = 0;
    var stripconvstk: number = 0;
    for (this.i = 0; this.i < ind.length; this.i++) {
      if (parseInt(ind[this.i].calcflag) != 1) {
        if (parseInt(ind[this.i].expboxqty)) {
          boxqty = parseInt(ind[this.i].expboxqty);
        } else {
          boxqty = 0;
        } if (parseInt(ind[this.i].expstripqty)) {
          stripqty = parseInt(ind[this.i].expstripqty);
        } else {
          stripqty = 0;
        }
        if (parseInt(ind[this.i].exptabqty)) {
          tabqty = parseInt(ind[this.i].exptabqty);
        } else {
          tabqty = 0;
        } if (parseInt(ind[this.i].boxconvstk)) {
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
        //    alert(ind[this.i].expstockqty+"*"+utprice)
        ind[this.i].totprice = ((ind[this.i].actualstockqty) * ind[this.i].unitprice).toFixed(2);
        ind[this.i].unitprice = (1*(ind[this.i].unitprice)).toFixed(2);
      }

    } control.patchValue(ind);
  }
  validnew(): Number {
    var valflag = 0; return valflag;
  }


  //DesingRaja
  //Destroyed Product  
  destroyprod(index: number) {


    const getData = <FormArray>this.registerForm.controls['stkexp'];
    let setData = getData.value;


    //  alert(setData[index].drugproductid+" "+setData[index].stockid);
    console.log(setData[index])


    // var answer = confirm("Destroy this Product?");
    // if (answer) {

    this.userService.destroy(setData[index].stockid, setData[index].drugproductid, AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.dest = data
      if (this.dest = true) {
        this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.inevtory.productdisposed, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      }
      else {
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.datanotdisposal, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }

    });
    // }
  }






  selectAll(event: any) {


    const setData = <FormArray>this.registerForm.controls['stkexp'];
    let getData = setData.value;
    if (event.target.checked) {
      for (let i = 0; i < getData.length; i++) {

        setData.controls[i].get('delflag').setValue(true);

      }
    }
    else {
      for (let i = 0; i < getData.length; i++) {

        setData.controls[i].get('delflag').setValue(false);

      }
    }

  }



  openConfirmsSwal(index) {
    swal({
      title: 'Do you want Disposal this Product?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(() => {

      this.destroyprod(index);

      // this.router.navigate(['/userlogin/login']);
      this.ngOnInit();
    }).catch(swal.noop);
  }

  opensaveSwal() {
    swal({
      title: 'Do you want Save this Expired Product?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(() => {
      // alert("rahja")
      this.onSubmit();



    }).catch(swal.noop);
  }




}