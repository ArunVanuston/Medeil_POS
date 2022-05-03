import { DamagestockService } from '../damagestock.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from '../..//notifications/notifications.datepipe';
import { AppComponent } from '../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-viewdamagestockhq',
  templateUrl: './viewdamagestockhq.component.html',
  styleUrls: ['./viewdamagestockhq.component.css'],
  providers: [NotificationsComponent]
})
export class ViewdamagestockhqComponent implements OnInit {


  i;
  id;
  damagedstockForm: any;
  daid: any;
  invoiceno = [];
  tolocname = [];
  tolocrefid = [];
  characters = [];
  branddata = [];
  damagestockno = [];
  invoicedetail = [];
  submitted = false;
  Piproduct: any;
  proDetails: any;
  damagestockdate: any;
  coltax: any;
  returnValid: any;
  damtax = [];



  constructor(private damagestockService: DamagestockService, private fb: FormBuilder, private notificationsComponent: NotificationsComponent, private router: Router
    , private dateformat: dateFormatPipe, private appComponent: AppComponent, private route: ActivatedRoute) {
      this.damagedstockForm = this.fb.group({
        invoiceno: ['', []],
        productid: ['', []],
        damagestkids: ['', []],
        damagestockdate: [this.dateformat.transform05(Date.now()), []],
        invoicedate: [this.dateformat.transform05(Date.now()), []],
        distname: ['', []],
        vendorid: ['0', []],
        contactno: ['0', []],
        totalamount: ['', []],
        remarks: ['', []],
        packing: ['0', []],
        damagestockno: ['', []],
        companyrefid: ['', []],
        branchrefid: ['', []],
        locname: ['', []],
        locrefid: ['', []],
        createdby: ['', []],
        clientcdate: ['', []],
        fromlocname: ['', []],
        fromlocrefid: ['', []],
        tolocname: ['0', []],
        tolocrefid: ['0', []],
        proDetails: this.fb.array([
        ]),
      });
   
  }


  ngOnInit() {


   

    
    this.daid = this.route.snapshot.paramMap.get('id');

    if (AppComponent.shopID != 0) {
      /*Get Tax inclusive Or Exclusive*/
      this.damagestockService.getshopDamagetax(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID).subscribe(data => this.damtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.damagestockService.getshopTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID).subscribe(data =>{
        this.coltax = data;
        if (data[0] == 0) {
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colvathide").show();
          $('.colvathide').show();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }

    if (AppComponent.hospitalID != 0) {
      /*Get Tax inclusive Or Exclusive*/
      this.damagestockService.gethospitalDamagetax(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID).subscribe(data => this.damtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.damagestockService.gethospitalTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID).subscribe(data =>{
        this.coltax = data;
        if (data[0] == 0) {
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colvathide").show();
          $('.colvathide').show();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }

    if (AppComponent.warehouseID != 0) {
      /*Get Tax inclusive Or Exclusive*/
      this.damagestockService.getwarehouseDamagetax(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID).subscribe(data => this.damtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.damagestockService.getwarehouseTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID).subscribe(data =>{
        this.coltax = data
        if (data[0] == 0) {
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colvathide").show();
          $('.colvathide').show();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }

    this.damagestockService.getviewdamage(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1, this.daid).subscribe(data => {
      this.setViewdata(data)
    },
      error => {
        console.log('Error Occured on geteviewhqdamage');
      });

    this.damagestockService.getviewdamagetable(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1, this.daid).subscribe(data => {
      this.proDetails = data;
        this.settable(this.proDetails)
    },
      error => {
        console.log('Error Occured on geteviewhqtabledamage');
      });

    this.damagestockService.getLoctype().subscribe(data => this.tolocname = data,
      err => {
        console.log('Error on getLoctype')
      });

    this.damagedstockForm.get('companyrefid').setValue(AppComponent.companyID);
    this.damagedstockForm.get('branchrefid').setValue(AppComponent.branchID);
    this.damagedstockForm.get('createdby').setValue(AppComponent.userID);
    this.damagedstockForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.damagedstockForm.get('locname').setValue(AppComponent.locRefName1);
    this.damagedstockForm.get('fromlocname').setValue(AppComponent.locRefName1);
    this.damagedstockForm.get('fromlocrefid').setValue(AppComponent.locrefID1);
    this.damagedstockForm.get('damagestkids').setValue(this.daid);

  }



  getlocrefname() {
    this.damagestockService.getlocrefid(this.damagedstockForm.get('tolocname').value).subscribe(data => this.tolocrefid = data,
      err => {
        console.log('Error on tolocrefid')
      });
  }

  setViewdata(data) {
    this.damagedstockForm.get('damagestockno').setValue(data[0][0]);
    this.damagedstockForm.get('invoiceno').setValue(data[0][1]);
    this.damagedstockForm.get('damagestockdate').setValue(data[0][2]);
    this.damagedstockForm.get('invoicedate').setValue(data[0][3]);
    this.damagedstockForm.get('distname').setValue(data[0][4]);
    this.damagedstockForm.get('contactno').setValue(data[0][5]);
    this.damagedstockForm.get('remarks').setValue(data[0][6]);
    this.damagedstockForm.get('packing').setValue(data[0][7]);
    this.damagedstockForm.get('totalamount').setValue(data[0][8]);
    this.damagedstockForm.get('vendorid').setValue(data[0][9]);
  }

  public setvatTax: boolean = false;
  public setgstTax: boolean = false;

  settable(proDetails: any) {

    if (proDetails !== null) {
      const control = <FormArray>this.damagedstockForm.controls['proDetails'];
      control.controls = [];
    }
    const control = <FormArray>this.damagedstockForm.controls['proDetails'];
    for (this.i = 0; this.i < proDetails.length; this.i++) {

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
        proDetails[this.i][17],
        proDetails[this.i][18],
        proDetails[this.i][19],
        proDetails[this.i][20],
        proDetails[this.i][21],
        proDetails[this.i][22]

      ));
    }
    this.getBoxqty();
  }




  showDAdata(brand_Name: any, batch_No: any, expiry_date: any, Tablet_Quantity: any, tabletdamage: any, Strip_Quantity: any, stripdamaged: any, box_quantity: any, boxdamaged: any, total_quantity: any, totaldamagedqty: any, Unit_Price: any,
    vattax: any, gsttax: any, sgsttax: any, cgsttax: any, igsttax: any, utgsttax: any, disc: any, subtot: any, total: any, prid: any, damageproid: any): any {

    return this.fb.group({
      productname: [brand_Name, []],
      batchno: [batch_No, []],
      expirydate: [expiry_date, []],
      qty: [total_quantity, []],
      damagedqty: [totaldamagedqty, []],
      boxqty: [box_quantity, []],
      damagedboxqty: [boxdamaged, []],
      stripqty: [Strip_Quantity, []],
      stripdamagedqty: [stripdamaged, []],
      tabqty: [Tablet_Quantity, []],
      tabdamagedqty: [tabletdamage, []],
      unitprice: [Unit_Price, []],
      subtotal: [subtot, []],
      total_amount: [total, []],
      unitvat: [vattax, []],
      unitgst: [gsttax, []],
      unitsgst: [sgsttax, []],
      unitcgst: [cgsttax, []],
      unitigst: [igsttax, []],
      unitutgst: [utgsttax, []],
      unitdiscount: [disc, []],
      stkproductrefid: [prid, []],
      dmgstkprdids: [damageproid, []]
    });

  }


  damageDatavalidation(): boolean {
    const getData = <FormArray>this.damagedstockForm.controls['proDetails'];
    let setData = getData.value;
    for(this.j = 0; this.j < setData.length; this.j++) {

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
    this.damagestockService.getSBQuantity(id).subscribe(data => { this.sbQuantity = data }, 
      
      error => {
      console.log("Error Occured on getSBQuantity" +error);
    })
     
  }
  j;
  sbQuantity = [];
  getBoxqty() {
    this.returnValid = this.damageDatavalidation();
    if (this.returnValid) {

      var txtproduct: any = 0;
      const getData = <FormArray>this.damagedstockForm.controls['proDetails'];
      let setData = getData.value;
      let Stripperbox: any = 0;
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
        this.getSBQuantity(setData[this.j].stkproductrefid);
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

        setData[this.j].damagedqty = txttabletquantity + txtstripquantity + txtboxquantity;
        setData[this.j].subtotal = (txttabletquantity + txtstripquantity + txtboxquantity) * txtunitprice;
        txtdiscountamt = (txtdiscount * txtunitprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;


        if (this.coltax[0] == 0) {

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
      this.ngOnInit();
    }
  }


  onSubmit() {
    this.returnValid = this.damageDatavalidation();
    if (this.returnValid == true) {
      this.appComponent.ngOnInit();
      this.damagedstockForm.get('clientcdate').setValue(AppComponent.date);
      this.notificationsComponent.addToast({ title: 'Sucess Message', msg: ' Destroyed Sucessfully....', timeout: 5000, theme: 'default', position: 'top-right', type: 'sucess' });
      this.damagedstockForm.reset();
      this.router.navigate(['/DamageStock/DamageStock']);
    }
    else {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Damage Data is Invalid....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  }

}

