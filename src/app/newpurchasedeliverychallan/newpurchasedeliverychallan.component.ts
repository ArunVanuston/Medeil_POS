import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewpurchasedeliverychallanService } from './newpurchasedeliverychallan.service';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-newpurchasedeliverychallan',
  templateUrl: './newpurchasedeliverychallan.component.html',
  styleUrls: ['./newpurchasedeliverychallan.component.css'],
  providers: [NotificationsComponent, NewpurchasedeliverychallanService]
})
export class NewpurchasedeliverychallanComponent implements OnInit {
  parentMessage="sales";
  $: any;
  // deliveryForm: any;
  // @Input() searchText;
  isDesc: boolean = false;
  column;
  id: number = 1800001;
  val: string = 'PSIN';
  brandlist = [];
  branddata = [];
  returnValid: any;
  distibutor: Array<any>
  distributors = [];
  salesinvoice = [];
  distvalues = [''];
  characters = [];
  destination = [];
  purtax = [];
  localstore = [];
  firms = [];
  x;
  polist = [];
  coltax: any;
  deviceObj;




  //Raja Varibale
  dist: any;
  ponumber: any;
  NpdForm: FormGroup;
  i: any;
  j: number;
  checkedprod = [];
  flag: boolean;
  flag1: boolean;
  opt1: any;
  colmn=[{},{},{},{},{}];
  fixedlength: any;
  aboveflag: any;
  belowflag: any


  constructor(private formbuilder: FormBuilder,
    private router: Router,
    private notification: NotificationsComponent,
    private appcomponent: AppComponent,
    private npdservice: NewpurchasedeliverychallanService,
    private dateformat:dateFormatPipe,public translate: TranslateService) { 
      translate.setDefaultLang('en');
    }


  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
   
    this.NpdForm = this.formbuilder.group({

      productid: ['', []],
      pino: ['', []],
      deliverytype: ['', []],
      previouspurchaseitem: ['', []],
      totalproduct: ['', []],
      totalqty: ['', []],
      totalboxqty: ['', []],
      totaltabqty: ['', []],
      totalstripqty: ['', []],
      brandcode: ['', []],
      brandname: ['', []],
      
      totalamt: ['', []],
      taxableamount: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      clientcdate: [AppComponent.date, []],
      deliverydate: [this.dateformat.transform05(Date.now()),[]],
   
      //Raja
      poid: ['', []],
      dist_dcno: ['', []],
      dist_invno:['',[]],
      vendorid:['',[]],
      vendorname:['',[]],
      brandDetails: this.formbuilder.array([
      ]),
    });



    this.NpdForm.get('companyrefid').setValue(AppComponent.companyID);
    this.NpdForm.get('branchrefid').setValue(AppComponent.branchID);
    this.NpdForm.get('locname').setValue(AppComponent.locRefName1);
    this.NpdForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.NpdForm.get('poid').setValue('opt1');
    this.NpdForm.get('vendorid').setValue('opt2');
    this.npdservice.getDecimalsts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      if (data[0][1] == 1) {
        this.fixedlength = 3;
      } else { this.fixedlength = 2 }

      if (data[0][2] == 1) {
        this.aboveflag = 1;
      } else { this.aboveflag = 0 }

      if (data[0][3] == 1) {
        this.belowflag = 1;
      } else { this.belowflag = 0 }
      this.NpdForm.get('totalproduct').setValue((0).toFixed(this.fixedlength));
      this.NpdForm.get('totalqty').setValue((0).toFixed(this.fixedlength));
    });
    this.npdservice.getpurchaseorder(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).
      subscribe(data => { this.ponumber = data });


  }

  getdistributor() {

    this.npdservice.getdist(this.NpdForm.get('poid').value).
      subscribe(data => { this.dist = data;
      this.NpdForm.get('vendorname').setValue(data[0][1]);
      this.NpdForm.get('vendorid').setValue(data[0][0]) });
  }

  getpoproduct() {
    this.npdservice.getpoprod(this.NpdForm.get('poid').value).
      subscribe(data => {
        this.getproduct(data)
        err=> {
          console.log("Error Occur ing Getpoproduct()");
        }
      });

  }
  packageount;
  getproduct(data: any) {
    const getData = <FormArray>this.NpdForm.controls['brandDetails']
    getData.controls = [];
    if (data !== undefined || data !== null) {
      for (let i = 0; i <= data.length; i++) {
        if(data[i][3]==0){
          this.packageount = parseInt(data[i][4]); 
        }else if(data[i][4] == 0){
          this.packageount = parseInt(data[i][3]);
        }
        getData.push(this.formbuilder.group({
          prodcheck:[false,[]],
          drugproductrefid:[data[i][0],[]] ,
          productname:[data[i][1],[]],
          totalqty: [data[i][2],[]],
          stripqty: [data[i][4],[]],
          boxqty: [data[i][3],[]],
          tabqty: [data[i][5],[]],
          stripperbox: [data[i][6],[]],
          quantityperstrip: [data[i][7],[]],
          expirydate: ['', []],
          poid:[this.NpdForm.get('poid').value,[]],
          batchname: ['', []],
          companyrefid: [AppComponent.companyID, []],
          branchrefid: [AppComponent.branchID, []],
          locname: [AppComponent.locRefName1, []],
          locrefid: [AppComponent.locrefID1, []],
          clientcdate: [AppComponent.date, []],
          packagecount: [this.packageount],
          packageunit: [data[i][8]]
        }));
      }
    }
  }

  selectallprod(event){
    const getData = <FormArray>this.NpdForm.controls['brandDetails']
    if(event.target.checked){
      for (let i = 0; i <= getData.length; i++) {
        getData.value[i].prodcheck=true;
        getData.patchValue(getData.value);
        this.getSum();
      }
     
    }else{
      for (let i = 0; i <= getData.length; i++) {
        getData.value[i].prodcheck=false;
        getData.patchValue(getData.value);
      }
    }
  }
proselect:any = 0;
  selecprod(event,index){
    
    const getData = <FormArray>this.NpdForm.controls['brandDetails']
    if(event.target.checked){
      getData.value[index].prodcheck=true;
      // this.proselect = 1;
      getData.patchValue(getData.value);
      this.getSum();
    }else{
      getData.value[index].prodcheck=false;
      // this.proselect = 0;
      getData.patchValue(getData.value);
      this.getSum();
    }
  }

  saveprocess:boolean=false;
  onSubmit(){

    this.flag = this. validation();
    this.flag1 = this.tablevalidation();
    // alert(this.flag)
    if(this.flag){
      if(this.flag1){
    const dcproduct = <FormArray>this.NpdForm.controls['brandDetails'];
    let check = dcproduct.value;
    for(let i = 0 ; i < check.length ; i++){
    if(check[i].prodcheck == true){
    this.checkedprod.push({
      prodcheck:check[i].prodcheck,
      drugproductrefid:check[i].drugproductrefid ,
      productname:check[i].productname,
      tabqty: check[i].tabqty,
      stripqty: check[i].stripqty,
      boxqty: check[i].boxqty,
      totalqty: check[i].totalqty,
      stripperbox: check[i].stripperbox,
      quantityperstrip: check[i].quantityperstrip,
      expirydate:check[i].expirydate,
      batchname:check[i].batchname,
      companyrefid:check[i].companyrefid,
      branchrefid:check[i].branchrefid,
      locname:check[i].locname,
      locrefid:check[i].locrefid,
      clientcdate:check[i].clientcdate,
      poid:check[i].poid,
      packageunit:check[i].packageunit
    });
  }
}

// alert("Raja")

    this.NpdForm.get('clientcdate').setValue(AppComponent.date);
    this.saveprocess=true;
    this.npdservice.savedcform(JSON.stringify(this.NpdForm.value)).subscribe(data =>{
      if(data == true){
        this.npdservice.saveproduct(JSON.stringify(this.checkedprod)).subscribe(data => {
          if(data == true){
            this.saveprocess=false;
            this.notification.addToast({ title: 'Success', msg: 'Data Save Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            setTimeout(() => {
              this.router.navigate(['/PurchaseDeliveryChallan/ViewPurchaseDC']);
            }, 500)
                }
      else{
        this.saveprocess=false;
        this.notification.addToast({ title: 'Error Message', msg: 'Data not Save!!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
          });
      }
    });
    this.ngOnInit();
    this.NpdForm.reset();
  }
  }else{
    this.notification.addToast({ title: 'Error Message', msg: 'Select Product!!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

  }


  }


  getSum(){
    // this. selectallprod(event)
    // if(event.target.checked){
    /** Declare Given Table Datas**/
    // alert("getSumCalling");
    let txtproduct: number = 0;
    let txttabletquantity: any = 0;
    let txtstripquantity: any = 0;
    let txtboxquantity: any = 0;
    /** To set and calculate Given Table Datas into total values(formcontrolname) **/
    let totalproduct: any = 0;
    let totalQuantity: any = 0;
    let BoxQuantity: any = 0;
    let StripQuantity: any = 0;
    let TabQuantity: any = 0;
    const getData = <FormArray>this.NpdForm.controls['brandDetails'];
    let setData = getData.value;
    let purcTax: any = this.purtax;
    let k: number = 0;
    let Stripperbox: any;
    let Quantityperstrip: any;
    let totalqty: any;
    let count =0;
    for (this.j = 0;this.j < setData.length;this.j++) {
     
      if(setData[this.j].prodcheck){
        count++;
       
      /* To Get Total Products */
    
      // for(let k=0;k<setData[this.j].prodcheck.length;)
      if (parseInt(setData.length) !== null) {
       
        txtproduct = count;
      
      }
      Stripperbox = setData[this.j].stripperbox;
      Quantityperstrip = setData[this.j].quantityperstrip;
      totalqty = setData[this.j].totalqty;
      /* Tablet Quantity */
      if (setData[this.j].tabqty == '' || parseFloat(setData[this.j].tabqty) == null) {
        setData[this.j].tabqty = 0;
        txttabletquantity = 0;
      }
      else {
        txttabletquantity = parseFloat(setData[this.j].tabqty);
        TabQuantity += parseFloat(setData[this.j].tabqty);
      }
      /* Strip Quantity */
      if (setData[this.j].stripqty == '' || parseFloat(setData[this.j].stripqty) == null) {
        setData[this.j].stripqty = 0;
        txtstripquantity = 0;
      }
      else {
        txtstripquantity = parseFloat(setData[this.j].stripqty) * Quantityperstrip * Stripperbox;
        StripQuantity += parseFloat(setData[this.j].stripqty);
      }
      /* Box Quantity */
      if (setData[this.j].boxqty == '' || parseFloat(setData[this.j].boxqty) == null) {
        setData[this.j].boxqty = 0;
        txtboxquantity = 0;
      }
      else {
        txtboxquantity = parseFloat(setData[this.j].boxqty) * Stripperbox * Quantityperstrip;
        BoxQuantity += parseFloat(setData[this.j].boxqty);
      }


      /* Row Wise SubTotal Amount */
    
      setData[this.j].totalqty = txttabletquantity + txtstripquantity + txtboxquantity;
      // if(totalqty < setData[this.j].totalqty){
      //   this.notification.addToast({ title: 'Warning Message', msg: 'You reached maximum qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      //   break;
      // }
      parseFloat(setData[this.j].totalqty).toFixed(this.fixedlength);

      totalproduct = txtproduct;
      totalQuantity += txttabletquantity + txtstripquantity + txtboxquantity;

      /* To Patch values Row wise */
      getData.patchValue(setData);
      /* Toatl Calculation*/
      
      /* To Set value from Table calculation Final Values on Input types*/
      this.NpdForm.get('totalproduct').setValue(parseFloat(totalproduct).toFixed(this.fixedlength));
      this.NpdForm.get('totalqty').setValue(parseFloat(totalQuantity).toFixed(this.fixedlength));
       this.NpdForm.get('totalboxqty').setValue(parseFloat(BoxQuantity).toFixed(this.fixedlength));
       this.NpdForm.get('totalstripqty').setValue(parseFloat(StripQuantity).toFixed(this.fixedlength));
      this.NpdForm.get('totaltabqty').setValue(parseFloat(TabQuantity).toFixed(this.fixedlength));
      //To set Temporary Values In Bottom Input types 
    }   
    }
  // }
}



  validation(): boolean {
                 if (this.NpdForm.get('poid').value == null || this.NpdForm.get('poid').value == '') {
                     this.notification.addToast({ title: 'Error Message', msg: 'Select Purchase Order No..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                       return false;
                     }
                if (this.NpdForm.get('deliverydate').value == '' || this.NpdForm.get('deliverydate').value == null) {
                  this.notification.addToast({ title: 'Error Message', msg: 'Select Delivery Challan Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                  return false;
                }
                if (this.NpdForm.get('dist_dcno').value == '' || this.NpdForm.get('dist_dcno').value == null) {
                  this.notification.addToast({ title: 'Error Message', msg: 'Enter Distributor Challan Number..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                  return false;
                }
                return true;

              }

        tablevalidation(){

          const dchproduct = <FormArray>this.NpdForm.controls['brandDetails'];
          let check = dchproduct.value;
          for(let i = 0 ; i < check.length ; i++){
          if(check[i].prodcheck){
            if (check[i].batchname == '' || check[i].batchname == null) {
              this.notification.addToast({ title: 'Error Message', msg: 'Enter Batch No..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
              return false;
            }
            if (check[i].expirydate == '' || check[i].expirydate == null) {
              this.notification.addToast({ title: 'Error Message', msg: 'Select Expiry Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
              return false;
            }
            return true;
          }

        }
        }


}
