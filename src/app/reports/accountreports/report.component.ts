
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppComponent } from '../../app.component';
import { Accountservice } from './report.service';
import { dateFormatPipe } from '../..//notifications/notifications.datepipe';
import { AccledgerService } from 'app/accounts/ledger/accledger/accledger.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers: [Accountservice, AccledgerService]
})
export class reportComponent implements OnInit {
  private myForm: FormGroup;
  branchid: any;
  locname: any;
  locrefid: any;
  companyrefid: any;
  status: number = 0;
  country = [];
  state = [];
  city = [];
  countrycode = [];
  varcity;
  reportvar;
  reportvar1;
  pi_date;
  batch_no;
  pi_no;
  distributorId = [];
  dname;
  polist = [];
  varpro: any;
  characters = [];
  charact = [];
  date: any;
  vatno: any;
  batchname: any;
  varbatch: any;
  pinumber = [];


  constructor(private formBuilder: FormBuilder, private Service: AccledgerService, private accservice: Accountservice, private dateformat: dateFormatPipe, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({

      from_date: ['', Validators.required],

      to_date: ['', Validators.required],
      pidate: ['', Validators.required],
      batchno: ['', Validators.required],
      pino: ['', Validators.required],
      countryid: ['', []],
      stateid: ['', []],
      city: ['', []],
      countrycode: ['', []],
      distname: ['', []],
      productid: ['', []],
      vat: ['', []],
      batchid: ['', []],
      distributors: ['', []],
      customerid: ['', []]

    });


    this.branchid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
    this.companyrefid = AppComponent.companyID;
    this.date = AppComponent.date;
    this.date = [this.dateformat.transform05(Date.now())];
    this.reportvar = this.myForm.get("from_date").value;
    this.reportvar1 = this.myForm.get("to_date").value;
    this.batch_no = this.myForm.get("batchno").value;
    this.pi_no = this.myForm.get("pino").value;
    this.myForm.get('distname').setValue('opt1');
    this.myForm.get('countryid').setValue("0");
    this.myForm.get('stateid').setValue("0");
    this.myForm.get('city').setValue("0");
    this.myForm.get('countrycode').setValue("0");
    this.myForm.get('productid').setValue("0");

    this.accservice.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error Occured getCountry()');
      });


    this.accservice.getProductlist(this.companyrefid, this.branchid, AppComponent.shopID, this.locrefid, this.locname).subscribe(data => this.polist = data,
      err => {
        console.log('Error Occured On getProductlist()');
      }
    );


    this.dname = this.accservice.getDistributorInfo().subscribe(data => this.distributorId = data,
      err => {
        console.log('Error Occured ');




      });

    this.Service.getCustomer(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.customers = [];
      for (let i = 0; i < data.length; i++) {
        this.customers.push({ value: data[i][0], label: data[i][1] });
      }
    });

    this.Service.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.distributors = [];
      for (let i = 0; i < data.length; i++) {
        this.distributors.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }
  distributors: any;
  customers: any;
  getDistributor() {
    this.dname = this.myForm.get("distname").value;
  }
  setDateRange(): void {
    // Set date range (today) using the patchValue function
    let date = new Date();
    this.myForm.patchValue({
      from_date: {
        beginDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        endDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
    let date2 = new Date();
    this.myForm.patchValue({
      to_date: {
        beginDate: {
          year: date2.getFullYear(),
          month: date2.getMonth() + 1,
          day: date2.getDate()
        },
        endDate: {
          year: date2.getFullYear(),
          month: date2.getMonth() + 1,
          day: date2.getDate()
        }
      }
    });

    let date3 = new Date();
    this.myForm.patchValue({
      pidate: {
        beginDate: {
          year: date3.getFullYear(),
          month: date3.getMonth() + 1,
          day: date3.getDate()
        },
        endDate: {
          year: date3.getFullYear(),
          month: date3.getMonth() + 1,
          day: date3.getDate()
        }
      }
    });

  }

  datefetch() {
    this.reportvar = this.myForm.get("from_date").value;
    this.reportvar1 = this.myForm.get("to_date").value;
  }

  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  payment() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Payment/payment.rptdesign&LocName=" + this.locname + "&Locrefid=" + this.locrefid + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  receipt() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Receipt/receipt.rptdesign&LocName=" + this.locname + "&LocRefId=" + this.locrefid + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  balancesheet() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/BalanceSheet.rptdesign&locname=" + this.locname + "&locrefid=" + this.locrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  daybook() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/DailyCashReport.rptdesign&companyrefid=" + this.companyrefid + "&branchrefid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  plstatement() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/ProfitLossReport.rptdesign&locname=" + this.locname + "&locrefid=" + this.locrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
  trialstatement() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/TrialBalanceReport.rptdesign&locname=" + this.locname + "&locrefid=" + this.locrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  debitamount() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/DebitNote/debitnote.rptdesign&companyrefid=" + this.companyrefid + "&branchrefid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  creditamount() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/CredtNote/creditnote.rptdesign&companyrefid=" + this.companyrefid + "&branchrefid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  cashmovement() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/cashmovement.rptdesign&locname=" + this.locname + "&locrefid=" + this.locrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  customerledger() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/customerledger.rptdesign&locname=" + this.locname + "&locrefid=" + this.locrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&personid=" + this.myForm.get("customerid").value + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  distributorledger() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/distributorledger.rptdesign&locname=" + this.locname + "&locrefid=" + this.locrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&personid=" + this.myForm.get("distributors").value + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  openclosing() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/openclosereport.rptdesign&companyrefid=" + this.companyrefid + "&branchrefid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
}

