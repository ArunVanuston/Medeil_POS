import { Component, OnInit, ViewChild, ViewEncapsulation, Input, ViewChildren, QueryList, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { style } from '@angular/core/src/animation/dsl';
import { DatePipe } from '@angular/common';
import { SelectComponent } from 'ng-select';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridComponent } from "devextreme-angular";
import { DomSanitizer, SafeUrl, SafeResourceUrl } from "@angular/platform-browser";
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { ManualbillingService } from '../manualbilling.service';

@Component({
  selector: 'app-manualsalesinvoice',
  templateUrl: './manualsalesinvoice.component.html',
  styleUrls: ['./manualsalesinvoice.component.css'],
  providers: [ManualbillingService]
})

export class ManualsalesinvoiceComponent implements OnInit {
  SalesinvoiceForm: FormGroup;
  journalForm: FormGroup;
  receiptForm: FormGroup;
  creditNoteForm: FormGroup;
  selobj: any;
  salesorderid:any;
  /*private SalesinvService: slsInvSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder,
    config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent, private activeroute: ActivatedRoute,private cRef: ChangeDetectorRef,
    private modalService: NgbModal, private domSanitizer: DomSanitizer, private appComponent: AppComponent, private router: Router*/
  constructor(private dateformat: dateFormatPipe, private formBuilder: FormBuilder, private activeroute: ActivatedRoute, config: NgbDropdownConfig,
    private manualservice: ManualbillingService, private appComponent: AppComponent, ) {

    config.autoClose = false;

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, boxdispflag: AppComponent.BoxDispFlag,
      stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

    this.journalForm = this.formBuilder.group({
    //  debitaccount: [2, []],
      creditaccount: [10, []],
      debitamount: [, []],
      creditamount: [, []],
     // draccname: ['Accounts Receivable', []],
      craccname: ['Sales income', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [3, []],
      jrnlname: ['Sales', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [1, []],
      invoicetype: [1, []],
      paymenttype: ['cash', []],
      salesbilltype: [1, []],
      ptrefno: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      salesflag: [0, []],
      calcflag: [0, []],
    });

    this.receiptForm = this.formBuilder.group({
    //  debitaccount: [3, []],
      creditaccount: [2, []],
      debitamount: [, []],
      creditamount: [, []],
     // draccname: ['Cash', []],
      craccname: ['Acc Receivable', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [5, []],
      jrnlname: ['Receipt', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [1, []],
      invoicetype: [1, []],
      paymenttype: ['cash', []],
      ptrefno: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      calcflag: [0, []],
    });

  }

  ngOnInit() {
    this.salesorderid = this.activeroute.snapshot.paramMap.get('soid');
    this.manualservice.GetManualSalesOrdersListByID(this.salesorderid).subscribe(data => {
      alert(this.salesorderid+"---"+JSON.stringify(data));
    });
  }

}

