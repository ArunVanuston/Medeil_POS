import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from "@angular/forms";
import { addinvoiceService } from './addPurchaseinvoice.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import swal from 'sweetalert2';
import { dateFormatPipe } from '../../notifications/notifications.datepipe';
import { DomSanitizer } from '@angular/platform-browser'; 
import { cardToggle } from 'app/shared/card/card-animation';
import { TranslateService } from 'ng2-translate';  
//import * as $ from 'jquery';
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
declare var $: any;
@Component({
  selector: 'app-addPurchaseinvoice',
  templateUrl: './addPurchaseinvoice.component.html',
  styleUrls: ['./addPurchaseinvoice.component.css'],
  animations: [cardToggle],
  providers: [addinvoiceService, NotificationsComponent]
})

export class addinvoiceComponent implements OnInit {
  @ViewChild('drugfocus') drugfocus: ElementRef;
  @ViewChild('boxqtyfocus') boxqtyfocus: ElementRef;
  @ViewChild('boxstripfocus') boxstripfocus: ElementRef;
  
  parentMessage = "sales";
  cardToggle: string = 'expanded';
  $: any;
  invoiceForm: FormGroup;
  pophsnform: FormGroup;
  inventoryjournal: FormGroup;
  paymentjournal: FormGroup;
  purchasejournal: any;
  @Input() searchText;
  isDesc: boolean = false;
  column;
  id: string = '0000001';
  val: string = 'PIV';
  brandlist = [];
  branddata = [];
  returnValid: any;
  distibutor: Array<any>
  distvalues = [];
  characters = [];
  purtax = [];
  localstore = [];
  x;
  polist = [];
  coltax: any;
  Math: string;
  roundamount: any;
  deviceObj;
  setcgst: number = 0;
  setsgst: number = 0;
  setigst: number = 0;
  setugst: number = 0;
  taxid: number;
  taxgstid: number = 0;
  decists: any;
  itemlength = [{}, {}, {}, {}, {}, {}];
  dropdownSettings3: { maxHeight: number; singleSelection: boolean; text: string; badgeShowLimit: number; classes: string; };
  selectedItems = [];
  dclist = [];
  hsnlist = [];
  pophsnlist = [];
  mrpvalue;
  mfgshortname;
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  pactype: string = "Box";
  pactype1: string = "Box";
  packingevent(event) {
    this.pactype = event;
    this.boxqtyfocus.nativeElement.value="";
    this.boxqtyfocus.nativeElement.focus();
  }
  packingevent1(event) {
    this.pactype1 = event;
  }
  qtype: number = 0;
  quantitytype(event) {
    if (event == 0) {
      this.qtype = event;
    } else {
      this.qtype = event;
    }
  }
  constructor(public translate: TranslateService,private invoiceService: addinvoiceService, private router: Router, private formBuilder: FormBuilder, private domSanitizer: DomSanitizer,
    private notificationsComponent: NotificationsComponent, private appComponent: AppComponent, private dateformat: dateFormatPipe) {    translate.setDefaultLang('en');
    this.invoiceForm = this.formBuilder.group({
      productid: ['', []],
      pino: ['', []],
      pidate: [this.dateformat.transform05(Date.now()), [Validators.required]],
      vendorinvoiceno: ['', []],
      deliverytype: ['opt1', []],
      previouspurchaseitem: ['', []],
      refpoid: ['', []],
      vendorid: ['opt1', []],
      dlnumber: ['', []],
      gst: ['', []],
      addreess: ['', []],
      actamount: ['', []],
      barcode: ['', []],
      totalproduct: ['', []],
      totalquantity: ['', []],
      totalfreeqty: ['', []],
      itemamt: ['', []],
      totaldiscount: ['', []],
      cashdiscount: ['0', []],
      roundoff: ['', []],
      invoiceamt: ['', []],
      adjustamt: ['', []],
      prnumber: ['', []],
      totalmargin: ['', []],
      gstamt: ['', []],
      brandcode: ['', []],
      brandname: ['', []],
      totaltaxamt: ['', []],
      sgstamt: ['', []],
      cgstamt: ['', []],
      igstamt: ['', []],
      vatamt: ['', []],
      utgstamt: ['', []],
      taxableamt: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      clientcdate: ['', []],
      status: [0, []],
      quantity: [0, []],
      tabqty: [0],
      boxqty: [0],
      stripqty: [0],
      boxperstrip: [0],
      strippertablet: [1],
      batch: ['', []],
      expdate: ['', []],
      grandtotal: ['', []],
      dchellan: ['', []],
      distinvoiceno: ['', []],
      puapprovalst: [0, []],
      hsncode: ['', []],
      mfgshortname: ['', []],
      mrpvalue: ['', []],
      sellingvalue: ['', []],
      gstper: ['', []],
      packageunit: ['Box', []],
      cashdiscountpercent:[0,[]],
      brandDetails: this.formBuilder.array([]),
      hiddenfields: this.formBuilder.array([]),
    });
    this.inventoryjournal = this.formBuilder.group({
    //  debitaccount: [1, []],
      creditaccount: [1, []],
      debitamount: [, []],
      creditamount: [, []],
      craccname: ['Inventory', []],
     // draccname: ['Inventory', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [8, []],
      jrnlname: ['Inventory', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [1, []],
      invoicetype: [5, []],
      paymenttype: [, []],
      ptrefno: [, []],
      countryrefid: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      salesflag: [0, []],
      calcflag: [0, []],
    });
    this.purchasejournal = this.formBuilder.group({
    //  debitaccount: [17, []],
      creditaccount: [17, []],
      //  creditaccount: [4, []],
      debitamount: [],
      creditamount: [],
      // craccname: ['Creditors', []],
      // draccname: ['Purchase Account', []],
      craccname: ['Purchase Account', []],
      invoiceno: [],
      invoicebalamt: [],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [],
      jrnltype: [2, []],
      jrnlname: ['Purchase', []],
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
    this.paymentjournal = this.formBuilder.group({
       debitaccount: [4, []],
        // creditaccount: [17, []],
        //  creditaccount: [4, []],
        debitamount: [],
        creditamount: [],
        // craccname: ['Creditors', []],
        draccname: ['Creditors', []],
        // craccname: ['Purchase Account', []],
        invoiceno: [],
        invoicebalamt: [],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        cashflag: [],
        jrnltype: [4, []],
        jrnlname: ['Payment', []],
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
    this.pophsnform = this.formBuilder.group({
      pophsnlist: [],
      popgstvalue: []
    });
  }

  toggleCard() {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }
  unionstate = [20934, 20936, 20940, 20948, 21773, 21775, 21776]
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    //Auto Increment        
    // this.invoiceForm.get('pino').setValue(this.val + this.id);
    //Here to Set Default Values For DropDownBoxes
    this.invoiceForm.get('previouspurchaseitem').setValue("opt1");
    this.invoiceForm.get('sellingvalue').setValue((0).toFixed(2));
    this.invoiceForm.get('refpoid').setValue("0");
    //   this.invoiceForm.get('vendorid').setValue("opt1");
    this.invoiceForm.get('companyrefid').setValue(AppComponent.companyID);
    this.invoiceForm.get('branchrefid').setValue(AppComponent.branchID);

    this.invoiceForm.get('locname').setValue(AppComponent.locRefName1);

    //this.autoIncrement(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1);
    if (AppComponent.shopID != 0) {
      this.invoiceForm.get('locrefid').setValue(AppComponent.shopID);
      this.invoiceService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.distibutor = data,
        err => {
          console.log('Error Occured on Get Distributor Details');
        });
      this.invoiceService.getPolist(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.polist = data,
        err => {
          console.log('Error Occured On getPolist()');
        }
      );
      /*Get Tax inclusive Or Exclusive*/
      this.invoiceService.getPurchasetax(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.purtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data, this.taxid = data

        this.invoiceService.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
          this.decists = data
          if (data[0][1] == 1) {
            this.fixedlength = 3;
          } else { this.fixedlength = 2 }

          if (data[0][2] == 1) {
            this.aboveflag = 1;
          } else { this.aboveflag = 0 }

          if (data[0][3] == 1) {
            this.belowflag = 1;
          } else { this.belowflag = 0 }
          this.invoiceForm.get('itemamt').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('vatamt').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('totaldiscount').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('totalmargin').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('totaltaxamt').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('taxableamt').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('totalproduct').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('totalquantity').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('totalfreeqty').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('grandtotal').setValue((0).toFixed(this.fixedlength));
          this.invoiceForm.get('roundoff').setValue((0).toFixed(this.fixedlength));
        })

        this.invoiceService.getHsnlist().subscribe(data => {
          this.hsnlist = [];
          for (let i = 0; i < data.length; i++) {
            this.hsnlist.push({ value: data[i][0], label: data[i][1], gst: data[i][2] });
          }
          this.pophsnlist = [];
          for (let i = 0; i < data.length; i++) {
            this.pophsnlist.push({ value: data[i][0], label: data[i][1], gst: data[i][2] });
          }
        });

        // if (data[0][0] == 0) {
        //   this.taxid = 0;
        //   // $("#colvathide").show();
        //   // $('.colvathide').show();
        //   // $("#colhide").hide();
        //   // $('.colhide').hide();
        //   // $("#colindgsthide").hide();
        //   // $('.colindgsthide').hide();
        // }
        // if (data[0][0] == 1) {
        //   this.taxid = 1;
        //   // $("#colvathide").hide();
        //   // $('.colvathide').hide();
        //   // $("#colhide").show();
        //   // $('.colhide').show();
        //   // $("#colindgsthide").hide();
        //   // $('.colindgsthide').hide();
        // }
        // if (data[0][0] == 2) {
        //   this.taxid = 2;
        //   if(this.taxid==2){
        //     if(data[0][18] !=null){
        //       //  this.taxid=0;
        //         this.taxgstid=1;
        //     } else {
        //       for(this.i=0;this.i<this.unionstate.length;this.i++){
        //         if(data[0][18]== this.unionstate[this.i]){
        //         //  this.taxid=0;
        //           this.taxgstid=2;
        //           break;
        //        } else{
        //           this.taxid=2;
        //           this.taxgstid=0;
        //         } 
        //       }  
        //     }

        //   // $("#colvathide").hide();
        //   // $('.colvathide').hide();
        //   // $("#colhide").hide();
        //   // $('.colhide').hide();
        //   // $("#colindgsthide").show();
        //   // $('.colindgsthide').show();
        //   }
        // }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }
    if (AppComponent.hospitalID != 0) {
      this.invoiceForm.get('locrefid').setValue(AppComponent.hospitalID);
      this.invoiceService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.distibutor = data,
        err => {
          console.log('Error Occured on Get Distributor Details');
        });
      this.invoiceService.getPolist(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.polist = data,
        err => {
          console.log('Error Occured On getPolist()');
        }
      );
      /*Get Tax inclusive Or Exclusive*/
      this.invoiceService.getPurchasetax(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.purtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data
        if (data[0] == 0) {
          $("#colvathide").show();
          $('.colvathide').show();
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colindgsthide").hide();
          $('.colindgsthide').hide();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
          $("#colindgsthide").hide();
          $('.colindgsthide').hide();
        }
        if (data[0] == 2) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colindgsthide").show();
          $('.colindgsthide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }
    if (AppComponent.warehouseID != 0) {
      this.invoiceForm.get('locrefid').setValue(AppComponent.warehouseID);
      this.invoiceService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.distibutor = data,
        err => {
          console.log('Error Occured on Get Distributor Details');
        });
      this.invoiceService.getPolist(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.polist = data,
        err => {
          console.log('Error Occured On getPolist()');
        }
      );
      /*Get Tax inclusive Or Exclusive*/
      this.invoiceService.getPurchasetax(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.purtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data
        if (data[0] == 0) {
          $("#colvathide").show();
          $('.colvathide').show();
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colindgsthide").hide();
          $('.colindgsthide').hide();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
          $("#colindgsthide").hide();
          $('.colindgsthide').hide();
        }
        if (data[0] == 2) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colindgsthide").show();
          $('.colindgsthide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }
    this.dropdownSettings3 = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Chellan Number ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

    setTimeout(() => {
      this.addNewHiddenDetails();  
    }, 1200);

  }

  Dclist(data: any) {
    this.dclist = [];
    for (this.i = 0; this.i < data.length; this.i++) {
      this.dclist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }

  distvalue() {
    this.invoiceService.getposistributor(this.invoiceForm.get('refpoid').value).subscribe(async data => {
      this.invoiceForm.get('vendorid').setValue(data[0][0]); this.invoiceForm.get('dlnumber').setValue(data[0][2]); this.invoiceForm.get('gst').setValue(data[0][3]); this.invoiceForm.get('addreess').setValue(data[0][4])
      //taxation Concept
      if (this.coltax[0][0] == 0) {
        if (data[0][5] != null && data[0][5] == AppComponent.countryID) {
          this.taxid = 0;
        } else {
          this.taxid = null;
        }
        // $("#colvathide").show();
        // $('.colvathide').show();
        // $("#colhide").hide();
        // $('.colhide').hide();
        // $("#colindgsthide").hide();
        // $('.colindgsthide').hide();
      }
      if (this.coltax[0][0] == 1) {
        if (data[0][5] != null && data[0][5] == AppComponent.countryID) {
          this.taxid = 1;
        } else {
          this.taxid = null;
        }
        // $("#colvathide").hide();
        // $('.colvathide').hide();
        // $("#colhide").show();
        // $('.colhide').show();
        // $("#colindgsthide").hide();
        // $('.colindgsthide').hide();
      }
      if (this.coltax[0][0] == 2) {
        if (data[0][5] != null && data[0][5] == AppComponent.countryID) {
          // this.taxgstid=1;
          for (this.i = 0; this.i < this.unionstate.length; this.i++) {
            if (data[0][6] == this.unionstate[this.i]) {
              //  this.taxid=0;
              this.taxid = 2;
              this.taxgstid = 2;
              break;
            } else {
              this.taxid = 2;
              this.taxgstid = 1;
            }
          }
        } else {
          this.taxid = null;
          this.taxgstid = 0;
        }
      }
    await this.getPOrder();
    },
      err => {
        console.log('Error Occured on Get Distributor Details');
      });
  }
  /* auto ictrement function */
  // autoIncrement(cid: any, bid: any, lrefid: any, lname: any) {
  //   this.invoiceService.autoIcrement(cid, bid, lrefid, lname).subscribe(data => {
  //     this.invoiceForm.get('pino').setValue(data.toString())
  //   },
  //     err => {
  //       console.log('Error occured On autoIcrement()');
  //     });
  // }
  /* Get Strip(S  Stripperbox ) and Box(B Quantityperstrip) Quantity */
  getSBQuantity(id: number) {
    this.invoiceService.getSBQuantity(id).subscribe(data => { this.sbQuantity = data },
      error => {
        console.log("Error Occured on getSBQuantity");
      })
  }
  //get Dist Values 
  getDistvalues() {
    this.invoiceService.getDistvalues(this.invoiceForm.get('vendorid').value).subscribe(data => {
      this.distvalues = data
      //taxation Concept
      if (this.coltax[0][0] == 0) {
        if (this.distvalues[0][5] != null && this.distvalues[0][5] == AppComponent.countryID) {
          this.taxid = 0;
        } else {
          this.taxid = null;
        }
      }
      if (this.coltax[0][0] == 1) {
        if (this.distvalues[0][5] != null && this.distvalues[0][5] == AppComponent.countryID) {

          this.taxid = 1;
        } else {
          this.taxid = null;
        }
      }
      if (this.coltax[0][0] == 2) {
        if (this.distvalues[0][5] != null && this.distvalues[0][5] == AppComponent.countryID) {
          // this.taxgstid=1;
          for (this.i = 0; this.i < this.unionstate.length; this.i++) {
            if (this.distvalues[0][6] == this.unionstate[this.i]) {
              //  this.taxid=0;
              this.taxid = 2;
              this.taxgstid = 2;
              break;
            } else {
              this.taxid = 2;
              this.taxgstid = 1;
            }
          }
        } else {
          this.taxid = null;
          this.taxgstid = 0;
        }
      }
    },
      error => {
        console.log('Error Occured on getDistvalues()' + error);
      });

  }

  setdeliverytypefocus(){
    this.drugfocus.nativeElement.focus();
  }

  selectedIndex: number = -1;
  selecteddrug: any;
  searcheddrugvalues = [];
  getProduct(val: string) {
    if (val.length > 0) {
      if (this.invoiceForm.get('vendorid').value=='opt1' || this.invoiceForm.get('vendorid').value=='' || this.invoiceForm.get('vendorid').value == null || this.invoiceForm.get('vendorid').value==undefined) {
        this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Distributor', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
        this.selectedIndex = -1;
        this.selecteddrug = '';
        this.drugfocus.nativeElement.value = "";
        this.boxqtyfocus.nativeElement.value = "";
        this.boxstripfocus.nativeElement.value = "";
      }else {
        this.invoiceService.getProductlist(val, AppComponent.companyID, AppComponent.branchID, this.invoiceForm.get('locrefid').value, this.invoiceForm.get('locname').value).subscribe(data => {
          if(data.length > 0) {
            this.searcheddrugvalues = data;
          }else {
            this.searcheddrugvalues.length = 0;
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            this.drugfocus.nativeElement.value = "";
            this.boxqtyfocus.nativeElement.value = "";
            this.boxstripfocus.nativeElement.value = "";
          }
          // this.characters = [];
          // for (let i = 0; i < data.length; i++) {
          //   this.characters.push({ value: data[i][0], label: data[i][1] });
          // }
        });
      }
    }else{
      this.searcheddrugvalues.length = 0;
      this.drugfocus.nativeElement.value = "";
      this.boxqtyfocus.nativeElement.value = "";
      this.boxstripfocus.nativeElement.value = "";
    }
  }

  selectedItem=[];
  drugkeyselect(event: KeyboardEvent,event1) {
    //up 38 down 40
    //event.preventDefault();
    if (event.keyCode == 40) {
      if (this.selectedIndex == this.searcheddrugvalues.length - 1) {
        this.selectedIndex = 0;
        this.selectedItem = this.searcheddrugvalues[this.selectedIndex];
      } else {
        this.selectedItem = this.searcheddrugvalues[++this.selectedIndex];
      }
    }

    else if (event.keyCode == 38) {
      if (this.selectedIndex <= 0) {
        this.selectedIndex = this.searcheddrugvalues.length - 1;
        this.selectedItem = this.searcheddrugvalues[this.selectedIndex];
      }else {
        this.selectedItem = this.searcheddrugvalues[--this.selectedIndex];
      }
    }
    else if (event.keyCode == 13 || event.keyCode == 9) {
      if(event1.length<1){
        this.drugfocus.nativeElement.focus();
      }else{
        this.selectedIndex = -1;
        this.invoiceForm.get('productid').setValue(this.selectedItem[0]);
        //this.selecteddrugdata(this.selectedItem);
        this.searcheddrugvalues.length = 0;
        this.selecteddrug = this.selectedItem[0] + " - " + this.selectedItem[1];
        this.drugfocus.nativeElement.value = "";
        this.boxqtyfocus.nativeElement.value = "";
        this.boxstripfocus.nativeElement.value = "";
        this.boxqtyfocus.nativeElement.focus();
      }
    }

  }

  //drug click selected
  selecteddrugdata(drugdata){
    this.selectedIndex = -1;
    this.invoiceForm.get('productid').setValue(drugdata[0]);
    this.selecteddrug = drugdata[0] + " - " + drugdata[1];
    this.searcheddrugvalues.length = 0;
    this.drugfocus.nativeElement.value = "";
    this.boxqtyfocus.nativeElement.value = "";
    this.boxstripfocus.nativeElement.value = "";
    this.boxqtyfocus.nativeElement.focus();
  }

  getProvalues() {
    let pid: any = this.invoiceForm.get('productid').value;

    this.invoiceService.getBrandlist(pid, AppComponent.companyID, AppComponent.branchID, this.invoiceForm.get('locrefid').value, this.invoiceForm.get('locname').value).subscribe(data => {
      // this.mfgshortname = data[0][4],
      // this.mrpvalue = data[0][8].toFixed(2) ,
      this.getTabledata(data); this.branddata = data

    },
      error => {
        console.log('Error occured On getProvalues');
      });
  }


  public setvatTax: boolean = false;
  public setgstTax: boolean = false;
  public setindgstTax: boolean = false;
  hsnstatus;
  packageount;
  getTabledata(data: any) {
    if (data !== undefined || data !== null) {
      this.hsnstatus = 1;
      let flag: number = 0;
      const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        if (this.invoiceForm.get('boxqty').value == 0) {
          this.packageount = parseInt(this.invoiceForm.get('stripqty').value);
        } else if (this.invoiceForm.get('stripqty').value == 0) {
          this.packageount = parseInt(this.invoiceForm.get('boxqty').value);
        }
        else {
          this.packageount = 0;
          this.invoiceForm.get('boxqty').setValue(1);
          this.invoiceForm.get('stripqty').setValue(0);
        }
        this.gstper = this.invoiceForm.get('gstper').value;
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].drugproductrefid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          // if (this.coltax[0][0] == 0) {
          //   this.setvatTax = true;
          //   // $("#colvathide").show();
          //   // $('.colvathide').show();
          //   // $("#colhide").hide();
          //   // $('.colhide').hide();
          //   // $("#colindgsthide").hide();
          //   // $('.colindgsthide').hide();
          // }
          // if (this.coltax[0][0] == 1) {
          //   this.setgstTax = true;
          //   // $("#colvathide").hide();
          //   // $('.colvathide').hide();
          //   // $("#colhide").show();
          //   // $('.colhide').show();
          //   // $("#colindgsthide").hide();
          //   // $('.colindgsthide').hide();
          // }
          // if (this.coltax[0][0] == 2) {
          //   this.setcgst = this.coltax[0][1];
          //   this.setsgst = this.coltax[0][2];
          //   this.setigst = this.coltax[0][3];
          //   this.setugst = this.coltax[0][4];
          //   this.setindgstTax = true;
          //   // $("#colvathide").hide();
          //   // $('.colvathide').hide();
          //   // $("#colhide").hide();
          //   // $('.colhide').hide();
          //   // $("#colindgsthide").show();
          //   // $('.colindgsthide').show();
          // }
          let gstper=this.invoiceForm.get('gstper').value;
          var hsnid;var hsncode;var igst;
          if(gstper<=0||gstper==''||gstper==null||gstper==undefined){
            this.vats= data[this.i][5];
            this.cgsts=data[this.i][6];
            this.sgsts= data[this.i][7];
            this.gsts=data[this.i][9];
            this.utgsts= data[this.i][14];
            igst= data[this.i][13];
            hsnid= data[this.i][17];
            hsncode= data[this.i][18];
          }else{
            this.vats=this.vats;
            this.cgsts=this.cgsts;
            this.sgsts=this.sgsts;
            this.gsts=this.gsts;
            igst=0;
            this.utgsts=this.utgsts;
            hsncode=this.hsnno;
            hsnid=this.invoiceForm.get('hsncode').value;
          }
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            data[this.i][5],
            data[this.i][6],
            data[this.i][7], 
            data[this.i][8],
            data[this.i][9],
            data[this.i][10],
            data[this.i][11],
            data[this.i][12],
            igst,  //data[this.i][13],
            data[this.i][14], //
            data[this.i][15],
            data[this.i][16],
            hsnid,  //data[this.i][17],
            hsncode //data[this.i][18],
          ));
        }
      }

      //  this.getgstvalues()
      this.getSum();
      this.invoiceForm.get('quantity').setValue("");
      this.invoiceForm.get('batch').setValue("");
      this.invoiceForm.get('expdate').setValue("");
      this.invoiceForm.get('mrpvalue').setValue("");
      this.invoiceForm.get('sellingvalue').setValue("");
      this.invoiceForm.get('hsncode').setValue("");
      this.invoiceForm.get('gstper').setValue("");
      this.invoiceForm.get('boxperstrip').setValue('');
      this.invoiceForm.get('strippertablet').setValue(1);
      this.invoiceForm.get('boxqty').setValue('');
      this.invoiceForm.get('stripqty').setValue('');
      this.invoiceForm.get('tabqty').setValue('');
      this.characters = [];
      this.selecteddrug = '';
      this.drugfocus.nativeElement.value = "";
      this.boxqtyfocus.nativeElement.value = "";
      this.boxstripfocus.nativeElement.value = "";
      this.drugfocus.nativeElement.focus();
    }
  }

  showBrandlist(pid: any, pname: any, form: any, dosage: any, mfrg: any, vats: any,
    gsts: any, cgsts: any, mrps: any, sgsts: any, dosageId: number, formID: number, mfgId: number, 
    igsts: any, utgsts: any, mrp: any, sellingprice: any, hsnid:any ,hsncode:any) {
    return this.formBuilder.group({
      pirefid: ['', []],
      indexval: ['', []],
      drugproductrefid: [pid, []],
      productname: [pname, []],
      dosageid: [dosage, []],
      formulation: [form, []],
      mfg: [mfrg, []],
      boxquantity: [parseFloat(this.invoiceForm.get('boxqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      stripquantity: [parseFloat(this.invoiceForm.get('stripqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      tabletquantity: [parseFloat(this.invoiceForm.get('tabqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      totalquantity: [parseFloat(this.invoiceForm.get('quantity').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      freeboxqty: [0, Validators.pattern(textnumbers)],
      freestripqty: [0, Validators.pattern(textnumbers)],
      freetabletqty: [0, Validators.pattern(textnumbers)],
      batchid: [this.invoiceForm.get('batch').value, []],
      expirydate: [this.invoiceForm.get('expdate').value, Validators.required],
      packing: [],
      purprice: [(0).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      mrp: [parseFloat(mrp).toFixed(this.fixedlength), []],
      unitprice: [(0).toFixed(this.fixedlength), []],
      salesdiscount: [0, []],
      discount: [0, Validators.pattern(textnumbers)],
      vat: [this.vats, Validators.pattern(textnumbers)],
      gst: [this.gsts, []],
      sgst: [this.sgsts, Validators.pattern(textnumbers)],
      cgst: [this.cgsts, Validators.pattern(textnumbers)],
      igst: [igsts, Validators.pattern(textnumbers)],
      utgst: [this.utgsts, Validators.pattern(textnumbers)],
      totalproductprice: [(0).toFixed(this.fixedlength), []],
      dosageId: [dosageId, []],
      formulationid: [formID, []],
      mfgname: [mfgId, []],
      vatamt: [],
      gstamt: [],
      sgstamt: [],
      cgstamt: [],
      igstamt: [],
      utgstamt: [],
      freetotalqty: [],
      discountamt: [],
      clientcdate: [AppComponent.date, []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      refpoid: [this.invoiceForm.get('refpoid').value, []],
      hsncode: [hsncode, []],
      //hsncode: [this.hsnno, []],
      hsnid: [hsnid, []],
      hsngst: [this.gstper],
      stripperbox: [parseFloat(this.invoiceForm.get('boxperstrip').value).toFixed(this.fixedlength)],
      quantityperstrip: [parseFloat(this.invoiceForm.get('strippertablet').value).toFixed(this.fixedlength)],
      packagecount: [this.invoiceForm.get('packageunit').value],
      packcalulation: [this.packageount],
      packageunit: [this.invoiceForm.get('packageunit').value],
      sellingprice: [parseFloat(sellingprice).toFixed(this.fixedlength)],
      prflag:[0]
    });

  }
  /**Table calculation Start **/
  i;
  j;
  m;
  imagepath: string;
  sbQuantity = [];
  getSum(): boolean {
    /** Declare Given Table Datas**/
    let txtproduct: number = 0;
    let txttabletquantity: any = 0;
    let txtstripquantity: any = 0;
    let txtboxquantity: any = 0;
    let txtPurprice: any = 0;
    let txtitemamt: any = 0;
    let txttabletfree: any = 0;
    let txtstripfree: any = 0;
    let txtboxfree: any = 0;
    let txtgst: any = 0;
    let txtdiscount: any = 0;
    let textmargin: any = 0;
    let txtsgst: any = 0;
    let txtcgst: any = 0;
    let txtigst: any = 0;
    let txtutgst: any = 0;
    let txtvat: any = 0;
    /** To set and calculate Given Table Datas into total values(formcontrolname) **/
    let totalproduct: any = 0;
    let totalQuantity: any = 0;
    let itemamt: any = 0;
    let totalFree: any = 0;
    let totalGst: any = 0;
    let totalDiscount: any = 0;
    let totalMargin: any = 0;
    let totalAmount: any = 0;
    let totalSgst: any = 0;
    let totalCgst: any = 0;
    let totalIgst: any = 0;
    let totalUtgst: any = 0;
    let totalVat: any = 0;
    let taxableAmt: any = 0;
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    let setData = getData.value;
    let purcTax: any = this.purtax;
    let k: number = 0;
    let Stripperbox: any = 0;
    let Quantityperstrip: any = 0;
    let totalgsts: any = 0;
    let overallgst: any = 0;
    let invoicetax: any;
    let roundedamnt: any = 0;
    let roundvalue: any = 0;
    for (this.j = 0; this.j < setData.length; this.j++) {
      this.getSBQuantity(setData[this.j].drugproductrefid);
      // Stripperbox = this.sbQuantity[0][0];
      // Quantityperstrip = this.sbQuantity[0][1];//dosage
      if (setData[this.j].dosageid == '') {
        setData[this.j].dosageid = 0;
      }

      Stripperbox = setData[this.j].stripperbox;
      Quantityperstrip = setData[this.j].quantityperstrip;

      console.log("check>>>>>" + setData[this.j].stripperbox + " " + setData[this.j].quantityperstrip)
      /* To Get Total Products */
      if (parseInt(setData.length) !== null) {
        txtproduct = parseInt(setData.length);
      }
      /* Tablet Quantity */
      if (setData[this.j].tabletquantity == '' || parseFloat(setData[this.j].tabletquantity) == null) {
        setData[this.j].tabletquantity = 0.00;
        txttabletquantity = 0;
      }
      else {
        txttabletquantity = parseFloat(setData[this.j].tabletquantity);
      }
      /* Strip Quantity */
      if (setData[this.j].stripquantity == '' || parseFloat(setData[this.j].stripquantity) == null) {
        setData[this.j].stripquantity = 0;
        txtstripquantity = 0;
      }
      else {
        txtstripquantity = parseFloat(setData[this.j].stripquantity) * Quantityperstrip * Stripperbox;
      }
      /* Box Quantity */
      if (setData[this.j].boxquantity == '' || parseFloat(setData[this.j].boxquantity) == null) {
        setData[this.j].boxquantity = 0;
        txtboxquantity = 0;
      }
      else {
        txtboxquantity = parseFloat(setData[this.j].boxquantity) * Stripperbox * Quantityperstrip;
        txtboxquantity = parseFloat(setData[this.j].packcalulation) * Stripperbox * Quantityperstrip;
        setData[this.j].boxquantity = setData[this.j].packcalulation;
      }
      /* Free Tablet Quantity*/
      if (setData[this.j].freetabletqty == '' || parseFloat(setData[this.j].freetabletqty) == null) {
        setData[this.j].freetabletqty = 0;
        txttabletfree = 0;
      }
      else {
        txttabletfree = parseFloat(setData[this.j].freetabletqty);
      }
      /* Free Strip Quantity*/
      if (setData[this.j].freestripqty == '' || parseFloat(setData[this.j].freestripqty) == null) {
        setData[this.j].freestripqty = 0;
        txtstripfree = 0;
      }
      else {
        txtstripfree = parseFloat(setData[this.j].freestripqty) * Quantityperstrip * Stripperbox;
      }
      /* Free Box Quantity */
      if (setData[this.j].freeboxqty == '' || parseFloat(setData[this.j].freeboxqty) == null) {
        setData[this.j].freeboxqty = 0.00;
        txtboxfree = 0;
      }
      else {
        txtboxfree = parseFloat(setData[this.j].freeboxqty) * Stripperbox * Quantityperstrip;
      }

      console.log(txttabletquantity + " " + txtstripquantity + " " + txtboxquantity)

      setData[this.j].totalquantity = (txttabletquantity + txtstripquantity + txtboxquantity).toFixed(this.fixedlength);
      setData[this.j].freetotalqty = txttabletfree + txtstripfree + txtboxfree;

      if (setData[this.j].mrp == '' || setData[this.j].mrp == null || setData[this.j].mrp == undefined) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'MRP Must not be Empty....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      } else {
        if (setData[this.j].sellingprice == '' || setData[this.j].sellingprice == null || setData[this.j].sellingprice == undefined) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Selling Price Must not be Empty....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          return false;
        } else {
          if (parseFloat(setData[this.j].mrp) >= parseFloat(setData[this.j].purprice)) {
            txtPurprice = parseFloat(setData[this.j].purprice);
            if (parseFloat(setData[this.j].sellingprice) < parseFloat(setData[this.j].purprice) || parseFloat(setData[this.j].sellingprice) > parseFloat(setData[this.j].mrp)) {
              this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Selling Price Must Higher than Purchase Price & Lower than MRP....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
              return false;
            }
          }
          else {
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'MRP Must Higher than Purchase Price....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
          }
        }

      }
      let getsingleprice: any;
      // getsingleprice = parseFloat(setData[this.j].sellingprice)/parseFloat(this.packageount);
      setData[this.j].unitprice = parseFloat(setData[this.j].sellingprice) / parseFloat(Stripperbox);
      console.log("Unit price" + setData[this.j].unitprice)

      /* GST Calculation  */
      if (setData[this.j].sgst == '' || setData[this.j].sgst == null) {
        txtsgst = 0;
        setData[this.j].sgst = 0;
      }
      else {
        txtsgst = parseFloat(setData[this.j].sgst);
      }
      if (setData[this.j].cgst == '' || setData[this.j].cgst == null) {
        setData[this.j].cgst = 0;
        txtcgst = 0;
      }
      else {
        txtcgst = parseFloat(setData[this.j].cgst);
      }
      if (setData[this.j].igst == '' || setData[this.j].igst == null) {
        setData[this.j].igst = 0;
        txtigst = 0;
      }
      else {
        txtigst = parseFloat(setData[this.j].igst);
      }

      if (setData[this.j].utgst == '' || setData[this.j].utgst == null) {
        setData[this.j].utgst = 0;
        txtutgst = 0.00;
      }
      else {
        txtutgst = parseFloat(setData[this.j].utgst);
      }
      if (setData[this.j].gst == '' || setData[this.j].gst == null) {
        setData[this.j].gst = 0;
        txtgst = 0
      }
      else {
        txtgst = parseFloat(setData[this.j].gst);
      }
      /* VAT Calculation */
      if (setData[this.j].vat == '' || setData[this.j].vat == null) {
        setData[this.j].vat = 0;
        txtvat = 0;
      }
      else {
        txtvat = parseFloat(setData[this.j].vat);
      }





      /* Batch Number */
      if (setData[this.j].batchid == '') {
        //$('.batchfocus').focus();
        setData[this.j].batchid = 0;
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Batch Number Required....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }

      if (setData[this.j].totalquantity <= 0) {
        //$('.tabqfocus').focus();
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Please Enter valid Quantity....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }



      /* Row Wise itemamt Amount */


      // setData[this.j].totalproductprice = (txttabletquantity + txtstripquantity + txtboxquantity) * txtPurprice;
      setData[this.j].totalproductprice = setData[this.j].packcalulation * txtPurprice;
      console.log("totcount>>>>" + setData[this.j].totalproductprice)
      /*Discount Calculation*/
      if (setData[this.j].discount == '' || setData[this.j].discount == null || setData[this.j].discount == 0) {
        txtdiscount = 0;
        setData[this.j].discount = 0;
        setData[this.j].vatamt = (txtvat * txtPurprice * (setData[this.j].packcalulation)) / 100;
        setData[this.j].gstamt = (txtgst * txtPurprice * (setData[this.j].packcalulation)) / 100;
        setData[this.j].sgstamt = (txtsgst * txtPurprice * (setData[this.j].packcalulation)) / 100;
        setData[this.j].cgstamt = (txtcgst * txtPurprice * (setData[this.j].packcalulation)) / 100;
        setData[this.j].igstamt = (txtigst * txtPurprice * (setData[this.j].packcalulation)) / 100;
        setData[this.j].utgstamt = (txtutgst * txtPurprice * (setData[this.j].packcalulation)) / 100;
      }
      else {
        txtdiscount = (setData[this.j].totalproductprice * setData[this.j].discount) / 100;

        setData[this.j].vatamt = (txtvat * (setData[this.j].totalproductprice-txtdiscount)) / 100;
        setData[this.j].gstamt = (txtgst * (setData[this.j].totalproductprice-txtdiscount)) / 100;
        setData[this.j].sgstamt = (txtsgst * (setData[this.j].totalproductprice-txtdiscount)) / 100;
        setData[this.j].cgstamt = (txtcgst * (setData[this.j].totalproductprice-txtdiscount)) / 100;
        setData[this.j].igstamt = (txtigst * (setData[this.j].totalproductprice-txtdiscount)) / 100;
        setData[this.j].utgstamt = (txtutgst * (setData[this.j].totalproductprice-txtdiscount)) / 100;
      }
      // setData[this.j].vatamt = (txtvat * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // setData[this.j].gstamt = (txtgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // setData[this.j].sgstamt = (txtsgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // setData[this.j].cgstamt = (txtcgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // setData[this.j].igstamt = (txtigst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // setData[this.j].utgstamt = (txtutgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;

    



      if (this.taxid == null && this.taxgstid == 0) {
        totalgsts = 0;
        setData[this.j].gstamt = 0;
        setData[this.j].sgstamt = 0;
        setData[this.j].cgstamt = 0;
        setData[this.j].igstamt = 0;
        setData[this.j].utgstamt = 0;
        setData[this.j].vatamt = 0;
      } else if (this.taxid == 1) {
        totalgsts = setData[this.j].gstamt;
      }
      else if (this.taxid == 2) {
        if(this.taxgstid==1){
          totalgsts = setData[this.j].sgstamt + setData[this.j].cgstamt + setData[this.j].igstamt;
        }else{
          totalgsts = setData[this.j].utgstamt + setData[this.j].cgstamt + setData[this.j].igstamt;
        }
      }
      // else if (this.taxid == 2 || this.taxgstid == 2) {
      //   console.log(setData[this.j].cgstamt +" "+ setData[this.j].igstamt +" "+ setData[this.j].utgstamt)
      //   totalgsts = setData[this.j].cgstamt + setData[this.j].igstamt + setData[this.j].utgstamt;
      // }
      else if (this.taxid == 0) {
        totalgsts = setData[this.j].vatamt;
      }


      /*Sales Discount */
      if (setData[this.j].salesdiscount == '' || setData[this.j].salesdiscount == null) {
        setData[this.j].salesdiscount = 0;
      }
      //  if(this.coltax[0] == 0){
      //   setData[this.j].vatamt = setData[this.j].vatamt;
      //   totalgsts = 0;
      // // setData[this.j].amount  += parseFloat(setData[this.j].vatamt);
      //  }else if(this.coltax[0] == 1){
      //   totalgsts = totalgsts;
      //   setData[this.j].vatamt = 0;
      //  }

      setData[this.j].totalproductprice += parseFloat(totalgsts);



      /* Purchase Price */


      setData[this.j].discountamt = txtdiscount;
      textmargin = setData[this.j].mrp - (txtPurprice - txtdiscount);
      //setData[this.j].amount -= parseFloat(setData[this.j].discountamt);
      /* To Patch values Row wise */

      /* Toatl Calculation*/
      totalproduct = txtproduct;
      totalQuantity += txttabletquantity + txtstripquantity + txtboxquantity;
      totalFree += txttabletfree + txtstripfree + txtboxfree;
      totalDiscount += txtdiscount;

      // totalCgst += (txtcgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // totalSgst += (txtsgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // totalGst += (txtgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      ///  if(this.coltax[0] == 1){

      overallgst += totalgsts
      // totalVat = 0; 

      // }else if(this.coltax[0] == 0){
      //  totalVat += setData[this.j].vatamt
      //  overallgst = 0
      // }
      // invoicetax = parseFloat(overallgst) + parseFloat(totalVat);

      // totalIgst =+ (txtigst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      //totalUtgst =+ (txtutgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      itemamt += setData[this.j].totalproductprice;
      totalMargin += textmargin;
      if (purcTax == '0') {
        taxableAmt = ((txtPurprice * (setData[this.j].packcalulation)) - txtdiscount * 100) / 100 + totalGst;
        totalAmount = itemamt - totalDiscount;
      }
      else {
        taxableAmt = (txtPurprice * (setData[this.j].packcalulation)) - txtdiscount;
        totalAmount = (itemamt - totalDiscount) + totalGst;

      }

      setData[this.j].totalproductprice = setData[this.j].totalproductprice.toFixed(this.fixedlength);

      // alert(totalAmount);
      getData.patchValue(setData);
      console.log(this.invoiceForm.get('cashdiscount').value);
      if(this.invoiceForm.get('cashdiscount').value == '' || this.invoiceForm.get('cashdiscount').value == null || this.invoiceForm.get('cashdiscount').value == undefined){
        this.invoiceForm.get('cashdiscount').setValue(0);
      }
      if(this.invoiceForm.get('cashdiscountpercent').value == '' || this.invoiceForm.get('cashdiscountpercent').value == null || this.invoiceForm.get('cashdiscountpercent').value == undefined){
        this.invoiceForm.get('cashdiscountpercent').setValue(0);
      }
      totalAmount -= ((parseFloat(this.invoiceForm.get('cashdiscountpercent').value)/100) * totalAmount);
      overallgst -= ((parseFloat(this.invoiceForm.get('cashdiscountpercent').value)/100) * overallgst);
      totalAmount = parseFloat(totalAmount) - parseFloat(this.invoiceForm.get('cashdiscount').value);
      console.log(totalAmount);
      // alert("a1"+totalAmount)

      //roundedamnt = (Math.round(totalAmount * 10) / 10);
      // alert("a2"+roundedamnt);
      //roundvalue = roundedamnt.toFixed() - totalAmount.toFixed(2)
      /* To Set value from Table calculation Final Values on Input types*/
      this.invoiceForm.get('itemamt').setValue(itemamt.toFixed(this.fixedlength));
      this.invoiceForm.get('vatamt').setValue(totalVat.toFixed(this.fixedlength));
      this.invoiceForm.get('totaldiscount').setValue(totalDiscount.toFixed(this.fixedlength));
      this.invoiceForm.get('totalmargin').setValue(totalMargin.toFixed(this.fixedlength));
      this.invoiceForm.get('totaltaxamt').setValue(overallgst.toFixed(this.fixedlength));
      this.invoiceForm.get('taxableamt').setValue(taxableAmt.toFixed(this.fixedlength));
      this.invoiceForm.get('totalproduct').setValue(totalproduct.toFixed(this.fixedlength));
      this.invoiceForm.get('totalquantity').setValue(totalQuantity.toFixed(this.fixedlength));
      this.invoiceForm.get('totalfreeqty').setValue(totalFree.toFixed(this.fixedlength));
      //  this.invoiceForm.get('cashdiscount').setValue("0.00");
      if (this.decists[0][2] == 1 || this.decists[0][3] == 1) {
        roundedamnt = Math.round(totalAmount);
        roundvalue = roundedamnt - totalAmount;
      }  else {
        roundedamnt = totalAmount;
      }
      this.invoiceForm.get('grandtotal').setValue(parseFloat(roundedamnt).toFixed(this.fixedlength))
      this.invoiceForm.get('roundoff').setValue(parseFloat(roundvalue).toFixed(this.fixedlength));

      //  this.invoiceForm.get('gstamt').setValue(invoicetax.toFixed(2));
      this.invoiceForm.get('sgstamt').setValue(totalSgst);
      this.invoiceForm.get('cgstamt').setValue(totalCgst);
      this.invoiceForm.get('igstamt').setValue(totalIgst);

      //To set Temporary Values In Bottom Input types
      this.invoiceForm.get('utgstamt').setValue(totalUtgst);
      // this.invoiceForm.get('cashdiscount').setValue("0.00");

      this.invoiceForm.get('prnumber').setValue("0.00");
      this.invoiceForm.get('invoiceamt').setValue("0.00");
      this.invoiceForm.get('adjustamt').setValue("0.00");
    }
    return true;
  }

  /* Table calculation End*/
  saveprocess: boolean = false;
  sumvalid: boolean = false;
  onSubmit(): any {
    this.purchasejournal.patchValue({
      // debitamount: this.invoiceForm.get('grandtotal').value,
      creditamount: this.invoiceForm.get('grandtotal').value,
      personid: this.invoiceForm.get('vendorid').value,
      // invoicebalamt: this.invoiceForm.get('grandtotal').value
    });
    this.paymentjournal.patchValue({
      debitamount: 0,
      // creditamount: this.invoiceForm.get('grandtotal').value,
      personid: this.invoiceForm.get('vendorid').value,
      invoicebalamt: this.invoiceForm.get('grandtotal').value
    });
    
    this.inventoryjournal.patchValue({
      // debitamount: this.purchaseApproval.get('grandtotal').value,
       creditamount: this.invoiceForm.get('grandtotal').value,
       personid: this.invoiceForm.get('vendorid').value,
     });
    this.returnValid = this.invoiceDatavalidation();
    this.sumvalid = this.getSum();
    if (this.returnValid && this.sumvalid) {

      this.appComponent.ngOnInit();
      this.invoiceForm.get('clientcdate').setValue(AppComponent.date);
      if (this.invoiceForm.get('refpoid').value == null) {
        this.invoiceForm.get('refpoid').setValue('');
      }
      this.saveprocess = true;
      // this.invoiceService.Saveinvjrnl(JSON.stringify(this.inventoryjournal.value))
      this.invoiceService.getPurcmaintanance(JSON.stringify(this.invoiceForm.value)).subscribe(
        (result: any) => {
          let res = result.res;
          if (res) {
            this.invoiceService.savepurjournal(JSON.stringify(this.purchasejournal.value));
            this.invoiceService.savePayment(JSON.stringify(this.paymentjournal.value)).subscribe(data => {  },
            errorCode => console.log(errorCode));
            const saveData = <FormArray>this.invoiceForm.controls['brandDetails'];
            this.invoiceService.getPurcinvoice(JSON.stringify(saveData.value)).subscribe(
              data => {
                if (data) {
                  this.saveprocess = false;
                  this.notificationsComponent.addToast({ title: 'Success Message', msg: ' Purchase Data Saved....', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                  setTimeout(() => {
                    this.router.navigate(['PurchaseInvoice/ViewPurchaseInvoice']);
                  }, 500);
                } else {
                  this.saveprocess = false;
                  this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Purchase Data Not Saved....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }
              });
          }
        }, (error: any) => {
          console.log(error['Errors getPurcmaintanance()']);
        });
    }
    else {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Purchase Data is Invalid....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
    this.ngOnInit();
  }
  invoiceDatavalidation(): boolean {
    const getData = this.invoiceForm.controls['brandDetails'];
    let setData = getData.value;
    if (this.invoiceForm.get('vendorid').value == 'opt1') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Required Distributor Name.....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    } else if (setData.length == '' || setData.length == null || setData.length == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Your Table Data is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    } else {
      for (let p = 0; p < setData.length; p++) {
        if (setData[p].expirydate == 'NA' || setData[p].expirydate == '' || setData[p].expirydate == null || setData[p].expirydate == undefined) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Expiry Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          return false;
        }
      }
    }
    return true;
  }
  
  removeRow(index: number) {
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    getData.removeAt(index);
    this.getSum();
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '' || removeVal == undefined) {
      this.invoiceForm.reset();
      this.ngOnInit();
    }
  }

  /**TO CONVERT PURCHASE ORDER TO PURCHASE INCOICE START**/
  getPOrder() {
    this.hsnstatus = 0;
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    getData.controls = [];

    this.invoiceService.getPotablelist(this.invoiceForm.get('refpoid').value).subscribe(data => {
       this.getPodata(data);
   },
      error => {
        console.log('Error occured On getPotablelist()');
      });

    this.invoiceService.getDistDc(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.invoiceForm.get('refpoid').value).subscribe(data => {
      this.Dclist(data); this.invoiceForm.get('distinvoiceno').setValue(data[0][2])
    })
  }

  Dcproducts() {
    this.hsnstatus = 0;
    let dcid = this.invoiceForm.get('dchellan').value;
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    getData.controls = [];
    for (let p = 0; p < dcid.length; p++) {
      this.invoiceService.getDcproducts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.invoiceForm.get('refpoid').value, dcid[p].id).subscribe(data => {
        this.getPodata(data)
      })
    }
  }

  quantyper;
  getPodata(data: any) {
    //  alert(JSON.stringify(data));
    if (data !== undefined || data !== null) {
      const getData = <FormArray>this.invoiceForm.controls['brandDetails'];

      for (this.i = 0; this.i < data.length; this.i++) {
        if (data[this.i][8] == 0) {
          this.packageount = parseInt(data[this.i][9]);
        } else if (data[this.i][9] == 0) {
          this.packageount = parseInt(data[this.i][8]);
        }
        if (data[this.i][24] == null || data[this.i][24] == '' || data[this.i][24] == 0) {
          this.quantyper = 1;
        } else {
          this.quantyper = data[this.i][24];
        }
        getData.push(this.showPOdata(
          data[this.i][0],
          data[this.i][1],
          data[this.i][2],
          data[this.i][3],
          data[this.i][4],
          data[this.i][5],
          data[this.i][6],
          data[this.i][7],
          data[this.i][8],
          data[this.i][9],
          data[this.i][10],
          data[this.i][11],
          data[this.i][12],
          data[this.i][13],
          data[this.i][14],
          data[this.i][15],
          data[this.i][16],
          data[this.i][17],
          data[this.i][18],
          data[this.i][19],
          data[this.i][20],
          data[this.i][21],
          data[this.i][22],
          data[this.i][23],
          data[this.i][24],
          data[this.i][25],
          data[this.i][26],
          data[this.i][27]
        ));
      }
      this.invoiceForm.get('brandcode').setValue("");
      this.invoiceForm.get('productid').setValue("");
      this.getSum();
    }
  }

  showPOdata(pid: any, barandname: any, fname: any, dosname: any, pcomp: any, mrp: any, formid: any, mfgid: any, bqty: any, sqty: any,
    tabqty: any, uprice: any, disc: any, vat: any, gst: any, sgst: any, cgst: any, igst: any, utgst: any, expiry: any, batchid: any, hsncode: any, 
    hsnid: any, stripbox: any, quantitystrip: any, totqty: any, sellingprice: any, packunit: any): any {
    return this.formBuilder.group({
      indexval: ['', []],
      drugproductrefid: [pid, []],
      productname: [barandname, []],
      dosageid: [dosname, []],
      formulation: [fname, []],
      mfg: [pcomp, []],
      boxquantity: [bqty, [Validators.pattern(textnumbers)]],
      stripquantity: [sqty, [Validators.pattern(textnumbers)]],
      tabletquantity: [tabqty, [Validators.pattern(textnumbers)]],
      freeboxqty: [0, [Validators.pattern(textnumbers)]],
      freestripqty: [0, [Validators.pattern(textnumbers)]],
      freetabletqty: [0, [Validators.pattern(textnumbers)]],
      batchid: [batchid, []],
      expirydate: [expiry, Validators.required],
      packing: ['', []],
      purprice: [parseFloat(uprice).toFixed(this.fixedlength), [Validators.pattern(textnumbers)]],
      mrp: [parseFloat(mrp).toFixed(this.fixedlength), []],
      unitprice: [(0).toFixed(this.fixedlength), []],
      salesdiscount: [0, []],
      discount: [disc, [Validators.pattern(textnumbers)]],
      vat: [vat, [Validators.pattern(textnumbers)]],
      gst: [gst, []],
      sgst: [sgst, [Validators.pattern(textnumbers)]],
      cgst: [cgst, [Validators.pattern(textnumbers)]],
      igst: [igst, []],
      utgst: [utgst, []],
      totalproductprice: [(0).toFixed(this.fixedlength), []],
      dosageId: [0, []],
      formulationid: [formid, []],
      mfgname: [mfgid, []],
      vatamt: [],
      gstamt: [],
      sgstamt: [],
      cgstamt: [],
      igstamt: [],
      utgstamt: [0, []],
      totalquantity: [totqty,[]], //
      freetotalqty: [],
      discountamt: [],
      clientcdate: [AppComponent.date, []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      refpoid: [this.invoiceForm.get('refpoid').value, []],
      hsncode: [hsncode, []],
      hsnid: [hsnid, []],
      hsngst: [],
      stripperbox: [stripbox],
      quantityperstrip: [this.quantyper],
      packagecount: [packunit],
      packcalulation: [this.packageount],
      sellingprice: [sellingprice],
      packageunit: [packunit],
      prflag:[0]
    });
  }
  openSuccessSwal() {
    swal({
      title: 'Good job!',
      text: "Data Saved Sucessfully",
      type: 'success'
    }).catch(swal.noop);
  }

  reportshow = false;
  reportlink1: any = "assets/images/loading.gif";
  reportlink() {
    this.reportshow = true;
    let rlink = "http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/BillPrint_invoiceForm/Bill_PurchaseInvoice.rptdesign&pirefid=" + 1 + "&__format=PDF";
    this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  hsnno;
  gstper;
  vats;
  gsts;
  cgsts;
  sgsts;
  utgsts;
  async fetchng() {
    if(this.invoiceForm.get('hsncode').value != ''){
      let hcode = this.invoiceForm.get('hsncode').value;
      let subindx = this.hsnlist.findIndex(p => p.value == hcode);
      this.hsnno = this.hsnlist[subindx].label;
      this.gstper = this.hsnlist[subindx].gst;
      if (this.taxid == 0) {
        this.vats = this.gstper
      }
      else if (this.taxid == 1) {
        this.gsts = this.gstper
      }
      else if (this.taxid == 2) {
        this.cgsts = this.gstper / 2
        this.sgsts = this.gstper / 2
        this.utgsts = this.gstper / 2
      }
    }else {
      this.gstper = this.invoiceForm.get('gstper').value;
      if (this.taxid == 0) {
        this.vats = this.gstper
      }
      else if (this.taxid == 1) {
        this.gsts = this.gstper
      }
      else if (this.taxid == 2) {
        this.cgsts = this.gstper / 2
        this.sgsts = this.gstper / 2
        this.utgsts = this.gstper / 2
      }
    }
    await this.getProvalues();
  }

  fetchng1(){
    let hcode = this.invoiceForm.get('hsncode').value;
    let subindx = this.hsnlist.findIndex(p => p.value == hcode);
    this.hsnno = this.hsnlist[subindx].label;
    this.gstper = this.hsnlist[subindx].gst;
  }
  pophsnno;
  popgstper;
  popfetchhsn() {
    let hcode = this.pophsnform.get('pophsnlist').value;
    let subindx = this.pophsnlist.findIndex(p => p.value == hcode);
    this.pophsnno = this.pophsnlist[subindx].label
    this.popgstper = this.pophsnlist[subindx].gst
  }
  gstper1;
  fetchtablehsnvalue(index: any) {
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    let setData = getData.value;
    setData[index].hsncode = this.pophsnno;
    setData[index].hsnid = this.pophsnform.get('pophsnlist').value;
    setData[index].hsngst = this.pophsnform.get('popgstvalue').value;
    if (this.taxid == 0) {
      setData[index].vat = this.pophsnform.get('popgstvalue').value;
      setData[index].igst =0;
    }
    else if (this.taxid == 1) {
      setData[index].gst = this.pophsnform.get('popgstvalue').value;
      setData[index].igst =0;
    }
    else if (this.taxid == 2) {
      setData[index].cgst = this.pophsnform.get('popgstvalue').value / 2;
      setData[index].sgst = this.pophsnform.get('popgstvalue').value / 2;
      setData[index].ugst = this.pophsnform.get('popgstvalue').value / 2;
      setData[index].igst =0;
    }
    getData.patchValue(setData);
    this.hsnpop = false;
  }
  hsnpop: boolean;

  productarrayindex;
  hsnindexpass(index) {
    this.productarrayindex = index;
    this.hsnpop = true;
  }
  hsninsert() {
    this.fetchtablehsnvalue(this.productarrayindex)
  }


  getgstvalues() {
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    let setData = getData.value;
    for (let p = 0; p < setData.length; p++) {
      setData[p].hsngst = this.gstper;
      if (this.taxid == 0) {
        setData[p].vat = this.gstper
      }
      else if (this.taxid == 1) {
        setData[p].gst = this.gstper
      }
      else if (this.taxid == 2) {
        setData[p].cgst = this.gstper / 2
        setData[p].sgst = this.gstper / 2
        setData[p].utgst = this.gstper / 2
      }
      getData.patchValue(setData);
    }
  }

  boxqtyvalidate(boxvalue:any){
    if(boxvalue==null||boxvalue==''||boxvalue<=0 || boxvalue==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.boxqtyfocus.nativeElement.value="";
      this.boxqtyfocus.nativeElement.focus();
    }
  }

  boxperstrip: any = 0;
  strippertablet: any = 0;
  boxqty: any = 0;
  stripqty: any = 0;
  tabletqty: any = 0;
  totBox: any = 0;
  totStrip: any = 0;
  totQty: any = 0;
  quantitycalculation() {
    let boxqty=this.invoiceForm.get('boxqty').value;
    let qtyvalue=this.invoiceForm.get('boxperstrip').value;
    if(qtyvalue=='' || qtyvalue<= 0 || qtyvalue== null || qtyvalue == undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.boxstripfocus.nativeElement.value="";
      this.boxstripfocus.nativeElement.focus();
    }else{
      if (boxqty=='' || boxqty== 0 || boxqty== null || boxqty == undefined) {
        this.invoiceForm.get('stripqty').setValue(this.invoiceForm.get('boxperstrip').value);
        this.invoiceForm.get('boxqty').setValue(0);
        //  this.invoiceForm.get('strippertablet').setValue(this.invoiceForm.get('boxperstrip').value);
      }
  
      if (this.invoiceForm.get('boxperstrip').value == 0 && this.invoiceForm.get('tabqty').value == 0) {
        this.invoiceForm.get('tabqty').setValue(this.invoiceForm.get('strippertablet').value);
      }
  
      if (this.invoiceForm.get('strippertablet').value == 0) {
        this.invoiceForm.get('strippertablet').setValue(1);
      }
  
      if (this.invoiceForm.get('boxperstrip').value == 0 && this.invoiceForm.get('strippertablet').value == 0) {
  
        this.invoiceForm.get('quantity').setValue(parseFloat(this.invoiceForm.get('tabqty').value).toFixed(3));
      }
      else {
        this.boxperstrip = this.invoiceForm.get('boxperstrip').value;
        this.strippertablet = this.invoiceForm.get('strippertablet').value;
        this.boxqty = this.invoiceForm.get('boxqty').value;
        this.stripqty = this.invoiceForm.get('stripqty').value;
        this.tabletqty = this.invoiceForm.get('tabqty').value;
  
        if (this.boxperstrip == '' || this.boxperstrip == NaN || this.boxperstrip == null) {
          this.boxperstrip = 0;
          this.invoiceForm.get('boxperstrip').setValue('0');
        }
        if (this.strippertablet == '' || this.strippertablet == NaN || this.strippertablet == null) {
          this.strippertablet = 0;
          this.invoiceForm.get('strippertablet').setValue('0');
        }
        if (this.boxqty == '' || this.boxqty == NaN || this.boxqty == null) {
          this.boxqty = 0;
          this.invoiceForm.get('boxqty').setValue('0');
        }
        if (this.stripqty == '' || this.stripqty == NaN || this.stripqty == null) {
          this.stripqty = 0;
          this.invoiceForm.get('stripqty').setValue('0');
        }
        if (this.tabletqty == '' || this.tabletqty == NaN || this.tabletqty == null) {
          this.tabletqty = 0;
          this.invoiceForm.get('tabqty').setValue('0');
        }
        this.totBox = (parseFloat(this.boxperstrip) * parseFloat(this.boxqty)) * parseFloat(this.strippertablet);
        this.totStrip = parseFloat(this.strippertablet) * parseFloat(this.stripqty);
        this.totQty = parseFloat(this.totBox) + parseFloat(this.totStrip) + parseFloat(this.tabletqty);
        this.invoiceForm.get('quantity').setValue(parseFloat(this.totQty).toFixed(3));
      }
    }
  }

  invtype: number = 0;
  invctype(event) {
    this.invtype = event;
  }

  expiryselcalculate(expiryval){
    let seldate=new Date(expiryval);
    let curdate=new Date();
    if(curdate>seldate){
      this.invoiceForm.get('expdate').setValue(''); 
      document.getElementById("expiryfocus").focus();
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Valid Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      document.getElementById("batchfocus").focus();
    }
  }
  expirytableselcalculate(index){
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    let setData = getData.value;
    let seldate=new Date(setData[index].expirydate);
    let curdate=new Date();
    if(curdate>seldate){
      setData[index].expirydate = '';
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Valid Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      getData.patchValue(setData);
    }else{
      // document.getElementById("batchfocus").focus();
      console.log('expirydate'+setData[index].expirydate);
    }
  }


  //New Hidden Details
  hiddenfieldsflag:boolean=false;
  hiddenindexflag = [];
  hiddendefaultforms=[{hiddenlabel:'Dis %'},{hiddenlabel:'Free Qty'},{hiddenlabel:'VAT'},{hiddenlabel:'GST'},
  {hiddenlabel:'IGST'},{hiddenlabel:'CGST'},{hiddenlabel:'SGST'},{hiddenlabel:'UGST'},{hiddenlabel:'Product ID'},
  {hiddenlabel:'Dosage'},{hiddenlabel:'Formulation'},{hiddenlabel:'Manufacturer'}];
  addNewHiddenDetails(){
    let hiddenforms = JSON.parse(localStorage.getItem('purinvoicehiddenarray'));
    if(hiddenforms==null || hiddenforms =='' || hiddenforms ==undefined || hiddenforms.length<=0){
      const control = <FormArray>this.invoiceForm.controls['hiddenfields'];
      control.controls = [];
      for (let i = this.hiddendefaultforms.length - 1; i >= 0; i--) {
        this.hiddenindexflag[i] = false;
        control.insert(0, this.formBuilder.group({
          hiddenlabel: [this.hiddendefaultforms[i].hiddenlabel, []],
          hiddenflag: [false, []],
        }));
      }
    }else{
      const control = <FormArray>this.invoiceForm.controls['hiddenfields'];
      control.controls = [];
      for (let i = hiddenforms.length - 1; i >= 0; i--) {
        this.hiddenindexflag[i] = hiddenforms[i].hiddenflag;
        control.insert(0, this.formBuilder.group({
          hiddenlabel: [hiddenforms[i].hiddenlabel, []],
          hiddenflag: [hiddenforms[i].hiddenflag, []],
        }));
      }
    }
  }

  hiddentooglechange(indexid) {
    const control = <FormArray>this.invoiceForm.controls['hiddenfields'];
    let saveData = control.value;
    saveData[indexid].hiddenflag=!saveData[indexid].hiddenflag;
  }

  savehiddenlabels(){
    const saveData = <FormArray>this.invoiceForm.controls['hiddenfields'];
    localStorage.setItem('purinvoicehiddenarray', JSON.stringify(saveData.value));
    this.addNewHiddenDetails();
    this.hiddenfieldsflag = false;
  }

}
