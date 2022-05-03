import { Component, OnInit, ViewChild, Renderer2, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgSelectOption } from '@angular/forms';
import { purchaseOrderService } from './purchaseOrder.services';
import { Router } from '@angular/router'
import { error } from 'selenium-webdriver';
import { DxDataGridComponent } from "devextreme-angular";
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from '../../notifications/notifications.datepipe';
import { DomSanitizer } from '@angular/platform-browser';
import { cardToggle } from 'app/shared/card/card-animation';
import { TranslateService } from 'ng2-translate'; 
import swal from 'sweetalert2';

const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
@Component({
  selector: 'Purchase Order',
  templateUrl: './purchaseOrder.component.html',
  styleUrls: ['./purchaseOrder.component.css'],
  animations: [cardToggle],
  providers: [purchaseOrderService, NotificationsComponent]
})
export class purchaseOrderComponent implements OnInit {
  parentMessage = "sales";
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  barcodeForm: FormGroup;
  purchaseOrder: FormGroup;
  submitted: false;
  distributors = [];
  characters = [];
  dataSource = [];
  drugs = [];
  drugList = [];
  dist = [];
  data = [];
  poid: any;
  dropdownSettings3 = {};
  selectedItems = [];
  hospitallist = [];
  branch = [];
  g;
  itemlength = [{}, {}, {}, {}, {}]
  drugid: any;
  flags: boolean = false;
  x;
  companyrefid: any;
  branchid: any;
  locname: any;
  locrefid: any;
  shopid: any;
  emailaddress = [];
  deviceForm: any;
  deviceObj: any;
  decists: any;
  pactype: string = "Box";
  pactype1: string = "Strips";
  packingevent(event) {
    this.pactype = event;
  }
  packingevent1(event) {
    this.pactype1 = event;
    if (this.pactype == this.pactype1) {
      this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Do not select same package', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
    }

  }
  constructor(public translate: TranslateService,private purchaseOrders: purchaseOrderService, private router: Router, private renderer: Renderer2,
    private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent,
    private dateformat: dateFormatPipe, private app: AppComponent, private domSanitizer: DomSanitizer) {

      translate.setDefaultLang('en');
  }

  auto: any;
  fixedlength: any;
  qtylength=1;
  aboveflag: any;
  belowflag: any;
  invoicecount=1;
  test:boolean=false;
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.purchaseOrder = this.formBuilder.group({
      vendorid: ['', []],
      drug: ['', []],
      barcode: ['', []],
      pono: ['', []],
      podate: [this.dateformat.transform05(Date.now()), []],
      totalproduct: ['', []],
      totalboxquantiy: ['', []],
      totalstripquantity: ['', []],
      totaltabletquantity: ['0', []],
      totalquantity: ['', []],
      hospitalid: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      grandtotal: ['', []],
      qty: [0],
      tabqty: [0],
      boxqty: [0],
      stripqty: [0],
      boxperstrip: [0],
      strippertablet: [1],
      minqtyflag: [false],
      newproflag: [false],
      packageunit: [],
      quantitytype: [],
      brandDetails: this.formBuilder.array([]),
      newproductdetails: this.formBuilder.array([]),
      hiddenfields: this.formBuilder.array([]),
    });
    
    this.branchid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
    this.companyrefid = AppComponent.companyID;
    this.shopid = AppComponent.shopID
    this.purchaseOrder.get('companyrefid').setValue(AppComponent.companyID);
    this.purchaseOrder.get('branchrefid').setValue(AppComponent.branchID);
    this.purchaseOrder.get('locname').setValue(AppComponent.locRefName1);
    this.purchaseOrder.get('locrefid').setValue(AppComponent.locrefID1);
    //  this.purchaseOrder.get('pono').setValue('0');
    this.purchaseOrder.get('vendorid').setValue("opt1");
    this.purchaseOrder.get('drug').setValue("opt1");
    /* get Deciaml Status */
    this.purchaseOrders.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
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
      this.purchaseOrder.get('totalproduct').setValue((0).toFixed(this.qtylength));
      this.purchaseOrder.get('totalquantity').setValue((0).toFixed(this.qtylength));
      this.purchaseOrder.get('grandtotal').setValue((0).toFixed(this.fixedlength));
    });


    setTimeout(() => {
      /*  get UOM  */
      this.purchaseOrders.getuom(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => this.unitofMsr = data)
      if (AppComponent.usertype == "\"SuperAdmin\" ") {
        /*   this.purchaseOrders.getSuperAdminDistributor().subscribe(data => { this.dist = data },
            err => {
              console.log('Error Occured Get States');
            });*/
        this.purchaseOrders.getAutoIncr().subscribe(data => { this.purchaseOrder.get('pono').setValue(data.toString()); },
          err => {
            console.log('Error Occured Get AutoIncrement');
          });
        /*   this.purchaseOrders.getDrugs().subscribe(data => { this.drugs = data },
            err => {
              console.log('Error Occured Get States');
            });*/
      } else {
        /* this.purchaseOrders.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.dist = data },
          err => {
            console.log('Error Occured Get States');
          });*/
        this.purchaseOrders.getAutoIncr().subscribe(data => { this.purchaseOrder.get('pono').setValue(data.toString()) },
          err => {
            console.log('Error Occured Get AutoIncrement');
          });
      }

      setTimeout(() => {
        this.purchaseOrders.getpurchaseordercount(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1)
        .subscribe(countdata => {
          if(countdata){this.invoicecount=countdata[0];}else{this.invoicecount=1}
        },error => { console.log(error);this.invoicecount=1});
        this.getDist();
        this.addNewHiddenDetails();
      },1800);
    }, 2100);
    
  
   

    this.dropdownSettings3 = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Session Number ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

    
  }
  getDist() {
    // if (AppComponent.usertype == "\"SuperAdmin\" ") {
    //   this.purchaseOrders.getSuperDist(searchValue).subscribe(data => {
    //     this.distributors = [];
    //     for (let i = 0; i < data.length; i++) {
    //       this.distributors.push({ value: data[i][0], label: data[i][1] });
    //     }
    //   });
    // } else {
    this.purchaseOrders.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.distributors = [];
      for (let i = 0; i < data.length; i++) {
        this.distributors.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }
  //}
  getProduct(searchValue: string) {
    // if (AppComponent.usertype == "\"SuperAdmin\" ") {
    //   this.purchaseOrders.getSuperDrugs(searchValue).subscribe(data => {
    //     this.characters = [];
    //     for (let i = 0; i < data.length; i++) {
    //       this.characters.push({ value: data[i][0], label: data[i][1] });
    //     }
    //   });
    // } else {
    if (this.purchaseOrder.get('vendorid').value != "opt1") {
      this.purchaseOrders.getDrugs(searchValue, AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
    }
    else {
      this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Distributor', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });

    }
  }
  //}
  sess: any = 0;
  getPurchaseSession() {
    this.sess = this.purchaseOrder.get('hospitalid').value;
    const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
    getData.controls = [];
    if (this.sess != "") {
      for (this.g = 0; this.g < this.sess.length; this.g++) {
        // alert("sessionid" + this.sess[this.g].id)
        this.purchaseOrders.getPurcSessionshop(this.sess[this.g].id, this.purchaseOrder.get('vendorid').value).subscribe(data => { this.getTabledata(data) },
          error => {
            console.log("Error Occured from getPurcSessiontable()");
          });
      }
    } else {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SELECT SESSION NUMBER..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  getHosp() {
    this.purchaseOrder.get('vendorid').value;
    if (this.purchaseOrder.get('vendorid').value != "") {
      this.hospitallist = [];
      //for (this.g = 0; this.g < this.branch.length; this.g++) {
      /** Get Hospital Info**/
      this.purchaseOrders.getSessHosp(this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('vendorid').value).subscribe(data => { this.hosplist(data) },
        error => {
          console.log('Error Occured On getSessHosp()')
        }
      );
    } else {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SELECT DISTRIBUTOR NAME..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  hosplist(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.hospitallist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }
  getBarcodeProduct(event) {
    this.purchaseOrders.getBarcodeProduct(this.purchaseOrder.get('barcode').value).subscribe(data => this.drugid = data
      , err => {
        console.log('Error Occured Get States');
      });
    this.getBarcodeDrugs();
  }
  getBarcodeDrugs() {
    this.purchaseOrders.getDrugsData(this.drugid, this.companyrefid, this.branchid, this.locname, this.locrefid, this.purchaseOrder.get('vendorid').value).subscribe(data => { this.getDrugData(data) },
      err => {
        console.log('Error Occured Get States');
      });
  }
  @ViewChild('drug') inputEl: ElementRef;
  // ngAfterViewInit() {
  //   setTimeout(() => this.inputEl.nativeElement.focus());
  // }
  getDrugs() {

    if (this.purchaseOrder.get('vendorid').value != "opt1") {
      if (this.purchaseOrder.get('drug').value != "opt1") {
        this.purchaseOrders.getDrugsData(this.purchaseOrder.get('drug').value, this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value,
          this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value, this.purchaseOrder.get('vendorid').value).subscribe(data => this.getDrugData(data),
            err => {
              console.log('Error Occured Get States');
            });
      } else {
        this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Product', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
      }

    } else {
      this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Distributor', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
    }
    this.purchaseOrder.get('drug').setValue('');

    // else if (event.keyCode == 13) {  event.keyCode == 9
    //   if (this.purchaseOrder.get('vendorid').value != "opt1") {
    //     this.purchaseOrders.getDrugsData(this.purchaseOrder.get('drug').value, this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value,
    //       this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value, this.purchaseOrder.get('vendorid').value).subscribe(data => this.getDrugData(data),
    //         err => {
    //           console.log('Error Occured Get States');
    //         });
    //   } else {
    //     this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Distributor', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
    //   }
    // }
  }
  getDistributorProduct() {
    /*  if (AppComponent.usertype == "\"SuperAdmin\" ") {
        //   alert("distributorvalue"+this.purchaseOrder.get('distributor').value);
        this.purchaseOrders.getSuperDistributorProduct(this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTabledata(data) },
          err => {
            console.log('Error Occured Get States');
          });
  
      } else {
        this.purchaseOrders.getDistributorProduct(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTabledata(data) },
          err => {
            console.log('Error Occured Get States');
          });
  
      }*/
    this.PurchaseOrderEmailDistributor();
  }
  PurchaseOrderEmailDistributor() {
    //   alert(this.purchaseOrder.get('distributor').value)
    if (this.purchaseOrder.get('vendorid').value != "opt1" || null || undefined || "") {
      this.purchaseOrders.PurchaseOrderEmailDistributor(this.purchaseOrder.get('vendorid').value).subscribe(data => { this.emailaddress = data[0][1] });
    }
  }
  packageount;
  getTabledata(data: any) {
    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        if (data[this.i][10] == 0) {
          this.packageount = parseInt(data[this.i][11]);
        } else if (data[this.i][11] == 0) {
          this.packageount = parseInt(data[this.i][10]);
        }
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].productid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
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
            data[this.i][9]
          ));
        }
      }
      this.characters = [];
      this.getSum();
    }
  }
  showBrandlist(psesid: any, pid: any, pname: any, dosage: any, totqty: any, distpice: any,
    abc: any, rank: any, remarks: number, id: any) {
    return this.formBuilder.group({
      pursessionno: [psesid, []],
      pursessionid: [id, []],
      drugproductrefid: [pid, []],
      itemname: [pname, []],
      dosage: [dosage, []],
      boxquantity: [(0).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      stripquantity: [(0).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      tabletquantity: [totqty.toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      unitprice: [distpice.toFixed(this.fixedlength), []],
      abc: [abc, []],
      distprodrank: [rank, []],
      distremarks: [remarks, []],
      totalquantity: [(0).toFixed(this.qtylength), []],
      totalproductprice: ['', []],
      uom: [(0).toFixed(this.fixedlength), []],
      equalto: [(0).toFixed(this.fixedlength), []],
      piflag: [0, []],
      companyrefid: [this.companyrefid, []],
      branchrefid: [this.branchid, []],
      locname: [this.locname, []],
      locrefid: [this.locrefid, []],
      packagecount: [this.packageount]
    });
  }
  calc(event) {
    if (event.keyCode == 9) {
      this.getSum();
    }
  }
  i;
  j;
  m;
  imagepath: string;
  sbQuantity = [];
  unitofMsr = [];
  getSum() {
    this.setvendor();
    /** Declare Given Table Datas**/
    let txtproduct: number = 0;
    let txttabletquantity: any = 0;
    let txtstripquantity: any = 0;
    let txtboxquantity: any = 0;
    let totalacquisition: any = 0;
    /** To set and calculate Given Table Datas into total values(formcontrolname) **/
    let totalproduct: any = 0;
    let totalQuantity: any = 0;
    let BoxQuantity: any = 0;
    let StripQuantity: any = 0;
    let TabQuantity: any = 0;
    let totalacqcost: any = 0;
    const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
    let setData = getData.value;
    let k: number = 0;
    let Stripperbox;
    let Quantityperstrip;
    for (this.j = 0; this.j < setData.length; this.j++) {
      this.getSBQuantity(setData[this.j].drugproductrefid);
      // Stripperbox = this.sbQuantity[0][0];
      // // alert(Stripperbox);
      // Quantityperstrip = this.sbQuantity[0][1];
      // alert(Quantityperstrip);
      /* To Get Total Products */
      if (parseInt(setData.length) !== null) {
        txtproduct = parseInt(setData.length);
      }
      Stripperbox = setData[this.j].stripperbox;
      Quantityperstrip = setData[this.j].quantityperstrip;
      /* Tablet Quantity */
      if (setData[this.j].tabletquantity == '' || parseFloat(setData[this.j].tabletquantity) == null) {
        setData[this.j].tabletquantity = 0.00;
        txttabletquantity = 0.00;
      }
      else {
        txttabletquantity = parseFloat(setData[this.j].tabletquantity);
        TabQuantity += parseFloat(setData[this.j].tabletquantity);
      }
      /* Strip Quantity */
      if (setData[this.j].stripquantity == '' || parseFloat(setData[this.j].stripquantity) == null) {
        setData[this.j].stripquantity = 0.00;
        txtstripquantity = 0.00;
      }
      else {
        txtstripquantity = parseFloat(setData[this.j].stripquantity) * Quantityperstrip * Stripperbox;
        StripQuantity += parseFloat(setData[this.j].stripquantity);
      }
      /* Box Quantity */
      if (setData[this.j].boxquantity == '' || parseFloat(setData[this.j].boxquantity) == null) {
        setData[this.j].boxquantity = 0.00;
        txtboxquantity = 0.00;
      }
      else {
        txtboxquantity = parseFloat(setData[this.j].boxquantity) * Stripperbox * Quantityperstrip;
        txtboxquantity = parseFloat(setData[this.j].packagecount) * Stripperbox * Quantityperstrip;
        setData[this.j].boxquantity = setData[this.j].packagecount;
        BoxQuantity += parseFloat(setData[this.j].boxquantity);
      }
      /* Total Quantity */
      if (setData[this.j].totalquantity == '' || parseFloat(setData[this.j].totalquantity) == null) {
        setData[this.j].totalquantity = 0.00;
        // txtboxquantity = 0.00;
      }

      // /* per cost */
      // if(setData[this.j].price == '' || parseFloat(setData[this.j].price) == null){
      //   setData[this.j].price = 0;
      //   totalacquisition = 0;
      // }
      // else{
      //   totalacquisition = parseFloat(setData[this.j].price);
      //   totalacqcost+=parseFloat(setData[this.j].price);
      // }
      console.log(txttabletquantity + " " + txtstripquantity + " " + txtboxquantity);
      if (this.qtype == 1) {
        setData[this.j].totalquantity = (txttabletquantity + txtstripquantity + txtboxquantity).toFixed(this.qtylength);
        setData[this.j].totalproductprice = (parseFloat(setData[this.j].unitprice) * parseFloat(setData[this.j].packagecount)).toFixed(this.fixedlength);
      } else {

        setData[this.j].totalquantity = parseFloat(setData[this.j].boxquantity).toFixed(this.qtylength);
        setData[this.j].totalproductprice = (parseFloat(setData[this.j].unitprice) * parseFloat(setData[this.j].totalquantity)).toFixed(this.fixedlength);
        // setData[this.j].totalquantity = parseFloat(setData[this.j].totalquantity).toFixed(this.fixedlength);
        setData[this.j].stripperbox = '1.00';
        setData[this.j].quantityperstrip = '1.00'

      }
      // }else {
      //   setData[this.j].totalquantity = 
      // }

      if (parseFloat(setData[this.j].totalquantity) >= parseFloat(setData[this.j].maxqty) && parseFloat(setData[this.j].maxqty) != 0) {
        this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'You Reached Maximum Quantity level ', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
      }

      /*Total cost */

      // parseFloat(setData[this.j].tabletquantity).toFixed(this.fixedlength);
      // parseFloat(setData[this.j].stripquantity).toFixed(this.fixedlength);
      // parseFloat(setData[this.j].boxquantity).toFixed(this.fixedlength);
      // parseFloat(setData[this.j].unitprice).toFixed(this.fixedlength);
      // parseFloat(setData[this.j].totalproductprice).toFixed(this.fixedlength);

      // alert("a1"+setData[this.j].price);
      //alert("a2"+setData[this.j].tabletquantity);
      

      //alert("a3"+setData[this.j].grandtotal);
      totalacqcost += parseFloat(setData[this.j].totalproductprice);
      // alert("a4"+totalacqcost)
      /* Row Wise SubTotal Amount */

      /* To Patch values Row wise */
      getData.patchValue(setData);

      /* Toatl Calculation*/
      totalproduct = txtproduct;
      // totalQuantity += TabQuantity + StripQuantity + BoxQuantity;
      totalQuantity += parseFloat(setData[this.j].totalquantity);
      /* To Set value from Table calculation Final Values on Input types*/
      // this.purchaseOrder.get('totalboxquantity').setValue(BoxQuantity);
      // this.purchaseOrder.get('totalstripquantity').setValue(StripQuantity);
      // alert("a5"+totalacqcost);
      this.purchaseOrder.get('grandtotal').setValue(totalacqcost.toFixed(this.fixedlength));
      this.purchaseOrder.get('totalproduct').setValue(totalproduct.toFixed(this.qtylength));
      this.purchaseOrder.get('totalquantity').setValue(totalQuantity.toFixed(this.qtylength));
      this.purchaseOrder.get('totaltabletquantity').setValue(TabQuantity.toFixed(this.fixedlength));

      //  this.purchaseOrder.get('grandtotal').setValue(totalacqcost);
      //To set Temporary Values In Bottom Input types    
    }
  }
  
  getSBQuantity(id: number) {
    this.purchaseOrders.getSBQuantity(id).subscribe(data => { this.sbQuantity = data },
      error => {
        console.log("Error Occured on getSBQuantity");
      })
  }

  removeRow(index: number) {
    // alert("RemoveRow" + index);
    const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
    getData.removeAt(index);
    this.getSum();
    this.setvendor();
  }

  setvendor(){
    const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
    if(getData.value.length>0){
      this.test=true;
    }
    else{
      this.test=false;
    }
  }
  alert(){
    const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
    if(getData.value.length>0){
      swal({
        type:'warning',
        title:'Already Selected',
        showConfirmButton:false,
        timer:2000
      })
      
    }
   
  }

  inc = 0;
  getDrugData(data: any) {
    if (data !== null || data !== undefined) {
      const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
      let setData = getData.value;
      let flag: number = 0;
      for (this.i = 0; this.i < data.length; this.i++) {
        if (this.purchaseOrder.get('boxqty').value == 0) {
          this.packageount = parseInt(this.purchaseOrder.get('stripqty').value);
        } else if (this.purchaseOrder.get('stripqty').value == 0) {
          this.packageount = parseInt(this.purchaseOrder.get('boxqty').value);
          // this.purchaseOrder.get('boxqty').setValue(1);
        } else {
          this.packageount = 0;
          this.purchaseOrder.get('boxqty').setValue(1);
          this.purchaseOrder.get('stripqty').setValue(0);
        }
        for (this.j = 0; this.j < setData.length; this.j++) {
          if (setData[this.j].drugproductrefid == data[this.i][0]) {
            flag = 1;
          }
        }
        if (flag == 1) {
          //    alert("The " + data[this.i][1] + " is already exist pls change the quantity");
          this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'The ' + data[this.i][1] + ' is already exist pls change the quantity', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          break;
        }
        else {
          // alert("push data");
          getData.push(this.setDrugdata(data[this.i][0], data[this.i][1], data[this.i][2], data[this.i][3], data[this.i][5], data[this.i][6], data[this.i][7], data[this.i][8], data[this.i][9]));
          this.inc += 1;
          this.purchaseOrder.get('qty').setValue(0);
          this.purchaseOrder.get('boxperstrip').setValue(0);
          this.purchaseOrder.get('strippertablet').setValue(0);
          this.purchaseOrder.get('boxqty').setValue(0);
          this.purchaseOrder.get('stripqty').setValue(0);
          this.purchaseOrder.get('tabqty').setValue(0);
        }
      }
    }
    this.getSum();
  }
  setDrugdata(id: any, itemname: any, dosage: any, prank: any, reorderlvl: any, consumpminqty: any, minleadtime: any, maxqty: any, dprice: any) {
    return this.formBuilder.group({
      pursessionid: [0, []],
      pursessionno: ['NA', []],
      drugproductrefid: [id, []],
      itemname: [itemname, []],
      dosage: [dosage, []],
      boxquantity: [parseFloat(this.purchaseOrder.get('boxqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      stripquantity: [parseFloat(this.purchaseOrder.get('stripqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      tabletquantity: [parseFloat(this.purchaseOrder.get('tabqty').value).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      totalquantity: [parseFloat(this.purchaseOrder.get('qty').value).toFixed(this.qtylength), Validators.pattern(textnumbers)],
      unitprice: [parseFloat(dprice).toFixed(this.fixedlength), []],
      abc: [prank, []],
      distprodrank: ['NA', []],
      distremarks: ['NA', []],
      totalproductprice: ['', []],
      uom: ['1', []],
      equalto: ['1', []],
      piflag: [0, []],
      companyrefid: [this.companyrefid, []],
      branchrefid: [this.branchid, []],
      locname: [this.locname, []],
      locrefid: [this.locrefid, []],
      reorderlvl: [reorderlvl, []],
      consumpminqty: [consumpminqty, []],
      minleadtime: [minleadtime, []],
      maxqty: [maxqty, []],
      stripperbox: [parseFloat(this.purchaseOrder.get('boxperstrip').value).toFixed(this.fixedlength)],
      quantityperstrip: [parseFloat(this.purchaseOrder.get('strippertablet').value).toFixed(this.fixedlength)],
      packagecount: [this.packageount],
      packageunit: [this.purchaseOrder.get('packageunit').value]
    });
  }

   //Incoice Count Validate
   countvalidate(){
    var countreturn=1;
    let erank= sessionStorage.getItem('ranking');
    if(erank=='5'){
      if(this.invoicecount>=200){
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Reached Maximum Invoice Count Upgrade', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        countreturn=0;
        setTimeout(() => {
          this.router.navigate(['/Profileinfo/ViewProfileSettings']);
        }, 1500);
      }
    }else if(erank=='6'){
      if(this.invoicecount>=20000){
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Reached Maximum Invoice Count Upgrade', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        countreturn=0;
        setTimeout(() => {
          this.router.navigate(['/Profileinfo/ViewProfileSettings']);
        }, 1500);
      }
    }else if(erank=='7'){
      if(this.invoicecount>=40000){
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Reached Maximum Invoice Count Upgrade', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        countreturn=0;
        setTimeout(() => {
          this.router.navigate(['/Profileinfo/ViewProfileSettings']);
        }, 1500);
      }
    }
    return countreturn;
  }

  onSubmit() {
    let countflag=this.countvalidate();
    if(countflag==1){
      this.flags = this.validation();
      if (this.flags) {
        this.createRecord();
      }
    }
  }

  private validation(): boolean {
    const getData = this.purchaseOrder.controls['brandDetails'];
    let setData = getData.value;
    if (setData.length == '' || setData.length == null || setData.length == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Your Table Data is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    else if (this.purchaseOrder.get('vendorid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'SELECT DISTRIBUTOR NAME', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }
    else if (this.purchaseOrder.get('podate').value == '' || this.purchaseOrder.get('podate').value == null) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'DATE IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }
    return true;
  }

  saveprocess: boolean = false;
  reportlink: any = "assets/images/loading.gif";
  reportshow: boolean = false;
  private createRecord(): void {
    //  alert(JSON.stringify(this.purchaseOrder.value));
    if (this.qtype == 0) {
      this.purchaseOrder.get('quantitytype').setValue(0);
    } else {
      this.purchaseOrder.get('quantitytype').setValue(1);
    }
    const saveData = this.purchaseOrder.controls['brandDetails'];
    let setData = saveData.value;
    for (let p = 0; p < setData.length; p++) {
      let maxlevelqty = parseFloat(setData[p].reorderlvl) + parseFloat(setData[p].tabletquantity) - (parseFloat(setData[p].consumpminqty) * parseFloat(setData[p].minleadtime))
      setData[p].maxqty = maxlevelqty;
      saveData.patchValue(setData);
    }
    this.saveprocess = true;
    this.purchaseOrders.createPurchaseOrder(JSON.stringify(this.purchaseOrder.value)).subscribe(
      (result: any) => {
        let re = result.res;
        // alert("re"+re);
        if (re) {

          // alert("purchaseOrder"+JSON.stringify(saveData.value));
          this.purchaseOrders.createPurchaseOrderProduct(JSON.stringify(saveData.value)).subscribe(
            (result: any) => {
              let res = result.res;
              this.poid = res[1];
              if (res[0] == 1) {
                this.saveprocess = false;
                this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Data Saved Succesfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
                //   window.location.href = "PurchaseOrder/ViewPurchaseOrder";
                this.reportshow = true;
                this.barcodeForm = this.formBuilder.group({
                  id: [this.poid, []],
                  mrp: [0, []],
                  invoiceno: [this.poid, []],
                  //barcode wise positions
                  barcodeposition: [2, []],
                  barcodeheight: [60, []],
                  barcodewidth: [120, []],
                  companyid: [AppComponent.companyID, []],
                  companyrefid: [AppComponent.companyID, []],
                  branchrefid: [AppComponent.branchID, []],
                  locname: [AppComponent.locRefName1, []],
                  locrefid: [AppComponent.locrefID1, []],
                });

                this.purchaseOrders.generatepurchaseorderbarcode(JSON.stringify(this.barcodeForm.value)).subscribe(data => {
                  this.purchaseOrders.getprintmodel(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, 1).subscribe(pdata => {
                    if (pdata.length !== 0) {
                      let rlink = pdata[0][1]+"&porefid=" + this.poid+"&__format=PDF";
                      this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
                      //http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/Bill_CashPrint124/Cash_Bill.rptdesign&salesrefid=" 
                    } else {
                      let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Bill_PurchaseOrder.rptdesign&porefid=" + this.poid+"&__format=PDF";
                      this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
                    }
                  }, err => {
                    console.log(err);
                    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Bill_PurchaseOrder.rptdesign&porefid=" + this.poid+"&__format=PDF";
                    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

                  });

                }, error => { console.log(error) });
                // setTimeout(() => {
                //   this.router.navigate(['/PurchaseOrder/ViewPurchaseOrder']);
                // }, 500);
              } else {
                this.saveprocess = false;
                this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
              }
              //this.justInitiate();
              this.purchaseOrders.deviceDetails(JSON.stringify(this.deviceObj))
                .subscribe(data => { },
                  errorCode => console.log(errorCode));
              // this.purchaseOrders.sendMailPurchaseOrder(JSON.stringify(obj)).subscribe(data => { },
              //   errorCode => console.log(errorCode));

            },
            error => {
              console.log("Error createPurchaseOrderProduct"); this.saveprocess = false;
            });
        }
      });
  }

  printclose() {
    this.reportshow = false;
    this.ngOnInit();
  }

  selectedcheckbox(event, id) {
    if (event.target.checked) {
      if (id == 1) {
        this.purchaseOrder.get('newproflag').setValue(false);
        this.getminquantity();
      }
      else if (id == 2) {
        this.purchaseOrder.get('minqtyflag').setValue(false);
        this.getnewquantity();
      }
      else if (id == 3) {
        this.getzeroquantity();
      }
      else if (id == 4) {
        this.getallpoplist();


      }
    } else {
      this.purchaseOrder.get('newproflag').setValue(false);
      this.purchaseOrder.get('minqtyflag').setValue(false);
    }
  }
  allpoplist: any;
  allstockproduct: boolean;
  getallpoplist() {
    this.purchaseOrders.getminimumqty(this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value, this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value).subscribe(data => {
      this.bindminstkdata(data);
      this.purchaseOrders.getnewquantity(this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value, this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value).subscribe(data => {
        this.getnewqtydata(data);
        this.purchaseOrders.getzerostockqty(this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value, this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value).subscribe(data => {
          this.bindzerostkdata(data); this.allstockproduct = true
          this.allpoplist = this.zerostkdata.concat(this.minstkdata, this.newprolist)
        })
      })
    })
  }


  selectpopprod(indx) {
    if (this.allpoplist[indx].flag) {
      this.allpoplist[indx].flag = false;
    } else {
      this.allpoplist[indx].flag = true;
    }
  }

  selectallpopprod(event) {
    let data = this.allpoplist;
    if (event.target.checked) {
      for (let i = 0; i < data.length; i++) {
        this.allpoplist[i].flag = true
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        this.allpoplist[i].flag = false;
      }
    }
  }
  selectedpopdata = [];
  Insertallproduct() {
    this.qtype = 1;
    let flag;
    this.selectedpopdata = [];
    const getData2 = <FormArray>this.purchaseOrder.controls['brandDetails'];
    let setData = getData2.value;
    for (let p = 0; p < this.allpoplist.length; p++) {
      if (this.allpoplist[p].flag) {
        this.selectedpopdata.push({
          flag: this.allpoplist[p].flag,
          brandname: this.allpoplist[p].brandname,
          minqty: this.allpoplist[p].minqty,
          abc: this.allpoplist[p].abc,
          productid: this.allpoplist[p].productid,
          ordertype: this.allpoplist[p].ordertype,
          packtype: this.allpoplist[p].packtype,
          boxqty: this.allpoplist[p].boxqty,
          stripqty: this.allpoplist[p].stripqty,
          tabqty: this.allpoplist[p].tabqty,
          boxper: this.allpoplist[p].boxper,
          stripper: this.allpoplist[p].stripper
        })
      }
    }
    let res = [];
    this.selectedpopdata.map(function (item) {
      var existItem = res.find(x => x.productid == item.productid);
      if (existItem)
        console.log("Product Exists")
      else
        res.push(item);

    });
    for (let p = 0; p < res.length; p++) {
      for (let h = 0; h < setData.length; h++) {
        console.log(setData[h].drugproductrefid + "---" + res[p].productid)
        if (res[p].productid == setData[h].drugproductrefid) {
          flag = 1;
        }
      } if (flag == 1) {
        this.notificationsComponent.addToast({ title: 'Warning MSG', msg: "Already Exists", timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
        break;
      }
      else {
        getData2.push(this.setminqtydata(
          res[p].brandname,
          "NA",
          "NA",
          res[p].productid,
          "NA",
          res[p].minqty,
          res[p].boxqty,
          res[p].stripqty,
          res[p].tabqty,
          res[p].boxper,
          res[p].abc,
          res[p].stripper,
          res[p].packtype
        ))
      }
    }
    this.getSum();
  }

  minstkdata: any;
  minstockproduct: boolean;
  getminquantity() {
    if (this.purchaseOrder.get('vendorid').value != "opt1") {
      this.purchaseOrders.getminimumqty(this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value, this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value).subscribe(data => {
        this.bindminstkdata(data);
        this.minstockproduct = true
        // this.getminqtydata(data),
      })
    } else {
      this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Distributor', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
    }
  }
  // getminqtydata(data: any) {
  //   if (data !== null || data !== undefined) {
  //     const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
  //     let setData = getData.value;
  //     getData.controls = [];
  //     let flag: number = 0;
  //     for (this.i = 0; this.i < data.length; this.i++) {
  //       for (this.j = 0; this.j < setData.length; this.j++) {
  //         if (setData[this.j].drugproductrefid == data[this.i][0]) {
  //           flag = 1;
  //         }
  //       }
  //       if (flag == 1) {
  //         this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'The ' + data[this.i][1] + ' is already exist pls change the quantity', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
  //       }
  //       else {
  //         getData.push(this.setminqtydata(
  //           data[this.i][0],
  //           data[this.i][1],
  //           data[this.i][2],
  //           data[this.i][3],
  //           data[this.i][4],
  //           data[this.i][5],
  //           data[this.i][6],
  //           data[this.i][7],
  //           data[this.i][8],
  //           data[this.i][9],
  //           data[this.i][10],
  //           data[this.i][11]
  //         ));
  //         this.purchaseOrder.get('qty').setValue('');
  //       }
  //     }
  //   }
  // }
  setminqtydata(pname: any, pdosage: any, pform: any, pid: any, lastrecqty: any, minqty: any, box: any, strip: any, tab: any, boxper: any, abc: any, stripper: any, packtype: any) {
    return this.formBuilder.group({
      pursessionno: ["NA", []],
      pursessionid: [0, []],
      drugproductrefid: [pid, []],
      itemname: [pname, []],
      dosage: [pdosage, []],
      boxquantity: [(box).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      stripquantity: [(strip).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      tabletquantity: [(tab).toFixed(this.fixedlength), Validators.pattern(textnumbers)],
      unitprice: [(0).toFixed(this.fixedlength), []],
      abc: [abc, []],
      distprodrank: ["NA", []],
      distremarks: ["NA", []],
      totalquantity: [(0).toFixed(this.qtylength), []],
      totalproductprice: ['', []],
      uom: ['1', []],
      equalto: ['1', []],
      piflag: [0, []],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1],
      reorderlvl: [(0).toFixed(this.fixedlength), []],
      consumpminqty: [(0).toFixed(this.fixedlength), []],
      minleadtime: [(0).toFixed(this.fixedlength), []],
      maxqty: [(0).toFixed(this.fixedlength), []],
      stripperbox: [(boxper).toFixed(this.fixedlength)],
      quantityperstrip: [(stripper).toFixed(this.fixedlength)],
      packagecount: [(boxper).toFixed(this.fixedlength), []],
      packageunit: [packtype]
    });
  }
  getnewquantity() {
    // const getData = <FormArray>this.purchaseOrder.controls['newproductdetails'];
    // getData.controls = [];
    if (this.purchaseOrder.get('vendorid').value != "opt1") {
      this.purchaseOrders.getnewquantity(this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value, this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value).subscribe(data => {
        this.getnewqtydata(data); this.newproduct = true;
      })
    } else {
      this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Distributor', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
      this.purchaseOrder.get('newproflag').setValue(false);
    }
  }
  newproduct: boolean = false;
  newprolist: any;

  getnewqtydata(data: any) {

    this.newprolist = [];
    for (let i = 0; i < data.length; i++) {
      this.newprolist.push({
        flag: false,
        brandname: data[i][1],
        minqty: (0).toFixed(this.fixedlength),
        abc: 'C',
        productid: data[i][0],
        ordertype: 'New Product',
        packtype: data[i][2],
        boxqty: data[i][3],
        stripqty: data[i][4],
        tabqty: data[i][5],
        boxper: data[i][6],
        stripper: data[i][7]
      })
    }
  }

  selectnewprod(indx) {
    if (this.newprolist[indx].flag) {
      this.newprolist[indx].flag = false;
    } else {
      this.newprolist[indx].flag = true;
    }
  }

  selectallnewprod(event) {
    let data = this.newprolist;
    if (event.target.checked) {
      for (let i = 0; i < data.length; i++) {
        this.newprolist[i].flag = true
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        this.newprolist[i].flag = false;
      }
    }
  }

  // getnewqtydata(data: any) {

  //   if (data !== null || data !== undefined) {
  //     this.newproduct = true;
  //     const getData = <FormArray>this.purchaseOrder.controls['newproductdetails'];
  //     //let setData = getData.value;
  //     getData.controls = [];

  //     let flag: number = 0;
  //     for (this.i = 0; this.i < data.length; this.i++) {
  //       getData.push(this.setnewqtydata(
  //         data[this.i][0],
  //         data[this.i][1],
  //         0

  //       ));
  //       this.purchaseOrder.get('qty').setValue('');
  //     }
  //     this.newprolist = getData.value;
  //   }
  // }
  // setnewqtydata(proid: any, newproname: any, qty: any) {
  //   return this.formBuilder.group({
  //     productid: [proid],
  //     newproductname: [newproname],
  //     reqqty: [qty],
  //     remarks: [''],
  //     // gridcolor: [gridcolor],
  //     checkflag: [false],
  //     companyrefid: [AppComponent.companyID],
  //     branchrefid: [AppComponent.branchID],
  //     locname: [AppComponent.locRefName1],
  //     locrefid: [AppComponent.locrefID1]
  //   })
  // }
  Insertnewproduct() {
    this.qtype = 1;
    const getData2 = <FormArray>this.purchaseOrder.controls['brandDetails'];
    for (let p = 0; p < this.newprolist.length; p++) {
      if (this.newprolist[p].flag) {
        getData2.push(this.setminqtydata(
          this.newprolist[p].brandname,
          "NA",
          "NA",
          this.newprolist[p].productid,
          "NA",
          this.newprolist[p].minqty,
          this.newprolist[p].boxqty,
          this.newprolist[p].stripqty,
          this.newprolist[p].tabqty,
          this.newprolist[p].boxper,
          this.newprolist[p].abc,
          this.newprolist[p].stripper,
          this.newprolist[p].packtype
        ))
      }
    }
    //  if(!(setData.checkflag).length){
    //   this.notificationsComponent.addToast({ title: 'Warning MSG', msg:"Select Product", timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
    // }
    this.getSum();
  }
  // saveenable: number = 0;
  // insertnewrow() {
  //   let length: any = 4;
  //   const getData = <FormArray>this.purchaseOrder.controls['newproductdetails'];
  //   for (let p = 0; p < length; p++) {
  //     getData.push(
  //       this.setnewqtydata(
  //         null, null, null
  //       ));
  //   }
  //   this.saveenable = 1;
  // }
  // removenewprodrow(indexid) {
  //   const control = <FormArray>this.purchaseOrder.controls['newproductdetails'];
  //   control.removeAt(indexid);
  // }
  // selnewprod = [];
  // saveNewProduct() {
  //   this.selnewprod = [];
  //   const control = <FormArray>this.purchaseOrder.controls['newproductdetails'];
  //   const saveData = control.value;
  //   for (let i = 0; i < saveData.length; i++) {
  //     // if (saveData[i].checkflag == true) {
  //     //   this.selnewprod.push({
  //     //     productid: saveData[i].productid,
  //     //     newproductname: saveData[i].newproductname,
  //     //     reqqty: saveData[i].reqqty,
  //     //     remarks: saveData[i].remarks,
  //     //     gridcolor: saveData[i].gridcolor,
  //     //     companyrefid: AppComponent.companyID,
  //     //     branchrefid: AppComponent.branchID,
  //     //     locname: AppComponent.locRefName1,
  //     //     locrefid: AppComponent.locrefID1
  //     //   })
  //     // }
  //     if (saveData[i].checkflag == true) {
  //       this.selnewprod.push({
  //         id: saveData[i].productid,
  //         brandname: saveData[i].newproductname,
  //         reqqty: saveData[i].reqqty,
  //         remarks: saveData[i].remarks,
  //         drugstatus: 1,
  //         // gridcolor: saveData[i].gridcolor,
  //         companyid: AppComponent.companyID,
  //         branchid: AppComponent.branchID,
  //         locname: AppComponent.locRefName1,
  //         locrefid: AppComponent.locrefID1
  //       })
  //     }
  //   }
  //   //let getproductdetails = { locname: this.selobj.locname, locrefid: this.selobj.locrefid, productid: this.drugidcopy, batchid: this.batchidcopy };
  //   this.purchaseOrders.saveNewProduct(JSON.stringify(this.selnewprod)).subscribe(data => {
  //     if (data[0].id > 0) {
  //       this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Product Saved Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
  //       this.newproduct = false;
  //     }
  //   },
  //     error => {
  //       this.notificationsComponent.addToast({ title: 'Error MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
  //     });
  // }


  // selectallprod(event) {
  //   const getData = <FormArray>this.purchaseOrder.controls['newproductdetails']
  //   if (event.target.checked) {
  //     for (let i = 0; i <= getData.length; i++) {
  //       getData.value[i].checkflag = true;
  //       getData.patchValue(getData.value);

  //     }
  //   } else {
  //     for (let i = 0; i <= getData.length; i++) {
  //       getData.value[i].checkflag = false;
  //       getData.patchValue(getData.value);
  //     }
  //   }
  // }

  bindminstkdata(data) {
    //this.refilldata[this.refilldata.map((x, i) => [i, x]).filter(x => x.flag == false)[0][0]] = true;
    this.minstkdata = [];
    for (let i = 0; i < data.length; i++) {
      this.minstkdata.push({
        flag: false,
        brandname: data[i][0],
        minqty: parseFloat(data[i][5]).toFixed(this.fixedlength),
        abc: data[i][10],
        productid: data[i][3],
        ordertype: 'Minimum Stock',
        packtype: data[i][13],
        boxqty: data[i][14],
        stripqty: data[i][15],
        tabqty: data[i][16],
        boxper: data[i][17],
        stripper: data[i][18]
      })
    }
  }

  selectminstk(indx) {
    if (this.minstkdata[indx].flag) {
      this.minstkdata[indx].flag = false;
    } else {
      this.minstkdata[indx].flag = true;
    }
  }

  selectallminstk(event) {
    let data = this.minstkdata;
    if (event.target.checked) {
      for (let i = 0; i < data.length; i++) {
        this.minstkdata[i].flag = true
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        this.minstkdata[i].flag = false;
      }
    }
  }


  getMinStockid() {
    this.qtype = 1;
    for (let p = 0; p < this.minstkdata.length; p++) {
      if (this.minstkdata[p].flag) {
        this.purchaseOrders.getDrugsData(this.minstkdata[p].productid, this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value,
          this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value, this.purchaseOrder.get('vendorid').value).subscribe(data => {
            this.purchaseOrder.get('qty').setValue(this.minstkdata[p].minqty);
            this.purchaseOrder.get('boxqty').setValue(this.minstkdata[p].boxqty);
            this.purchaseOrder.get('stripqty').setValue(this.minstkdata[p].stripqty);
            this.purchaseOrder.get('tabqty').setValue(this.minstkdata[p].tabqty);
            this.purchaseOrder.get('boxperstrip').setValue(this.minstkdata[p].boxper);
            this.purchaseOrder.get('strippertablet').setValue(this.minstkdata[p].stripper);
            this.purchaseOrder.get('packageunit').setValue(this.minstkdata[p].packtype);
            this.quantitycalculation();
            this.getDrugData(data)
          },
            err => {
              console.log('Error Occured Get States');
            });

      }
    }
  }

  selectzerostk(indx) {
    if (this.zerostkdata[indx].flag) {
      this.zerostkdata[indx].flag = false;
    } else {
      this.zerostkdata[indx].flag = true;
    }
  }

  selectallzerostk(event) {
    let data = this.zerostkdata;
    if (event.target.checked) {
      for (let i = 0; i < data.length; i++) {
        this.zerostkdata[i].flag = true
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        this.zerostkdata[i].flag = false;
      }
    }
  }

  zerostkdata: any;
  zerostockproduct: boolean;
  getzeroquantity() {
    if (this.purchaseOrder.get('vendorid').value != "opt1") {
      this.purchaseOrders.getzerostockqty(this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value, this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value).subscribe(data => {
        this.bindzerostkdata(data);
        this.zerostockproduct = true
        // this.getminqtydata(data),
      })
    } else {
      this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Distributor', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
    }
  }


  bindzerostkdata(data) {
    //this.refilldata[this.refilldata.map((x, i) => [i, x]).filter(x => x.flag == false)[0][0]] = true;
    this.zerostkdata = [];
    for (let i = 0; i < data.length; i++) {
      this.zerostkdata.push({
        flag: false,
        brandname: data[i][0],
        minqty: parseFloat(data[i][3]).toFixed(this.fixedlength),
        abc: data[i][2],
        productid: data[i][1],
        ordertype: 'Zero Stock',
        packtype: data[i][6],
        boxqty: data[i][7],
        stripqty: data[i][8],
        tabqty: data[i][9],
        boxper: data[i][10],
        stripper: data[i][11]
      })
    }
  }
  getZeroStockid() {
    this.qtype = 1;
    for (let p = 0; p < this.zerostkdata.length; p++) {
      if (this.zerostkdata[p].flag) {
        this.purchaseOrders.getDrugsData(this.zerostkdata[p].productid, this.purchaseOrder.get('companyrefid').value, this.purchaseOrder.get('branchrefid').value,
          this.purchaseOrder.get('locname').value, this.purchaseOrder.get('locrefid').value, this.purchaseOrder.get('vendorid').value).subscribe(data => {
            this.purchaseOrder.get('tabqty').setValue(this.zerostkdata[p].tabqty);
            this.purchaseOrder.get('boxperstrip').setValue(this.zerostkdata[p].boxper);
            this.purchaseOrder.get('strippertablet').setValue(this.zerostkdata[p].stripper);
            this.purchaseOrder.get('boxqty').setValue(this.zerostkdata[p].boxqty);
            this.purchaseOrder.get('stripqty').setValue(this.zerostkdata[p].stripqty);
            this.purchaseOrder.get('packageunit').setValue(this.zerostkdata[p].packtype);
            // this.purchaseOrder.get('tabqty').setValue(0);
            this.quantitycalculation();
            this.getDrugData(data)
          },
            err => {
              console.log('Error Occured Get States');
            });
      }
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
    if (this.purchaseOrder.get('boxqty').value == 0 || this.purchaseOrder.get('boxqty').value == null) {
      this.purchaseOrder.get('stripqty').setValue(this.purchaseOrder.get('boxperstrip').value);
      this.purchaseOrder.get('boxqty').setValue(0);
      //  this.purchaseOrder.get('strippertablet').setValue(this.purchaseOrder.get('boxperstrip').value);
    }

    if (this.purchaseOrder.get('boxperstrip').value == 0 || this.purchaseOrder.get('strippertablet').value == 0) {
      this.purchaseOrder.get('tabqty').setValue(this.purchaseOrder.get('strippertablet').value);
    }

    // if(this.purchaseOrder.get('strippertablet').value != 0){
    //   //this.purchaseOrder.get('boxqty').setValue(1);
    //   this.purchaseOrder.get('tabqty').setValue(this.purchaseOrder.get('strippertablet').value);
    // }

    if (this.purchaseOrder.get('strippertablet').value == 0) {
      this.purchaseOrder.get('strippertablet').setValue(1);
    }



    if (this.purchaseOrder.get('boxperstrip').value == 0 && this.purchaseOrder.get('strippertablet').value == 0) {
      this.purchaseOrder.get('qty').setValue(parseFloat(this.purchaseOrder.get('tabqty').value).toFixed(3));
    }
    else {
      this.boxperstrip = this.purchaseOrder.get('boxperstrip').value;
      this.strippertablet = this.purchaseOrder.get('strippertablet').value;
      this.boxqty = this.purchaseOrder.get('boxqty').value;
      this.stripqty = this.purchaseOrder.get('stripqty').value;
      this.tabletqty = this.purchaseOrder.get('tabqty').value;


      if (this.boxperstrip == '' || this.boxperstrip == NaN || this.boxperstrip == null) {
        this.boxperstrip = 0;
        this.purchaseOrder.get('boxperstrip').setValue('0');
      }
      if (this.strippertablet == '' || this.strippertablet == NaN || this.strippertablet == null) {
        this.strippertablet = 0;
        this.purchaseOrder.get('strippertablet').setValue('0');
      }
      if (this.boxqty == '' || this.boxqty == NaN || this.boxqty == null) {
        this.boxqty = 0;
        this.purchaseOrder.get('boxqty').setValue('0');
      }
      if (this.stripqty == '' || this.stripqty == NaN || this.stripqty == null) {
        this.stripqty = 0;
        this.purchaseOrder.get('stripqty').setValue('0');
      }
      if (this.tabletqty == '' || this.tabletqty == NaN || this.tabletqty == null) {
        this.tabletqty = 0;
        this.purchaseOrder.get('tabqty').setValue('0');
      }
      this.totBox = (parseFloat(this.boxperstrip) * parseFloat(this.boxqty)) * parseFloat(this.strippertablet);
      this.totStrip = parseFloat(this.strippertablet) * parseFloat(this.stripqty);
      this.totQty = parseFloat(this.totBox) + parseFloat(this.totStrip) + parseFloat(this.tabletqty);
      this.purchaseOrder.get('qty').setValue(parseFloat(this.totQty).toFixed(3));
    }
  }
  cardToggle: string = 'expanded';
  toggleCard() {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  qtype: number = 0;
  quantitytype(event) {

    if (event == 0) {
      const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
      let setData = getData.value
      if(getData.value.length>0){
        swal({
          type:'warning',
          text:'You cannot change type after adding products,you can try by removing products or by refreshing page',
          showConfirmButton:false,
          confirmButtonColor: '#5aa02c',
          timer:2000
        })
        $('#radio2').prop('checked', true)
      }else{
        getData.controls = [];
        this.qtype = event;
      }
     
      // alert(JSON.stringify(getData.value));
      //  setData.controls = [];
     
    }
    else {
      const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
      let setData = getData.value
      if(getData.value.length>0){
        swal({
          type:'warning',
          text:'You cannot change type after adding products,you can try by removing products or by refreshing page',
          showConfirmButton:false,
          confirmButtonColor: '#5aa02c',
          timer:2000
        })
        $('#radio1').prop('checked', true)
      }else{
        getData.controls = [];
        this.qtype = event;
      }
    }
  }

  //New Hidden Details
  hiddenfieldsflag:boolean=false;
  hiddenindexflag = [];
  hiddendefaultforms=[{hiddenlabel:'ABC Analysis'},{hiddenlabel:'Prod Rank'},{hiddenlabel:'Prod Remark'},
  {hiddenlabel:'Dosage'},{hiddenlabel:'Prod Code'}];

  addNewHiddenDetails(){
    let hiddenforms = JSON.parse(localStorage.getItem('hiddenpurchasearray'));
    if(hiddenforms==null || hiddenforms =='' || hiddenforms ==undefined || hiddenforms.length<=0){
      const control = <FormArray>this.purchaseOrder.controls['hiddenfields'];
      control.controls = [];
      for (let i = this.hiddendefaultforms.length - 1; i >= 0; i--) {
        this.hiddenindexflag[i] = false;
        control.insert(0, this.formBuilder.group({
          hiddenlabel: [this.hiddendefaultforms[i].hiddenlabel, []],
          hiddenflag: [false, []],
        }));
      }
    }else{
      const control = <FormArray>this.purchaseOrder.controls['hiddenfields'];
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
    const control = <FormArray>this.purchaseOrder.controls['hiddenfields'];
    let saveData = control.value;
    saveData[indexid].hiddenflag=!saveData[indexid].hiddenflag;
  }

  savehiddenlabels(){
    const saveData = <FormArray>this.purchaseOrder.controls['hiddenfields'];
    localStorage.setItem('hiddenpurchasearray', JSON.stringify(saveData.value));
    this.hiddenfieldsflag = false;
    this.addNewHiddenDetails();
  }



}
