import { Component, OnInit, ViewChild, ViewEncapsulation, Input, ViewChildren, QueryList, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridComponent } from "devextreme-angular";
import { DomSanitizer, SafeUrl, SafeResourceUrl } from "@angular/platform-browser";
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { style } from '@angular/core/src/animation/dsl';
import { Url } from 'url';
import Quagga from 'quagga';
import { DatePipe } from '@angular/common';
import { SelectComponent } from 'ng-select';
import { slsInvSaveService } from 'app/sales/salesinvoice/multisalesinvoice/multisalesinvoiceservice';
import { ManualbillingService } from '../manualbilling.service';
declare var PushNotifications:any;
// const beamsClient = new PushNotifications.Client({
//   instanceId: 'abd8d745-cac2-4eee-b2fe-2d34feb33254',});
@Component({
  selector: 'app-manualinvoiceadmin',
  templateUrl: './manualinvoiceadmin.component.html',
  providers:[slsInvSaveService,ManualbillingService]
})

export class ManualinvoiceadminComponent implements OnInit {
  

  parentMessage="sales";
  @ViewChild('custfocus') custfocus: SelectComponent;
  @ViewChild('drugfocus') drugfocus: ElementRef;
  @ViewChild('doctorfocus') doctorfocus: ElementRef;
  @ViewChild('qtyfocus') qtyfocus: ElementRef;
  @ViewChild('barcodefocus') barcodefocus: ElementRef;
  @ViewChild('receivebalfocus') receivebalfocus: ElementRef;
  @ViewChild('saveprintfocus') saveprintfocus: ElementRef;
  @ViewChild('prescpathclear') prescpathclear: ElementRef;
  @ViewChild('speechhide') speechhide;
  // dummyset:boolean=false;

  ManualinvoiceForm: FormGroup;
  journalForm: FormGroup;
  receiptForm: FormGroup;
  //cashManageForm: FormGroup;
  creditNoteForm: FormGroup;
  selobj: any;

  showrefilltext: boolean = false;
  discableflag:boolean=true;
  searcheddrugvalues = [];
  salesinvcustomers = [];
  salesordercustomers = [];
  salesorders = [];
  doctorslist = [];
  itemlength=[{},{},{},{},{},{},{}]
  newprodlength=[{},{},{},{},{}]
  /*Senior flags & Nos set */
  seniorflag: any;
  phycapflag: any;

  /*Previous Amount set */
  prevamount: any = 0.00;

  /*Prescription Uploads */
  prescphoto: File;
  showprescimage: boolean = false;
  searcheddrugvalueslength:any=0;
  //convert sales invoice from sales order history
  convertinvoicedetails: boolean = false;
  atcprocess: boolean = false;
  homedelivery: boolean = false;


  //For Subdrugdata usage
  replaceindex: any;
  subdrug: boolean = false;

  constructor(private SalesinvService: slsInvSaveService, private manualservice: ManualbillingService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder,
    config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent, private route: ActivatedRoute,private cRef: ChangeDetectorRef,
    private modalService: NgbModal, private domSanitizer: DomSanitizer, private appComponent: AppComponent, private router: Router) {

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
      salesbilltype: [2, []],
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

  convertsalesid: any;
  refillsalesid: any;
  refillcustid: any;
  taxid: number=0;
  taxgstid: number = 0;
  fixedlength:number=2;
  belowflag:number=0;
  aboveflag:number=0;
  inputfrom:number=1;
  manualordercustomers:any=[];
  manualinvcustomers:any=[];
  servicecustomers:any=[];
  sacsectionlist:any=[];
  sacgrouplist:any=[];
  saclist:any=[];
  ngOnInit() {
    this.ManualinvoiceForm = this.formBuilder.group({

      /*Basic Deatils */
      billdate: [this.dateformat.transformnew(Date.now()), []],
      customerrefid: ['', []],
      customername:['',[]],
      productname:['',[]],
      email:['',[]],
      phonenumber:['',[]],
      countryid:['',[]],
      domainid:['',[]],
      subdomainid:['',[]],
      editionid:['',[]],
      planid:['',[]],
      planname:['',[]],
      planamount:['',[]],
      roleid:['',[]],
      totalitems:[1,[]],    //qty
      description:['',[]],
      //SAC Service
      sacsectioncode:['opt1',[]],
      sacgroupcode:['opt1',[]],
      saccode:['opt1',[]],
      //Amount fields
      paidamount: [(0).toFixed(this.fixedlength), []],   //Received Amount
      balanceamount: [(0).toFixed(this.fixedlength), []],
      grandtotal: [(0).toFixed(this.fixedlength), []],
      totalamount: [(0).toFixed(this.fixedlength), []],
      totaldiscount: [(0).toFixed(this.fixedlength), []],
      /*Basic Deatils */
      employeerefid: [sessionStorage.getItem('indvuserid'), []],
      barcodeval: [, []],
      salesorderrefid: [0, []],
      doctorrefid: [0, []],
      formqty: [, []],
      /*for Search Select options */
      searchcheck: [1, []],
      //genericsearchcheck: [0, []],

      /*Payments Detsils */
      totaltaxamt: [(0).toFixed(this.fixedlength), []],
      subtotal: [(0).toFixed(this.fixedlength), []],  //subtotal value
      totalqty: [0, []],
     
      /* Flags Set  */
      //salestyperefid: [1, []],
      vatdispflag: [this.taxid, []],
      salesbilltype: [2, []],
      //norfreeflag: [0, []],

      /*Payment Mode */
      // cashcheck: [true, []],
      // creditcheck: [false, []],
      // debitcheck: [false, []],
      // multiplecheck: [false, []],
      cashamt: [0.00, []],
      creditcardamt: [0.00, []],
      debitcardamt: [0.00, []],
      paymentmode: [1, []],
      paymenttype: ['Cash', []],
    
     
      /*Login Details */
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      clientcdate: [this.dateformat.transform04(), []],
      createdby: [sessionStorage.getItem('indvuserid'), []],

  
      /*form arrays Tables*/
      vanproduct: this.formBuilder.array([])
      // newproduct: this.formBuilder.array([]),
      // dummyfields: this.formBuilder.array([]),
      // duepaytable:this.formBuilder.array([]),
      // refillliststable:this.formBuilder.array([])
    });

    this.manualservice.GetPaidSalesOrderList().subscribe(data => {
      this.bindmanualordercustomers(data);
    });

    setTimeout(() => {
      this.manualservice.getadminproducts().subscribe(data =>{
        if(data.length > 0) {
          this.searcheddrugvalues = data;
          this.searcheddrugvalueslength = 0;
        }else{
          this.searcheddrugvalueslength = 0;
          //this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          //this.drugfocus.nativeElement.value = "";
        }
      },error => { console.log(error); });
    },1300);

    /*//for direct convert sales invoice from salesorder history
    this.convertsalesid = this.route.snapshot.paramMap.get('id');
    
    //Direct Refill Invoice
    this.refillsalesid = this.route.snapshot.paramMap.get('rinvid');
    this.refillcustid = this.route.snapshot.paramMap.get('rcustid');*/
  
    //for clear printed values
    // this.productnameref = '';
    // this.qtyref = 0;
    // this.prevamount = (0).toFixed(this.fixedlength);;
    // this.selectpaymode=1;
    this.inputfrom=1;
    this.discableflag=true;
    this.receivebalfocus.nativeElement.disabled=false;
  }

  onNavigate(){
    // // window.open("https://rzp.io/l/gTfp5u8WR", "_blank");
  
    //const PushNotifications = require('@pusher/push-notifications-server');
    const beamsClient = new PushNotifications.Client({
          instanceId: 'abd8d745-cac2-4eee-b2fe-2d34feb33254',
    });
    // let beamsClient = new PushNotifications({
    //   instanceId: 'YOUR_INSTANCE_ID_HERE',
    //   secretKey: 'YOUR_SECRET_KEY_HERE'
    // });
    
    beamsClient.start()
      .then(beamsClient => beamsClient.getDeviceId())
      .then(deviceId =>
        console.log('Successfully registered with Beams. Device ID:', deviceId)
      )
      .catch(console.error);
  }

  salesinvorderchanges(indexval){
    // this.ManualinvoiceForm.get('salesbilltype').setValue(indexval);
    // this.ManualinvoiceForm.get('customerrefid').setValue('');
    // this.ManualinvoiceForm.get('grandtotal').setValue((0).toFixed(this.fixedlength));
    this.ManualinvoiceForm.patchValue({
      salesbilltype:indexval,
      customerrefid:'',
      totaldiscount: (0).toFixed(this.fixedlength),
      totaltaxamt: (0).toFixed(this.fixedlength),
      subtotal: (0).toFixed(this.fixedlength),    //Subtotal
      grandtotal: (0).toFixed(this.fixedlength),
      totalitems: 0,  //total Products
      totalqty: 0     //total Qty
    })
    const control = <FormArray>this.ManualinvoiceForm.controls['vanproduct'];
    control.controls=[];
    if(indexval==1){
      this.manualservice.searchallpaidcustomers().subscribe(data => {
        this.bindmanualinvcustomers(data);
      });
    }else if(indexval==3){
      this.manualservice.searchservicecustomers().subscribe(data => {
        this.bindservicecustomers(data);
      });
      setTimeout(() => {
        this.manualservice.getsacsectionlist().subscribe(data => {
          this.sacsectionlist=data;
        });
      }, 1500);
    }
  }

  bindmanualordercustomers(data){
    this.manualordercustomers = [];
    for (let i = 0; i < data.length; i++) {
      this.manualordercustomers.push({ value: data[i][1], label:data[i][2]+' - '+data[i][4]+' - '+data[i][5],  
      countryid:data[i][3],customerid:data[i][0],customername:data[i][2],phoneno:data[i][5],emailid:data[i][4],
      editionid:data[i][6],roleid:data[i][7], planid:data[i][8],domainid:data[i][9],subdomainid:data[i][10], 
      verticalid:data[i][1],ranking:data[i][12],shopname:data[i][13],planpaidamount:data[i][15],plandiscount:data[i][16]});
    }
  }
  
  manualcustcountryname:any;
  cusemail: any;
  getsordercustomerinfo() {
    let custid = this.ManualinvoiceForm.get('customerrefid').value;
    let subindx= this.manualordercustomers.findIndex(p => p.value==custid);
    let custcountryid=this.manualordercustomers[subindx].countryid;
    var taxpercent=0;
    if(custcountryid==291){
      this.taxid=1;
      taxpercent=18;
    }else{this.taxid=0;  taxpercent=0};

    this.manualservice.GetManualPlanDetails(this.manualordercustomers[subindx].planid).subscribe(plandata => {
      this.ManualinvoiceForm.patchValue({
        //customerrefid:this.manualordercustomers[subindx].customerid,
        customername:this.manualordercustomers[subindx].customername,
        email:this.manualordercustomers[subindx].emailid,
        phonenumber:this.manualordercustomers[subindx].phoneno,
        countryid:this.manualordercustomers[subindx].countryid,
        domainid:this.manualordercustomers[subindx].domainid,
        subdomainid:this.manualordercustomers[subindx].subdomainid,
        editionid:this.manualordercustomers[subindx].editionid,
        planid:this.manualordercustomers[subindx].planid,
        planname:plandata[0][0],
        planamount:parseFloat(plandata[0][1]).toFixed(2),
        subtotal:parseFloat(plandata[0][1]).toFixed(2),
        grandtotal:parseFloat(this.manualordercustomers[subindx].planpaidamount).toFixed(2),
        totalamount:parseFloat(plandata[0][1]).toFixed(2),
        totaldiscount:parseFloat(this.manualordercustomers[subindx].plandiscount).toFixed(2),
        roleid:this.manualordercustomers[subindx].roleid,
        productname:plandata[0][0]
      });

      const control = <FormArray>this.ManualinvoiceForm.controls['vanproduct'];
      control.controls=[];
      let setData = control.value;
      control.insert(0, this.formBuilder.group({
        productid:this.manualordercustomers[subindx].planid,
        productname:plandata[0][0],
        indvqty:1,
        unitdiscount:parseFloat(this.manualordercustomers[subindx].plandiscount).toFixed(2),
        unitprice:parseFloat(plandata[0][1]).toFixed(2),
        unitvat:(taxpercent).toFixed(2),
        unitgst:(taxpercent).toFixed(2),
        unitcgst:(taxpercent/2).toFixed(2),
        unitsgst:(taxpercent/2).toFixed(2),
        subtotal:(0).toFixed(2),
        remarks:'',
        /*Login Details */
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        clientcdate: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        countryrefid: [this.selobj.countryrefid, []],
      }));
    
      // this.SalesinvService.GetManualInvoiceCustInfo(custcountryid).subscribe(data => { 
      //   this.manualcustcountryname=data[0][1];
      // },
      // error => {
      //   console.log(error)
      //   this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      // });
    });
  }

  //Service Based
  getsacgroup(sectionid){
    this.manualservice.getsacgrouplist(sectionid).subscribe(data => {
      this.sacgrouplist=data;
    });
  }

  getsacsection(groupid){
    this.manualservice.getsaclist(this.ManualinvoiceForm.get('sacsectioncode').value,groupid).subscribe(data => {
      this.saclist=data;
    });
  }

  bindservicecustomers(data){
    this.servicecustomers = [];
    for (let i = 0; i < data.length; i++) {
      this.servicecustomers.push({ value: data[i].id, label:data[i].patientfirstname+' - '+data[i].email+' - '+data[i].mobile,  
      address1:data[i].address1,age:data[i].age, city:data[i].city, country:data[i].country, state:data[i].state, email:data[i].email,
      tinno:data[i].tinno, vatno:data[i].vatno,customername:data[i].patientfirstname,mobile:data[i].mobile,phone:data[i].phone});
    }
  }

  saccustomer(){
      let custid = this.ManualinvoiceForm.get('customerrefid').value;
      let subindx= this.servicecustomers.findIndex(p => p.value==custid);
      let custcountryid=this.servicecustomers[subindx].country;
      if(custcountryid==291){
        this.taxid=1;
      }else{this.taxid=0};

      this.ManualinvoiceForm.patchValue({
        customername:this.servicecustomers[subindx].customername,
        email:this.servicecustomers[subindx].email,
        phonenumber:this.servicecustomers[subindx].mobile,
        countryid:this.servicecustomers[subindx].countryid,     
      });
  }

  insertsacproducts(){
    let saccode=this.ManualinvoiceForm.get('saccode').value;
    let subindx= this.saclist.findIndex(p => p[0]==saccode);
    if(this.taxid==1){
      this.taxpercentcalc=this.saclist[subindx][4];
    }else{
      this.taxpercentcalc=0;
    }
    
    const control = <FormArray>this.ManualinvoiceForm.controls['vanproduct'];
      let setData = control.value;
      control.insert(0, this.formBuilder.group({
        productid:saccode,
        productname:this.saclist[subindx][1],
        indvqty:1,
        unitdiscount:(0).toFixed(2),
        unitprice:(0).toFixed(2),
        unitvat:parseFloat(this.taxpercentcalc).toFixed(2),
        unitgst:parseFloat(this.taxpercentcalc).toFixed(2),
        unitcgst:(this.taxpercentcalc/2).toFixed(2),
        unitsgst:(this.taxpercentcalc/2).toFixed(2),
        subtotal:(0).toFixed(2),
        remarks:'',
        /*Login Details */
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        clientcdate: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        countryrefid: [this.selobj.countryrefid, []],
      }));
    
      setTimeout(() => {
        this.ManualinvoiceForm.get('sacsectioncode').setValue('opt1');
        this.ManualinvoiceForm.get('sacgroupcode').setValue('opt1');
        this.ManualinvoiceForm.get('saccode').setValue('opt1');
      }, 1000);
  }

    /*Calculations */
    i:any;
    calculation() {
      const control = <FormArray>this.ManualinvoiceForm.controls['vanproduct'];
      let setData = control.value;

      //for clear claculation values if no products to show in table
      if (setData.length <= 0) {
        control.patchValue(setData);
        this.ManualinvoiceForm.patchValue({
          totaldiscount: (0).toFixed(this.fixedlength),
          totaltaxamt: (0).toFixed(this.fixedlength),
          subtotal: (0).toFixed(this.fixedlength),    //Subtotal
          grandtotal: (0).toFixed(this.fixedlength),
          totalitems: setData.length,  //total Products
          totalqty: totalqty     //total Qty
        })
      }
     
      var utprice: number = 0;
      var unitqty: number = 0;
      var totalqty: number = 0;
      var subtotal: number = 0;
      var totprice: number = 0;
      var discprice: number = 0;
      var prevat: number = 0;
      var pregst: number = 0;
      var presgst: number = 0;
      var precgst: number = 0;
      var prodisc: number = 0;
      var grandtotal: any = 0;
      var totaltaxamount:any=0;
      var discamnt:number=0;

      for (this.i = 0; this.i <= setData.length; this.i++) {
          unitqty =parseInt(setData[this.i].indvqty);
          utprice = parseFloat(setData[this.i].unitprice);
          prevat = parseInt(setData[this.i].unitvat);
          pregst = parseInt(setData[this.i].unitgst);
          presgst = parseInt(setData[this.i].unitsgst);
          precgst = parseInt(setData[this.i].unitcgst);
          prodisc = parseInt(setData[this.i].unitdiscount);
          totalqty += unitqty;
          discamnt +=prodisc;
          totprice = unitqty * utprice;
          discprice=totprice-prodisc;
          setData[this.i].subtotal = totprice.toFixed(this.fixedlength);//Per Product Total amount in Table.
          //setData[this.i].unitprice = utprice.toFixed(this.fixedlength);
          if(this.taxid == null && this.taxid == 0){
           totaltaxamount=0.00;
          }else{
            totaltaxamount += (totprice*18)/100;
          }
          
          subtotal += totprice;
          grandtotal += discprice;
          /* Push or Insert Calculation Values on Form*/
          control.patchValue(setData);
          this.ManualinvoiceForm.patchValue({
            totaldiscount: discamnt.toFixed(this.fixedlength),
            totaltaxamt: totaltaxamount.toFixed(this.fixedlength),
            subtotal: subtotal.toFixed(this.fixedlength),    //Subtotal
            grandtotal: grandtotal.toFixed(this.fixedlength),
            totalitems: setData.length,  //total Products
            totalqty: totalqty,     //total Qty
          })
      }
    }

  productsearch: boolean = true;
  drugsearchid:number=1;
  //get Searched Drug Datas
  searchdrug(searchvalue) {
    this.inputfrom=1;
    let customerid = this.ManualinvoiceForm.get('customerrefid').value;
    // this.selectedIndex = -1;
    // this.selecteddrug = '';
    if (searchvalue.length > 0) {
      if (customerid == 0 || customerid == null || customerid == undefined) {
        this.drugfocus.nativeElement.value = "";
        this.drugfocus.nativeElement.focus();
        this.searcheddrugvalueslength = 0;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First you Select Customer', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }else{
        this.searcheddrugvalueslength = 1;
      }
    }else {
      this.searcheddrugvalueslength = 0;
    }
  }

  bindmanualinvcustomers(data){
    this.manualinvcustomers = [];
    for (let i = 0; i < data.length; i++) {
      this.manualinvcustomers.push({ value: data[i].id, label:data[i].customername+' - '+data[i].emailid+' - '+data[i].phoneno,  
      editionid:data[i].editionrefid,roleid:data[i].rolerefid, planid:data[i].planid, countryid:data[i].countryrefid, domainid:data[i].domainrefid, emailid:data[i].emailid,
      subdomainid:data[i].subdomainrefid, verticalid:data[i].verticalid,customername:data[i].customername,phoneno:data[i].phoneno});
    }
  }

  taxpercentcalc:any=0;
  getinvcustomerinfo() {
    let custid = this.ManualinvoiceForm.get('customerrefid').value;
    let subindx= this.manualinvcustomers.findIndex(p => p.value==custid);
    let custcountryid=this.manualinvcustomers[subindx].countryid;
    this.taxpercentcalc=0;
    if(custcountryid==291){
      this.taxid=1;
      this.taxpercentcalc=18;
    }else{this.taxid=0;  this.taxpercentcalc=0};

    this.manualservice.GetManualPlanDetails(this.manualinvcustomers[subindx].planid).subscribe(plandata => {
      this.ManualinvoiceForm.patchValue({
        customername:this.manualinvcustomers[subindx].customername,
        email:this.manualinvcustomers[subindx].emailid,
        phonenumber:this.manualinvcustomers[subindx].phoneno,
        countryid:this.manualinvcustomers[subindx].countryid,
        domainid:this.manualinvcustomers[subindx].domainid,
        subdomainid:this.manualinvcustomers[subindx].subdomainid,
        editionid:this.manualinvcustomers[subindx].editionid,
        planid:this.manualinvcustomers[subindx].planid,
        planname:plandata[0][0],
        planamount:parseFloat(plandata[0][1]).toFixed(2),
        grandtotal:parseFloat(plandata[0][1]).toFixed(2),
        totalamount:parseFloat(plandata[0][1]).toFixed(2),
        roleid:this.manualinvcustomers[subindx].roleid,
        productname:plandata[0][0]
      });

     
     this.drugfocus.nativeElement.focus();
      // this.SalesinvService.GetManualInvoiceCustInfo(custcountryid).subscribe(data => { 
      //   this.manualcustcountryname=data[0][1];
      // },
      // error => {
      //   console.log(error)
      //   this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      // });
    });
  }
  drugidcopy: any;
  batchidcopy: any;
  productnameref: any;
  qtyref: number = 0;
  selecteddrugdata(drugdata) {
      const control = <FormArray>this.ManualinvoiceForm.controls['vanproduct'];
      let setData = control.value;
      control.insert(0, this.formBuilder.group({
        productid:drugdata[8],
        productname:drugdata[0],
        indvqty:1,
        unitdiscount:(0).toFixed(2),
        unitprice:parseFloat(drugdata[3]).toFixed(2),
        unitvat:(this.taxpercentcalc).toFixed(2),
        unitgst:(this.taxpercentcalc).toFixed(2),
        unitcgst:(this.taxpercentcalc/2).toFixed(2),
        unitsgst:(this.taxpercentcalc/2).toFixed(2),
        subtotal:(0).toFixed(2),
        remarks:'',
        /*Login Details */
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        clientcdate: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        countryrefid: [this.selobj.countryrefid, []],
      }));
     
      this.hidedrugs();
  }

 
  // press Enter button load products in grid table
  hidedrugs() {
    this.searcheddrugvalueslength = 0;
    this.drugfocus.nativeElement.value = "";
    this.drugfocus.nativeElement.focus();
    //this.qtyfocus.nativeElement.focus();
  }

 
  //Remove Select or Checked Row in Table
  removerow(indexid) {
    const control = <FormArray>this.ManualinvoiceForm.controls['vanproduct'];
    control.removeAt(indexid);
    this.replaceindex = '';
    this.calculation();
  }


  calbalance() {
    let grtotal = parseFloat(this.ManualinvoiceForm.get('grandtotal').value);
    let received = parseInt(this.ManualinvoiceForm.get('paidamount').value);
    let balance = received - grtotal;
    //let currentbilldue=received-grtotal;
    let nancheck=isNaN(balance);
    if(nancheck){
      this.ManualinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
    }else{
      this.ManualinvoiceForm.get('balanceamount').setValue((balance).toFixed(this.fixedlength));
    }
    if (balance < 0) {
      let prevbal = -(balance);
      this.ManualinvoiceForm.get('paidamount').setValue((0).toFixed(this.fixedlength));
      this.ManualinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
      //let balalert = "Debts Amount:" + ((prevbal).toFixed(this.fixedlength));
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Paid Amount will be less than Grand Total', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    this.saveprintfocus.nativeElement.focus();
  }

  cashpay: number = 0;
  creditpay: number = 0;
  debitpay: number = 0;
  payments: boolean = false;
  //Set Check PaymentMode 
  selectpaymode:number=1;
  setpaymentmode(paymentid) {
    let gtotal=this.ManualinvoiceForm.get('grandtotal').value
    if(gtotal>=1){
      this.selectpaymode=paymentid;
      this.ManualinvoiceForm.get('paidamount').setValue((0).toFixed(this.fixedlength));
      this.ManualinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
      if (paymentid == 1) {
        this.ManualinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        this.receivebalfocus.nativeElement.disabled=false;
        this.receivebalfocus.nativeElement.focus();
        this.ManualinvoiceForm.get('paymentmode').setValue(1);
        this.ManualinvoiceForm.get('paymenttype').setValue('Cash');
      } else if (paymentid == 2) {
        this.ManualinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        this.receivebalfocus.nativeElement.disabled=false;
        this.receivebalfocus.nativeElement.focus();
        this.ManualinvoiceForm.get('paymentmode').setValue(2);
        this.ManualinvoiceForm.get('paymenttype').setValue('Card');
      } else if (paymentid == 3) {
        this.ManualinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        //this.receivebalfocus.nativeElement.focus();
        this.receivebalfocus.nativeElement.disabled=true;
        this.ManualinvoiceForm.get('paymentmode').setValue(3);
        this.ManualinvoiceForm.get('paymenttype').setValue('Credit');
        this.calbalance();
      } else if (paymentid == 4) {
        this.payments=true;
        this.ManualinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        this.receivebalfocus.nativeElement.disabled=false;
        this.receivebalfocus.nativeElement.focus();
        this.ManualinvoiceForm.get('paymentmode').setValue(4);
        this.ManualinvoiceForm.get('paymenttype').setValue('MultiPay');
      }else if (paymentid == 5) {
        this.ManualinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        this.receivebalfocus.nativeElement.disabled=false;
        this.receivebalfocus.nativeElement.focus();
        this.ManualinvoiceForm.get('paymentmode').setValue(5);
        this.ManualinvoiceForm.get('paymenttype').setValue('Advance');
      }
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Total Amount Zero Make Payment', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }

  }

  multiPayment() {
    var grtotal: number = 0;
    var received: number = 0;
    var balance: number = 0;
    grtotal = parseFloat(this.ManualinvoiceForm.get('grandtotal').value);
    this.cashpay = parseInt(this.ManualinvoiceForm.get('cashamt').value);
    this.creditpay = parseInt(this.ManualinvoiceForm.get('creditcardamt').value);
    this.debitpay = parseInt(this.ManualinvoiceForm.get('debitcardamt').value);
    if(isNaN(this.cashpay)){
      this.cashpay=0.00;
      this.ManualinvoiceForm.get('cashamt').setValue((0).toFixed(this.fixedlength));
    }if(isNaN(this.creditpay)){
      this.creditpay=0.00;
      this.ManualinvoiceForm.get('creditcardamt').setValue((0).toFixed(this.fixedlength));
    }if(isNaN(this.debitpay)){
      this.debitpay=0.00;
      this.ManualinvoiceForm.get('debitcardamt').setValue((0).toFixed(this.fixedlength));
    }
    received = this.cashpay + this.creditpay + this.debitpay;
    if(received>0){
      balance = received - grtotal;
      this.ManualinvoiceForm.get('paidamount').setValue((received).toFixed(this.fixedlength));
      this.ManualinvoiceForm.get('balanceamount').setValue((balance).toFixed(this.fixedlength));
      this.ManualinvoiceForm.get('paymentmode').setValue(4); 
      if (this.cashpay > 0 && this.creditpay <= 0 && this.debitpay <= 0) {
        this.ManualinvoiceForm.get('paymenttype').setValue('Cash');//Cash Pay
      } else if (this.cashpay <= 0 && this.creditpay > 0 && this.debitpay <= 0) {
        this.ManualinvoiceForm.get('paymenttype').setValue('Card');// Credit Pay
      } else if (this.cashpay <= 0 && this.creditpay <= 0 && this.debitpay > 0) {
        this.ManualinvoiceForm.get('paymenttype').setValue('Others');// Others Pay
      } else if (this.cashpay > 0 && this.creditpay > 0 && this.debitpay <= 0) {
        this.ManualinvoiceForm.get('paymenttype').setValue('Cash & Credit Card');//Cash & Credit Pay
      } else if (this.cashpay > 0 && this.creditpay <= 0 && this.debitpay > 0) {
        this.ManualinvoiceForm.get('paymenttype').setValue('Cash & Debit Card');//Cash & Debit Pay
      } else if (this.cashpay <= 0 && this.creditpay > 0 && this.debitpay > 0) {
        this.ManualinvoiceForm.get('paymenttype').setValue('Credit & Debit Cards');//Credit & Others Pay
      } else if (this.cashpay > 0 && this.creditpay > 0 && this.debitpay > 0) {
        this.ManualinvoiceForm.get('paymenttype').setValue('Cash & Credit & Debit Cards');//Cash & Credit & Others Pay
      }
  
      if (balance < 0) {
        let prevbal = -(balance);
        let newdue = prevbal+parseFloat(this.prevamount);
        this.ManualinvoiceForm.get('previousbalance').setValue((newdue).toFixed(this.fixedlength));
        this.ManualinvoiceForm.get('balanceamount').setValue(0);
        let balalert = "Debts Amount:" + ((prevbal).toFixed(2));
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: balalert, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }else{
        this.ManualinvoiceForm.get('previousbalance').setValue(this.prevamount);
      }
      this.payments = false;
      this.selectpaymode=4;
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Receive Amount Zero Make Payment', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    
  }

 /* //Window Events
  windoweventclose(event) {

    if (event.keyCode == 27) {
      this.payments = false;
      this.atcprocess = false;
      this.homedelivery = false;
      this.subdrug = false;
      this.searcheddrugvalueslength = 0;
      this.selecteddrug = '';
      this.drugfocus.nativeElement.value = "";
    }
    if (event.keyCode == 17) {
      this.searcheddrugvalueslength = 0;
      this.selecteddrug = '';
      this.receivebalfocus.nativeElement.focus();
    }
    if (event.keyCode == 35) {
      this.drugfocus.nativeElement.value = "";
      this.receivebalfocus.nativeElement.focus();
    }

    if (event.keyCode == 33) {
      this.drugfocus.nativeElement.value = "";
      this.drugfocus.nativeElement.focus();
    }

    if (event.keyCode == 34) {
      this.drugfocus.nativeElement.value = "";
      this.saveprintfocus.nativeElement.focus();
    }


  }

  // for list selected
  selecteddrug: any;
  selectedItem = [];
  selectedIndex: number = -1;
  drugkeyselect(event: KeyboardEvent,event1) {
    //up 38 down 40
    //event.preventDefault();
    if (event.keyCode == 40) {
      if (this.selectedIndex == this.searcheddrugvalues.length - 1) {
        this.selectedIndex = 0;
        this.selectedItem = this.searcheddrugvalues[this.selectedIndex];
        this.selecteddrug = this.selectedItem[0] + " - " + this.selectedItem[6] + " - " + this.selectedItem[3];
      } else {
        this.selectedItem = this.searcheddrugvalues[++this.selectedIndex];
        this.selecteddrug = this.selectedItem[0] + " - " + this.selectedItem[6] + " - " + this.selectedItem[3];
      }
    }

    else if (event.keyCode == 38) {
      if (this.selectedIndex <= 0) {
        this.selectedIndex = this.searcheddrugvalues.length - 1
        this.selectedItem = this.searcheddrugvalues[this.selectedIndex];
        this.selecteddrug = this.selectedItem[0] + " - " + this.selectedItem[6] + " - " + this.selectedItem[3];
      } else {
        this.selectedItem = this.searcheddrugvalues[--this.selectedIndex];
        this.selecteddrug = this.selectedItem[0] + " - " + this.selectedItem[6] + " - " + this.selectedItem[3];
      }
    }
    else if (event.keyCode == 13 || event.keyCode == 9) {
      if(event1.length<1){
        this.drugfocus.nativeElement.focus();
      }else{
        this.selectedIndex = -1;
        this.selecteddrugdata(this.selectedItem);
        this.selecteddrug = '';
      }
     
    }else if (event.keyCode == 17) {
      this.searcheddrugvalueslength=0;
     this.receivebalfocus.nativeElement.focus();
    }

  }*/

  //Invoice Validation
  invalidate(): Number {
    var valflag = 1;
    let custid = this.ManualinvoiceForm.get('customerrefid').value;
    let totalprod = this.ManualinvoiceForm.get('totalitems').value;
    let grtotal = this.ManualinvoiceForm.get('grandtotal').value;
    let received = this.ManualinvoiceForm.get('paidamount').value;
    let paymode = this.ManualinvoiceForm.get('paymentmode').value;
    if (custid == 0 || custid == null || custid == undefined) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Customer', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      valflag = 0;
    }else if (totalprod <= 0) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Atleast 1 Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      valflag = 0;
    }else if (grtotal <= 0) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Total will be Zero Make Calculations', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      valflag = 0;
    }else if (paymode == 0 || paymode==null || paymode==undefined || paymode=='') {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Payment Mode', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      this.ManualinvoiceForm.get('balanceamount').setValue(0);
      valflag = 0;
    }else if (received <= 0) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Receive Amount Zero Make Payment', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      this.ManualinvoiceForm.get('balanceamount').setValue(0);
      valflag = 0;
    }
    return valflag;
  }


  saveprocess: boolean = false;
  onSubmit() {
    //set refill values
    // let refillid = this.ManualinvoiceForm.get('refillcust').value;
    // let paymode = this.ManualinvoiceForm.get('paymentmode').value;
    let valflag = this.invalidate();
      if (valflag == 1) {
        this.saveprocess = true;
        this.manualservice.saveServiceInvoice(JSON.stringify(this.ManualinvoiceForm.value)).subscribe(data => { 
          if(data){
            this.saveprocess = false;
            this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data Saved Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
          }else{
            this.saveprocess = false;
            this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data not Saves', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
          }
         },error => {
            this.saveprocess = false;
            this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
          });
      }
  }

  smsbody: string;
  siresponse(data) {

    if (data[0] == 1) {
      this.saveprocess = false;
      this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Invoice Generated Successfully ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      if(this.ManualinvoiceForm.get('currentbilldue').value>=1){
        this.savecreditnote(data[1]);
      }
      this.saveSISalesJournal(); 
      if(this.ManualinvoiceForm.get('paymentmode').value!==3){
        this.saveSIReceipt();
      }
      /*for Print Options */
      if (data[1] == null || data[1] == '' || data[1] == undefined) {
        this.reportshow = true;
        this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Print Value not Fetching', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      } else {
        this.reportshow = true;
        this.printenable(data[1]);
        //this.saveEmailAttach(data);
      }

      this.smsbody = "Dear: " + this.ManualinvoiceForm.get('delname').value + '\n' + "Thanks for Purchasing with Us!...    " + '\n' + "Your Invoice Details:  " + '\n'
        + "Invoice No: " + data[2] + "Invoice Date: " + this.dateformat.transform04() + '\n'
        + "Invoice Amount: " + this.ManualinvoiceForm.get('grandtotal').value;

    } else {
      this.saveprocess = false;
      this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  }


  //Print option
  reportlink: any = "assets/images/loading.gif";
  reportshow: boolean = false;
  printenable(invoiceid) {
    let seniorflag = this.ManualinvoiceForm.get('scitizenflag').value;
    let phyflag = this.ManualinvoiceForm.get('phycapflag').value;
    this.SalesinvService.getprintmodel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,4).subscribe(pdata => {
      if (pdata) {
        let rlink = pdata[0][1]+"&salesrefid="+invoiceid+"&__format=PDF";
        this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
        this.smsenable();
        this.emailenable();
        //http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/Bill_CashPrint124/Cash_Bill.rptdesign&salesrefid=" 
      }else{
        this.smsenable();
        this.emailenable();
      }
    }, err => { console.log(err); 
      this.smsenable();
      this.emailenable(); });
    
  }


  //check sms status enable or disable & get sms Ac Details if enabled

  smsenable() {
    this.SalesinvService.smsenable(AppComponent.companyID).subscribe(data => {
      if (data == true) {
        this.SalesinvService.getsmsacdetails(AppComponent.companyID).subscribe(data => {
          if (data.length > 0) {
            this.sendsms(data);
          }
        }, err => { console.log(err) });

      }
    }, err => { console.log(err) });

  }

  // send SMS 
  sendsms(smsdata) {
    this.SalesinvService.sendsms(smsdata[0][1], smsdata[0][2], smsdata[0][3], this.ManualinvoiceForm.get('delmobile').value, this.smsbody, AppComponent.companyID, AppComponent.branchID,
      AppComponent.locRefName1, AppComponent.locrefID1, this.dateformat.transform04(), smsdata[0][0], 2).subscribe(data => {
        if (data.length > 0) {
          this.sendsms(data);
        }
      }, err => { console.log(err) });
  }

  emailenable() {
    this.SalesinvService.emailenable(AppComponent.companyID).subscribe(data => {
      if (data == true) {
        // this.SalesinvService.getsmsacdetails(AppComponent.companyID).subscribe(data => {
        //   if (data.length > 0) {
        //     this.sendsms(data);
        //   }
        // }, err => { console.log(err) });

      }
    }, err => { console.log(err) });
  }

  //Send Mail Attach
  saveEmailAttach(data) {

    let reporturl = "http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/Vtaexpt/Bill_Vatexpt.rptdesign&salesrefid=" + data[1] + "&__format=PDF";
    var obj = {
      //this.cusemail
      customername: this.ManualinvoiceForm.get('customerrefid').value,
      custinvoiceno: data[2],
      url: reporturl,
      email: this.cusemail,
      grandtotal: this.ManualinvoiceForm.get('grandtotal').value,

    }

    this.SalesinvService.sendMailAttachment(JSON.stringify(obj)).subscribe(data => {
      if (data == 1) {
        this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Mail Send Successfuly', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      } else {
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Mail not Send', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }

    }, errorCode => console.log(errorCode));

  }

  //printclose
  printclose() {
    this.reportshow = false;
    this.ManualinvoiceForm.reset();
    if (this.refillsalesid > 0) {
      this.router.navigate(['/SalesInvoice/SalesInvoice']);
    }else if(this.convertsalesid>0){
      this.router.navigate(['/SalesInvoice/SalesInvoice']);
    }else{
      this.ngOnInit();
    }
  }

  //Reset cancel form
  cancel() {
    this.ManualinvoiceForm.reset();
    if (this.convertsalesid > 0) {
      this.router.navigate(['/SalesInvoice/SalesInvoice']);
    }else{
      this.ngOnInit();
    }
  }


  /* Link with Accounts */

  saveSISalesJournal() {
    this.journalForm.patchValue({
     // debitamount: this.ManualinvoiceForm.get('grandtotal').value-this.ManualinvoiceForm.get('currentbilldue').value,
      creditamount: this.ManualinvoiceForm.get('grandtotal').value-this.ManualinvoiceForm.get('currentbilldue').value,
      personid: this.ManualinvoiceForm.get('customerrefid').value,
      paymenttype: this.ManualinvoiceForm.get('paymenttype').value,
    });
    this.SalesinvService.saveSISalesJournal(JSON.stringify(this.journalForm.value)).subscribe(data => { },
      errorCode => console.log(errorCode));
  }

  saveSIReceipt() {
    this.receiptForm.patchValue({
   //   debitamount: this.ManualinvoiceForm.get('grandtotal').value-this.ManualinvoiceForm.get('currentbilldue').value,
      creditamount: this.ManualinvoiceForm.get('grandtotal').value-this.ManualinvoiceForm.get('currentbilldue').value,
      personid: this.ManualinvoiceForm.get('customerrefid').value,
      paymenttype: this.ManualinvoiceForm.get('paymenttype').value,
    });
    if (this.ManualinvoiceForm.get('paidamount').value > 0) {
      this.SalesinvService.saveSIReceipt(JSON.stringify(this.receiptForm.value)).subscribe(data => { },
        errorCode => console.log(errorCode));
    }
  }

  savecreditnote(invoiceid){
    this.creditNoteForm = this.formBuilder.group({
    //  debitaccount: [10, []],
      creditaccount: [2, []],
     // debitamount: [this.ManualinvoiceForm.get('currentbilldue').value, []],
      creditamount: [this.ManualinvoiceForm.get('currentbilldue').value, []],
    //  draccname: ['Sales income', []],
      craccname: ['Accounts Receivable', []],
      invoiceno: [invoiceid, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      formid:[5,[]],
      jrnltype: [6, []],
      jrnlname: ['CreditNote', []],
      bulkflag: [, []],
      personid: [this.ManualinvoiceForm.get('customerrefid').value, []],
      personame:[this.ManualinvoiceForm.get('delname').value,[]],
      persontype: [1, []],
      invoicetype: [1, []],
      paymenttype: [, []],
      ptrefno: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      purcflag: [1, []],
      calcflag: [0, []],
    });

    this.SalesinvService.saveCreditNote(JSON.stringify(this.creditNoteForm.value)).subscribe(data => {},
          errorCode => console.log(errorCode));
  
  }


  underprocess: boolean = false;
  underprogress() {
    this.underprocess = true;
    setTimeout(() => {
      this.underprocess = false;
    }, 3000);
  }

 
  //Extra icons process
  ///...


}
