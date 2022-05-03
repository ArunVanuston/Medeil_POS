import { DamagestockService } from '../damagestock.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from '../..//notifications/notifications.datepipe';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { addinvoiceService } from 'app/purchaseInvoice/addPurchaseinvoice/addPurchaseinvoice.services';
import swal from 'sweetalert2'; 
import { TranslateService } from 'ng2-translate';  


@Component({
  selector: 'app-adddamagestock',
  templateUrl: './adddamagestock.component.html',
  styleUrls: ['./adddamagestock.component.css'],
  providers: [NotificationsComponent, addinvoiceService, DamagestockService]
})
export class AdddamagestockComponent implements OnInit {

  i;
  damagedstockForm: any;
  invoiceno = [];
  tolocname = [];
  tolocrefid = [];
  branddata = [];
  damagestockno = [];
  characters = [];
  invoicedetail = [];
  submitted = false;
  purchase: any;
  purchaseinvoice: any;
  Piproduct: any;
  proDetails: any;
  damagestockdate: any;
  coltax: any;
  returnValid: any;
  damtax = [];
  sbQuantity = [];
  x;
  deviceObj: any;
  dqty: any;
  taxid: number;
  taxgstid: number = 1;
  unionstate = [20934, 20936, 20940, 20948, 21773, 21775, 21776]
  damstk: boolean;
  deststatus: number=2;
  extclm=[{},{},{},{},{}];
  rdata: any;
 


  constructor(public translate: TranslateService,private damagestockService: DamagestockService, private fb: FormBuilder, private notificationsComponent: NotificationsComponent
    , private dateformat: dateFormatPipe, private appComponent: AppComponent, private router: Router, private purchinvoiceser: addinvoiceService) { translate.setDefaultLang('en');

    


  }


  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.damagedstockForm = this.fb.group({
      invoiceno: ['opt1', []],
      productid: ['', []],
      damagestockdate: [this.dateformat.transform05(Date.now()), []],
      invoicedate: [this.dateformat.transform05(Date.now()), []],
      distname: ['', []],
      vendorid: ['', []],
      contactno: ['', []],
      dlno: ['', []],
      totalamount: [0.00, []],
      remarks: ['', []],
      packing: ['0', []],
      damagestockno: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      createdby: [sessionStorage.getItem('indvusreid'), []],
      clientcdate: ['', []],
      fromlocname: ['', []],
      fromlocrefid: ['', []],
      tolocname: ['0', []],
      tolocrefid: ['0', []],
      proDetails: this.fb.array([
      ]),
    });
   
    this.damagestockService.getInvoice(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data =>{
        this.invoiceno = data
      },err => {console.log('Error on getInvoice')});
    
    this.damagestockService.getDamageautono(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
      this.damagedstockForm.get('damagestockno').setValue(data.toString())
    },
      err => {
        console.log('Error on Auto Increment Number')
    });
    //Tax Settings Raja
    setTimeout(() => {
      this.purchinvoiceser.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => {
        this.taxid = data[0][0]});
    }, 1200);
   
    }

  getPurchaseinvoice() {
    this.damagestockService.getpurchaseinvoice(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1, this.damagedstockForm.get('invoiceno').value).subscribe(data => {
      this.invoicedetail = data;
        this.setdam(this.invoicedetail)
    },
      err => {
        console.log('Error Occured Get invoiceno');
      });
    this.getPiproduct()
  }



  getPiproduct() {
    this.damagestockService.getpiproduct(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1, this.damagedstockForm.get('invoiceno').value).subscribe(data => {
      this.proDetails = data;
        this.settable(data)
    },
      err => {
        console.log('Error Occured Get Invoice');
      });
  }

  setdam(invoicedetail) {
    this.damagedstockForm.get('invoicedate').setValue(invoicedetail[0][1]);
    this.damagedstockForm.get('distname').setValue(invoicedetail[0][2]);
    if (invoicedetail[0][3] == '' || invoicedetail[0][3] == null) {
      this.damagedstockForm.get('contactno').setValue("0");
    } else {
      this.damagedstockForm.get('contactno').setValue(invoicedetail[0][3]);
    }
    this.damagedstockForm.get('vendorid').setValue(invoicedetail[0][5]);
  }

  getProduct(val: string) {
    this.damagestockService.getProductlist(val, AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
      this.characters = [];
      for (let i = 0; i < data.length; i++) {
        this.characters.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }

  getProvalues() {
   
    let pid: any = this.damagedstockForm.get('productid').value;
    if (pid == '' || pid == null) { 
      this.notificationsComponent.addToast({ title: 'Alert', msg: 'Product List Empty!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
    else {
      this.damagestockService.getBrandlist(pid, AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => { this.settableValue(data); this.branddata = data },
        error => {
          console.log('Error occured On getProvalues');
        });
    }
  }


  public setvatTax: boolean = false;
  public setgstTax: boolean = false;
  public setdiscount: boolean = false;


  settable(proDetails: any) {
    const control = <FormArray>this.damagedstockForm.controls['proDetails'];
    control.controls=[];
    if (this.taxid == 2) {
      for (this.i = 0; this.i < this.unionstate.length; this.i++) {
        if (this.invoicedetail[0][7] == this.unionstate[this.i]) {
          //  this.taxid=0;
          this.taxid = 2;
          this.taxgstid = 2;
          break;
        } else {
          this.taxid = 2;
          this.taxgstid = 1;
        }
      }
    }

    for (this.i = 0; this.i < proDetails.length; this.i++) {
      control.push(this.showDAdata(
        proDetails[this.i][0],
        proDetails[this.i][1],
        proDetails[this.i][2],
        proDetails[this.i][3],
        proDetails[this.i][4],
        proDetails[this.i][5],
        proDetails[this.i][6],
        proDetails[this.i][7],
        proDetails[this.i][8],
        proDetails[this.i][9],
        proDetails[this.i][10],
        proDetails[this.i][11],
        proDetails[this.i][12],
        proDetails[this.i][13],
        proDetails[this.i][14],
        proDetails[this.i][15],
        proDetails[this.i][16],
      ));
    }
  }




  showDAdata(brand_Name: any, batch_No: any, expiry_date: any, total_quantity: any, box_quantity: any, Strip_Quantity: any, Tablet_Quantity: any, Unit_Price: any,
    vattax: any, gsttax: any, sgsttax: any, cgsttax: any, igsttax: any, utgsttax: any, disc: any, prid: any, batchmumber: any): any {
    return this.fb.group({
      productname: [brand_Name, []],
      batchno: [batch_No, []],
      batchnumber: [batchmumber, []],
      expirydate: [expiry_date, []],
      qty: [Tablet_Quantity, []],
      damagedqty: ['', []],
      boxqty: [box_quantity, []],
      damagedboxqty: ['0', []],
      stripqty: [Strip_Quantity, []],
      stripdamagedqty: ['0', []],
      tabqty: [total_quantity, []],
      tabdamagedqty: ['0', []],
      unitprice: [Unit_Price, []],
      subtotal: ['', []],
      total_amount: ['', []],
      unitvat: [vattax, []],
      unitgst: [gsttax, []],
      unitsgst: [sgsttax, []],
      unitcgst: [cgsttax, []],
      unitigst: [igsttax, []],
      unitutgst: [utgsttax, []],
      unitdiscount: [disc, []],
      stkproductrefid: [prid, []],
      companyrefid: [parseInt(AppComponent.companyID), []],
      branchrefid: [parseInt(AppComponent.branchID), []],
      locname: [parseInt(AppComponent.locRefName1), []],
      locrefid: [parseInt(AppComponent.locrefID1), []],
      damagedestroystatus:['2',[]],
    });

  }

  qtyvalidate(){
    const control = <FormArray>this.damagedstockForm.controls['proDetails'];
    var invoicedata = control.value;
    //this.dqty = this.damagedstockForm.get('tabdamagedqty').value;
    //this.damagedstockForm.get('damagedqty').setValue(this.dqty);
    for (this.i = 0; this.i < invoicedata.length; this.i++) {
    if (parseInt(invoicedata[this.i].tabdamagedqty) > parseInt(invoicedata[this.i].qty)) {
      this.notificationsComponent.addToast({ title: 'Alert', msg: 'Damage Qty > Available Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      invoicedata[this.i].tabdamagedqty='';
    }else{
      invoicedata[this.i].damagedqty=parseFloat(invoicedata[this.i].tabdamagedqty);
    }
    }
    control.patchValue(invoicedata);
  }

  settableValue(proDetails: any) {
    if (proDetails !== undefined || proDetails !== null) {
      let flag: number = 0;
      const control = <FormArray>this.damagedstockForm.controls['proDetails'];
      let setData = control.value;
      control.controls = [];
      // const control = <FormArray>this.damagedstockForm.controls['proDetails'];
      for ( this.i = 0; this.i < proDetails.length; this.i++) {
      
        // for (let x = 0; x <= setData.length; x++) {
     
        //   if (proDetails[this.i][14] == setData[x]) {
        //     flag = 1;
        //   }
        // }
   
        // if (flag == 1) {
        //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + proDetails[this.i][0].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        // }
        // else {

        // }
          control.push(this.showDA(
            proDetails[this.i][0],
            proDetails[this.i][1],
            proDetails[this.i][2],
            proDetails[this.i][3],
            proDetails[this.i][4],
            proDetails[this.i][5],
            proDetails[this.i][6],
            proDetails[this.i][7],
            proDetails[this.i][8],
            proDetails[this.i][9],
            proDetails[this.i][10],
            proDetails[this.i][11],
            proDetails[this.i][12],
            proDetails[this.i][13],
            proDetails[this.i][14],
            proDetails[this.i][15]
          ));
        }
      this.characters = [];
      this.damagedstockForm.get('productid').setValue("")
      //this.getBoxqty();
    }
  }

  showDA(brand_Name: any, batch_No: any, expiry_date: any, total_quantity: any, box_quantity: any, Strip_Quantity: any, Tablet_Quantity: any, Unit_Price: any,
    vattax: any, gsttax: any, sgsttax: any, cgsttax: any, igsttax: any, utgsttax: any, prid: any, batchname: any): any {
    return this.fb.group({
      productname: [brand_Name, []],
      batchno: [batchname, []],
      batchnumber: [batch_No, []],
      expirydate: [expiry_date, []],
      qty: [total_quantity, []],
      damagedqty: ['', []],
      boxqty: [box_quantity, []],
      damagedboxqty: ['0', []],
      stripqty: [Strip_Quantity, []],
      stripdamagedqty: ['0', []],
      tabqty: [Tablet_Quantity, []],
      tabdamagedqty: ['0', []],
      unitprice: [Unit_Price, []],
      subtotal: [, []],
      total_amount: [, []],
      unitvat: [vattax, []],
      unitgst: [gsttax, []],
      unitsgst: [sgsttax, []],
      unitcgst: [cgsttax, []],
      unitigst: [igsttax, []],
      unitutgst: [utgsttax, []],
      stkproductrefid: [prid, []],
      unitdiscount: ['0', []],
      damagedestroystatus:['2',[]],
      companyrefid: [parseInt(AppComponent.companyID), []],
      branchrefid: [parseInt(AppComponent.branchID), []],
      locname: [parseInt(AppComponent.locRefName1), []],
      locrefid: [parseInt(AppComponent.locrefID1), []],
    });
  }




  damageDatavalidation(): Boolean {


    // let location: any = this.damagedstockForm.get('locrefid').value;
    // let tolocationref: any = this.damagedstockForm.get('tolocrefid').value;
    let inv: any = this.damagedstockForm.get('invoiceno').value;
    let prod: any = this.damagedstockForm.get('productid').value;
    let amttt: any = this.damagedstockForm.get('totalamount').value;


    // if (tolocationref == location) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Cannot Transfer Medicine From Same Location.....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }

    if (inv == null && prod == '' || prod == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (amttt == '' || amttt == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Add Damaged Qty...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    const getData = <FormArray>this.damagedstockForm.controls['proDetails'];
    let setData = getData.value;
    for (this.j = 0; this.j < setData.length; this.j++) {

      if (setData[this.j].qty < setData[this.j].damagedqty) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Entered Damaged Quantity Is Higher Than Purchased QTY .....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
      else {

      }
      return true;
    }
  }

  getSBQuantity(id: number) {
    this.damagestockService.getSBQuantity(id).subscribe(data => { this.getBoxqty(data) },
    error => {
      console.log("Error Occured on getSBQuantity");
    });
  
  }
  j;

  calculation() {

    const getData = <FormArray>this.damagedstockForm.controls['proDetails'];
    let setData = getData.value;
    for (this.j = 0; this.j < setData.length; this.j++) {
      this.getSBQuantity(setData[this.j].stkproductrefid);
    }
  }

  getBoxqty(data: any) {
    this.sbQuantity = data
    this.returnValid = true;
    if (this.returnValid == true) {
      var txtproduct: any = 0;
      const getData = <FormArray>this.damagedstockForm.controls['proDetails'];
      let setData = getData.value;
      let Stripperbox: any = 0;
      let id: number;
      let Quantityperstrip: any = 0;
      let txtboxquantity: any = 0;
      let txtstripquantity: any = 0;
      let txttabletquantity: any = 0;
      let txtunitprice: any = 0;
      let txtsgst: any = 0;
      let txtcgst: any = 0;
      let txtigst: any = 0;
      let txtutgst: any = 0;
      let txtgst: any = 0;
      let txtvat: any = 0;
      let txtgstamt: any = 0;
      let txtvatamt: any = 0;
      let txtdiscount: any = 0;
      let txtdiscountamt: any = 0;
      let totalAmount: any = 0;
      let subTotal: any = 0;
      let totalDiscount: any = 0;
      let totalGst: any = 0;
      let taxableAmt: any = 0;
      let damageTax: any = this.damtax;
      let dummy: any = 0;

      for (this.j = 0; this.j < setData.length; this.j++) {
        Stripperbox = this.sbQuantity[0][0];
        Quantityperstrip = this.sbQuantity[0][1];

        if (parseInt(setData.length) !== null) {
          txtproduct = parseInt(setData.length);
        }

        /* Tablet Quantity */
        if (setData[this.j].tabdamagedqty == '' || parseFloat(setData[this.j].tabdamagedqty) == null) {
          setData[this.j].tabdamagedqty = 0;
          txttabletquantity = 0;
        }
        else {
          txttabletquantity = parseFloat(setData[this.j].tabdamagedqty);
        }
        /* Strip Quantity */
        if (setData[this.j].stripdamagedqty == '' || parseFloat(setData[this.j].stripdamagedqty) == null) {
          setData[this.j].stripdamagedqty = 0;
          txtstripquantity = 0;
        }
        else {
          txtstripquantity = parseFloat(setData[this.j].stripdamagedqty) * Quantityperstrip;
        }
        /* Box Quantity */
        if (setData[this.j].damagedboxqty == '' || parseFloat(setData[this.j].damagedboxqty) == null) {
          setData[this.j].damagedboxqty = 0;
          txtboxquantity = 0;
        }
        else {
          txtboxquantity = parseFloat(setData[this.j].damagedboxqty) * Stripperbox * Quantityperstrip;
        }
        txtunitprice = parseFloat(setData[this.j].unitprice);

        /* GST Calculation  */
        if (setData[this.j].unitsgst == '' || setData[this.j].unitsgst == null) {
          setData[this.j].unitsgst = 0;
          txtsgst = 0;
        }
        else {
          txtsgst = parseFloat(setData[this.j].unitsgst);
        }

        if (setData[this.j].unitcgst == '' || setData[this.j].unitcgst == null) {
          setData[this.j].unitcgst = 0;
          txtcgst = 0;
        }
        else {
          txtcgst = parseFloat(setData[this.j].unitcgst);
        }

        if (setData[this.j].unitigst == '' || setData[this.j].unitigst == null) {
          setData[this.j].unitigst = 0;
          txtigst = 0;
        }
        else {
          txtigst = parseFloat(setData[this.j].unitigst);
        }


        if (setData[this.j].unitutgst == '' || setData[this.j].unitutgst == null) {
          setData[this.j].unitutgst = 0;
          txtutgst = 0;
        }
        else {
          txtutgst = parseFloat(setData[this.j].unitutgst);
        }

        if (setData[this.j].unitgst == '' || setData[this.j].unitgst == null) {
          setData[this.j].unitgst = 0;
          txtgst = 0;
        }
        else {
          txtgst = parseFloat(setData[this.j].unitgst);
        }
        /* VAT Calculation */
        if (setData[this.j].unitvat == '' || setData[this.j].unitvat == null) {
          setData[this.j].unitvat = 0;
          txtvat = 0;
        }
        else {
          txtvat = parseFloat(setData[this.j].unitvat);
        }
        /* DISC Calculation */
        if (setData[this.j].unitdiscount == '' || parseFloat(setData[this.j].unitdiscount) == null) {
          setData[this.j].unitdiscount = 0;
          txtdiscount = 0;
        }
        else {
          txtdiscount = parseFloat(setData[this.j].unitdiscount);
        }

        setData[this.j].damagedqty = parseFloat(txttabletquantity + txtstripquantity + txtboxquantity);
        setData[this.j].subtotal = (txttabletquantity + txtstripquantity + txtboxquantity) * txtunitprice;
        txtdiscountamt = (txtdiscount * txtunitprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;


        if (this.taxid==0) {

          txtvatamt = (txtvat * txtunitprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;

          if (damageTax == '0') {
            taxableAmt = ((txtunitprice * (txttabletquantity + txtstripquantity + txtboxquantity)) - txtdiscount * 100) / 100 + txtvatamt;
            setData[this.j].total_amount = setData[this.j].subtotal - txtdiscountamt;
          }
          else {
            taxableAmt = (txtunitprice * (txttabletquantity + txtstripquantity + txtboxquantity)) - txtdiscount;
            setData[this.j].total_amount = (setData[this.j].subtotal - txtdiscountamt) + txtvatamt;
          }
        }
        else {
          txtgstamt = (txtgst * txtunitprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;

          if (damageTax == '0') {
            taxableAmt = ((txtunitprice * (txttabletquantity + txtstripquantity + txtboxquantity)) - txtdiscount * 100) / 100 + txtgstamt;
            setData[this.j].total_amount = setData[this.j].subtotal - txtdiscountamt;
          }
          else {
            taxableAmt = (txtunitprice * (txttabletquantity + txtstripquantity + txtboxquantity)) - txtdiscount;
            setData[this.j].total_amount = (setData[this.j].subtotal - txtdiscountamt) + txtgstamt;
          }
        }

        subTotal += setData[this.j].total_amount;
        totalDiscount += txtdiscountamt;
        totalGst += txtgstamt;
        totalAmount = subTotal;


        this.damagedstockForm.get('totalamount').setValue(totalAmount.toFixed(2));
       
      }
      getData.patchValue(setData);
    }
    else {

      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data is Invalid....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }


  removeRow(index: number) {
      const getData = <FormArray>this.damagedstockForm.controls['proDetails'];
      getData.removeAt(index);
      let removeVal = getData.value;
      if (removeVal == null || removeVal == '') {
       this.damagedstockForm.reset();
    }
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  saveprocess:boolean=false;
  onSubmit() {
    this.returnValid = this.damageDatavalidation();

    if (this.returnValid == true) {
      this.damagedstockForm.get('clientcdate').setValue(AppComponent.date);
      this.saveprocess = true;
      this.damagestockService.saveDamage(JSON.stringify(this.damagedstockForm.value)).subscribe(
        (result: any) => {
          let res = result.res;

          if (res == true) {
            const saveData = this.damagedstockForm.controls['proDetails'];

            this.damagestockService.saveProducts(JSON.stringify(saveData.value)).subscribe(
              (data: any) => {
                let res = data.res;
            
                if (res == true) {
                  this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                  this.saveprocess = false;
                  saveData.controls = [];
                  this.damagedstockForm.clearFormArray();
                  this.ngOnInit();

                }
                else {

                  this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Damage Table Products Not Saved....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }
              });

          }

          else {

            this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Damage Data Not Saved....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }

        }, (error: any) => {
          console.log(error['Errors getdamage()']);
        }
      );
    }

   

  }

  destroy(){
    let destprod = this.damagedstockForm.controls['proDetails'];
    this.damagestockService.updatedest(JSON.stringify(destprod.value)).subscribe(data => {
      alert("res:"+data)
      if(data){
        this.notificationsComponent.addToast({ title: 'Success', msg: 'Product Destroyed Successfully ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        destprod.controls = [];
        //this.damagedstockForm.clearFormArray();
        //this.ngOnInit();
      }
      else{
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Product Not Destroy....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }) 
  }


  openConfirmsSwal() {
    this.damstk = this.damvalidation();
    // alert(this.damstk)
    if(this.damstk == true) {
    swal({
      title: 'Do you want Disposal this Product?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(() => {

      this.destroy();
      //this.ngOnInit();
    }).catch(swal.noop);
  }
}
 
  damvalidation(){
    const getData = <FormArray>this.damagedstockForm.controls['proDetails'];
    let setData = getData.value;

    for(let i =0 ; i<setData.length;i++){

    if (setData[i].tabdamagedqty == '' || setData[i].tabdamagedqty == null || setData[i].tabdamagedqty == 0 ) {

      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Enter Damage qty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
   
 
    return true;
  }
  }
}