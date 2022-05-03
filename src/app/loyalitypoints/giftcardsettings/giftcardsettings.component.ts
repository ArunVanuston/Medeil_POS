import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { securitymonitoringService } from 'app/securitymonitoring/securitymonitoring.service';
import { loyalitysettingsService } from '../loyalitypoints.service';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../notifications/notifications.component'
@Component({
  selector: 'app-giftcardsettings',
  templateUrl: './giftcardsettings.component.html',
  styleUrls: ['./giftcardsettings.component.css'],
  providers: [NotificationsComponent, loyalitysettingsService]
})
export class GiftcardsettingsComponent implements OnInit {
  ltypeid: any;
  flag: boolean;
  flag1: boolean;
  parentMessage='sales;'

  //BarCode Details
  elementType = 'svg';
  value = '';
  format = 'CODE128';
  lineColor = '#000000';
  width = 1.5;
  height = 50;
  displayValue = true;
  // fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 5;
  marginTop = 5;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  public QrCode: string = null;
  i: any;
  gprod: any;
  currencylogo: any;
  logo: any;
  extrow=[{},{},{},{},{}];
  constructor(private formbuilder: FormBuilder, 
              private router: Router,
              private giftservice: loyalitysettingsService,
              private appcomponent: AppComponent, 
              private dateformat: dateFormatPipe,
              private modalService: NgbModal,
              private notification:NotificationsComponent) { }
  GiftcardForm: FormGroup;
  ngOnInit() {
    this.GiftcardForm = this.formbuilder.group({
      // loyality_typeid : ['',[]],
      loyality_type: ['', []],
      price_equivalentto_points: ['', []],
      equivalent_points: ['', []],
      from_date: ['', []],
      to_date: ['', []],
      minimum_points: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locarefid: [AppComponent.locrefID1, []],
      exp_status: [0, []],
      giftproductname:['',[]],
      clientcdate: [this.dateformat.transform04(), []],

      lproduct: this.formbuilder.array([]),
    });

    this.insertnewloyaltyrow();
  }


  getgiftprod(){
    this.giftservice.getgiftproduct(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.gprod = data
    })
  }

  toastcall(){
    this.notification.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  }
  saveprocess:boolean=false;
  onSubmit() {

    this.flag = this.validation();

    if (this.flag == true) {
      // alert(this.flag)
       this.flag1 = this.productvalidate();
      // alert("@@@"+this.flag1)
      if (this.flag1 == true) {
        this.saveprocess = true;
        this.giftservice.savedata(JSON.stringify(this.GiftcardForm.value)).subscribe(data => {
          this.ltypeid = data
          if (data > 0) {
            const control = <FormArray>this.GiftcardForm.controls['lproduct'];
            let ltid = control.value;
            for (let i = 0; i < ltid.length; i++) {
              ltid[i].loyality_typeid = data;
            }

            this.savegiftproduct();
          }
          else {
            this.notification.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

          }
        });
      }
    }
    else {
      this.notification.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }


  }






  savegiftproduct() {
    const control = <FormArray>this.GiftcardForm.controls['lproduct'];



    this.giftservice.savegiftprod(JSON.stringify(control.value)).subscribe(data => {
      data

      if (data == true) {
        this.notification.addToast({ title: 'Success', msg: 'Data Saved Successfully  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.qrvalue = [];
        this.saveprocess = false;
        this.ngOnInit();
      }
      else {
        this.notification.addToast({ title: 'Error', msg: 'Data Not Save  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

      }
    });

  }



  //loyalty product arrays initialize
  initloyaltyarray() {
    return this.formbuilder.group({
      loyality_typeid: [this.ltypeid, []],
      min_gift_point: ['', []],
      gift_code: ['', []],
      gift_product_id: ['', []],
      gift_Product_qty: ['', []],
      product_value: ['', []],
      remarks: ['', []],
      status: [0, []],
    
      /*Login Details */
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      clientcdate: [this.dateformat.transform04(), []],
    });
  }

  insertnewloyaltyrow() {
    this.initloyaltyarray();
    const control = <FormArray>this.GiftcardForm.controls['lproduct'];
    control.push(this.initloyaltyarray());
  }

  removenewloyaltyrow(indexid) {
    const control = <FormArray>this.GiftcardForm.controls['lproduct'];
    control.removeAt(indexid);
  }
  //Form Validation        
  validation(): boolean {

    if (this.GiftcardForm.get('loyality_type').value == '' || this.GiftcardForm.get('loyality_type').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Enter Scheme Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.GiftcardForm.get('from_date').value == '' || this.GiftcardForm.get('from_date').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Please select valid from date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.GiftcardForm.get('to_date').value == null || this.GiftcardForm.get('to_date').value == '') {
      this.notification.addToast({ title: 'Error Message', msg: 'Please select valid to date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    return true;

  }

  getcurrency(){
    this.giftservice.getcurrencylogo(AppComponent.countryID).subscribe(data=>{this.currencylogo=data,this.logo=data[0][2]});
  }
  
  //Product Table Validation

  productvalidate(): boolean {
    const control = <FormArray>this.GiftcardForm.controls['lproduct'];
    let setdata = control.value;
    for (let i = 0; i < setdata.length; i++) {
      if (setdata[i].min_gift_point == '' || setdata[i].min_gift_point == null) {
        this.notification.addToast({ title: 'Error Message', msg: 'Enter Minimum Gift Points..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
      if(this.selectedLink == 'product' ){
      if (setdata[i].gift_product_id == '' || setdata[i].gift_product_id == null) {
        this.notification.addToast({ title: 'Error Message', msg: 'Please Gift Product Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
    }
    else{
    // alert(this.selectedLink);
      if (setdata[i].product_value == null || setdata[i].product_value == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'Please Enter Gift Value..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
    }


      return true;

    }

  }
  //QR Code Genareter
  qrvalue = [];
  randomdata=[];
  qrcodecreate() {
    const control = <FormArray>this.GiftcardForm.controls['lproduct'];
    let setdata = control.value;
    var my_string1 = '' + AppComponent.companyID;
    var my_string2 = '' + AppComponent.locrefID1;
    var my_string4 = '' + (this.GiftcardForm.get('loyality_type').value).substring(0, 4).toUpperCase();
    while (my_string1.length < 3) {
      my_string1 = '0' + my_string1;
    }
    while (my_string2.length < 3) {
      my_string2 = '0' + my_string2;
    }
    while (my_string4.length < 3) {
      my_string4 = '0' + my_string4;
    }

    let rancode = ''; //abcdefghijklmnopqrstuvwxyz0123456789
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 4; i++ ) {
      rancode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.randomdata.push(rancode);

    // alert("ran"+rancode);
    for (let i = 0; i < setdata.length; i++) {
      //var my_string3 = '' + setdata[i].gift_product_id.substring(0, 3).toUpperCase();
      setdata[i].gift_code = 'QR' + my_string4 + this.randomdata[i] + my_string1 + my_string2;
      this.qrvalue[i] = ('QR' + my_string4 + rancode + my_string1 + my_string2);
      control.patchValue(setdata);
    }

  }



  private selectedLink: string = "Amount";

  setradio(e: string): void {
    this.selectedLink = e;
  }
  isSelected(name: string): boolean {
    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }
    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }



  popcloseindx:any=0;
  addgiftpopup(selvalue,popupname,index){
    this.popcloseindx=index;
    if (selvalue == "newgpname") {
      // alert(selvalue)
      this.openmain(popupname);
    }
    
  }

  
  closeResult: string;
  openmain(popupname) {
    this.modalService.open(popupname).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  reflag:boolean=true;
  SaveNewproduct(c) {

      this.giftservice.isExist(AppComponent.companyID, this.GiftcardForm.get('giftproductname').value).subscribe(data => {
        // alert(data)
        if (data) {
       
          this.notification.addToast({ title: 'Error',msg:'Product Already Exist!  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        
        }
        else {
          this.GiftcardForm.get('clientcdate').setValue(AppComponent.date);
          // this.GiftcardForm.get('createdby').setValue(AppComponent.userID);
          // alert(this.GiftcardForm.get('giftproductname').value)
          var postdata = {giftproductname:this.GiftcardForm.get('giftproductname').value,companyrefid:AppComponent.companyID,branchrefid:AppComponent.branchID,locname:AppComponent.locRefName1,locrefid:AppComponent.locrefID1};
          this.giftservice.addgiftproduct(JSON.stringify(postdata)).subscribe(data => {
            if (data) {
              this.notification.addToast({ title: 'Sucess Message', msg: 'Product Added', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
               c('Close click');
            
               const control = <FormArray>this.GiftcardForm.controls['lproduct'];
               let setdata = control.value;
               setdata[this.popcloseindx].gift_product_id='opt1'
               control.patchValue(setdata);
               this.getgiftprod();

            }
            else {
              // this.roleForm.get('rolename').setValue('opt1');
              this.notification.addToast({ title: 'Error Message', msg: 'product Not Added..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }
          },
            err => {
              console.log('Errror occured omn createRole()');
            }
          );
        }
      },
        err => {
          console.log('Errror occured omn isExist()');
        });
    // }
  }



//Discount Percentage Popup 

  qrimgindex:any=0;
  showpopup(popupname,index){
      this.openmains(popupname);
      this.qrimgindex=index;
  }

  
  closeResults: string;
  openmains(popupname) {
    this.modalService.open(popupname).result.then(
      (result) => {
        this.closeResults = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResults = `Dismissed ${this.getDismissReasons(reason)}`;
      });
  }

  private getDismissReasons(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  //Gift Product Popup 

  qrimgindexs:any=0;
  showpopups(popupname,index){
      this.openmainsproduct(popupname);
      this.qrimgindexs=index;
  }

  
  closeResultss: string;
  openmainsproduct(popupname) {
    this.modalService.open(popupname).result.then(
      (result) => {
        this.closeResults = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResults = `Dismissed ${this.getDismissReasonss(reason)}`;
      });
  }

  private getDismissReasonss(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  

}



