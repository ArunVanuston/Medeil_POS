import { DataStocks } from '../stocks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'edit-stocks',
  templateUrl: './edit-stocks.component.html',
  providers: [NotificationsComponent, AppComponent]
})
export class editStockComponent implements OnInit {
  parentMessage="sales";
  stockForm: any;
  characters = [];
  stockDosage: any;
  stockFormulation = [];
  unitsgst = [];
  unitcgst = [];
  unitigst = [];
  unitutgst = [];
  unitgst = [];
  vat = [];
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  id: string;
  editStockdata = [];
  deviceObj;
  fieldhide: any;
  constructor(public translate: TranslateService,private dataService: DataStocks, private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router, private notificationsComponent: NotificationsComponent,
    private appComponent: AppComponent,  private dateformat: dateFormatPipe) { translate.setDefaultLang('en'); 
    this.stockForm = this.fb.group({
      id: ['', []],
      rackno: ['', []],
      shelfno: ['', []],
      coldstorage: ['', []],
      drugproductid: ['', []],
      formulationid: ['', []],
      dosageid: ['', []],
      expirydate: ['', []],
      batchno: ['', []],
      minqty: [1, [Validators.pattern(this.textnumbers)]],
      boxqty: [0, [Validators.pattern(this.textnumbers)]],
      boxperstrip: [0, [Validators.pattern(this.textnumbers)]],
      strippertablet: [1, [Validators.pattern(this.textnumbers)]],
      qty: [0, []],
      tabletqty: [0, [Validators.pattern(this.textnumbers)]],
      stripqty: [0, [Validators.pattern(this.textnumbers)]],
      freeboxqty: [0, [Validators.pattern(this.textnumbers)]],
      freestripqty: [0, [Validators.pattern(this.textnumbers)]],
      freetabletqty: [0, [Validators.pattern(this.textnumbers)]],
      freetotalqty: [0, []],
      damageqty:[0,[]],
      purchaseprice: [0, [Validators.pattern(this.textnumbers)]],
      mrp: [0, []],
      sellingprice: [0, [Validators.pattern(this.textnumbers)]],
      wholesellingprice: [0, []],
      retailersellingprice: [0, []],
      unitsgst: [0, []],
      unitcgst: [0, []],
      unitigst: [0, []],
      unitutgst: [0, []],
      unitgst: [0, []],
      unitprice: [0, []], 
      manufactureddate:[this.dateformat.transform05(Date.now()),[]], 
      vat: ['', []],
      margin: [0, []],
      marginamt: [0, []],
      drugid: ['', []],//optional
      destroystatus:[0,[]],
      damagedestroystatus:[0,[]],
      clientcdate: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locrefid: ['', []],
      locname: ['', []],
      brandname: ['', []],
      batchrefname: ['', []],
      packageunit:['opt1',[]]
    });

  }

  unionstate=[20934,20936,20940,20948,21773,21775,21776];
  taxid: number;
  taxgstid:number=0;
  state:number;
  ngOnInit() {
    //TO GET EDIT STOCK DATA//
    this.translate.use(localStorage.getItem('language'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.editStock(this.id).subscribe(data => { 
      this.stockForm.patchValue(data);
      this.dataService.GetStockDrugName(data.drugproductid).subscribe(data => { 
        this.stockForm.get('brandname').setValue(data[0]);
      },errorCode => console.log('Edit Stock  :' + errorCode)
      );
    },errorCode => console.log('Edit Stock  :' + errorCode));

    setTimeout(() => {
      this.dataService.getFieldhide(AppComponent.companyID, AppComponent.branchID,
        AppComponent.shopID, AppComponent.locrefID)
        .subscribe(data => { 
          if(data.length>0){
            this.fieldhide = data[0][0];
          }else{
            this.fieldhide = 2;
          }
          this.dataService.gettaxCountrystate(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.state = data
            if (this.fieldhide == 2) {
              // this.taxgstid=1;
              for (let i = 0; i < this.unionstate.length; i++) {
                if (this.state[0][1] == this.unionstate[i]) {
                  //  this.taxid=0;
                  this.taxid = 2;
                  this.taxgstid = 2;
                  break;
                } else {
                  this.taxid = 2;
                  this.taxgstid = 1;
                }
              }
            }else {
              this.taxid = null;
              this.taxgstid = 0;
            }
          })
        },error => {
            console.log('Error Occured On getFieldhide()');
            this.fieldhide == 2;this.taxgstid = 1;
          });  
    }, 1800);

    /*this.dataService.editDosage(this.id).subscribe(data => {this.stockForm.get('batchrefname').setValue(data.toString())});
    this.dataService.editFormulation(this.id).subscribe(data => this.stockFormulation = data);
    this.dataService.editSgst(this.id).subscribe(data => this.unitsgst = data);
    this.dataService.editCgst(this.id).subscribe(data => this.unitcgst = data);
    this.dataService.editIgst(this.id).subscribe(data => this.unitigst = data);
    this.dataService.editUtgst(this.id).subscribe(data => this.unitutgst = data);
    this.dataService.editGst(this.id).subscribe(data => this.unitgst = data);
    this.dataService.editVat(this.id).subscribe(data => this.vat = data)
    this.dataService.getSgst().subscribe(data => this.unitsgst = data);
    this.dataService.getCgst().subscribe(data => this.unitcgst = data);
    this.dataService.getIgst().subscribe(data => this.unitigst = data);
    this.dataService.getGst().subscribe(data => this.unitgst = data);
    this.dataService.getVat().subscribe(data => this.vat = data);*/
  }

  //calculations
  quantitycalculation(){
    let boxqty=this.stockForm.get('boxqty').value;
    let perqty=this.stockForm.get('boxperstrip').value;
    if(boxqty==null||boxqty==''||boxqty==undefined||isNaN(boxqty)==true){
      this.stockForm.get('boxqty').setValue(1);boxqty=1;
    }
    if(perqty==null||perqty==''||perqty==undefined||isNaN(perqty)==true){
      this.stockForm.get('boxperstrip').setValue(1);perqty=1;
    }
    var Totqty = boxqty*perqty;
    this.stockForm.get('qty').setValue(Totqty.toFixed(2));
    this.stockForm.get('tabletqty').setValue(Totqty.toFixed(2));
    setTimeout(() => {
      let freeqty=this.stockForm.get('freetabletqty').value;
      if(freeqty==0||freeqty==null||freeqty==''||freeqty==undefined||isNaN(freeqty)==true){
        this.getFreeQuantity(0);
      }else{
        this.getFreeQuantity(freeqty);
      }
    }, 800);
  }

  getFreeQuantity(eventval) {
    var boxqty=0;var boxperstrip=0;var totfreeqty=0;var totandfree=0;
    boxqty=parseInt(this.stockForm.get('boxqty').value);    
    boxperstrip=parseInt(this.stockForm.get('boxperstrip').value);
    totfreeqty=parseFloat(eventval)*boxperstrip;
    totandfree=(boxqty*boxperstrip)+totfreeqty;
    this.stockForm.get('freetabletqty').setValue(parseFloat(eventval).toFixed(2));
    this.stockForm.get('freetotalqty').setValue(totfreeqty.toFixed(2));
    this.stockForm.get('qty').setValue(totandfree.toFixed(2));
  }

  showPrice() {
    let tabqty=this.stockForm.get('qty').value;
    if(tabqty==null||tabqty==''||tabqty==undefined||tabqty==0){
      document.getElementById("qtyfocus").focus();
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Qty not to be Empty or Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  showUnitprice(price){
    let totqty = this.stockForm.get('boxperstrip').value;
    let Pprice = this.stockForm.get('purchaseprice').value;
    let srp = this.stockForm.get('sellingprice').value;
    let mrp = this.stockForm.get('mrp').value;
    if(parseFloat(Pprice)>parseFloat(price)){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price not below than Acquisition Cost', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.stockForm.get('sellingprice').setValue('');
      document.getElementById("sellpricefocus").focus();
    }else if(parseFloat(srp)>parseFloat(mrp)){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price not more than MRP Price', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.stockForm.get('sellingprice').setValue('');
      document.getElementById("sellpricefocus").focus();
    }else{
      var unpr = (parseFloat(price)/totqty).toFixed(2);
      this.stockForm.get('unitprice').setValue(unpr);
      this.stockForm.get('sellingprice').setValue(parseFloat(price).toFixed(2));
      this.stockForm.get('wholesellingprice').setValue(parseFloat(price).toFixed(2));
      this.stockForm.get('retailersellingprice').setValue(parseFloat(price).toFixed(2));
      var marginamt=(parseFloat(price)-Pprice);
      var marginper=((parseFloat(price)-Pprice)/(parseFloat(Pprice)))*100;
      this.stockForm.get('marginamt').setValue(Math.floor(marginamt));
      this.stockForm.get('margin').setValue(Math.floor(marginper));
      //this.stockForm.get('mrp').setValue(parseFloat(mrp).toFixed(2));
    }
  }

  showMargin(margin: any) {
    let pPrice: any = this.stockForm.get('purchaseprice').value;
    let sellprice=this.stockForm.get('sellingprice').value;
    if(pPrice==null||pPrice==''||pPrice==undefined||pPrice==0){
      this.stockForm.get('margin').setValue('');
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Acquisition cost not to be Empty or Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else if(sellprice==null||sellprice==''||sellprice==undefined||sellprice==0){
      this.stockForm.get('margin').setValue('');
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Selling Price not to be Empty or Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      var re = ((pPrice * margin) / 100).toFixed(2);
      this.stockForm.get('marginamt').setValue(re);
      this.stockForm.get('sellingprice').setValue(parseFloat(pPrice) + parseFloat(re));
      this.stockForm.get('wholesellingprice').setValue(parseFloat(pPrice) + parseFloat(re));
      this.stockForm.get('retailersellingprice').setValue(parseFloat(pPrice) + parseFloat(re));
      let totqty:any = this.stockForm.get('boxperstrip').value;
      var unpr:any = (parseFloat(this.stockForm.get('sellingprice').value)/totqty).toFixed(2);
      this.stockForm.get('unitprice').setValue(unpr);
      if (this.stockForm.get('sellingprice').value < this.stockForm.get('purchaseprice').value) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price not below than Acquisition Cost', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        this.stockForm.get('sellingprice').setValue('');
        document.getElementById("sellpricefocus").focus();
      }
      if (this.stockForm.get('sellingprice').value > this.stockForm.get('mrp').value) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price not more than MRP Price', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        this.stockForm.get('sellingprice').setValue('');
        document.getElementById("sellpricefocus").focus();
      }
    }
  }
  
  public reFlag: boolean = false;
  saveprocess:boolean=false;
  onSubmit() {
    this.reFlag = this.stockValidation();
    if (this.reFlag == true) {
      this.saveprocess=true;
      this.dataService.updateStock(JSON.stringify(this.stockForm.value)).subscribe(data => {
        if (data == true) {
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Data Updated Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.stockForm.reset();
          this.stockDosage = [];
          this.stockFormulation = [];
          setTimeout(() => {
            this.router.navigate(['StockEntryForm/ViewStockList']);
          }, 2000);
        }
        else {
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data Not Updated!!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      });
    }
  }
  
  stockValidation(): boolean {
    if (this.stockForm.get('drugproductid').value == '' || this.stockForm.get('drugproductid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Product..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(this.stockForm.get('dosageid').value == '' || this.stockForm.get('dosageid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Dosage..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(this.stockForm.get('expirydate').value == '' || this.stockForm.get('expirydate').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select  Expiry Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.stockForm.get('packageunit').value == 'opt1' || this.stockForm.get('packageunit').value == null || this.stockForm.get('packageunit').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Package Type..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.stockForm.get('batchno').value == '' || this.stockForm.get('batchno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter  Your Batch Number..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(this.stockForm.get('minqty').value<=0 || this.stockForm.get('minqty').value == '' || this.stockForm.get('minqty').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your Min-Qty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(this.stockForm.get('qty').value<=0 || (this.stockForm.get('qty').value == '' || this.stockForm.get('qty').value == null)){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your Qty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(this.stockForm.get('purchaseprice').value == '' || this.stockForm.get('purchaseprice').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your Purchase Price..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(this.stockForm.get('sellingprice').value == '' || this.stockForm.get('sellingprice').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your Selling Price..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(this.stockForm.get('mrp').value == '' || this.stockForm.get('mrp').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your MRP Price..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(parseFloat(this.stockForm.get('purchaseprice').value) > parseFloat(this.stockForm.get('sellingprice').value)) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Acquisition Cost Higher than Selling Price', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
    // if (parseFloat(this.stockForm.get('sellingprice').value) > parseFloat(this.stockForm.get('mrp').value)) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price Higher Than SRP', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.stockForm.get('manufactureddate').value == '' || this.stockForm.get('manufactureddate').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Manufactured Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
     // if (this.stockForm.get('tabletqty').value == '' || this.stockForm.get('tabletqty').value == 0 || this.stockForm.get('tabletqty').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Tablet Qty Not to be a Zero or Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if(this.stockForm.get('formulationid').value == '' || this.stockForm.get('formulationid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Formulation..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
  }

  expiryselcalculate(expiryval){
    let seldate=new Date(expiryval);
    let curdate=new Date();
    if(curdate>seldate){
      this.stockForm.get('expirydate').setValue(''); 
      document.getElementById("expiryfocus").focus();
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Valid Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      document.getElementById("batchfocus").focus();
    }
  }

  manufselcalculate(expiryval){
    let seldate=new Date(expiryval);
    let curdate=new Date();
    if(curdate<seldate){
      this.stockForm.get('manufactureddate').setValue(this.dateformat.transform05(Date.now())); 
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Valid Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

}



/*
  getProduct(searchValue: string) {
    this.notificationsComponent.addToast({ title: 'Error Message', msg: 'You Cannnot Get Product Here ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  }
  getProvalues() {
    this.notificationsComponent.addToast({ title: 'Error Message', msg: 'You Cannnot Get Product Here ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  }

   getProduct1(searchValue: string) {
    this.dataService.getProduct(searchValue, this.stockForm.get('companyrefid').value, this.stockForm.get('branchrefid').value,
      this.stockForm.get('locrefid').value, this.stockForm.get('locname').value).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
  }

  getProvalues1() {
    let did: any = this.stockForm.get('drugid').value;
    this.stockForm.get('drugproductid').setValue(did);
    let drugId: any = this.stockForm.get('drugproductid').value;
    this.dataService.getDosagevalues(drugId).subscribe(data => { this.stockForm.get('dosageid').setValue(data) }, err => {
      console.log('Error Occured on getDosagevalues()');
    });

    this.dataService.getFormulvalues(drugId).subscribe(data => { this.stockFormulation = data }, err => {
      console.log('Error Occured on getFormulvalues()');
    });
  }
  totQty: any = 0;
  totBox: any = 0;
  totStrip: any = 0;
  boxperstrip: any = 0;
  strippertablet: any = 0;
  boxqty: any = 0;
  stripqty: any = 0;
  tabletqty: any = 0;
  boxfree: any = 0;
  stripfree: any = 0;
  tabletfree: any = 0;
  totalFree: any = 0;
  totFreebox: any = 0;
  totFreestrip: any = 0;
  getQuantity() {
    this.boxperstrip = this.stockForm.get('boxperstrip').value;
    this.strippertablet = this.stockForm.get('strippertablet').value;
    this.boxqty = this.stockForm.get('boxqty').value;
    this.stripqty = this.stockForm.get('stripqty').value;
    this.tabletqty = this.stockForm.get('tabletqty').value;
    if (this.boxperstrip == '' || this.boxperstrip == NaN || this.boxperstrip == null) {
      this.boxperstrip = 0;
    }
    if (this.strippertablet == '' || this.strippertablet == NaN || this.strippertablet == null) {
      this.strippertablet = 0;
    }
    if (this.boxqty == '' || this.boxqty == NaN || this.boxqty == null) {
      this.boxqty = 0;
    }
    if (this.stripqty == '' || this.stripqty == NaN || this.stripqty == null) {
      this.stripqty = 0;
    }
    if (this.tabletqty == '' || this.tabletqty == NaN || this.tabletqty == null) {
      this.tabletqty = 0;
    }
    this.totBox = (parseFloat(this.boxperstrip) * parseFloat(this.boxqty)) * parseFloat(this.strippertablet);
    this.totStrip = parseFloat(this.strippertablet) * parseFloat(this.stripqty);
    this.totQty = parseFloat(this.totBox) + parseFloat(this.totStrip) + parseFloat(this.tabletqty);
    this.stockForm.get('qty').setValue(parseFloat(this.totQty).toFixed(3));
  }
  getFreeQuantity() {
    this.boxperstrip = this.stockForm.get('boxperstrip').value;
    this.strippertablet = this.stockForm.get('strippertablet').value;
    this.boxfree = this.stockForm.get('freeboxqty').value;
    this.stripfree = this.stockForm.get('freestripqty').value;
    this.tabletfree = this.stockForm.get('freetabletqty').value;
    if (this.boxperstrip == '' || this.boxperstrip == NaN || this.boxperstrip == null) {
      this.boxperstrip = 0;
    }
    if (this.strippertablet == '' || this.strippertablet == NaN || this.strippertablet == null) {
      this.strippertablet = 0;
    }
    if (this.boxfree == '' || this.boxfree == NaN || this.boxfree == null) {
      this.boxfree = 0;
    }
    if (this.stripfree == '' || this.stripfree == NaN || this.stripfree == null) {
      this.stripfree = 0;
    }
    if (this.tabletfree == '' || this.tabletfree == NaN || this.tabletfree == null) {
      this.tabletfree = 0;
    }
    this.totFreebox = (parseFloat(this.boxfree) * parseFloat(this.boxperstrip)) * parseFloat(this.strippertablet);
    this.totFreestrip = parseFloat(this.strippertablet) * parseFloat(this.stripfree);
    this.totalFree = parseFloat(this.totFreebox) + parseFloat(this.totFreestrip) + parseFloat(this.tabletfree);
    this.stockForm.get('freetotalqty').setValue(parseFloat(this.totalFree).toFixed(3));
  }

  showPrice(price: any) {
    let tabqty=this.stockForm.get('tabletqty').value;
    if(tabqty==null||tabqty==''||tabqty==undefined||tabqty==0){
      this.stockForm.get('sellingprice').setValue('');
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Tablet Qty not to be Empty or Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      this.stockForm.get('wholesellingprice').setValue(price);
      this.stockForm.get('retailersellingprice').setValue(price);
    }
  }

  showUnitprice(price){
    let totqty:any = this.stockForm.get('qty').value;
    let Pprice: any = this.stockForm.get('purchaseprice').value;
    if(Pprice>price){
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price Below than Acquisition Cost', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.stockForm.get('sellingprice').setValue('');
    }else{
      var unpr:any = (parseFloat(price)/totqty).toFixed(2);
      this.stockForm.get('unitprice').setValue(unpr);
    }
  }

  showMargin(margin: any) {
    let pPrice: any = this.stockForm.get('purchaseprice').value;
    let sellprice=this.stockForm.get('sellingprice').value;
    if(pPrice==null||pPrice==''||pPrice==undefined||pPrice==0){
      this.stockForm.get('margin').setValue('');
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Acquisition cost not to be Empty or Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else if(sellprice==null||sellprice==''||sellprice==undefined||sellprice==0){
      this.stockForm.get('margin').setValue('');
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Selling Price not to be Empty or Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      var re = ((pPrice * margin) / 100).toFixed(2);
      this.stockForm.get('marginamt').setValue(re);
      this.stockForm.get('sellingprice').setValue(parseFloat(pPrice) + parseFloat(re));
      this.stockForm.get('wholesellingprice').setValue(parseFloat(pPrice) + parseFloat(re));
      this.stockForm.get('retailersellingprice').setValue(parseFloat(pPrice) + parseFloat(re));
      let totqty:any = this.stockForm.get('qty').value;
      var unpr:any = (parseFloat(this.stockForm.get('sellingprice').value)/totqty).toFixed(2);
      this.stockForm.get('unitprice').setValue(unpr);
      if (this.stockForm.get('sellingprice').value < this.stockForm.get('purchaseprice').value) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price Below than Acquisition Cost', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
  }


    showmarginAmt(mAmt: any) {
      let pPrice: any = this.stockForm.get('purchaseprice').value;
      var per: any = ((mAmt * 100) / pPrice).toFixed(2);
      this.stockForm.get('margin').setValue(per);
      this.stockForm.get('sellingprice').setValue(parseFloat(pPrice) + parseFloat(mAmt));
      if (this.stockForm.get('sellingprice').value > this.stockForm.get('mrp').value) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price Higher Than SRP', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
   }*/
 
  
