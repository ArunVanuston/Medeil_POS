import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { stkadjEditService } from './stkadjEdit.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import swal from 'sweetalert2';
import { TranslateService } from 'ng2-translate'; 
@Component({
  selector: 'app-stkadjEdit',
  templateUrl: './stkadjEdit.component.html',
  providers: [stkadjEditService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
  })
export class stkadjEditComponent implements OnInit {
  alertmsgs:any;
  registerForm: FormGroup;
  id: number;
   private sub: any;
 
  i;
   selobj;
  editdata = [];
  res: any;
   constructor(private userService:stkadjEditService,public translate: TranslateService,
               private dateformat: dateFormatPipe, 
               private notificationsComponent: NotificationsComponent, 
               private formBuilder: FormBuilder, config: NgbDropdownConfig, 
               private route: ActivatedRoute,
               private router:Router) {translate.setDefaultLang('en');
     config.autoClose = false;
  }
   ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
     this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, companyid: AppComponent.companyID };
     this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.registerForm = this.formBuilder.group({
       formno: [, []],
      formdate: [, []],
       date: [, []],
       id: [, []],
      invdispflag: [, []],
       stkadj: this.formBuilder.array([]),
      dummy: this.formBuilder.array([
       ]),
     });
     var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewStockAdjust(JSON.stringify(frmdata)).subscribe(data => { this.viewServStockAdjust(data) },
      errorCode => console.log(errorCode));
     this.userService.viewStockAdjAll(JSON.stringify(frmdata)).subscribe(data => { this.editdata = data },
      errorCode => console.log(errorCode));
      $(document).ready(function () {
      });
     // this.init();
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
    onSubmit() {
   
     const control = <FormArray>this.registerForm.controls['stkadj'];
   
       this.userService.saveStockAdjust(JSON.stringify(control.value)).subscribe(data => {this.res=data
          if(this.res == 1){
          this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
       } else {
          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },
        errorCode => console.log(errorCode));
        this.router.navigate(['StockAdjustment/StockAdjustment']);
   }

    viewEdit() {
     var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid};
     this.userService.viewStockAdjust(JSON.stringify(frmdata)).subscribe(data => { this.viewServStockAdjust(data) },
      errorCode => console.log(errorCode));
   }
   viewServStockAdjust(data: any) {
    //  alert(data)
       var i = 0;
      const control = <FormArray>this.registerForm.controls['stkadj'];
     for (this.i = 0; this.i < data.length; this.i++) {
      i = 3;
      control.insert(0, this.formBuilder.group({
          id: [data[this.i][i++], []],
        stkadjid: [data[this.i][i++], []],
        drugproductid: [data[this.i][i++], []],
        batchrefid: [data[this.i][i++], []],
        actualstock: [data[this.i][i++], []],
        physicalboxstock: [data[this.i][i++], []],
        physicalstripstock: [data[this.i][i++], []],
        physicaltabstock: [data[this.i][i++], []],
        physicalstock: [data[this.i][i++], []],
        adjustedstock: [data[this.i][i++], []],
        actualstkvalue: [data[this.i][i++], []],
        physicalstkvalue: [data[this.i][i++], []],
        adjustedstkvalue: [data[this.i][i++], []],
        remarks: [data[this.i][i++], []],
        stkadjno: [data[this.i][i++], []],
        unitstkvalue: [data[this.i][i++], []],
        boxconvstk: [data[this.i][i++], []],
         stripconvstk: [data[this.i][i++], []],
        clientcdate: [data[this.i][i], []],
        clientcdate1: [data[this.i][i++], []],
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
   calc() {
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
          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.stkactualstock, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
         physicalstock = boxqty * boxconvstk + stripqty * stripconvstk + tabqty;
         stk[this.i].physicalstock = physicalstock;
         stk[this.i].adjustedstock = actualstock - physicalstock;
         stk[this.i].actualstkvalue = (actualstock * unitstkvalue).toFixed(2);
       
        
        stk[this.i].physicalstkvalue = (physicalstock * unitstkvalue).toFixed(2);
         stk[this.i].adjustedstkvalue = ((actualstock * unitstkvalue) - (physicalstock * unitstkvalue)).toFixed(2);
        //  alert()
        //  alert(  stk[this.i].adjustedstkvalue = (actualstock * unitstkvalue) - (physicalstock * unitstkvalue))
        }
        // alert(stk[this.i].adjustedstkvalue)
    }
  
    control.patchValue(stk);
  }
  deleteStockAdj() {
    const control = <FormArray>this.registerForm.controls['stkadj'];
     var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
         this.userService.deleteStockAdj(JSON.stringify(frmdata)).subscribe(data => { },
        errorCode => console.log(errorCode));

    
   
   }
   remove() {
    const control = <FormArray>this.registerForm.controls['stkadj'];
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
 
    }
  validnew(): Number {
    var valflag = 0;
      return valflag;
   }



//Delete Warning
   opensaveSwal() {
    swal({
      title: 'Do you want Delete this ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(() => {
      // alert("rahja")
      this.deleteStockAdj();
      this.ngOnInit();
    
   
      
    }).catch(swal.noop);
  }
  
  
   
  }
