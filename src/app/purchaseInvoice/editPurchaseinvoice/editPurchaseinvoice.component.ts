import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from "@angular/forms";
import { editinvoiceService } from './editPurchaseinvoice.services';
import { providers } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { DxDataGridComponent } from "devextreme-angular";
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { event } from 'd3';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { cardToggle } from 'app/shared/card/card-animation';
import { TranslateService } from 'ng2-translate'; 
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
@Component({
  selector: 'app-editPurchaseinvoice',
  templateUrl: './editPurchaseinvoice.component.html',
  styleUrls: ['./editPurchaseinvoice.component.css'],
  animations: [cardToggle],
  providers: [editinvoiceService, NotificationsComponent]
})

export class editinvoiceComponent implements OnInit {
  parentMessage = "sales";
  cardToggle: string = 'expanded';
  pattern: any = '^[0-9]+(\.[0-9]{1,3})?$';
  sid: any;
  editdata = [];
  pophsnform: FormGroup;
  // dataSource = [];
  invoiceForm: any;
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
  purtax = [];
  localstore = [];
  coltax: any;
  polist = [];
  hsnlist = [];
  pophsnlist = [];
  taxid: number;
  taxgstid: number = 0;
  decists: any;
  fixedlength: any;
  aboveflag: any;
  belowflag: any;
  itemlength = [{}, {}, {}, {}, {}, {}]
  //refpoid=[];
  pactype: string = "Box";
  pactype1: string = "Box";
  packingevent(event) {
    this.pactype = event;
  }
  packingevent1(event) {
    this.pactype1 = event;
  }
  constructor(public translate: TranslateService,private invoiceService: editinvoiceService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
    private notificationsComponent: NotificationsComponent, private appComponent: AppComponent, private dateformat: dateFormatPipe) {translate.setDefaultLang('en');
    this.invoiceForm = this.formBuilder.group({
      productid: ['', []],
      id: ['', []],
      pino: ['', []],
      pidate: ['', [Validators.required]],
      vendorinvoiceno: ['', []],
      deliverytype: ['', []],
      previouspurchaseitem: ['', []],
      quantity: [0, []],
      tabqty: [0],
      boxqty: [0],
      stripqty: [0],
      boxperstrip: [0],
      strippertablet: [1],
      vendorid: ['', []],
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
      cashdiscount: ['', []],
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
      refpoid: ['', []],
      status: [0, []],
      grandtotal: [0, []],
      batch: ['', []],
      expdate: ['', []],
      hsncode: ['', []],
      mfgshortname: ['', []],
      mrpvalue: ['', []],
      sellingvalue: ['', []],
      gstper: ['', []],
      packageunit:[],
      cashdiscountpercent:[],
      brandDetails: this.formBuilder.array([
      ]),
    });

    this.purchasejournal = this.formBuilder.group({
      debitaccount: [17, []],
      //  creditaccount: [4, []],
      debitamount: [],
      creditamount: [],
      //  craccname: ['Accounts Payable', []],
      draccname: ['Purchase Expense', []],
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
      id: [],
      journalno: [],
      invoicename: [],
      personame: []
    });
    this.pophsnform = this.formBuilder.group({
      pophsnlist: [],
      popgstvalue: []
    });
  }
  // <dxi-column dataField="action" caption="Add Free" [width]="90"> </dxi-column>
  unionstate = [20934, 20936, 20940, 20948, 21773, 21775, 21776];
  purtotal: any;
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.sid = this.route.snapshot.paramMap.get('id');

    this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(async data => {
      this.coltax = data;
     await this.invoiceService.getEditmaintance(this.sid).subscribe(data => {
        this.getEditmaintance(data);
        this.purtotal = data[0][29];
        this.getDistvalues();
        this.invoiceService.getPurjrnl(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.sid).subscribe(data => {
          this.purchasejournal.patchValue(data)

        })
        //To Get Distributor Details   
        this.invoiceService.getDistributor(this.invoiceForm.get('companyrefid').value, this.invoiceForm.get('branchrefid').value, this.invoiceForm.get('locrefid').value, this.invoiceForm.get('locname').value).subscribe(data => { this.distibutor = data },
          err => {
            console.log('Error Occured on Get Distributor Details');
          });
        /*Get Tax inclusive Or Exclusive*/
        this.invoiceService.getPurchasetax(this.invoiceForm.get('companyrefid').value, this.invoiceForm.get('branchrefid').value, this.invoiceForm.get('locrefid').value, this.invoiceForm.get('locname').value).subscribe(data => this.purtax = data,
          error => {
            console.log('Error Occured On getPurchasetax()');
          });
        //  this.invoiceService.getPoedit(this.sid).subscribe(data => {this.polist = data});
        // this.invoiceService.getPolist(this.invoiceForm.get('companyrefid').value, this.invoiceForm.get('branchrefid').value, this.invoiceForm.get('locrefid').value, this.invoiceForm.get('locname').value).subscribe(data => this.polist = data,
        //    err => {
        //     console.log('Error Occured On getPolist()');
        //   }
        // );
      },
        error => {
          console.log('Error Occured on getEditmaintance');
        });
    }
      ,
      err => {
        console.log('Console Error getTaxmaster()');
      }
    );



    //   alert(this.sid);


    /* HSN List */
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

    //Auto Increment        
    // this.invoiceForm.get('pino').setValue(this.val + this.id);
    //Here to Set Default Values For DropDownBoxes
    this.invoiceForm.get('previouspurchaseitem').setValue("opt1");
    this.invoiceService.getPoedit(this.sid).subscribe(data => { this.polist = data; this.invoiceForm.get('refpoid').setValue(data[0][0]) });
    // this.invoiceForm.get('refpoid').setValue("opt1");
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
    })


  }

  /* Get Strip(S  Stripperbox ) and Box(B Quantityperstrip) Quantity */
  getSBQuantity(id: number) {
    this.invoiceService.getSBQuantity(id).subscribe(data => { this.sbQuantity = data },
      error => {
        console.log("Error Occured on getSBQuantity");
      })
  }
  //get Dist Values 
  getDistvalues() {
    this.invoiceService.getDistvalues(this.invoiceForm.get('vendorid').value).subscribe(async data => {
      this.distvalues = data;
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
      await this.invoiceService.getEditpurchase(this.sid).subscribe(data => {
        this.setViewdata(data);
      },
        error => {
          console.log('Error Occured on getEditpurchase');
        })
    },
      error => {
        console.log('Error Occured on getDistvalues()' + error);
      });
  }
  characters = [];
  getProduct(val: string) {
    this.invoiceService.getProductlist(val, AppComponent.companyID, AppComponent.branchID, this.invoiceForm.get('locrefid').value, AppComponent.locrefID).subscribe(data => {
      this.characters = [];
      for (let i = 0; i < data.length; i++) {
        this.characters.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }
  getProvalues() {
    let pid: any = this.invoiceForm.get('productid').value;
    this.invoiceService.getBrandlist(pid, AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => { this.getTabledata(data); this.branddata = data },
      error => {
        console.log('Error occured On getProvalues');
      });
  }
  x;
  public setvatTax: boolean = false;
  public setgstTax: boolean = false;
  getTabledata(data: any) {

    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
      let setData = getData.value;
      if (data !== undefined || data !== null) {
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
          for (this.x = 0; this.x < setData.length; this.x++) {
            if (data[this.i][0] == setData[this.x].drugproductrefid) {
              flag = 1;
            }
          }
          if (flag == 1) {

            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
          else {

            if (this.coltax[0] == 0) {

              this.setvatTax = true;
              $("#colvathide").show();
              $('.colvathide').show();
              $("#colhide").hide();
              $('.colhide').hide();
            }
            if (this.coltax[0] == 1) {

              this.setgstTax = true;
              $("#colvathide").hide();
              $('.colvathide').hide();
              $("#colhide").show();
              $('.colhide').show();
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
              data[this.i][13],
              data[this.i][14],
              data[this.i][15],
              data[this.i][16]
            ));
          }
          this.inc += 1;
        }
        // this.getgstvalues()
        this.invoiceForm.get('brandcode').setValue("");
        this.invoiceForm.get('boxperstrip').setValue('');
        this.invoiceForm.get('strippertablet').setValue(1);
        this.invoiceForm.get('boxqty').setValue('');
        this.invoiceForm.get('stripqty').setValue('');
        this.invoiceForm.get('tabqty').setValue('');
        this.invoiceForm.get('quantity').setValue("");
        this.invoiceForm.get('batch').setValue("");
        this.invoiceForm.get('expdate').setValue("");
        this.invoiceForm.get('mrpvalue').setValue("");
        this.invoiceForm.get('sellingvalue').setValue("");
        this.invoiceForm.get('hsncode').setValue("");
        this.invoiceForm.get('gstper').setValue("");
        this.characters = [];
        this.getSum();
      }
    }
  }
  showBrandlist(pid: any, pname: any, form: any, dosage: any, mfrg: any, vats: any,
    gsts: any, cgsts: any, mrps: any, sgsts: any, dosageId: number, formID: number, mfgId: number,igsts: any, utgsts: any, mrp: any, sellingprice: any) {
    return this.formBuilder.group({
      // ID: this.inc,
      // id: this.inc + 1,

      drugproductrefid: pid,
      productname: pname,
      dosageid: dosage,
      formulation: form,
      mfg: mfrg,
      vat: this.vats,
      gst: this.gsts,
      sgst: this.sgsts,
      cgst: this.cgsts,
      mrp: [parseFloat(mrps).toFixed(this.fixedlength), []],
      unitprice: [(0).toFixed(this.fixedlength), []],
      dosageId: dosageId,
      formulationid: formID,
      mfgname: mfgId,
      //  piproductid: '',
      id: '',
      pirefid: this.sid,
      boxquantity: [parseFloat(this.invoiceForm.get('boxqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      stripquantity: [parseFloat(this.invoiceForm.get('stripqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      tabletquantity: [parseFloat(this.invoiceForm.get('tabqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      totalquantity: [parseFloat(this.invoiceForm.get('quantity').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      freeboxqty: 0,
      freestripqty: 0,
      freetabletqty: 0,
      batchid: [this.invoiceForm.get('batch').value, []],
      expirydate: [this.invoiceForm.get('expdate').value, Validators.required],
      purprice: '',
      salesdiscount: '',
      discount: '',
      igst: igsts,
      totalproductprice: '',
      vatamt: '',
      gstamt: '',
      sgstamt: '',
      cgstamt: '',
      igstamt: '',
      freetotalqty: '',
      discountamt: '',
      utgst: this.utgsts,
      utgstamt: '',
      clientcdate: [AppComponent.date, []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      refpoid: [this.invoiceForm.get('refpoid').value, []],
      stripperbox: [parseFloat(this.invoiceForm.get('boxperstrip').value).toFixed(this.fixedlength)],
      quantityperstrip: [parseFloat(this.invoiceForm.get('strippertablet').value).toFixed(this.fixedlength)],
      hsnid: [this.invoiceForm.get('hsncode').value, []],
      hsncode: [this.hsnno, []],
      hsngst: [this.gstper],
      packagecount: [this.invoiceForm.get('packageunit').value],
      packcalulation: [this.packageount],
      packageunit: [this.invoiceForm.get('packageunit').value],
      sellingprice: [parseFloat(sellingprice).toFixed(this.fixedlength)]
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
        console.log("nan check?????" + Quantityperstrip + " " + Stripperbox)
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

        setData[this.j].vatamt = (txtvat * (setData[this.j].totalproductprice - txtdiscount)) / 100;
        setData[this.j].gstamt = (txtgst * (setData[this.j].totalproductprice - txtdiscount)) / 100;
        setData[this.j].sgstamt = (txtsgst * (setData[this.j].totalproductprice - txtdiscount)) / 100;
        setData[this.j].cgstamt = (txtcgst * (setData[this.j].totalproductprice - txtdiscount)) / 100;
        setData[this.j].igstamt = (txtigst * (setData[this.j].totalproductprice - txtdiscount)) / 100;
        setData[this.j].utgstamt = (txtutgst * (setData[this.j].totalproductprice - txtdiscount)) / 100;
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
      else if (this.taxid == 2 && this.taxgstid == 1) {
        if(this.taxgstid==1){
          totalgsts = setData[this.j].sgstamt + setData[this.j].cgstamt + setData[this.j].igstamt;
        }else{
          totalgsts = setData[this.j].utgstamt + setData[this.j].cgstamt + setData[this.j].igstamt;
        }
      }
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
      } else {
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
  // keyup while typing show data...keyup.enter  while entering show data..keydown.Tab while tab 

  private valid: boolean;
  afteraaddamnt: any;
  saveprocess: boolean = false;
  sumvalid: boolean = false;
  onSubmit() {
    this.afteraaddamnt = parseFloat(this.invoiceForm.get('grandtotal').value) - parseFloat(this.purtotal)

    this.purchasejournal.patchValue({
      debitamount: parseFloat(this.afteraaddamnt) + parseFloat(this.purchasejournal.get('debitamount').value),
      //  creditamount: parseFloat(this.afteraaddamnt) + parseFloat(this.purchasejournal.get('creditamount').value),
      personid: this.invoiceForm.get('vendorid').value,
    });
    this.returnValid = this.invoiceDatavalidation();
    this.sumvalid = this.getSum();
    if (this.returnValid && this.sumvalid) {
      this.appComponent.ngOnInit();

      this.invoiceForm.get('clientcdate').setValue(AppComponent.date);
      this.saveprocess = true;
      this.invoiceService.getPurcmaintanance(JSON.stringify(this.invoiceForm.value)).subscribe(
        (result: any) => {
          let res = result.res;
          if (res) {
            this.invoiceService.savepurjournal(JSON.stringify(this.purchasejournal.value))
            const saveData = <FormArray>this.invoiceForm.controls['brandDetails'];
            this.invoiceService.getPurcinvoice(JSON.stringify(saveData.value)).subscribe(
              data => {
                if (data) {
                  this.saveprocess = false;
                  this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Data Saved Successfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                  setTimeout(() => {
                    this.router.navigate(['/PurchaseInvoice/ViewPurchaseInvoice']);
                  }, 500)
                } else {
                  this.saveprocess = false;
                  this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Data Not Saved ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }
              },
              error => {
                console.log("Error On getPurcinvoice()" + error)
              });
          }
        }, (error: any) => {
          console.log(error['Errors']);
        });
    }
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
    //this.dataGrid.instance.deleteRow(index);
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    getData.removeAt(index);
    this.getSum();
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
      getData.reset();

    }
  }


  /* To GET VIEW DATA(DevExtreme) */
  inc = 0;
  packageount;
  quantyper;
  setViewdata(data) {
    let i;
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    if (data !== undefined || data !== null) {
      for (i = 0; i < data.length; i++) {
        if (data[i][7] == 0) {
          this.packageount = parseInt(data[i][8]);
        } else if (data[i][8] == 0) {
          this.packageount = parseInt(data[i][7]);
        }
        if (data[i][39] == null || data[i][39] == '' || data[i][39] == 0) {
          this.quantyper = 1;
        } else {
          this.quantyper = data[i][39];
        }
        getData.push(this.returnViewpurcdata(
          data[i][0],
          data[i][1],
          data[i][2],
          data[i][3],
          data[i][4],
          data[i][5],
          data[i][6],
          data[i][7],
          data[i][8],
          data[i][9],
          data[i][10],
          data[i][11],
          data[i][12],
          data[i][13],
          data[i][14],
          data[i][15],
          data[i][16],
          data[i][17],
          data[i][18],
          data[i][19],
          data[i][20],
          data[i][21],
          data[i][22],
          data[i][23],
          data[i][24],
          data[i][25],
          data[i][26],
          data[i][27],
          data[i][28],
          data[i][29],
          data[i][30],
          data[i][31],
          data[i][32],
          data[i][33],
          data[i][34],
          data[i][35],
          data[i][36],
          data[i][37],
          data[i][38],
          data[i][39],
          data[i][40],
          data[i][41],
          data[i][42],
          data[i][43],
          data[i][44]
        ));
        this.inc += 1;
      }
    }
    else {
      console.log("Error In Push Data setViewdata()");
    }
  }
  returnViewpurcdata(pipid: any, piref: any, productid: any, brandname: any, fname: any, dosname: any, mfgname: any, boxqty: any, stripqty: any, tabqty: any, totqty: any, pdis: any, disamt: any, vat: any, vatamt: any,
    gst: any, gstamt: any, sgst: any, sgstamt: any, cgst: any, cgstamt: any, igst: any, igstamt: any, totamt: any, mfg: any, batchno: any, dosage: any,
    pprice: any, sdisc: any, form: any, fboxqty: any, fstripqty: any, ftabqty: any, ftotqty: any, mrp: any, expirydate: any, utgst: any, utgstamt: any, stripbox: any, quantitystrip: any, sellingprice: any, hsncode: any, hsnid: any, uprice: any, packunit: any) {
    return this.formBuilder.group({
      // ID: this.inc,
      // id: this.inc + 1,
      //  piproductid: pipid,
      id: pipid,
      pirefid: piref,
      drugproductrefid: productid,
      productname: brandname,
      dosageid: dosname,
      formulation: fname,
      mfg: mfg,
      boxquantity: boxqty,
      stripquantity: stripqty,
      tabletquantity: tabqty,
      freeboxqty: fboxqty,
      freestripqty: fstripqty,
      freetabletqty: ftabqty,
      batchid: batchno,
      expirydate: expirydate,
      purprice: pprice,
      mrp: mrp,
      salesdiscount: sdisc,
      discount: pdis,
      vat: vat,
      gst: gst,
      sgst: sgst,
      cgst: cgst,
      igst: igst,
      totalproductprice: totamt,
      dosageId: dosage,
      formulationid: form,
      mfgname: mfgname,
      vatamt: vatamt,
      gstamt: gstamt,
      sgstamt: sgstamt,
      cgstamt: cgstamt,
      igstamt: igstamt,
      totalquantity: totqty,
      freetotalqty: ftotqty,
      discountamt: disamt,
      utgst: utgst,
      utgstamt: utgstamt,
      stripperbox: [parseFloat(stripbox)],
      unitprice: sellingprice,
      quantityperstrip: [parseFloat(this.quantyper)],
      clientcdate: [AppComponent.date, []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      hsnid: [hsnid, []],
      hsncode: [hsncode, []],
      hsngst: [],
      refpoid: [this.invoiceForm.get('refpoid').value, []],
      packagecount: [packunit],
      packcalulation: [this.packageount],
      sellingprice: [sellingprice],
      packageunit: [packunit]
    });
  }
  getEditmaintance(data: any) {
    let k;
    //  alert(data);
    if (data !== undefined || data !== null) {
      for (k = 0; k < data.length; k++) {
        //   alert( data.length);
        this.invoiceForm.patchValue(this.fetchEidtdata(
          data[k][0],
          data[k][1],
          data[k][2],
          data[k][3],
          data[k][4],
          data[k][5],
          data[k][6],
          data[k][7],
          data[k][8],
          data[k][9],
          data[k][10],
          data[k][11],
          data[k][12],
          data[k][13],
          data[k][14],
          data[k][15],
          data[k][16],
          data[k][17],
          data[k][18],
          data[k][19],
          data[k][20],
          data[k][21],
          data[k][22],
          data[k][23],
          data[k][24],
          data[k][25],
          data[k][26],
          data[k][27],
          data[k][28],
          data[k][29],
          data[k][30],
          data[k][31]

        ));
      }
      // this.getDistvalues();
    }
  }
  fetchEidtdata(piid: any, pino: any, pidates: any, vendorid: any, invoiceno: any, delivery: any, dlno: any, gstno: any, address: any, itemamt: any, totproduct: any,
    totdis: any, round: any, cdisc: any, taxamt: any, tottaxamt: any, totmargin: any, totfreeqty: any, vatamt: any, gstamt: any,
    cgstamt: any, sgstamt: any, igstamt: any, utgstamt: any, totqty: any, ci: any, bi: any, lname: any, lrefid: any, grandtot: any, refpoid: any, cdisper: any) {
    return {
      id: piid,
      pino: pino,
      pidate: pidates,
      vendorid: vendorid,
      vendorinvoiceno: invoiceno,
      deliverytype: delivery,
      dlnumber: dlno,
      gst: gstno,
      addreess: address,
      totalproduct: totproduct,
      totalquantity: totqty,
      totalfreeqty: totfreeqty,
      itemamt: itemamt,
      totaldiscount: totdis,
      cashdiscount: cdisc,
      roundoff: round,
      invoiceamt: '0.00',
      adjustamt: '0.00',
      prnumber: '0.00',
      totalmargin: totmargin,
      gstamt: gstamt,
      totaltaxamt: tottaxamt,
      sgstamt: sgstamt,
      cgstamt: cgstamt,
      igstamt: igstamt,
      vatamt: vatamt,
      utgstamt: utgstamt,
      taxableamt: taxamt,
      companyrefid: ci,
      branchrefid: bi,
      locname: lname,
      locrefid: lrefid,
      grandtotal: grandtot,
      cashdiscountpercent:cdisper,
      refpoid:refpoid
    };

  }
  openMyModal(event, id: number) {
    document.querySelector("#" + event).classList.add('md-show');

  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
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
    if (this.invoiceForm.get('boxqty').value == 0 || this.invoiceForm.get('boxqty').value == null) {
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

  hsnno;
  gstper;
  vats;
  gsts;
  cgsts;
  sgsts;
  utgsts;
  fetchng() {
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
    }
    else if (this.taxid == 1) {
      setData[index].gst = this.pophsnform.get('popgstvalue').value;
    }
    else if (this.taxid == 2) {
      setData[index].cgst = this.pophsnform.get('popgstvalue').value / 2;
      setData[index].sgst = this.pophsnform.get('popgstvalue').value / 2;
      setData[index].ugst = this.pophsnform.get('popgstvalue').value / 2;
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
}

