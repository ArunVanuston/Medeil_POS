import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { accountsSaveService } from 'app/accounts/accounts/accountsSave/accountsSave.service';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { AccledgerService } from './accledger.service';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-accledger',
  templateUrl: './accledger.component.html',
  styleUrls: ['./accledger.component.css'],
  providers: [AccledgerService, accountsSaveService]
})
export class AccledgerComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  ledgerform: FormGroup;
  selecteditem: any;
  gifFail: boolean = true;
  parentMessage = 'sales';
  fixedlength:any;
  aboveflag:any;
  belowflag:any;
  constructor(public translate: TranslateService,private Service: AccledgerService, private accservice: accountsSaveService, private formbuilder: FormBuilder, private dateformat: dateFormatPipe) { translate.setDefaultLang('en');
    this.ledgerform = this.formbuilder.group({
      customerid: ['', []], vendorid: ['', []]
    })
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.accservice.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      if (data[0][1] == 1) {
        this.fixedlength = 3;
      } else { this.fixedlength = 2 }

      if (data[0][2] == 1) {
        this.aboveflag = 1;
      } else { this.aboveflag = 0 }

      if (data[0][3] == 1) {
        this.belowflag = 1;
      } else { this.belowflag = 0 }
      this.getDistributors();
      this.getCustomers();
      this.getLedgerdetails();
    });
  }
  showdist: any;
  status: number = 0;
  persontype:number=0;
  getledgertype(event) {

    if (event == 2) {
      this.showdist = 1;
      this.status = 1;
      this.persontype=2;

    } else if (event == 1) {
      this.showdist = 2;
      this.status = 1;
      this.persontype=1;
    } else {
      this.showdist = 0;
      this.status = 0;
      this.getLedgerdetails();
    }
  }
  distributors = [];
  getDistributors() {
    this.Service.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.distributors = [];
      for (let i = 0; i < data.length; i++) {
        this.distributors.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }
  customers = [];
  getCustomers() {
    this.Service.getCustomer(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.customers = [];
      for (let i = 0; i < data.length; i++) {
        this.customers.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }

  totalreturndebit:any=0;
  totalreturncredit:any=0;
  totdebit:any=0;
  totcredit:any=0;
  totbal:any=0;
  finalbalance:any=0;
  getLedgerdetails() {
    if (this.showdist == 1) {
      console.log(this.ledgerform.get('vendorid').value);
      this.Service.getLedger(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.dateformat.transform05(Date.now()), this.ledgerform.get('vendorid').value, this.status, this.persontype).subscribe(data => {
        this.data = data;
        this.gifFail = false;
        var totaldebit=0;
        var totalcredit=0;
        var totalbal=0;
        for(let p=0;p<data.length;p++){
          totaldebit += parseFloat(data[p][3]);
          totalcredit += parseFloat(data[p][4]);
          totalbal += parseFloat(data[p][11]);
        }
        this.totdebit=totaldebit;
        this.totcredit=totalcredit;
        this.totbal=totalbal;
      });

      setTimeout(() => {
        this.Service.getTotalReturnDebit(AppComponent.locrefID1, this.ledgerform.get('vendorid').value).subscribe(data => {
          this.totalreturndebit = data;
          console.log(this.totbal+this.totalreturndebit);
          this.finalbalance=parseFloat(this.totbal)-parseFloat(this.totalreturndebit);
        })
      }, 1200);
     
    } else if (this.showdist == 2) {
      console.log(this.ledgerform.get('customerid').value);
      this.Service.getLedger(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.dateformat.transform05(Date.now()), this.ledgerform.get('customerid').value, this.status, this.persontype).subscribe(data => {
        this.data = data;
        this.gifFail = false;
        var totaldebit=0;
        var totalcredit=0;
        var totalbal=0;
        for(let p=0;p<data.length;p++){
          totaldebit += parseFloat(data[p][3]);
          totalcredit += parseFloat(data[p][4]);
          totalbal += parseFloat(data[p][11]);
        }
        this.totdebit=totaldebit;
        this.totcredit=totalcredit;
        this.totbal=totalbal;
      
      });
      setTimeout(() => {
        this.Service.getTotalReturnCredit(AppComponent.locrefID1, this.ledgerform.get('customerid').value).subscribe(data => {
          this.totalreturncredit = data;
          console.log(this.totbal+this.totalreturncredit);
          this.finalbalance=parseFloat(this.totbal)-parseFloat(this.totalreturncredit);
        })
      }, 1200);
     
    } else {
      this.Service.getLedger(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.dateformat.transform05(Date.now()), 0, this.status, this.persontype).subscribe(data => {
        this.data = data;
          this.gifFail = false;
      })
    }
  }

}
