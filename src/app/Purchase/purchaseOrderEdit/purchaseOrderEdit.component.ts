import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { purchaseOrderEditService } from './purchaseOrderEdit.services';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { DxDataGridComponent } from "devextreme-angular";
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { cardToggle } from 'app/shared/card/card-animation';
import { TranslateService } from 'ng2-translate'; 
@Component({
  selector: 'Purchase Order',
  templateUrl: './purchaseOrderEdit.component.html',
  styleUrls: ['./purchaseOrderEdit.component.css'],
  animations: [cardToggle],
  providers: [purchaseOrderEditService, NotificationsComponent]
})
export class purchaseOrderEditComponent implements OnInit {
  parentMessage="sales";
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  private purchaseNo: any;
  purchaseOrder: any;
  id: any;
  characters = [];
  drugid:any;
  companyid: number;
  branchid: number;
  submitted: false;
  distributors = [];
  unitofMsr=[];
  dataSource = [];
  drugs = [];
  drugList = [];
  dist = [];
  flags: boolean = false;
  decists: any;
  sbQuantity = [];
  itemlength = [{}, {}, {}, {}, {}]
  
  constructor(public translate: TranslateService,private purchaseOrders: purchaseOrderEditService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) {  translate.setDefaultLang('en');
    this.purchaseOrder = this.formBuilder.group({
      vendorid:['',[]],
      distributorname:['',[]],
      drug: ['',[]],
      pono: ['', []],
      podate: ['',[]],
      barcode:['',[]],
      totalproduct: ['', []],
      totalboxquantity: ['', []],
      totalstripquantity: ['', []],
      totaltabletquantity: ['', []],
      totalquantity: ['', []],
      grandtotal: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      id:['',[]],
      quantity:[0,[]],
      tabqty: [0],
      boxqty:[0],
      stripqty:[0],
      boxperstrip:[0],
      strippertablet:[1],
      quantitytype:[],
      packageunit:[],
      brandDetails: this.formBuilder.array([
      ]),
  
    });


  }
  auto: any;
  fixedlength: any;
  aboveflag: any;
  belowflag: any
  pactype: string = "Box";
  pactype1: string = "Box";
  packingevent(event) {
    this.pactype = event;
}
packingevent1(event) {
  this.pactype1 = event;
}
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.purchaseOrder.get('companyrefid').setValue(AppComponent.companyID);
    this.purchaseOrder.get('branchrefid').setValue(AppComponent.branchID);
    this.purchaseOrder.get('locname').setValue(AppComponent.locRefName1);
    this.purchaseOrder.get('locrefid').setValue(AppComponent.locrefID1);

   //this.purchaseOrder.get('distributor').setValue("opt1");
    this.purchaseOrder.get('drug').setValue("opt1");

    
      this.id = this.route.snapshot.paramMap.get('id');
       /* Decimal Status */
       this.purchaseOrders.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => 
        {
          this.decists = data
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
    
    this.purchaseOrders.editPurchseOrder(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data => {this.setDatas(data)},
      err => {
        console.log('Error Occured Get States');
      });



    this.purchaseOrders.getPurchaseOrderProductedit(AppComponent.companyID, AppComponent.branchID,  AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data => { this.getTableData(data) },
      err => {
        console.log('Error occured in Company edit ');
      });


   /* this.purchaseOrders.getDistributorEdit(this.purchaseOrder.get('distributor').value).subscribe(data => { this.distributors = data },
      err => {
        console.log('Error Occured Get States');
      });
       */
  
      /*UOM*/
      this.purchaseOrders.getuom(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>  this.unitofMsr = data )
  }
  // getDist(searchValue: string) {

  //   if (AppComponent.usertype == "\"SuperAdmin\" ") {


  //     this.purchaseOrders.getSuperDist(searchValue).subscribe(data => {
  //       this.distributors = [];
  //       for (let i = 0; i < data.length; i++) {
  //         this.distributors.push({ value: data[i][0], label: data[i][1] });
  //       }
  //     });
  //   } else {
  //     this.purchaseOrders.getDistributor(searchValue,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
  //       this.distributors = [];
  //       for (let i = 0; i < data.length; i++) {
  //         this.distributors.push({ value: data[i][0], label: data[i][1] });
  //       }
  //     });



  //   }
  // }
  getBarcodeProduct(event) {
    this.purchaseOrders.getBarcodeProduct(this.purchaseOrder.get('barcode').value).subscribe(data => {this.drugid=data}, err => {
        console.log('Error Occured Get States');
      }); 
     // this.getBarcodeDrugs();
    }    


    // getBarcodeDrugs() {
    //   this.purchaseOrders.getDrugsData(this.drugid,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.getDrugData(data) },
    //     err => {
    //       console.log('Error Occured Get States');
    //     });
    // }

  getProduct(searchValue: string) {

    if (AppComponent.usertype == "\"SuperAdmin\" ") {
    this.purchaseOrders.getSuperDrugs(searchValue).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
    }else{

      this.purchaseOrders.getDrugs(searchValue,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });

    }
  }




  setDatas(data: any) {
  
    if (data != null || data != undefined) {
        
        this.purchaseOrder.get('distributorname').setValue(data[0][0]); 
         this.purchaseOrder.get('pono').setValue(data[0][1]); 
         this.purchaseOrder.get('podate').setValue(data[0][2]); 
         this.purchaseOrder.get('totalproduct').setValue(data[0][3]); 
         this.purchaseOrder.get('totalboxquantity').setValue(data[0][4]); 
         this.purchaseOrder.get('totalstripquantity').setValue(data[0][5]); 
         this.purchaseOrder.get('totaltabletquantity').setValue(data[0][6]); 
         this.purchaseOrder.get('totalquantity').setValue(parseFloat(data[0][7]).toFixed(this.fixedlength)); 
         this.purchaseOrder.get('grandtotal').setValue(data[0][8]); 
         this.purchaseOrder.get('vendorid').setValue(data[0][9]);
         this.purchaseOrder.get('id').setValue(data[0][10]);
         this.purchaseOrder.get('quantitytype').setValue(data[0][11]); 
     
    }
  }
  /*patchData(dist: any, pono: any, podate: any, totpdt: any, totBqty: any, totSripQty: any, totTabQty: any, totQty: any) {
    alert("dist"+dist+"pono"+pono+"podate"+podate+"totpdt"+totpdt+"totBqty"+totBqty+"totStripQty"+totSripQty+"totTabQty"+totTabQty+"totQty"+totQty)
    return {
      distributor: dist,
      poautoincr: pono,
      podate: podate,
      totalproduct: totpdt,
      totalboxquantity: totBqty,
      totalstpquantity: totSripQty,
      totaltabquantity: totTabQty,
      totalquantity: totQty,
    }
  }*/


  // getDistributorProduct() {
  //   if (AppComponent.usertype == "\"SuperAdmin\" ") {
  //     this.purchaseOrders.getSuperDistributorProduct(this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTableData(data) },
  //       err => {
  //         console.log('Error Occured Get States');
  //       });
  //   }else{
  //     this.purchaseOrders.getDistributorProduct(AppComponent.companyID, AppComponent.branchID,  AppComponent.locRefName1,  AppComponent.locrefID1, this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTableData(data) },
  //     err => {
  //       console.log('Error Occured Get States');
  //     });
  //   }
  //   }
    getDrugs(){
  //    alert(""+this.purchaseOrder.get('drug').value);
  if(this.purchaseOrder.get('drug').value != "opt1"){
      this.purchaseOrders.getDrugsData(this.purchaseOrder.get('drug').value,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1,this.purchaseOrder.get('vendorid').value).subscribe(data => { this.getDrugData(data)},
        err => {
          console.log('Error Occured Get States');
        });
      }else {
        this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Please select Product', timeout: 5000, theme: 'default', position: 'center-center', type: 'warning' });
      }
    }

    i;
    j;
    inc = 0;
    packageount;
    getTableData(data: any){ 
      let flag: number = 0;
      if (data !== null || data !== undefined) {
        
        const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
        let setData = getData.value; 
        for (this.i = 0; this.i < data.length; this.i++) {
          if(data[this.i][3]==0){
            this.packageount = parseInt(data[this.i][4]); 
          }else if(data[this.i][4]==0){
            this.packageount = parseInt(data[this.i][3]); 
            // this.purchaseOrder.get('boxqty').setValue(1);
          } else {
            this.packageount = 0;
            data[this.i][3] = 1;
            data[this.i][4] = 0;
          }
          for (this.j = 0; this.j < setData.length; this.j++) {
            // alert(setData.length);
            if (data[this.i][0] == setData[this.j].drugproductrefid) {
              flag = 1;
            }
          }
          if (flag == 1) {
            
            this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: "The " + data[this.i][1] + 'is already exist pls change the quantity', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          }
          else {
            getData.push(this.setTabledata(
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
              data[this.i][23]));
           
            this.inc += 1;
          }
        }
        this.characters = [];
        this.getSum();
      }
    }

    setTabledata(itemcode: any, itemname: any, dosage: any, boxqty: any, stripqty: any,
       tabletqty: any, uom: any, equalto: any, distpice: any,totalproductprice: any, abc: any, rank: any, remarks: any,sessionid: any,Sessionno:any,poproductid: any,reorderlvl: any, consumpminqty: any, minleadtime: any, maxqty: any, stripbox: any, quantitystrip: any, totqty: any, packunit: any )
    {
      return this.formBuilder.group({
      //  ID:this.inc,
      //   id: this.inc + 1,
      id:poproductid,
      drugproductrefid: itemcode,
        itemname: itemname,
        dosage: dosage,
        boxquantity: boxqty,
        stripquantity: stripqty,
        tabletquantity: tabletqty,
        unitprice: distpice,
        totalquantity: totqty,
        totalproductprice: totalproductprice,
        abc: abc,
        distprodrank:rank,
        distremarks: remarks,
        uom: uom,
        equalto: equalto,
        remove: 'remove',
        porefid: this.id,
        pursessionid: sessionid,
        pursessionno:Sessionno,
        piflag: [0, []],
        companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      reorderlvl: [reorderlvl, []],
      consumpminqty: [consumpminqty, []],
      minleadtime: [minleadtime, []],
      maxqty: [maxqty, []],
      stripperbox: [stripbox],
      quantityperstrip: [quantitystrip],
      packagecount: [this.packageount],
      packageunit:[packunit]
      });
    }
    getDrugData(data: any){
      let flag: number = 0;
      if (data !== null || data !== undefined) {
       
        const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
        let setData = getData.value; 
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
            this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: "The " + data[this.i][1] + 'is already exist pls change the product', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          }
          else {
            getData.push(this.setDrugdata(data[this.i][0], data[this.i][1], data[this.i][2], data[this.i][3], data[this.i][5], data[this.i][6], data[this.i][7], data[this.i][8], data[this.i][9]));
            this.inc += 1;
            this.purchaseOrder.get('quantity').setValue(0);
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



    setDrugdata(pid: any, itemname: any, dosage: any,abc: any,reorderlvl: any, consumpminqty: any, minleadtime: any, maxqty: any, dprice: any)
    {
      return this.formBuilder.group({
        // ID: this.inc,
        // id: this.inc + 1,
        id:'',
        drugproductrefid: pid,
        itemname: itemname,
        dosage: dosage,
        boxquantity: parseFloat(this.purchaseOrder.get('boxqty').value).toFixed(this.fixedlength),
        stripquantity: parseFloat(this.purchaseOrder.get('stripqty').value).toFixed(this.fixedlength),
        tabletquantity: parseFloat(this.purchaseOrder.get('tabqty').value).toFixed(this.fixedlength),
        totalquantity: parseFloat(this.purchaseOrder.get('quantity').value).toFixed(this.fixedlength),
        unitprice: parseFloat(dprice).toFixed(this.fixedlength),   
        totalproductprice: '',
        abc: abc,
        distprodrank:'NA',
        distremarks: '',
        uom: 0,
        equalto: 0,
        porefid: this.id,
        piflag: [0, []],
        pursessionid: 0,
        pursessionno:'NA',
        companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      reorderlvl: [reorderlvl, []],
      consumpminqty: [consumpminqty, []],
      minleadtime: [minleadtime, []],
      maxqty: [maxqty, []],
      remove: 'remove',
      stripperbox:[parseFloat(this.purchaseOrder.get('boxperstrip').value).toFixed(this.fixedlength)],
      quantityperstrip:[parseFloat(this.purchaseOrder.get('strippertablet').value).toFixed(this.fixedlength)],
      packagecount: [this.packageount],
      packageunit: [this.purchaseOrder.get('packageunit').value]
      });
    }

    getSum() {
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
       // this.getSBQuantity(setData[this.j].drugproductrefid);
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
        if (this.purchaseOrder.get('quantitytype').value == 1) {
          setData[this.j].totalquantity = (txttabletquantity + txtstripquantity + txtboxquantity).toFixed(this.fixedlength);
          setData[this.j].totalproductprice = (parseFloat(setData[this.j].unitprice) * parseFloat(setData[this.j].packagecount)).toFixed(this.fixedlength);
        }else {
          setData[this.j].totalquantity = parseFloat(setData[this.j].boxquantity).toFixed(this.fixedlength);
          setData[this.j].totalproductprice = (parseFloat(setData[this.j].unitprice) * parseFloat(setData[this.j].totalquantity)).toFixed(this.fixedlength);
          // setData[this.j].totalquantity = parseFloat(setData[this.j].totalquantity).toFixed(this.fixedlength);
          setData[this.j].stripperbox = '1.00';
        }  
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
       totalQuantity +=  parseFloat(setData[this.j].totalquantity);
        /* To Set value from Table calculation Final Values on Input types*/
        // this.purchaseOrder.get('totalboxquantity').setValue(BoxQuantity);
        // this.purchaseOrder.get('totalstripquantity').setValue(StripQuantity);
        // alert("a5"+totalacqcost);
          this.purchaseOrder.get('grandtotal').setValue(totalacqcost.toFixed(this.fixedlength));
          this.purchaseOrder.get('totalproduct').setValue(totalproduct.toFixed(this.fixedlength));
          this.purchaseOrder.get('totalquantity').setValue(totalQuantity.toFixed(this.fixedlength));
          this.purchaseOrder.get('totaltabletquantity').setValue(TabQuantity.toFixed(this.fixedlength));
        
        //  this.purchaseOrder.get('grandtotal').setValue(totalacqcost);
        //To set Temporary Values In Bottom Input types    
      }
    }

    
  // getSBQuantity(id: number) {
  //   this.purchaseOrders.getSBQuantity(id).subscribe(data => { this.sbQuantity = data }),
  //     error => {
  //       console.log("Error Occured on getSBQuantity");
  //     }
  // }

    removeRow(index: number) {
      // alert("RemoveRow" + index);
       const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
       getData.removeAt(index);
       this.getSum();
       let removeVal = getData.value;
       if (removeVal == null || removeVal == '') {
         getData.reset();
  
       }
     }
    onSubmit() {
      this.flags = this.validation();
      if (this.flags) {
        this.updateRecord();
      }
    }


   private validation(): boolean {
    // if (this.dataSource.length==0) {
    //   this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'THERE IS NO PRDOUCT ADDED FOR PURCHASE ORDER', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
    //   return 
    
    
  //  false;
    // } 
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
  saveprocess:boolean=false;
  private updateRecord(): void {
    //  alert(JSON.stringify(this.purchaseOrder.value));
    const saveData = this.purchaseOrder.controls['brandDetails'];
    let setData = saveData.value;
    for (let p = 0; p < setData.length; p++) {
      let maxlevelqty = parseFloat(setData[p].reorderlvl) + parseFloat(setData[p].tabletquantity) - (parseFloat(setData[p].consumpminqty) * parseFloat(setData[p].minleadtime))
      setData[p].maxqty = maxlevelqty;
      saveData.patchValue(setData);
    }
    this.saveprocess = true;
    this.purchaseOrders.updatePurchaseOrder(JSON.stringify(this.purchaseOrder.value)).subscribe(
      (result: any) => {
        let re = result.res;
        //    alert(re);
        if (re) {
             //   alert(JSON.stringify(this.dataSource));
          this.purchaseOrders.updatePurchaseOrderProduct(JSON.stringify(saveData.value)).subscribe(
           (result: any) => {
            let re = result.res;
            if(re) {
              this.saveprocess = false;
              this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'DATA UPDATED SUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
              setTimeout(() => {
              this.router.navigate(['PurchaseOrder/ViewPurchaseOrder']);
            }, 2000);
            }else {
              this.saveprocess = false;
              this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'DATA Not Saved..', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
              this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Check Table Values', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });

            }
           },
            error => {
              console.log("Error createPurchaseOrderProduct");
            }

          );
        }
        
        // window.location.href = "PurchaseOrder/ViewPurchaseOrder";
      }
    );
  }

  boxperstrip:any=0;
  strippertablet:any=0;
  boxqty:any=0;
  stripqty:any=0;
  tabletqty:any=0;
  totBox:any=0;
  totStrip:any = 0;
  totQty:any = 0;
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
      this.purchaseOrder.get('quantity').setValue(parseFloat(this.purchaseOrder.get('tabqty').value).toFixed(3));
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
      this.purchaseOrder.get('quantity').setValue(parseFloat(this.totQty).toFixed(3));
    }
  }
cardToggle: string = 'expanded';
toggleCard() {
  this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
} 
}
