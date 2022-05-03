import { DataStocks } from '../stocks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { adddrugService } from 'app/drugmaster/addDrugmaster/addDrugmaster.services';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-create-stocks',
  templateUrl: './create-stocks.component.html',
  providers: [NotificationsComponent, AppComponent, dateFormatPipe, adddrugService]
})
export class CreateStocksComponent implements OnInit {
  parentMessage="sales";
  stockForm: FormGroup;
  characters = [];
  stockDosage = [];
  stockFormulation = [];
  unitsgst = [];
  unitcgst = [];
  unitigst = [];
  unitutgst = [];
  unitgst = [];
  vat = [];
  deviceObj;
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  fieldhide: any;
  pactype: string = "Box";
  pactype1: string = "Box";
  constructor(public translate: TranslateService,private dataService: DataStocks, private fb: FormBuilder, private router: Router, private notificationsComponent: NotificationsComponent,
    private appComponent: AppComponent,  private dateformat: dateFormatPipe, private drugservice: adddrugService) { translate.setDefaultLang('en'); }
  i;
  unionstate=[20934,20936,20940,20948,21773,21775,21776];
  taxid: number;
  taxgstid:number=0;
  state:number;
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.stockForm = this.fb.group({
      rackno: ['', []],
      shelfno: ['', []],
      coldstorage: ['No', []],
      drugproductid: ['', []],
      formulationid: ['', []],
      formulationname:['',[]],
      dosageid: ['', []],
      expirydate: ['', []],
      manufactureddate: [this.dateformat.transform05(Date.now()), []],
      batchno: ['', []],
      minqty: [1, [Validators.pattern(this.textnumbers)]],
      boxperstrip: [0,[]],
      strippertablet:[1,[]],
      packageunit:['opt1',[]],
      qty: [0,[]],
      boxqty: [0,[]],
      tabletqty: [0,[]],
      stripqty: [0,[]],
      freeboxqty: [0,[]],
      freestripqty: [0,[]],
      freetabletqty: [0,[Validators.pattern(this.textnumbers)]],
      freetotalqty: [0,[]],
      damageqty:[0,[]],
      purchaseprice: [0, [Validators.pattern(this.textnumbers)]],
      mrp: [0, []],
      sellingprice: [0, [Validators.pattern(this.textnumbers)]],
      wholesellingprice: [0, [Validators.pattern(this.textnumbers)]],
      retailersellingprice: [0, [Validators.pattern(this.textnumbers)]],
      unitsgst: [0, []],
      unitcgst: [0, []],
      unitigst: [0, []],
      unitutgst: [0, []],
      unitgst: [0, []],
      vat: [0, []],
      margin: [0, []],
      unitprice:[0,[Validators.pattern(this.textnumbers)]],
      marginamt: [0, []],
      barcode:['25*45',[]],
      barcodeheight: [25, []],
      barcodewidth: [45, []],
      qrcode:['30*25',[]],
      qrcodeheight: [30, []],
      qrcodewidth: [25, []],
      clientcdate: ['', []],
      destroystatus:[0,[]],
      damagedestroystatus:[0,[]],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
    });
    //TO SET DROP DOWN PLACE HOLDER
    this.dataService.getFieldhide(AppComponent.companyID, AppComponent.branchID,
      AppComponent.shopID, AppComponent.locrefID)
      .subscribe(data => { 
        if(data.length>0){
          this.fieldhide = data[0][0];
        }else{
          this.fieldhide = 2;
        }
       this.drugservice.gettaxCountrystate(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.state = data
        if (this.fieldhide == 2) {
          // this.taxgstid=1;
          for (this.i = 0; this.i < this.unionstate.length; this.i++) {
            if (this.state[0][1] == this.unionstate[this.i]) {
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
    },error => {console.log('Error Occured On getFieldhide()');this.fieldhide == 2;this.taxgstid = 1;});

    // this.dataService.getSgst().subscribe(data => this.unitsgst = data);
    // this.dataService.getCgst().subscribe(data => this.unitcgst = data);
    // this.dataService.getIgst().subscribe(data => this.unitigst = data);
    // this.dataService.getUtgst().subscribe(data => this.unitutgst = data);
    // this.dataService.getGst().subscribe(data => this.unitgst = data);
    // this.dataService.getVat().subscribe(data => this.vat = data);
  }

  packingevent(event) {
    this.pactype = event;
    this.stockForm.get('boxqty').setValue('');
    document.getElementById("myText").focus();
  }
  packingevent1(event) {
    this.pactype1 = event;
  }

  focusrack(){
    document.getElementById("rackfocus").focus();
  }
  packfocus(){
    document.getElementById("packfocus").focus();
  }

  getProduct(searchValue: string) {
    this.dataService.getProduct(searchValue, this.stockForm.get('companyrefid').value,
      this.stockForm.get('branchrefid').value, this.stockForm.get('locrefid').value, this.stockForm.get('locname').value).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
  }

  getProvalues() {  
    let drugId: number = this.stockForm.get('drugproductid').value;
    this.dataService.getDosagevalues(drugId).subscribe(data => {
      this.stockForm.get('dosageid').setValue(data[0][0].toString());
      this.stockForm.get('vat').setValue(data[0][2]);
      this.stockForm.get('unitcgst').setValue(data[0][3]);
      this.stockForm.get('unitutgst').setValue(data[0][4]);
      this.stockForm.get('unitigst').setValue(data[0][5]);
      this.stockForm.get('unitsgst').setValue(data[0][6]);
    }, err => {
      console.log('Error Occured on getDosagevalues()');
    });
    this.dataService.getFormulvalues(drugId).subscribe(data => { 
      if(data!==''||data!==null||data!==undefined){
        this.stockForm.get('formulationid').setValue(data[0][0]);
        this.stockForm.get('formulationname').setValue(data[0][1]);
      }
    }, err => {
      console.log('Error Occured on getFormulvalues()');
    });
  }

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

  public reFlag: boolean = false;
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

  
  saveprocess:boolean=false;
  onSubmit() {
    this.reFlag = this.stockValidation();
    if (this.reFlag == true) {
      this.saveprocess=true;
      this.appComponent.ngOnInit();
      this.stockForm.get('clientcdate').setValue(AppComponent.date);
      this.dataService.createStock(JSON.stringify(this.stockForm.value)).subscribe(data => {
        if (data == true) {
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Data Saved Sucessfully!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.stockForm.reset();
          this.stockDosage = [];
          setTimeout(() => {
            this.router.navigate(['StockEntryForm/ViewStockList']);
          }, 2000);
         
        }
        else {
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data Not Saved!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      });

    }
    //this.ngOnInit();
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
    }else if (this.stockForm.get('packageunit').value == 'opt1' || this.stockForm.get('packageunit').value == '' || this.stockForm.get('packageunit').value == null) {
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

  totQty: any = 0;
  totBox: any = 0;
  totStrip: any = 0;
  boxperstrip: any = 0;
  boxqty: any = 0;
  stripqty: any = 0;
  tabletqty: any = 0;
  boxfree: any = 0;
  stripfree: any = 0;
  tabletfree: any = 0;
  totalFree: any = 0;
  totFreebox: any = 0;
  totFreestrip: any = 0;

*/