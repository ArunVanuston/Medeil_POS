import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { BankService } from '../bankreg/bankreg.service';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-viewbank',
  templateUrl: './viewbank.component.html',
  styleUrls: ['./viewbank.component.css'],
  providers: [BankService]
})
export class ViewbankComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  bankflag:boolean=false;
  bankDeposit: FormGroup;
  constructor(public translate: TranslateService,private Service: BankService,private fb:FormBuilder,private dateformat: dateFormatPipe) { translate.setDefaultLang('en'); }
   distributors = [];
  ngOnInit() {
    
    this.translate.use(localStorage.getItem('language'));
    this.bankDeposit = this.fb.group({
      //  debitaccount: [17, []],
        creditaccount: [39, []],
        //  creditaccount: [4, []],
        debitamount: [],
        creditamount: [0,[]],
        craccname: ['Bank Deposit', []],
        bankname:['',[]],
        invoiceno: [],
        invoicebalamt: [0,[]],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        cashflag: [],
        jrnltype: [2, []],
        jrnlname: ['Bank', []],
        bulkflag: ['',[]],
        personid: [],
        personame:['',[]],
        persontype: [, []],
        invoicetype: [, []],
        paymenttype: [],
        ptrefno: [],
        countryrefid: ['', []],
        companyrefid: [AppComponent.companyID, []],
        branchrefid: [AppComponent.branchID, []],
        locname: [AppComponent.locRefName1, []],
        locrefid: [AppComponent.locrefID1, []],
        salesflag: [0, []],
        calcflag: [0, []],
        selectcheck1:[true,[]],
        selectcheck2:[false,[]]
      });
      
    this.bankflag=false;
    this.Service.viewBank(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(
      data => {
        this.data = data
      }
    );

    this.Service.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.distributors = [];
      for (let i = 0; i < data.length; i++) {
        this.distributors.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }

  bankdeposit(){
    this.Service.savePayment(JSON.stringify(this.bankDeposit.value)).subscribe(data => { 
      if(data==1){
        this.bankflag=false;
      }
     },errorCode => console.log(errorCode));  
  }

  getbankdetails(bankid){
    this.bankDeposit.get('bankname').setValue(bankid); 
    this.bankflag=true;
  }

  getdistname(){
    let personval=this.bankDeposit.get('personid').value;
    let subindx=this.distributors.findIndex(p => p.value==personval);
    alert(subindx);
    console.log("name: "+subindx+"---"+this.distributors[subindx].label);
    this.bankDeposit.get('personame').setValue(this.distributors[subindx].label);
  }

  selcheck(event, id: number) {
    if (event.target.checked) {
      if (id == 1) {
        this.bankDeposit.get('selectcheck2').setValue(false);
      }else if(id == 2) {
        this.bankDeposit.get('selectcheck1').setValue(false);
      }
    }
  }


}
