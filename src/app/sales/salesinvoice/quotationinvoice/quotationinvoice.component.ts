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
import { slsInvSaveService } from '../multisalesinvoice/multisalesinvoiceservice';
declare var webkitSpeechRecognition:any;

@Component({
  selector: 'app-quotationinvoice',
  templateUrl: './quotationinvoice.html',
  providers: [slsInvSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe],
})
export class QuotationinvoiceComponent implements OnInit {
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

  SalesinvoiceForm: FormGroup;
  selobj: any;

  showrefilltext: boolean = false;
  discableflag:boolean=false;
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

  //convert sales invoice from sales order history
  convertinvoicedetails: boolean = false;
  atcprocess: boolean = false;
  homedelivery: boolean = false;


  //For Subdrugdata usage
  replaceindex: any;
  subdrug: boolean = false;

  constructor(private SalesinvService: slsInvSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder,
    config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent, private route: ActivatedRoute,private cRef: ChangeDetectorRef,
    private modalService: NgbModal, private domSanitizer: DomSanitizer, private appComponent: AppComponent, private router: Router) {

    config.autoClose = false;

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, boxdispflag: AppComponent.BoxDispFlag,
      stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

 

  }

  convertsalesid: any;
  refillsalesid: any;
  refillcustid: any;
  taxid: number;
  taxgstid: number = 0;
  fixedlength:number=2;
  belowflag:number=0;
  aboveflag:number=0;
  inputfrom:number=1;
  showbilldate:any=this.dateformat.transformnew(Date.now());
  stateID:any=0;
  unionstate = [20934, 20936, 20940, 20948, 21773, 21775, 21776];
  ngOnInit() {
    //this.taxid=AppComponent.TaxID;
    this.SalesinvService.viewShop(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
      if(data!==null || data !==''|| data!==undefined){
        this.stateID=data[0].imagevalues[0][11];
      }else{
        this.stateID=0;
      }
    },err=>{this.stateID=0});
    this.SalesinvService.getfixedroudoff(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>{
      if(data[0][1]==1){
        this.fixedlength=3;
      }else{this.fixedlength=2};

      if(data[0][2]==1){
        this.aboveflag=1;
      }else{this.aboveflag=0};

      if(data[0][3]==1){
        this.belowflag=1;
      }else{ this.belowflag=0};

    });
   
    this.SalesinvoiceForm = this.formBuilder.group({

      /*Basic Deatils */
      employeerefid: [sessionStorage.getItem('indvuserid'), []],
      barcodeval: [, []],
      billdate: [this.dateformat.transform05(Date.now()), []],
      customerrefid: ['', []],
      salesorderrefid: [0, []],
      doctorrefid: [0, []],
      formqty: [, []],
      description:['',[]],
      /*for Search Select options */
      searchcheck: [1, []],
      //genericsearchcheck: [0, []],

      /*Payments Detsils */
      totaltaxamt: [(0).toFixed(this.fixedlength), []],
      totaldiscount: [(0).toFixed(this.fixedlength), []],
      previousbalance: [0, []],
      taxableamt: [(0).toFixed(this.fixedlength), []],  //subtotal value
      grandtotal: [(0).toFixed(this.fixedlength), [Validators.required]],
      totalitems: [0, []],  //Total Products
      totalqty: [0, []],
      paidamount: [(0).toFixed(this.fixedlength), []],   //Received Amount
      balanceamount: [(0).toFixed(this.fixedlength), []],

      /*for discount purpose senior citizen physical handicap */
      scitizenflag: [0, []],
      phycapflag: [0, []],
      scdno: [0, []],
      pwdno: [0, []],

      /* Flags Set  */
      //salestyperefid: [1, []],
      vatdispflag: [this.taxid, []],
      salesbilltype: [1, []],
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
      roundoff:[(0).toFixed(this.fixedlength),[]],

      /* for Refill purpose*/
      refillcust: [0, []],
      refilldays: [0, []],
      creditdays: [0,[]],
      customertype: ['',[]],
      /*Login Details */
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      clientcdate: [this.dateformat.transform04(), []],
      createdby: [this.selobj.userid, []],

      /* for Delivery Purpose*/
      deladdress1: ['NA', []],
      deladdress2: ['NA', []],
      delcountry: ['Na', []],
      delstate: ['NA', []],
      delcity: ['NA', []],
      delpincode: [0, []],
      delmobile: [0, []],
      delname: ['Customer', []],

      //hold bill 
      holdbill:['opt1',[]],

      //Loyalty Points
      currentloyalpoints:[0,[]],
      loyalitypointrefid:[1,[]],
      currentuseloyalpoints:[0,[]],
      minimumloyalcheck:[false,[]],
      giftcode:['',[]],
      totalloyalamount:[0,[]],
      totalgiftamount:[0,[]],
      currentbilldue:[(0).toFixed(this.fixedlength),[]],

      //Due Pay
      dueflag:[false,[]],
      /*form arrays Tables*/
      invoice: this.formBuilder.array([]),
      newproduct: this.formBuilder.array([]),
      dummyfields: this.formBuilder.array([]),
      duepaytable:this.formBuilder.array([])
    });

    setTimeout(() => {
      this.SalesinvService.gettaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
        if(data==null||data==''||data==undefined){
          this.taxid=2;
          this.taxgstid = 1;
        }else{
          this.taxid = data[0][0];
          this.taxgstid = 0;
          if (this.taxid == 2) {
            for (this.i = 0; this.i < this.unionstate.length; this.i++) {
              if (this.stateID == this.unionstate[this.i]) {
                this.taxid=2;
                this.taxgstid = 2;
                break;
              } else {
                this.taxid = 2;
                this.taxgstid = 1;
              }
            }
          }
        } 
      },err=>{this.taxid=2; this.taxgstid = 1;});
    }, 2300);

    this.getdoctor();
    //for direct convert sales invoice from salesorder history
    this.convertsalesid = this.route.snapshot.paramMap.get('id');
    if (this.convertsalesid > 0) {
      this.convertsalesinvoice(this.convertsalesid);
      //(<HTMLInputElement> document.getElementById("sorderevent")).disabled=true;
      // this.SalesinvoiceForm.get('customerrefid').disable();
    } else {
      this.convertinvoicedetails = false;
    }

    //Direct Refill Invoice
    this.refillsalesid = this.route.snapshot.paramMap.get('rinvid');
    this.refillcustid = this.route.snapshot.paramMap.get('rcustid');
    if (this.refillsalesid > 0) {
      this.refillsalesinvoice(this.refillsalesid,this.refillcustid);
      //(<HTMLInputElement> document.getElementById("sorderevent")).disabled=true;
      // this.SalesinvoiceForm.get('customerrefid').disable();
    } else {
      this.refillinvoiceflag = false;
    }
    
    //for clear printed values
    this.productnameref = '';
    this.qtyref = 0;
    this.prevamount = (0).toFixed(this.fixedlength);;
    this.holdflag=0;
    this.selectpaymode=1;
    this.inputfrom=1;
    this.discableflag=false;
    this.receivebalfocus.nativeElement.disabled=false;
    this.addNewdummy();
    setTimeout(() => {
      this.SalesinvService.getadminflag(sessionStorage.getItem('indvuserid')).subscribe(data => {
        if(data[0][0]==1){
          this.discableflag=false;
        }else{
          this.discableflag=true;
        }
       },error => { console.log(error);this.discableflag=false; }); 
    }, 2100);
  }


  person=[{id:1,name:'xyz'},{id:1,name:'zyx'}];
  output=[];
  ix:any;
  task(){
    for(let ix=0;ix<this.person.length;ix++){
      for(let iy=ix+1;iy<this.person.length;iy++){
        if(this.person[ix].id==this.person[iy].id){
          this.output = [];
          var Nameindex = [];
          Nameindex = [];
          Nameindex.push(this.person[ix].name,this.person[iy].name);
          alert(JSON.stringify(Nameindex));
          this.output.push({
           id: this.person[ix].id,
           name: Nameindex
           })
        }
      }
      break;
    }
  }

  productsearch: boolean = true;
  drugsearchid:number=1;
  searchcheck(event, id: number) {
    if (event.target.checked) {
      this.SalesinvoiceForm.get('searchcheck').setValue(id);
      if (id == 1) {
        //this.SalesinvoiceForm.get('genericsearchcheck').setValue(false);
        this.productsearch = true;
        this.selecteddrug = '';
        this.drugsearchid=1;
        this.drugfocus.nativeElement.focus();
      }

      else if (id == 2) {
        //this.SalesinvoiceForm.get('productsearchcheck').setValue(false);
        this.productsearch = false;
        this.selecteddrug = '';
        this.drugsearchid=2;
        this.drugfocus.nativeElement.focus();
        //document.getElementById("drugfocus2").focus();
      }

    }
  }

  //get Searched Drug Datas
  searchdrug(searchvalue, methodid) {
    if(methodid==1){
      document.getElementById("speechinput").innerHTML='';
    }
    this.inputfrom=1;
    let customerid = this.SalesinvoiceForm.get('customerrefid').value;
    this.selectedIndex = -1;
    this.selecteddrug = '';
    if (searchvalue.length > 0) {

      if (customerid == 0 || customerid == null || customerid == undefined) {
        this.drugfocus.nativeElement.value = "";
        this.drugfocus.nativeElement.focus();
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First you Select Customer', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      } else {

        //for search id 1 drug search products
        //for search id 2 Generic Search products
        let searchdrugdata = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, searchvalue, searchid:this.drugsearchid };
        this.SalesinvService.searchdrug(JSON.stringify(searchdrugdata)).subscribe(data => {
          if (data.length > 0) {
            this.searcheddrugvalues = data;
          } else {
            this.searcheddrugvalues.length = 0;
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            this.drugfocus.nativeElement.value = "";
          }
        },
          error => { console.log(error); });
      }
    }
    else {
      this.searcheddrugvalues.length = 0;
    }
  }

  //speech search
  speechsearch(){
    if("webkitSpeechRecognition" in window){
      var recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 5;
      const input=this.speechhide.nativeElement;
      recognition.start();
      document.getElementById("speechcolor").style.color="cornflowerblue";
      recognition.onresult = function(event) {
          document.getElementById("speechinput").innerHTML=event.results[0][0].transcript;
          input.value=event.results[0][0].transcript;
          input.click();
          console.log('You said: ', event.results[0][0].transcript);
          document.getElementById("speechcolor").style.color='';
          recognition.stop();
      }
      recognition.onerror = function(event) {
        console.log('Speech to Text Error: ', event.error);
        recognition.stop();
        document.getElementById("speechcolor").style.color ='';
      }
    } 
  }


  //barcoe scan
  errorMessage1:any;
  barscan:boolean=false;
  barcodescan(){
    this.barscan=true;
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        constraints: {
          width: 640,
          height:480,
          facingMode: 'environment' // restrict camera type
        },
        // area: { // defines rectangle of the detection
        //   top: '40%',    // top offset
        //   right: '0%',  // right offset
        //   left: '0%',   // left offset
        //   bottom: '40%'  // bottom offset
        // },
      },
      decoder: {
        readers: ['code_128_reader','ean_reader'], // restrict code types
        // debug: {
        //   drawBoundingBox: true,
        //   showFrequency: true,
        //   drawScanline: true,
        //   showPattern: true
        // }, multiple: false
      },
    },
    (err) => {
      if (err) {
        this.errorMessage1 = `QuaggaJS could not be initialized, err: ${err}`;
        alert(this.errorMessage1);
      } else {
        Quagga.start();
        document.getElementById("interactive").style.display = "block";
        Quagga.onDetected((res) => {
          //window.alert(`code: ${res.codeResult.code}`);
          alert(res.codeResult.code);
          this.barcodesearch(res.codeResult.code);
          var canvas = Quagga.canvas.dom.image;
          let imgURL=canvas.toDataURL()
        })
      }
    });
  }

  barcodeend(){
    this.barscan=false;
    this.barcodefocus.nativeElement.value = "";
    this.selecteddrug="";
    Quagga.stop();
    document.getElementById("interactive").style.display = "none"; 
  }

  barcodesearch(searchvalue){
    this.inputfrom=2;
    this.SalesinvoiceForm.get('barcodeval').setValue(searchvalue);
    let splitval=searchvalue.substring(0, 4);
    if(splitval=="BSTK"){
      let searchdrugdata = { companyid:AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1, searchvalue };
      this.SalesinvService.searchdrugbybarcode(JSON.stringify(searchdrugdata)).subscribe(data => { 
        if(data.length>0){
          this.qtyfocus.nativeElement.focus();
          this.selecteddrug=data[0][0];
          alert(JSON.stringify(data));
          this.selecteddrugdata(data[0]); 
        } else{
          this.searcheddrugvalues.length = 0;
          this.barcodefocus.nativeElement.value = "";
          this.selecteddrug="";
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }},
        error => { console.log(error); }); 
    }else{
      this.barcodefocus.nativeElement.value = "";
      this.selecteddrug="";
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Barcode does not Match', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
   
  }

  barcodeinput(searchvalue){
    let customerid = this.SalesinvoiceForm.get('customerrefid').value;
    this.selectedIndex = -1;
    this.selecteddrug = '';
    if (searchvalue.length > 0) {
      if (customerid == 0 || customerid == null || customerid == undefined) {
        this.barcodefocus.nativeElement.value = "";
        this.barcodefocus.nativeElement.focus();
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First you Select Customer', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      } else {
        this.inputfrom=2;
        this.SalesinvoiceForm.get('barcodeval').setValue(searchvalue);
      }
    }
  }

  barcodeinputsearch(event){
    if(event.keyCode == 13){
      let searchvalue=(this.SalesinvoiceForm.get('barcodeval').value).toUpperCase();
      let splitval=searchvalue.substring(0, 4);
      if(splitval=="BSTK"){
        let searchdrugdata = { companyid:AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1, searchvalue  };
        this.SalesinvService.searchdrugbybarcode(JSON.stringify(searchdrugdata)).subscribe(data => { 
          if(data.length>0){
            this.qtyfocus.nativeElement.focus();
            this.selecteddrug=data[0][0];
            this.selecteddrugdata(data[0]); 
          } else{
            this.searcheddrugvalues.length = 0;
            this.barcodefocus.nativeElement.value = "";
            this.selecteddrug="";
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          }},
          error => { console.log(error); }); 
      }else{
        this.barcodefocus.nativeElement.value = "";
        this.selecteddrug="";
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Barcode does not Match', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
    }
  }

  //barcode scan end

  //Window Events
  windoweventclose(event) {

    if (event.keyCode == 27) {
      this.payments = false;
      this.newproduct = false;
      this.atcprocess = false;
      this.homedelivery = false;
      this.subdrug = false;
      this.searcheddrugvalues.length = 0;
      this.selecteddrug = '';
      this.drugfocus.nativeElement.value = "";
    }
    if (event.keyCode == 17) {
      this.searcheddrugvalues.length = 0;
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
      this.searcheddrugvalues.length=0;
     this.receivebalfocus.nativeElement.focus();
    }

  }

  drugidcopy: any;
  batchidcopy: any;
  productnameref: any;
  qtyref: number = 0;

  selecteddrugdata(drugdata) {
    if(drugdata[14]==1){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Expired Stock', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.drugfocus.nativeElement.focus();
    }else{
      this.drugidcopy = drugdata[1];
      this.batchidcopy = drugdata[2];
      this.productnameref = drugdata[0];
      this.qtyref = drugdata[3];
      this.hidedrugs();
    }
  }

  // create new seperate method for the purpose of replace process Substitution Drugs (Delete Old Index)
  selectedsubdrug(subdrugdata) {
    this.drugidcopy = subdrugdata[1];
    this.batchidcopy = subdrugdata[2];
    this.productnameref = subdrugdata[0];
    this.qtyref = subdrugdata[3];
    this.subdrug = false;
    this.qtyfocus.nativeElement.focus();
    this.removerow(this.replaceindex);
  }


  // press Enter button load products in grid table
  hidedrugs() {
    this.searcheddrugvalues.length = 0;
    this.drugfocus.nativeElement.value = "";
    this.barcodefocus.nativeElement.value = "";
    this.qtyfocus.nativeElement.focus();
  }

  viewproducts(event) {
    if(event.target.value.match('^[0-9.]+$') == null){
      this.qtyfocus.nativeElement.value="";
      this.qtyfocus.nativeElement.focus();
    }else{
      let uqty = this.SalesinvoiceForm.get('formqty').value;

      if (event.keyCode == 9 || event.keyCode == 13) {

        if (uqty > 0) {
          if (this.qtyref >= uqty) {
            this.getproductdetails();
          } else {
            this.qtyfocus.nativeElement.focus();
            this.SalesinvoiceForm.get('formqty').setValue('');
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Unit Qty > Current Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          }
        } else if (this.qtyref == 0) {
          this.SalesinvoiceForm.get('formqty').setValue('');
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Minimum Qty Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          if(this.inputfrom==1){ this.drugfocus.nativeElement.focus()}else{ this.barcodefocus.nativeElement.focus()}
        } else {
          this.qtyfocus.nativeElement.focus();
          this.SalesinvoiceForm.get('formqty').setValue('');
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Valid Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
      }else if (event.keyCode == 17) {
        this.receivebalfocus.nativeElement.focus();
      }
    }
    
  }

  //If Tab or blur Process for mobile use 
  mobviewproducts(){
    let uqty=this.SalesinvoiceForm.get('formqty').value;
    if(uqty>0){
      if(this.qtyref>=uqty ){
        this.getproductdetails();
      }else{
        this.qtyfocus.nativeElement.focus();
        this.SalesinvoiceForm.get('formqty').setValue('');
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Unit Qty > Current Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
    }
    // else {
    //   this.qtyfocus.nativeElement.focus();
    //   this.SalesinvoiceForm.get('formqty').setValue('');
    //   this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Valid Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    // }
  }


  /*Left side panel Api Calls*/

  //get all doctors List
  getdoctor() {
    let getdoctors = { companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1 };
    this.SalesinvService.getdoctors(JSON.stringify(getdoctors)).subscribe(data => { this.doctorslist = data },
      error => {
        console.log(error)
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }

  /* Sales Invoice & Order based changed Actions*/

  salesinvorderchanges(salestypeid) {
    this.SalesinvoiceForm.get('customerrefid').setValue('');
    this.SalesinvoiceForm.get('customertype').setValue('');
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    control.controls = [];
    if (salestypeid == 1) {
      this.salesinvcustomers = [];
      this.SalesinvoiceForm.get('totalitems').setValue(0);
    }
    else if (salestypeid == 2) {
      //this.getAllSalesOrders();
      this.salesordercustomers = [];
    }

  }

  /****Sales Order Base Actions***/

  //get all salesorder if salesorder click
  getAllSalesOrders() {
    this.salesorders = [];
    let getsalesordersproducts = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid };
    this.SalesinvService.getAllSalesOrders(JSON.stringify(getsalesordersproducts)).subscribe(data => { this.salesorders = data },
      error => {
        console.log(error)
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }

  // get Searched Sales order Customers
  SearchSalesOrdersCustomers(searchvalue: any) {
    let searchsalesordercustomer = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, searchvalue };
    this.SalesinvService.SearchSalesOrdersCustomers(JSON.stringify(searchsalesordercustomer)).subscribe(data => { this.pushsalesordercustomers(data) },
      error => {
        console.log(error)
        this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }

  //bind or push sales order Customers details in select option
  pushsalesordercustomers(data) {
    this.salesordercustomers = [];
    for (let i = 0; i < data.length; i++) {
      this.salesordercustomers.push({ value: data[i][0], label: data[i][1] });
    }
  }

  getsordercustomerinfo() {
    let sordercustid = this.SalesinvoiceForm.get('customerrefid').value;
    let invcustinfo = { companyrefid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, patientid: sordercustid };
    this.SalesinvService.sordercustomerinfo(JSON.stringify(invcustinfo)).subscribe(data => {
      this.bindsordercustinfo(data);
      if (data.length > 0) {  //for get PArticulaar Customer Sales Orders no
        this.salesorders = [];
        let patientid = this.SalesinvoiceForm.get('customerrefid').value;
        let getsalesordersproducts = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, patientid: patientid };
        this.SalesinvService.getCustSalesOrders(JSON.stringify(getsalesordersproducts)).subscribe(data => { this.salesorders = data },
          error => {
            console.log(error)
            this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          });
      } else {
        this.getAllSalesOrders();  //else if no customer fetch all sales orders
      }
    },
      error => {
        console.log(error)
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
      this.getdoctor();
      this.custtypes();
  }

  refillinvoiceflag:boolean=false;
  refillsalesinvoice(refillid,refillcustid) {
    this.SalesinvoiceForm.get('salesbilltype').setValue(3);
    this.SalesinvoiceForm.get('customerrefid').setValue(refillcustid);
    let invcustinfo = { companyrefid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, patientid: refillcustid};
    this.SalesinvService.invcustomerinfo(JSON.stringify(invcustinfo)).subscribe(data => { 
      this.bindcustinfo(data);this.refillinvoiceflag=true;
    },error => {
        console.log(error);
        this.refillinvoiceflag=false;
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
    this.getRefillOrderProd(refillid);
  }

  //get selected refill products
  getRefillOrderProd(refillordervalue) {
    let getsalesordersproducts = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, sorderid: refillordervalue };
    this.SalesinvService.getRefillProd(JSON.stringify(getsalesordersproducts)).subscribe(data => { 
      this.insertSalesOrderProducts(data); this.getdoctor(); this.custtypes(); },
      error => {
        console.log(error)
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }


  convertinvoicename: any;
  convertinvoiceid: any;
  convertsalesinvoice(salesorderid) {
    this.SalesinvoiceForm.get('salesbilltype').setValue(2);
    let getconvertsalescustomer = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, salesorderid: salesorderid };
    this.SalesinvService.getconvertsalescustomer(JSON.stringify(getconvertsalescustomer)).subscribe(data => {
      if (data.length > 0) {
        this.convertinvoicedetails = true;
        this.convertinvoicename = data[0][1];
        this.convertinvoiceid = data[0][18];
        this.bindsordercustinfo(data);
        this.SalesinvoiceForm.get('customerrefid').setValue(data[0][0]);
        this.SalesinvoiceForm.get('salesorderrefid').setValue(salesorderid);
      } else {
        this.convertinvoicedetails = false;
        this.notificationsComponent.addToast({ title: 'ALert MSG', msg: 'Customer Deatils not Fetch', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
    },
      error => {
        console.log(error)
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
    this.getSalesOrderProd(salesorderid);
  }

  //bind selected Customer & convert sales order customer  in sales order 
  bindsordercustinfo(data) {

    this.seniorflag = data[0][4];
    this.phycapflag = data[0][5];
    let prevnan=isNaN(parseFloat(data[0][9]));
    if(prevnan){
      this.prevamount=(0).toFixed(this.fixedlength);
    }else{
      this.prevamount = parseFloat(data[0][9]).toFixed(this.fixedlength);
    }
    this.SalesinvoiceForm.get('scdno').setValue(data[0][6]);
    this.SalesinvoiceForm.get('pwdno').setValue(data[0][7]);
    this.SalesinvoiceForm.get('delmobile').setValue(data[0][16]);
    this.SalesinvoiceForm.get('delname').setValue(data[0][17]);
    this.SalesinvoiceForm.get('deladdress1').setValue(data[0][10]);
    this.SalesinvoiceForm.get('deladdress2').setValue(data[0][11]);
    this.SalesinvoiceForm.get('delcountry').setValue(data[0][12]);
    this.SalesinvoiceForm.get('delstate').setValue(data[0][13]);
    this.SalesinvoiceForm.get('delcity').setValue(data[0][14]);
    this.SalesinvoiceForm.get('delpincode').setValue(data[0][15]);
    this.SalesinvoiceForm.get('refilldays').setValue(data[0][21]);
    this.SalesinvoiceForm.get('customertype').setValue(data[0][23]);
    if (data[0][4] == 1) {
      this.SalesinvoiceForm.get('scitizenflag').setValue(1);
    } else {
      this.SalesinvoiceForm.get('scitizenflag').setValue(0);
    }

    if (data[0][5] == 1) {
      this.SalesinvoiceForm.get('phycapflag').setValue(1);
    } else {
      this.SalesinvoiceForm.get('phycapflag').setValue(0);
    }

    if (data[0][8] == 1) {
      this.SalesinvoiceForm.get('refillcust').setValue(true);
      this.showrefilltext = true;
    } else {
      this.SalesinvoiceForm.get('refillcust').setValue(false);
      this.showrefilltext = false;
    }

  }


  //get selected salesorder products
  getSalesOrderProd(salesordervalue) {
    let getsalesordersproducts = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, sorderid: salesordervalue };
    this.SalesinvService.getSalesOrderProd(JSON.stringify(getsalesordersproducts)).subscribe(data => { this.insertSalesOrderProducts(data) },
      error => {
        console.log(error)
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }

  //Load SalesOrder Products in Grid
  insertSalesOrderProducts(data) {
    var sorderdisc;
    var sordervatdisplay = 'NV';
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    control.controls = [];

    if (this.seniorflag == 1 || this.phycapflag == 1) {
      sorderdisc = 20;
    } else {
      sorderdisc = 0;
    }

    if (data[0][10] == 0) {
      sordervatdisplay = 'NV';
    } else {
      sordervatdisplay = 'V';
    }
    this.atcprocess = false;
    for (this.i = 0; this.i < data.length; this.i++) {

      this.productnameref = '';
      this.qtyref = 0;

      control.insert(0, this.formBuilder.group({

        drugproductid: [data[this.i][1], []],
        productname: [data[this.i][0], []],
        batchname: [data[this.i][21], []],
        batchrefid: [data[this.i][2], []],
        expirydate: [data[this.i][22], []],
        crntstkqty: [data[this.i][3], []],
        indvqty: [0, []],
        totalqty: [0, []],
        indvfreeqty: [, []],
        //availfreeqty: [data[this.i][21], []],
        unitdiscount: [sorderdisc, []],
        dummyunitdiscount: [{ value: sorderdisc, disabled: this.discableflag }, []],
        unitprice: [data[this.i][5], []],
        unitvat: [data[this.i][10], []],
        unitsgst: [data[this.i][6], []],
        unitcgst: [data[this.i][7], []],
        unitigst: [data[this.i][8], []],
        unitutgst: [data[this.i][9], []],
        unitgst: [data[this.i][27], []],
        hsnid: [data[this.i][28], []],
        hsncode: [data[this.i][29], []],
        subtotal: [0, []],
        // salesprdtid: [, []],
        // salesrefid: [, []],

        /*Sales Order details */
        soqty: [data[this.i][19], []],
        salesorderrefid: [this.SalesinvoiceForm.get('salesorderrefid').value, []],
        stkmainrefid: [data[this.i][24], []],

        /*Login details */
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        clientcdate: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        countryrefid: [this.selobj.countryrefid, []],

        /*Flags*/
        vatidentity: [sordervatdisplay, []]

      }));
    }

    this.showatcdetails();
    this.calculation();
  }
  /* Sales Order Based Actions End */


  /* Sales Invoice Based Actions */

  // get Searched Sales invoice Customers
  searchallcustomers(searchvalue: any) {
    let searchallcustomers = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, searchvalue };
    this.SalesinvService.searchallcustomers(JSON.stringify(searchallcustomers)).subscribe(data => { this.pushallcustomers(data) },
      error => {
        console.log(error)
        this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });

  }

  //bind or push All Customers details in select option
  pushallcustomers(data) {
    this.salesinvcustomers = [];
    for (let i = 0; i < data.length; i++) {
      this.salesinvcustomers.push({ value: data[i][0], label: data[i][1] });
    }

  }


  getinvcustomerinfo() {
    let custid = this.SalesinvoiceForm.get('customerrefid').value;
    let invcustinfo = { companyrefid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, patientid: custid };
    this.SalesinvService.invcustomerinfo(JSON.stringify(invcustinfo)).subscribe(data => { this.bindcustinfo(data) },
      error => {
        console.log(error)
        this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
    this.getdoctor();
    this.custtypes();
  }

  customertypes=[];
  custtypes(){
    if(this.customertypes.length==0||this.customertypes==null||this.customertypes==undefined)
    this.SalesinvService.getcustype(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.customertypes = data
    });
  }

  cusemail: any;
  holdcustname:any;
  bindcustinfo(data) {
    if (this.SalesinvoiceForm.get('customerrefid').value > 0) {
      this.drugfocus.nativeElement.focus();
      this.seniorflag = data[0][4];
      this.phycapflag = data[0][5];
      let prevnan=isNaN(parseFloat(data[0][9]));
      if(prevnan){
        this.prevamount=(0).toFixed(this.fixedlength);
      }else{
        this.prevamount = parseFloat(data[0][9]).toFixed(this.fixedlength);
      }
      this.holdcustname=data[0][1];
      this.cusemail = data[0][2];
      this.SalesinvoiceForm.get('scdno').setValue(data[0][6]);
      this.SalesinvoiceForm.get('pwdno').setValue(data[0][7]);
      this.SalesinvoiceForm.get('previousbalance').setValue(parseInt(data[0][9]).toFixed(this.fixedlength));
      this.SalesinvoiceForm.get('delmobile').setValue(data[0][16]);
      this.SalesinvoiceForm.get('delname').setValue(data[0][17]);
      this.SalesinvoiceForm.get('deladdress1').setValue(data[0][10]);
      this.SalesinvoiceForm.get('deladdress2').setValue(data[0][11]);
      this.SalesinvoiceForm.get('delcountry').setValue(data[0][12]);
      this.SalesinvoiceForm.get('delstate').setValue(data[0][13]);
      this.SalesinvoiceForm.get('delcity').setValue(data[0][14]);
      this.SalesinvoiceForm.get('delpincode').setValue(data[0][15]);
      this.SalesinvoiceForm.get('refilldays').setValue(data[0][21]);
      this.SalesinvoiceForm.get('customertype').setValue(data[0][23]);
     
      if (data[0][4] == 1) {
        this.SalesinvoiceForm.get('scitizenflag').setValue(1);
      } else {
        this.SalesinvoiceForm.get('scitizenflag').setValue(0);
      }

      if (data[0][5] == 1) {
        this.SalesinvoiceForm.get('phycapflag').setValue(1);
      } else {
        this.SalesinvoiceForm.get('phycapflag').setValue(0);
      }

      if (data[0][8] == 1) {
        this.SalesinvoiceForm.get('refillcust').setValue(true);
        this.showrefilltext = true;
      } else {
        this.SalesinvoiceForm.get('refillcust').setValue(false);
        this.showrefilltext = false;
      }
    }

  }

  getproductdetails() {
    let getproductdetails = { locname: this.selobj.locname, locrefid: this.selobj.locrefid, productid: this.drugidcopy, batchid: this.batchidcopy };
    this.SalesinvService.getproductdetails(JSON.stringify(getproductdetails)).subscribe(data => { this.validatedup(data) },
      error => {
        console.log(error)
        this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }

  validatedup(data) {

    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    let setData = control.value;

    if (setData.length <= 0) {
      this.insertproducts(data);
    } else {
      for (let p = 0; p < data.length; p++) {
        for (let k = 0; k < setData.length; k++) {
          if (setData[k].batchrefid == data[p][2]) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Product Already Exists', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            this.SalesinvoiceForm.get('formqty').setValue('');
            this.drugfocus.nativeElement.focus();
            break;
          } else {
            if (k + 1 == setData.length) {
              this.insertproducts(data);
            }
          }

        }

      }

    }
  }

  i: any
  insertproducts(data) {
    var disc;
    var vatdisplay = 'NV';
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    let setData = control.value;
    
    if (this.seniorflag == 1 || this.phycapflag == 1) {
      disc = 20;
    } else {
      disc = 0;
    }

    if (data[0][10] == 0) {
      vatdisplay = 'NV';
    } else {
      vatdisplay = 'V';
    }
    this.atcprocess = false;
    for (this.i = 0; this.i < data.length; this.i++) {

      let uqty = this.SalesinvoiceForm.get('formqty').value;

      control.insert(0, this.formBuilder.group({

        drugproductid: [data[this.i][1], []],
        productname: [data[this.i][0], []],
        batchrefid: [data[this.i][2], []],
        batchname: [data[this.i][19], []],
        expirydate: [data[this.i][20], []],
        crntstkqty: [data[this.i][3], []],
        indvqty: [uqty, []],
        totalqty: [0, []],
        indvfreeqty: [, []],
        //availfreeqty: [data[this.i][21], []],
        unitdiscount: [disc, []],
        dummyunitdiscount: [{ value: disc, disabled: this.discableflag }, []],
        unitprice: [data[this.i][5], []],
        unitvat: [data[this.i][10], []],
        unitsgst: [data[this.i][6], []],
        unitcgst: [data[this.i][7], []],
        unitigst: [data[this.i][8], []],
        unitutgst: [data[this.i][9], []],
        unitgst: [data[this.i][26], []],
        subtotal: [0, []],
        stkmainrefid: [data[this.i][22], []],
        hsnid: [data[this.i][27], []],
        hsncode: [data[this.i][28], []],
        // salesprdtid: [, []],
        // salesrefid: [, []],

        /*Sales Order Details just declare not in use here */
        soqty: [, []],
        salesorderrefid: [0, []],
        vatidentity: [vatdisplay, []],
        remarks:['',[]],

        /*Login Details */
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        clientcdate: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        countryrefid: [this.selobj.countryrefid, []],

      }));
      
    }


    this.showatcdetails();
    this.SalesinvoiceForm.get('formqty').setValue('');
    if(this.inputfrom==1){
      this.drugfocus.nativeElement.focus();
    }else{
      this.barcodefocus.nativeElement.focus();
    }
   
    this.calculation();
  }

  //Atc Details Show
  atcdetails = [];
  showatcdetails() {
    this.SalesinvService.getatc(JSON.stringify(this.drugidcopy)).subscribe(data => {
      this.atcdetails.push({ generic: data[0][5], desc1: data[0][1], desc2: data[0][2], desc3: data[0][3], desc4: data[0][4] });
    },
      error => {
        console.log(error)
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }

  //Atc Details Show
  substitutedrug = [];
  getsubdrug(index) {
    this.subdrug = true;
    this.replaceindex = index;
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    let setData = control.value;
    let drugid = setData[index].drugproductid;
    this.SalesinvService.getsubstitutedrug(drugid, this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname, this.selobj.locrefid).subscribe(data => { this.substitutedrug = data },
      error => {
        console.log(error)
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }

  //Remove Select or Checked Row in Table
  removerow(indexid) {
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    control.removeAt(indexid);
    this.replaceindex = '';
    this.calculation();
  }

  /* Sales Invoice Based Actions End */


  /*Calculations */

  calculation() {
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    let setData = control.value;

    //for clear claculation values if no products to show in table
    if (setData.length <= 0) {
      control.patchValue(setData);
      this.SalesinvoiceForm.patchValue({
        totaldiscount: (0).toFixed(this.fixedlength),
        totaltaxamt: (0).toFixed(this.fixedlength),
        taxableamt: (0).toFixed(this.fixedlength),    //Subtotal
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
    var disctotprice:number=0;
    var unitfreeqty: number = 0;
    var prevat: number = 0;
    var pregst: number = 0;
    var presgst: number = 0;
    var precgst: number = 0;
    var preigst: number = 0;
    var preutgst: number = 0;
    var vatamt: number = 0;
    var gstamt:number=0;
    var sgstamt: number = 0;
    var cgstamt: number = 0;
    var igstamt: number = 0;
    var utgstamt: number = 0;
    var gstamt: number = 0;
    var totgst: number = 0;
    var consolidategst:number=0;
    var prodisc: number = 0;
    var discamnt: number = 0;
    var totaltaxamount: number = 0;
    var grandtotal: any = 0;
    var roundoff:number=0;
    var roundcal:number=0;

    for (this.i = 0; this.i <= setData.length; this.i++) {
      if (parseFloat(setData[this.i].indvqty) > parseInt(setData[this.i].crntstkqty)) {
        let alertmsg=setData[this.i].productname+'- Unit Qty > Current Qty';
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: alertmsg , timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }else{
        if(this.discableflag==false){
          setData[this.i].unitdiscount=setData[this.i].dummyunitdiscount;
        }
        unitqty = parseFloat(setData[this.i].indvqty);
        unitfreeqty = parseInt(setData[this.i].indvfreeqty);
        utprice = parseFloat(setData[this.i].unitprice);
        prodisc = parseInt(setData[this.i].unitdiscount);
        prevat = parseInt(setData[this.i].unitvat);
        pregst = parseInt(setData[this.i].unitgst);
        presgst = parseInt(setData[this.i].unitsgst);
        precgst = parseInt(setData[this.i].unitcgst);
        preigst = parseInt(setData[this.i].unitigst);
        preutgst = parseInt(setData[this.i].unitutgst);
        vatamt=parseInt(setData[this.i].vatamt);
        gstamt=parseInt(setData[this.i].gstamt);
        sgstamt=parseInt(setData[this.i].sgstamt);
        cgstamt=parseInt(setData[this.i].cgstamt);
        igstamt=parseInt(setData[this.i].igstamt);
        utgstamt=parseInt(setData[this.i].utgstamt);
        totprice = unitqty * utprice;
        if(prodisc>0){
          disctotprice = totprice-(totprice * prodisc/100);
        }else{
          disctotprice = totprice;
        }
        
        setData[this.i].subtotal = totprice.toFixed(this.fixedlength);//Per Product Total amount in Table.
        setData[this.i].unitprice = utprice.toFixed(this.fixedlength);
        totalqty += unitqty;
        
        if(this.taxid == null && this.taxgstid == 0){
          setData[this.i].vatamt=0.00
          setData[this.i].gstamt =0.00;
          setData[this.i].sgstamt =0.00;
          setData[this.i].cgstamt =0.00;
          setData[this.i].igstamt =0.00;
          setData[this.i].utgstamt =0.00;
          totaltaxamount=0.00;
        }else if(this.taxid==1){
          totgst = (disctotprice * pregst) / (100 + pregst);
          setData[this.i].gstamt=(totgst).toFixed(this.fixedlength);
          totaltaxamount +=totgst;
        }else if(this.taxgstid == 1){
          consolidategst=precgst+presgst+preigst;
          setData[this.i].cgstamt=((disctotprice * precgst) / (100 + precgst)).toFixed(this.fixedlength);
          setData[this.i].sgstamt=((disctotprice * presgst) / (100 + presgst)).toFixed(this.fixedlength);
          setData[this.i].igstamt=((disctotprice * preigst) / (100 + preigst)).toFixed(this.fixedlength);
          totgst=(disctotprice * consolidategst) / (100 + consolidategst);
          totaltaxamount += totgst;
        }else if(this.taxgstid == 2){
          consolidategst=precgst+preutgst+preigst;
          setData[this.i].cgstamt=((disctotprice * precgst) / (100 + precgst)).toFixed(this.fixedlength);
          setData[this.i].utgstamt=((disctotprice * preutgst) / (100 + preutgst)).toFixed(this.fixedlength);
          setData[this.i].igstamt=((disctotprice * preigst) / (100 + preigst)).toFixed(this.fixedlength);
          totgst=(disctotprice * consolidategst) / (100 + consolidategst);
          totaltaxamount += totgst;
        }else{
          totgst = (disctotprice * prevat) / (100 + prevat);
          setData[this.i].vatamt=(totgst).toFixed(this.fixedlength);
          totaltaxamount += totgst;
        }
        
        //discamnt += (totprice - vatamt) * prodisc / 100;
        discamnt += (totprice * prodisc) / 100;
        subtotal += totprice;
        roundcal = subtotal - discamnt;
        if(this.belowflag==1 || this.aboveflag==1){
          grandtotal = Math.round(subtotal - discamnt);
          roundoff=(grandtotal-roundcal);
          console.log("above below if"+grandtotal+"---"+roundoff);
        }else{
          grandtotal = subtotal - discamnt;
          roundoff=0;
          console.log("above below else"+grandtotal+"---"+roundoff)
        }
        /* Push or Insert Calculation Values on Form*/
        control.patchValue(setData);
        this.SalesinvoiceForm.patchValue({
          totaldiscount: discamnt.toFixed(this.fixedlength),
          totaltaxamt: totaltaxamount.toFixed(this.fixedlength),
          taxableamt: subtotal.toFixed(this.fixedlength),    //Subtotal
          grandtotal: grandtotal.toFixed(this.fixedlength),
          totalitems: setData.length,  //total Products
          totalqty: totalqty,     //total Qty
          roundoff:roundoff.toFixed(this.fixedlength)
        })
      }
    }
  }

  amountdisccalc(){
    var grandtotal;
    var roundoff;
    var roundcal;
    let subtotal = parseFloat(this.SalesinvoiceForm.get('taxableamt').value);
    let discamount = parseFloat(this.SalesinvoiceForm.get('totaldiscount').value);
    let taxamt=parseFloat(this.SalesinvoiceForm.get('totaltaxamt').value);
    if (this.seniorflag == 1 || this.phycapflag == 1) {
      roundcal = subtotal - (discamount+taxamt);
      if(this.belowflag==1){
        grandtotal = Math.floor(subtotal - (discamount+taxamt));
        roundoff=(grandtotal-roundcal);
      }else if(this.aboveflag==1){
        grandtotal = Math.ceil(subtotal - (discamount+taxamt));
        roundoff=(grandtotal-roundcal);
      }else{
        grandtotal = subtotal - (discamount+taxamt);
        roundoff=0;
      } 
    }else{
      roundcal = subtotal - discamount;
      if(this.belowflag==1){
        grandtotal = Math.floor(subtotal - discamount);
        roundoff=(grandtotal-roundcal);
      }else if(this.aboveflag==1){
        grandtotal = Math.ceil(subtotal - discamount);
        roundoff=(grandtotal-roundcal);
      }else{
        grandtotal = subtotal - discamount;
        roundoff=0;
      } 
    }
    
    let discpercent=(subtotal*15)/100;
    if(discamount>discpercent){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Discount Amount will be High Once Check', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    this.SalesinvoiceForm.get('grandtotal').setValue(grandtotal.toFixed(this.fixedlength));
    this.SalesinvoiceForm.get('roundoff').setValue((roundoff).toFixed(this.fixedlength));
    //this.SalesinvoiceForm.get('paidamount').setValue((0).toFixed(this.fixedlength));
  }

  calbalance() {
    let grtotal = parseFloat(this.SalesinvoiceForm.get('grandtotal').value);
    let received = parseInt(this.SalesinvoiceForm.get('paidamount').value);
    let balance = received - grtotal;
    let currentbilldue=received-grtotal;
    this.loyaltyprocess(0);
    let nancheck=isNaN(balance);
    if(nancheck){
      this.SalesinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
    }else{
      this.SalesinvoiceForm.get('balanceamount').setValue((balance).toFixed(this.fixedlength));
    }
    if (balance < 0) {
      let prevbal = -(balance);
      let newdue= prevbal+parseFloat(this.prevamount);
      this.SalesinvoiceForm.get('previousbalance').setValue((newdue).toFixed(2));
      this.SalesinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
      let balalert = "Debts Amount:" + ((prevbal).toFixed(this.fixedlength));
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: balalert, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      this.SalesinvoiceForm.get('previousbalance').setValue(this.prevamount);
    }
   
    if(currentbilldue<0){
      let prevbal = -(currentbilldue);
      this.SalesinvoiceForm.get('currentbilldue').setValue((prevbal).toFixed(2));
    }else if(isNaN(currentbilldue)){
      this.SalesinvoiceForm.get('currentbilldue').setValue(0);
    }else{
      this.SalesinvoiceForm.get('currentbilldue').setValue(0);
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
    let gtotal=this.SalesinvoiceForm.get('grandtotal').value
    if(gtotal>=1){
      this.selectpaymode=paymentid;
      this.SalesinvoiceForm.get('paidamount').setValue((0).toFixed(this.fixedlength));
      this.SalesinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
      if (paymentid == 1) {
        this.SalesinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        this.receivebalfocus.nativeElement.disabled=false;
        this.receivebalfocus.nativeElement.focus();
        this.SalesinvoiceForm.get('paymentmode').setValue(1);
        this.SalesinvoiceForm.get('paymenttype').setValue('Cash');
      } else if (paymentid == 2) {
        this.SalesinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        this.receivebalfocus.nativeElement.disabled=false;
        this.receivebalfocus.nativeElement.focus();
        this.SalesinvoiceForm.get('paymentmode').setValue(2);
        this.SalesinvoiceForm.get('paymenttype').setValue('Card');
      } else if (paymentid == 3) {
        this.SalesinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        //this.receivebalfocus.nativeElement.focus();
        this.receivebalfocus.nativeElement.disabled=true;
        this.SalesinvoiceForm.get('paymentmode').setValue(3);
        this.SalesinvoiceForm.get('paymenttype').setValue('Credit');
        this.calbalance();
        
      } else if (paymentid == 4) {
        this.payments=true;
        this.SalesinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        this.receivebalfocus.nativeElement.disabled=false;
        this.receivebalfocus.nativeElement.focus();
        this.SalesinvoiceForm.get('paymentmode').setValue(4);
        this.SalesinvoiceForm.get('paymenttype').setValue('MultiPay');
      }else if (paymentid == 5) {
        this.SalesinvoiceForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
        this.receivebalfocus.nativeElement.disabled=false;
        this.receivebalfocus.nativeElement.focus();
        this.SalesinvoiceForm.get('paymentmode').setValue(5);
        this.SalesinvoiceForm.get('paymenttype').setValue('Advance');
      }
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Total Amount Zero Make Payment', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }

  }

  multiPayment() {
    var grtotal: number = 0;
    var received: number = 0;
    var balance: number = 0;
    grtotal = parseFloat(this.SalesinvoiceForm.get('grandtotal').value);
    this.cashpay = parseInt(this.SalesinvoiceForm.get('cashamt').value);
    this.creditpay = parseInt(this.SalesinvoiceForm.get('creditcardamt').value);
    this.debitpay = parseInt(this.SalesinvoiceForm.get('debitcardamt').value);
    if(isNaN(this.cashpay)){
      this.cashpay=0.00;
      this.SalesinvoiceForm.get('cashamt').setValue((0).toFixed(this.fixedlength));
    }if(isNaN(this.creditpay)){
      this.creditpay=0.00;
      this.SalesinvoiceForm.get('creditcardamt').setValue((0).toFixed(this.fixedlength));
    }if(isNaN(this.debitpay)){
      this.debitpay=0.00;
      this.SalesinvoiceForm.get('debitcardamt').setValue((0).toFixed(this.fixedlength));
    }
    received = this.cashpay + this.creditpay + this.debitpay;
    if(received>0){
      balance = received - grtotal;
      this.SalesinvoiceForm.get('paidamount').setValue((received).toFixed(this.fixedlength));
      this.SalesinvoiceForm.get('balanceamount').setValue((balance).toFixed(this.fixedlength));
      this.SalesinvoiceForm.get('paymentmode').setValue(4); 
      if (this.cashpay > 0 && this.creditpay <= 0 && this.debitpay <= 0) {
        this.SalesinvoiceForm.get('paymenttype').setValue('Cash');//Cash Pay
      } else if (this.cashpay <= 0 && this.creditpay > 0 && this.debitpay <= 0) {
        this.SalesinvoiceForm.get('paymenttype').setValue('Card');// Credit Pay
      } else if (this.cashpay <= 0 && this.creditpay <= 0 && this.debitpay > 0) {
        this.SalesinvoiceForm.get('paymenttype').setValue('Others');// Others Pay
      } else if (this.cashpay > 0 && this.creditpay > 0 && this.debitpay <= 0) {
        this.SalesinvoiceForm.get('paymenttype').setValue('Cash & Credit Card');//Cash & Credit Pay
      } else if (this.cashpay > 0 && this.creditpay <= 0 && this.debitpay > 0) {
        this.SalesinvoiceForm.get('paymenttype').setValue('Cash & Debit Card');//Cash & Debit Pay
      } else if (this.cashpay <= 0 && this.creditpay > 0 && this.debitpay > 0) {
        this.SalesinvoiceForm.get('paymenttype').setValue('Credit & Debit Cards');//Credit & Others Pay
      } else if (this.cashpay > 0 && this.creditpay > 0 && this.debitpay > 0) {
        this.SalesinvoiceForm.get('paymenttype').setValue('Cash & Credit & Debit Cards');//Cash & Credit & Others Pay
      }
  
      if (balance < 0) {
        let prevbal = -(balance);
        let newdue = prevbal+parseFloat(this.prevamount);
        this.SalesinvoiceForm.get('previousbalance').setValue((newdue).toFixed(this.fixedlength));
        this.SalesinvoiceForm.get('balanceamount').setValue(0);
        let balalert = "Debts Amount:" + ((prevbal).toFixed(2));
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: balalert, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }else{
        this.SalesinvoiceForm.get('previousbalance').setValue(this.prevamount);
      }
      this.payments = false;
      this.selectpaymode=4;
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Receive Amount Zero Make Payment', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    
  }

  setrefill(event) {
    if (event.target.checked) {
      this.SalesinvoiceForm.get('refillcust').setValue(true);
      this.showrefilltext = true;
    } else {
      this.SalesinvoiceForm.get('refillcust').setValue(false);
      this.showrefilltext = false;
    }
  }

  //Invoice Validation
  invalidate(): Number {
    var valflag = 1;
    let custid = this.SalesinvoiceForm.get('customerrefid').value;
    let totalprod = this.SalesinvoiceForm.get('totalitems').value;
    let grtotal = this.SalesinvoiceForm.get('grandtotal').value;
    let received = this.SalesinvoiceForm.get('paidamount').value;
    let paymode = this.SalesinvoiceForm.get('paymentmode').value;
    let refillcust = this.SalesinvoiceForm.get('refillcust').value;
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
      this.SalesinvoiceForm.get('balanceamount').setValue(0);
      valflag = 0;
    }
    return valflag;
  }


  saveprocess: boolean = false;
  printid:number=0;
  onSubmit() {
    //set refill values
    let refillid = this.SalesinvoiceForm.get('refillcust').value;
    let paymode = this.SalesinvoiceForm.get('paymentmode').value;
    if (refillid == true) {
      this.SalesinvoiceForm.get('refillcust').setValue(1);
    } else {
      this.SalesinvoiceForm.get('refillcust').setValue(0);
    }
    let valflag = this.invalidate();
      if (valflag == 1) {
        this.saveprocess = true;
        let puramt=parseInt(this.totalpurchaseprice)+parseInt(this.SalesinvoiceForm.get('grandtotal').value);
        for(let i=0;i<this.customertypes.length;i++){
          if(puramt>=this.customertypes[i][3]){
            this.SalesinvoiceForm.get('customertype').setValue(this.customertypes[i][1]);
          }
        }
        this.SalesinvService.SaveQuotateInvoice(JSON.stringify(this.SalesinvoiceForm.value)).subscribe(data => { 
          this.printid=data[1];
          if(data[0]){
            const saveData = this.SalesinvoiceForm.controls['invoice'];
            this.SalesinvService.SaveQuotateInvoiceproduct(JSON.stringify(saveData.value)).subscribe(data => {
              this.siresponse(data);
             },
              error => { 
                this.saveprocess=false;
                //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' }) 
              });
          } },
          error => {
            this.saveprocess = false;
            this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
          });
  
    }
  }

  smsbody: string;
  siresponse(data) {
    if(data){
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Invoice Generated Successfully ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.reportshow = true;
      this.printenable(this.printid);
      this.smsbody=  "Dear: " + this.SalesinvoiceForm.get('delname').value  + '\n' + "Thanks for Cotact with Us!...    " +'\n' + "Your Quotation Details:  " + '\n' 
                     + "Quotation No: " + this.printid + "Invoice Date: " + this.dateformat.transform04() + '\n'
                     + "Quotation Amount: " + this.SalesinvoiceForm.get('grandtotal').value + "Please Verify for this Order!..";
     
    } else{
      this.saveprocess=false;
      this.printid=0;
      this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    } 

  }


  //Print option
  reportlink: any = "assets/images/loading.gif";
  reportshow: boolean = false;
  printenable(invoiceid) {
    let seniorflag = this.SalesinvoiceForm.get('scitizenflag').value;
    let phyflag = this.SalesinvoiceForm.get('phycapflag').value;
    this.SalesinvService.getprintmodel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,4).subscribe(pdata => {
      if (pdata) {
        let rlink = pdata[0][1]+"&salesrefid="+invoiceid+"&__format=PDF";
        this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
        this.smsenable();
        //this.emailenable();
        //http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/Bill_CashPrint124/Cash_Bill.rptdesign&salesrefid=" 
      }else{
        this.smsenable();
      }
    }, err => { console.log(err);  this.smsenable(); });
    
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
    this.SalesinvService.sendsms(smsdata[0][1], smsdata[0][2], smsdata[0][3], this.SalesinvoiceForm.get('delmobile').value, this.smsbody, AppComponent.companyID, AppComponent.branchID,
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
      customername: this.SalesinvoiceForm.get('customerrefid').value,
      custinvoiceno: data[2],
      url: reporturl,
      email: this.cusemail,
      grandtotal: this.SalesinvoiceForm.get('grandtotal').value,

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
    this.SalesinvoiceForm.reset();
    this.ngOnInit();
  }

  //Reset cancel form
  cancel() {
    this.SalesinvoiceForm.reset();
    this.ngOnInit();
  }

 




  /*Prescription Image Upload*/

  //presc Image Validation & Preview
  message: any;
  prescurl: any;
  showeyeslash: boolean = false;
  showeye: boolean = true;
  prescChange(event: any) {

    this.message = "";

    // when the load event is fired and the file not empty
    if (event.target.files && event.target.files.length > 0) {

      //Check & Print Type Error Message
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.showprescimage = false;
        this.message = "Only images are supported.";
        return;
      }


      if (event.target.files[0].size < 500000) {

        // Fill file variable with the file content
        this.prescphoto = event.target.files[0];

        // Instantiate an object to read the file content
        let reader = new FileReader();

        //To read Encrypted file and send url to display in html
        reader.readAsDataURL(this.prescphoto);
        reader.onload = (_event) => {
          this.prescurl = reader.result;
        }

      }

      else {
        this.message = "Max Image Size 500KB Only & Check File Format";
      }

    }

  }


  prescShow() {
    this.showprescimage = true;
    this.showeyeslash = true;
    this.showeye = false;
  }

  prescHide() {
    this.showprescimage = false;
    this.showeyeslash = false;
    this.showeye = true;
  }

  prescReset() {
    //this.myForm.get('prescphoto').setValue("");
    this.prescurl = '';
    this.showprescimage = false;
    this.showeyeslash = false;
    this.showeye = true;
    this.message = '';
    this.prescpathclear.nativeElement.value = "";
  }
  /*Prescription End */

  /* Add New Products */

  initformarray() {
    return this.formBuilder.group({
      newproductname: ['', []],
      reqqty: ['', []],
      remarks: ['', []],
      /*Login Details */
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      locname: [this.selobj.locname, []],
      locrefid: [this.selobj.locrefid, []],
      clientcdate: [this.dateformat.transform04(), []],
      createdby: [this.selobj.userid, []],
    });
  }

  insertnewrow() {
    this.initformarray();
    const control = <FormArray>this.SalesinvoiceForm.controls['newproduct'];
    control.push(this.initformarray());
  }

  addNewProduct() {
    this.initformarray();
    const control = <FormArray>this.SalesinvoiceForm.controls['newproduct'];
    control.controls = [];
    control.push(this.initformarray());
  }

  removenewprodrow(indexid) {
    const control = <FormArray>this.SalesinvoiceForm.controls['newproduct'];
    control.removeAt(indexid);
  }

  newproduct: boolean = false;
  saveNewProduct() {
    const saveData = <FormArray>this.SalesinvoiceForm.controls['newproduct'];
    //let getproductdetails = { locname: this.selobj.locname, locrefid: this.selobj.locrefid, productid: this.drugidcopy, batchid: this.batchidcopy };
    this.SalesinvService.saveNewProduct(JSON.stringify(saveData.value)).subscribe(data => {
      if (data[0].productid > 0) {
        this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Product Saved Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        this.newproduct = false;
      }

    },
      error => {
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      });

  }

  /* Add New Product End */


  /* Create Dummy fields  */

  dummyformarray() {
    return this.formBuilder.group({
      dummyid: ['', []],
      dummyvalue: ['', []],
      dummyname: ['', []],
      /*Login Details */
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      locname: [this.selobj.locname, []],
      locrefid: [this.selobj.locrefid, []],
      clientcdate: [this.dateformat.transform04(), []],
      createdby: [this.selobj.userid, []],
    });
  }

  validnewdummy() {
    var valflag = 1;
    const control = <FormArray>this.SalesinvoiceForm.controls['dummyfields'];
    let setData = control.value;
    for (this.i = 0; this.i < setData.length; this.i++) {
      if (setData[this.i].dummyname == '' || setData[this.i].dummyname == null) {
        valflag = 0;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Please Fill Created Empty Fields', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        break;
      }
    }

    return valflag;
  }

  insertnewdummy() {
    const control = <FormArray>this.SalesinvoiceForm.controls['dummyfields'];
    if (control.length > 4) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Maximum No of Dummy Created', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    } else {
      let valflag = this.validnewdummy();
      if (valflag == 1) {
        control.push(this.dummyformarray());
      }
    }
  }

  dummyindex = [];
  dummyindexlabel = [];
  addNewdummy() {
    let dummy = JSON.parse(localStorage.getItem('dummyarray'));
    if(dummy==null || dummy =='' || dummy ==undefined){
    }else{
      const control = <FormArray>this.SalesinvoiceForm.controls['dummyfields'];
      control.controls = [];
      for (let i = dummy.length - 1; i >= 0; i--) {
        this.dummyindex[i] = dummy[i].dummyvalue;
        this.dummyindexlabel[i] = dummy[i].dummyname;
        control.insert(0, this.formBuilder.group({
          dummyid: [dummy[i].dummyid, []],
          dummyvalue: [dummy[i].dummyvalue, []],
          dummyname: [dummy[i].dummyname, []],
          /*Login Details */
          companyrefid: [this.selobj.companyid, []],
          branchrefid: [this.selobj.branchrefid, []],
          locname: [this.selobj.locname, []],
          locrefid: [this.selobj.locrefid, []],
          clientcdate: [this.dateformat.transform04(), []],
          createdby: [this.selobj.userid, []],
        }));
      }
    }
  }

  //for the purpose of value changed based on toogle
  tooglechange(indexid) {
    const control = <FormArray>this.SalesinvoiceForm.controls['dummyfields'];
    let saveData = control.value;
    if (saveData[indexid].dummyvalue == false) {
      saveData[indexid].dummyvalue = true;
    } else {
      saveData[indexid].dummyvalue = false;
    }
  }

  dummy: boolean = false;
  savenewdummy() {
    let valflag = this.validnewdummy();
    if (valflag == 1) {
      const saveData = <FormArray>this.SalesinvoiceForm.controls['dummyfields'];
      localStorage.setItem('dummyarray', JSON.stringify(saveData.value));
      this.dummy = false;
      this.addNewdummy();
    }
  }

  removedummyrow(indexid) {
    const control = <FormArray>this.SalesinvoiceForm.controls['dummyfields'];
    control.removeAt(indexid);
    this.dummyindex[indexid] = false;
  }

  /* Dummy Fields End  */

  underprocess: boolean = false;
  underprogress() {
    this.underprocess = true;
    setTimeout(() => {
      this.underprocess = false;
    }, 3000);
  }

  //Loyalty process
  loyalopenvalidate(){
    let custid=this.SalesinvoiceForm.get('customerrefid').value;
    let grandtot=parseInt(this.SalesinvoiceForm.get('grandtotal').value);
    if(custid==''||custid==null||custid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'First you Select Customer', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' })
      return false;
    }else if(grandtot<=0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Grand total not be Zero', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' })
      return false;
    }
    return true;
  }

  loyaltyflag:boolean=false;
  totalpurchaseprice:any=0;
  totalloyalpoints:any=0;
  availloyalpoints:any=0;
  shopequalloyalprice:any=0;
  shopequalloyalpoints:any=0;
  minimumpoints:any=0;
  loyaltyprocess(eventval){
    let valflag=this.loyalopenvalidate();
    if(valflag){
      if(eventval==1){
        this.loyaltyflag=true;
      }
      this.SalesinvService.getCustLoyaltyDetails(this.SalesinvoiceForm.get('customerrefid').value).subscribe(data => {
        if(data){
          this.totalpurchaseprice=data[0][5];
          this.totalloyalpoints=data[0][6];
          this.availloyalpoints=data[0][12];
        } },
          error => {
            //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
        });
      this.SalesinvService.getShopLoyaltyDetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
        if(data){
          this.shopequalloyalprice=data[0][2];
          this.shopequalloyalpoints=data[0][3];
          this.minimumpoints=data[0][6];
        } },
            error => {
            //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
        });

      setTimeout(() => {
        this.newloyalcalc();
      }, 2100);
    }
  }

  newloyalcalc(){
    let eqvloyalprice = parseInt(this.shopequalloyalprice);
    let eqvloyalpoints = parseInt(this.shopequalloyalpoints);
    let onelpointamount = eqvloyalprice/eqvloyalpoints;
    let totpurchase=parseInt(this.totalpurchaseprice);
    let totloyalpoint=parseInt(this.totalloyalpoints);
    let grandtotal=parseInt(this.SalesinvoiceForm.get('grandtotal').value);
    let overallloyalpoint=(totpurchase+grandtotal)/onelpointamount;
    let newloyalpoint=Math.floor(overallloyalpoint-totloyalpoint);
    if(newloyalpoint>=1){
      this.SalesinvoiceForm.get('currentloyalpoints').setValue(newloyalpoint);
    }else{
      this.SalesinvoiceForm.get('currentloyalpoints').setValue(0);
    }
  }

  loyalpointsuasage(){
    let usagepoints=this.SalesinvoiceForm.get('currentuseloyalpoints').value;
    let totaldisc=parseFloat(this.SalesinvoiceForm.get('totaldiscount').value);
    let grandtotal=parseInt(this.SalesinvoiceForm.get('grandtotal').value);
    let loyalcheck=this.SalesinvoiceForm.get('minimumloyalcheck').value;
    if(usagepoints<1){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Enter Minimum 1', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      this.SalesinvoiceForm.get('currentuseloyalpoints').setValue(0);
    }else if(usagepoints>parseInt(this.availloyalpoints)){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Enter Below Avail Points', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      this.SalesinvoiceForm.get('currentuseloyalpoints').setValue(0);
    }else if(usagepoints>grandtotal){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Enter Below Grand Total Amount', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      this.SalesinvoiceForm.get('currentuseloyalpoints').setValue(0);
    }else if(loyalcheck==true && usagepoints<this.minimumpoints){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Avail Loyal Points not reach in Minimum Level', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      this.SalesinvoiceForm.get('currentuseloyalpoints').setValue(0);
    }else{
      this.SalesinvoiceForm.get('totalloyalamount').setValue((usagepoints).toFixed(this.fixedlength));
      this.SalesinvoiceForm.get('totaldiscount').setValue((totaldisc+usagepoints).toFixed(this.fixedlength));
      this.SalesinvoiceForm.get('grandtotal').setValue((grandtotal-usagepoints).toFixed(this.fixedlength));
      this.loyaltyflag=false;
    }
  }


  //Gift Process
  giftpurchaseamt:any=0;
  giftamt:any=0;
  giftexpiry:any=0;
  giftcardflag:boolean=false;
  giftcardprocess(eventval){
    this.giftpurchaseamt=0;
    this.giftamt=0;
    this.giftexpiry=0;
    if(eventval.length>9){
      this.SalesinvService.getGiftCardDetails(eventval).subscribe(data => {
      if(data == '' || data ==null || data.length==0){
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'No Matched Gift Card', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' })
      }else{
         this.giftpurchaseamt=data[0][1];
         this.giftamt=data[0][5];
         var d1 = new Date();
         var d2 = new Date(data[0][6]);
         if(d1>d2){
           this.giftexpiry=1;
         }else{
           this.giftexpiry=0;
         }
      } },
        error => {
            //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
      });
    }
  }

  giftcardapply(){
    let grandtotal=parseFloat(this.SalesinvoiceForm.get('grandtotal').value);
    let totaldisc=parseFloat(this.SalesinvoiceForm.get('totaldiscount').value);
    let giftcode=this.SalesinvoiceForm.get('giftcode').value;
    let giftamt=parseInt(this.giftamt);
    if(giftcode.toString().length<9 || giftcode == '' || giftcode == undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Enter Valid Code', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' })
    }else if(parseInt(this.giftpurchaseamt)>grandtotal){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Minimum Purchase Amount not Reach', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' })
    }else{
      this.SalesinvoiceForm.get('totaldiscount').setValue((totaldisc+giftamt).toFixed(this.fixedlength));
      this.SalesinvoiceForm.get('grandtotal').setValue((grandtotal-giftamt).toFixed(this.fixedlength));
      this.SalesinvoiceForm.get('totalgiftamount').setValue((giftamt).toFixed(this.fixedlength));
      this.giftcardflag=false;
    }
  }

  //Hold Sales Bills
  holdsales(){
    //set refill values
    let refillid = this.SalesinvoiceForm.get('refillcust').value;
    let paymode = this.SalesinvoiceForm.get('paymentmode').value;
    if (refillid == true) {
      this.SalesinvoiceForm.get('refillcust').setValue(1);
    } else {
      this.SalesinvoiceForm.get('refillcust').setValue(0);
    }if(paymode==5){
      let valflag = this.invalidate();
      if (valflag == 1) {
        this.SalesinvService.HoldSalesInvoice(JSON.stringify(this.SalesinvoiceForm.value)).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'Success MSG', msg:'Invoice Hold Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' })
          this.holdsalesproducts();
        } },
          error => {
            //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
          });
  
      }
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select & Pay Advance', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
    }
    
  }

  holdsalesproducts(){
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    let holdproducts=control.value;
    this.SalesinvService.HoldSalesInvoiceProducts(JSON.stringify(holdproducts)).subscribe(data => {
      if(data){
        this.SalesinvoiceForm.reset();
        this.ngOnInit();
        this.notificationsComponent.addToast({ title: 'Success MSG', msg:'Invoice Products Hold Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' })
      } },
        error => {
          //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
      });
  }

  holdprocess:boolean=false;
  holdbills=[];
  fetchholdbills(){
    //this.ngOnInit();
    this.holdprocess=true;
    this.SalesinvoiceForm.get('holdbill').setValue('opt1');
   
    this.SalesinvService.getHoldBills(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.holdbills=data },
        error => {
          this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
      });
  }

  holdflag:number=0;
  getholdbillsdetails(id){
    this.SalesinvoiceForm.reset();
    this.SalesinvoiceForm.get('salesbilltype').setValue(1);
    this.SalesinvoiceForm.get('searchcheck').setValue(1);
    this.SalesinvoiceForm.get('employeerefid').setValue(sessionStorage.getItem('indvuserid'));
    this.SalesinvoiceForm.get('billdate').setValue(this.dateformat.transformnew(Date.now()));
    this.SalesinvoiceForm.get('paidamount').setValue(0.00);
    this.SalesinvoiceForm.get('balanceamount').setValue(0.00);
    this.holdflag=1;
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];
    control.controls=[];
    this.getholdbillsproddetails(id);
    this.SalesinvService.getHoldBillsDetails(id).subscribe(data => {
      //this.SalesinvoiceForm.patchValue(data) ;
      this.selectpaymode=1;
      this.holdprocess=false;
      this.SalesinvoiceForm.get('customerrefid').setValue(data.customerrefid.toString());
      this.getinvcustomerinfo();
       this.SalesinvoiceForm.patchValue({
        totaltaxamt:data.totaltaxamt,
        totaldiscount:data.totaldiscount,
        taxableamt:(data.taxableamt).toFixed(this.fixedlength), //subtotal value
        grandtotal:(data.grandtotal).toFixed(this.fixedlength),
        totalitems:data.totalitems,  //Total Products
        totalqty:data.totalqty,
        //roundoff:data.roundoff,
         //previousbalance:(data.previousbalance).toFixed(2),
        paidamount:data.paidamount,   //Received Amount
        // balanceamount:(data.balanceamount).toFixed(2),

        /* for Refill purpose*/
        refilldays:data.refilldays,

        /*for discount purpose senior citizen physical handicap */
        scitizenflag:data.scitizenflag,
        phycapflag:data.phycapflag,
        scdno:0,
        pwdno:0,
       
        cashamt:data.cashamt,
        creditcardamt:data.creditcardamt,
        debitcardamt:data.debitcardamt,
        paymentmode:data.paymentmode,
        paymenttype:data.paymenttype,
       
      });
  },
    error => {
      this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
    });
  }

  getholdbillsproddetails(id){
    this.SalesinvService.getHoldBillsProdDetails(id).subscribe(data => {this.bindholdproducts(data) },
    error => {
      //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
  });
  }

  bindholdproducts(data){
    const control = <FormArray>this.SalesinvoiceForm.controls['invoice'];

    for (let i = 0; i < data.length; i++) {

      let uqty = this.SalesinvoiceForm.get('formqty').value;
      //let expdate = new Date(data[i].expirydate); 
      var datePipe = new DatePipe("en-US");
      var expdate = datePipe.transform(data[i].expirydate, 'yyyy-MM-dd');
      control.insert(0, this.formBuilder.group({
        drugproductid: [data[i].drugproductid, []],
        productname: [data[i].productname, []],
        batchrefid: [data[i].batchrefid, []],
        batchname: [data[i].batchname, []],
        expirydate: [expdate, []],
        //crntstkqty: [data[i].drugproductid, []],
        indvqty: [data[i].indvqty, []],
        totalqty: [data[i].totalqty, []],
        indvfreeqty: [data[i].indvfreeqty, []],
        //availfreeqty: [data[this.i][21], []],
        unitdiscount: [data[i].unitdiscount, []],
        dummyunitdiscount: [data[i].unitdiscount, []],
        unitprice: [data[i].unitprice, []],
        unitvat: [data[i].unitvat, []],
        unitsgst: [data[i].unitsgst, []],
        unitcgst: [data[i].unitcgst, []],
        unitigst: [data[i].unitigst, []],
        unitutgst: [data[i].unitutgst, []],
        unitgst: [data[i].unitgst, []],
        subtotal: [data[i].subtotal, []],
        stkmainrefid: [data[i].stkmainrefid, []],
        // salesprdtid: [, []],
        // salesrefid: [, []],

        /*Sales Order Details just declare not in use here */
        //soqty: [data[i].drugproductid, []],
        salesorderrefid: [data[i].salesorderrefid, []],
        hsnid: [data[i].hsnid, []],
        hsncode: [data[i].hsncode, []],
        //vatidentity: [vatdisplay, []],

        /*Login Details */
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        clientcdate: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        countryrefid: [this.selobj.countryrefid, []],

      }));
    }
  }

  //Duepay Process
  duepayflag:boolean=false;
  duepay(event){
    if (event.target.checked) {
      let custid=this.SalesinvoiceForm.get('customerrefid').value
      if(custid==''||custid==null||custid==undefined||custid==0){
        this.SalesinvoiceForm.get('dueflag').setValue(false);
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'First you Select Customer', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
      }else{
        this.SalesinvoiceForm.get('dueflag').setValue(true);
        this.duepayflag = true;
        this.SalesinvService.getPendingPayLists(custid).subscribe(data => {this.bindpendingpay(data) },
        error => {
          //this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' })
        });
      }
    } else {
      this.SalesinvoiceForm.get('dueflag').setValue(false);
      this.duepayflag = false;
    }
  }

  bindpendingpay(data){
    const control = <FormArray>this.SalesinvoiceForm.controls['duepaytable'];
    let setData = control.value;
    control.controls=[];
    for (let i = 0; i < data.length; i++) {
      control.insert(0, this.formBuilder.group({
        payflag:[false,[]],
        journaid: [data[i][0], []],
        invoiceno: [data[i][1], []],
        creditamount: [data[i][2], []],
        invoicename: [data[i][3], []],
        journalno: [data[i][4], []],
        personame: [data[i][5], []],
        /*Login Details */
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        clientcdate: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        countryrefid: [this.selobj.countryrefid, []],
      }));
    }
  }
  //Extra icons process
  ///...


}




