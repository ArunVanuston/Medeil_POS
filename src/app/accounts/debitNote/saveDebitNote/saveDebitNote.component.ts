
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { saveDebitNoteService } from './saveDebitNote.service';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate'


@Component({
  selector: 'app-patientedit',
  templateUrl: './saveDebitNote.component.html',

  providers: [saveDebitNoteService, NotificationsComponent]

})
export class saveDebitNoteComponent implements OnInit {

  debitnote: FormGroup;
  typelist = [];
  itemlength = [{}, {}, {}, {}, {}];
  saveprocess: boolean = false;
  parentMessage = 'sales';
  constructor(public translate: TranslateService,private formBuilder: FormBuilder, private userService: saveDebitNoteService, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private router: Router) {
    translate.setDefaultLang('en');
    this.debitnote = this.formBuilder.group({
     // debitaccount: [2, []],
      creditaccount: [20, []],
      debitamount: ['', []],
      creditamount: ['', []],
     // draccname: ['Accounts  Receivable', []],
      craccname: ['Purchase Return', []],
      invoiceno: ['opt1', []],
      invoicebalamt: ['', []],
      clientcdate: [this.dateformat.transform05(Date.now()), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: ['', []],
      jrnltype: [7, []],
      jrnlname: ['DebitNote', []],
      bulkflag: ['', []],
      personid: ['', []],
      persontype: [1, []],
      invoicetype: ['opt1', []],
      paymenttype: ['opt1', []],
      ptrefno: ['', []],
      createdby: ['', []],
      locrefid: [AppComponent.locrefID1, []],
      locname: [AppComponent.locRefName1, []],
      countryrefid: [AppComponent.countryID, []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      salesflag: [1, []],
      calcflag: [0, []],
      personame: ['', []],
      vendorid: ['', []],
      invoicename: ['', []],
      remarks: ['', []],
      invoicedetails: this.formBuilder.array([
      ])
    })
  }

  ngOnInit() { this.translate.use(localStorage.getItem('language')); }

  getinvoicetype() {
    this.userService.invoicetype(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.debitnote.get('invoicetype').value).subscribe(
      data => this.typelist = data
    )
  }

  getinvoicedetails() {
    this.userService.invoicedetails(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.debitnote.get('invoiceno').value, this.debitnote.get('invoicetype').value).subscribe(
      data => this.invoicetabledetails(data)
    )
  }

  invoicetabledetails(data) {
    const getData = <FormArray>this.debitnote.controls['invoicedetails'];
    getData.controls = [];
    if (data != null || undefined) {
      for (let p = 0; p < data.length; p++) {
        getData.push(this.fetchtabledata(
          data[p][0],
          data[p][1],
          data[p][2],
          data[p][3]
        ))
      }
    }
  }

  fetchtabledata(custname: any, amt: any, invoice: any, venid: any) {
    return this.formBuilder.group({
      personame: custname,
      creditamount: amt.toFixed(2),
      debitamount: (0).toFixed(2),
      invoicename: invoice,
      vendorid: venid
    })
  }

  validation(){

    if(this.debitnote.get('invoicetype').value=='opt1' || this.debitnote.get('invoicetype').value== null || this.debitnote.get('invoicetype').value== undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Return Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    else if(this.debitnote.get('invoiceno').value=='opt1' || this.debitnote.get('invoiceno').value== null || this.debitnote.get('invoiceno').value== undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Invoice Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    else if(this.debitnote.get('paymenttype').value=='opt1' || this.debitnote.get('paymenttype').value== null || this.debitnote.get('paymenttype').value== undefined){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Payment Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    } 

    return true;
  }

  onSubmit() {
    let validationresponse=this.validation();

    if (validationresponse){
    const control = <FormArray>this.debitnote.controls['invoicedetails'];
    let setData = control.value;
    for (let v = 0; v < setData.length; v++) {
      this.debitnote.get('personame').setValue(setData[v].personame)
      this.debitnote.get('creditamount').setValue(setData[v].creditamount)
      this.debitnote.get('debitamount').setValue(setData[v].debitamount)
      this.debitnote.get('personid').setValue(setData[v].vendorid)
      this.debitnote.get('invoicename').setValue(setData[v].invoicename)
    }
   this.saveprocess = true;
    this.userService.savedebitnote(JSON.stringify(this.debitnote.value)).subscribe(
      data => {
        if (data == 1) {
          this.saveprocess = false;
          this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Data Saved Successfully.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          setTimeout(() => {
            this.router.navigate(['DebitNote/ViewDebitNote']);
          }, 3500);
        }
        else {
          this.saveprocess = false;
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },
      error => console.log("Error occurs in savedebitnote()"))
  }

  }  //ValidationIf close

}