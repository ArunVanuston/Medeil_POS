import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { BonusloyalityService } from '../loyalitybonus.service';



@Component({
  selector: 'app-bonusloyality',
  templateUrl: './bonusloyality.component.html',
  styleUrls: ['./bonusloyality.component.css'],
  providers: [NotificationsComponent, BonusloyalityService]
})
export class BonusloyalityComponent implements OnInit {
  alertmsgs:any;
  parentMessage='sales';
  ctype: any;
  i: number;
  selobj: any;

  constructor(private formbuilder: FormBuilder,
    private appcomponent: AppComponent,
    private loyalityservice: BonusloyalityService,
    private notification: NotificationsComponent,
    private dateformat: dateFormatPipe) { }
  BonusForm: FormGroup;
  mulSettings = {};
  mulList = [];
  mulservList = [];
  mulservtype = [];
  multype = [];
  ngOnInit() {
    this.BonusForm = this.formbuilder.group({
      bonus_loyality: ['', []],
      bl_reason: ['', []],
      min_purchase_amt: ['', []],
      from_date: ['', []],
      to_date: ['', []],
      discount_percent: [null, []],
      discount_amount: [null, []],
      customer_type: [[]],
      clientcdate: [this.dateformat.transform04(), []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      produc_code: ['', []],
      status: [0, []],
      percentageflag:[true,[]],
      amountflag:[true,[]]


    });

    this.mulSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select Types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };


    this.loyalityservice.getcusttype(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.ctype = data
    });

    this.loyalityservice.getproduct(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.mulservList = data, this.viewproduct()
    })
    this.enablecontrol1();

    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.loyalityservice.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }

  viewproduct() {
    for (this.i = 0; this.i < this.mulservList.length; this.i++) {
      this.mulList.push({ id: this.mulservList[this.i][0], itemName: this.mulservList[this.i][1] });
    }


  }

  saveproducts() {
    this.multype = this.BonusForm.get('produc_code').value;
    if (this.multype != null) {
      for (this.i = 0; this.i < this.multype.length; this.i++) {
        this.mulservtype.push({
          produc_code: this.multype[this.i].id, companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
          locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1
        });
      }
    }

    this.loyalityservice.savebonusproduct(JSON.stringify(this.mulservtype)).subscribe(data => {
      data
      if (data == true) {
        this.notification.addToast({ title: 'Success', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.saveprocess = false;
        this.ngOnInit();
      }
      else{
        this.notification.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  
      }
    },
      errorCode => console.log(errorCode));

    this.multype = [];
    this.mulservtype = [];
  }

  flag:boolean=false;
  flag1:boolean=false;
  saveprocess:boolean=false;
  onSubmit() {
    this.flag = this.validation();
    this.flag1 = this.validation1();
    if(this.flag == true){
        if(this.flag1 == true){
          this.saveprocess = true;
    this.loyalityservice.saveformdata(JSON.stringify(this.BonusForm.value)).subscribe(data => {
        if (data == true) {
          this.saveproducts();

      }
    })
  }
  }
  }
  validation(): boolean {
   
    if (this.BonusForm.get('bonus_loyality').value == '' || this.BonusForm.get('bonus_loyality').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.loyality.enterbonusloyality, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
      if (this.BonusForm.get('from_date').value == '' || this.BonusForm.get('from_date').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.loyality.selectvalidatefrom, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.BonusForm.get('to_date').value == '' || this.BonusForm.get('to_date').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.loyality.selectvalidateto, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
       
    if (this.BonusForm.get('customer_type').value == '' || this.BonusForm.get('customer_type').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.loyality.selectcustomertype, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.BonusForm.get('produc_code').value == '' || this.BonusForm.get('produc_code').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.loyality.selectproducts, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
 
   
    return true;
  }

validation1(){
  // alert(this.BonusForm.get('discount_percent').value + "  "+this.BonusForm.get('discount_amount').value )
    if (this.BonusForm.get('discount_percent').value == null && this.BonusForm.get('discount_amount').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.loyality.enterdiscountpercentage, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    return true;
  }

  enablecontrol1() {
    if (this.BonusForm.get('percentageflag').value) {
      this.BonusForm.get('discount_percent').enable();
    } else  {
      this.BonusForm.get('discount_percent').setValue(null);
      this.BonusForm.get('discount_percent').disable();
    }
  }

  enablecontrol2() {
    if (this.BonusForm.get('amountflag').value) {
      this.BonusForm.get('discount_amount').enable();
    } else{
      this.BonusForm.get('discount_amount').setValue(null);
      this.BonusForm.get('discount_amount').disable();
    }
  }


}
