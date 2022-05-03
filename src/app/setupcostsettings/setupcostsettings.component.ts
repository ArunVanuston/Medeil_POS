import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { SetupcostService } from './setupcostsettings.service';

@Component({
  selector: 'app-setupcostsettings',
  templateUrl: './setupcostsettings.component.html',
  styleUrls: ['./setupcostsettings.component.css'],
  providers:[SetupcostService]
})
export class SetupcostsettingsComponent implements OnInit {
  alertmsgs:any;
  SetupcostForm: FormGroup;
  setupcostJournal: FormGroup;
  constructor(private formbuilder: FormBuilder,private service: SetupcostService,private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe) {
    this.SetupcostForm = this.formbuilder.group({
      opencashbalance: [''],
      buildingcost: [''],
      advleadsedeposit: [''],
      regfee: [''],
      electriclighting: [''],
      furnishcarpentry: [''],
      fridge: [''],
      aircondition: [''],
      displayboard: [''],
      computerperipherals: [''],
      others1: [0],
      others2: [0],
      others3: [0],
      others4: [0],
      others5: [0],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1],
      clientcdate: [AppComponent.date],
      status:[1],
      totalsetupcost:[''],
      id:['']
    });
    this.setupcostJournal = this.formbuilder.group({
      id:[''],
        creditaccount: [34, []],
        debitaccount: [,[]],
        debitamount: [],
        creditamount: [],
        craccname: ['Furniture&Equiments', []],
      //  craccname: ['Purchase Account', []],
        invoiceno: [],
        invoicebalamt: [],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        cashflag: [],
        jrnltype: [11, []],
        jrnlname: ['BusinessCost', []],
        bulkflag: [],
        personid: [],
        persontype: [2, []],
        invoicetype: [3, []],
        paymenttype: [],
        ptrefno: [],
        countryrefid: ['', []],
        companyrefid: [AppComponent.companyID, []],
        branchrefid: [AppComponent.branchID, []],
        locname: [AppComponent.locRefName1, []],
        locrefid: [AppComponent.locrefID1, []],
        salesflag: [0, []],
        calcflag: [0, []],
  
      });
   }

  ngOnInit() {
    this.service.fetchSetupcost(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.SetupcostForm.patchValue(data),this.count = 5
    })
    this.service.fetchSetupcostjrnl(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.setupcostJournal.patchValue(data),alert(JSON.stringify(data))
    })

    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.service.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }
  count: number = 0;
  othersfn() {
    if (this.count > 5) {
      this.notificationsComponent.addToast({ title: 'Message', msg: this.alertmsgs.common.youreachedmaxvalue, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      this.count = 5;
    }
  }

  savesetupcost() {
    this.setupcostJournal.get('creditamount').setValue(this.SetupcostForm.get('totalsetupcost').value)
    this.service.SaveSetupcost(JSON.stringify(this.SetupcostForm.value)).subscribe(data => {
      if (data) {
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.service.saveSetcostJournal(JSON.stringify(this.setupcostJournal.value)).subscribe(data => {
          console.log("Journal Response"+data);
        })
      }
      else {
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })
  }

  addtotalcost(){
    console.log(parseFloat( this.SetupcostForm.get('opencashbalance').value) +"----"+
    parseFloat(this.SetupcostForm.get('buildingcost').value) +"----"+
    parseFloat(this.SetupcostForm.get('advleadsedeposit').value) +"----"+
    parseFloat(this.SetupcostForm.get('regfee').value) +"----"+
    parseFloat(this.SetupcostForm.get('electriclighting').value) +"----"+
    parseFloat( this.SetupcostForm.get('furnishcarpentry').value) +"----"+
    parseFloat( this.SetupcostForm.get('fridge').value) +"----"+
    parseFloat( this.SetupcostForm.get('aircondition').value) +"----"+
    parseFloat(  this.SetupcostForm.get('displayboard').value) +"----"+
    parseFloat( this.SetupcostForm.get('others1').value) +"----"+
    parseFloat(  this.SetupcostForm.get('others2').value) +"----"+
    parseFloat( this.SetupcostForm.get('others3').value) +"----"+
    parseFloat( this.SetupcostForm.get('others4').value) +"----"+
    parseFloat( this.SetupcostForm.get('others5').value ))
    let totalcost = parseFloat( this.SetupcostForm.get('opencashbalance').value) +
    parseFloat(this.SetupcostForm.get('buildingcost').value) +
    parseFloat(this.SetupcostForm.get('advleadsedeposit').value) +
    parseFloat(this.SetupcostForm.get('regfee').value) +
    parseFloat(this.SetupcostForm.get('electriclighting').value) +
    parseFloat( this.SetupcostForm.get('furnishcarpentry').value) +
    parseFloat( this.SetupcostForm.get('fridge').value) +
    parseFloat( this.SetupcostForm.get('aircondition').value) +
    parseFloat(  this.SetupcostForm.get('displayboard').value) +
    parseFloat( this.SetupcostForm.get('others1').value) +
    parseFloat(  this.SetupcostForm.get('others2').value) +
    parseFloat( this.SetupcostForm.get('others3').value) +
    parseFloat( this.SetupcostForm.get('others4').value) +
    parseFloat( this.SetupcostForm.get('others5').value )

    this.SetupcostForm.get('totalsetupcost').setValue(totalcost);
    this.setupcostJournal.get('creditamount').setValue(totalcost);
  }
}
