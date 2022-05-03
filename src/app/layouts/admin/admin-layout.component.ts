import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit, Input, Output } from '@angular/core';
import 'rxjs/add/operator/filter';
import { state, style, transition, animate, trigger, AUTO_STYLE } from '@angular/animations';
import swal from 'sweetalert2';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppComponent } from '../../app.component';
import { adminService } from './admin-layout.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { format } from 'util';
import { LoginComponent } from 'app/userlogin/login/login.component';
import { UserloginService } from 'app/userlogin/userlogin.service';
import { shopeditService } from 'app/shopinfo/editShop/editShop.services';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { XRegisterServices } from 'app/xregister/xregister.services';

declare var require: any;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [adminService, shopeditService, NotificationsComponent, DashboardComponent, DashboardService,XRegisterServices],
  //AppComponent,UserloginService
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})

export class AdminLayoutComponent implements OnInit {
  taxSettingsForm: FormGroup;

  deviceType = 'desktop';
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  chatToggle = 'out';
  chatInnerToggle = 'off';
  innerHeight: string;
  isScrolled = false;
  isCollapsedMobile = 'no-block';
  toggleOn = true;
  windowWidth: number;

  menu: any = [];
  menu1: any;
  myNewList: any; item;
  modLabel: any;
  shop = [];
  //notification
  message: any;
  module: any;
  date: any;
  noMessage: any;
  public messageCondition: boolean = false;
  public errormessageCondition: boolean = false;

  public showNav = true;
  showDialog: boolean = false;
  @Input() visible: boolean;

  userinfo: FormGroup;
  edituserinfo: FormGroup;
  imgURL: any = "assets/images/user.png";
  ip: any;

  userlastlogintime: any;
  userloginhistory: any

  @ViewChild('searchFriends') search_friends: ElementRef;
  @ViewChild('toggleButton') toggle_button: ElementRef;
  @ViewChild('sideMenu') side_menu: ElementRef;

  helpmenu1:boolean;
  helpmenu2:boolean;
  helpmenu3:boolean;
  helpmenu4:boolean;
  helpmenu5:boolean;
  helpmenu6:boolean;
  helpmenu7:boolean;
  helpmenu8:boolean;
  username: any;
  empid: any;
  empcode: any;
  gender: any;
  dob: any;
  address: any;
  state: any;
  mobno: any;
  mailid: any;
  getevent: any;
  deviceObj: any;
  sessiondetail: any;
  logouttime: any;
  logintime: any;
  accesstoken: string;
  locrefid: any;
  setupform: boolean;
  shopsetup: boolean;
  firstpopup: boolean;
  payout: boolean ;
  shopid: any;
  countries: any;
  states: any;
  cities: any;
  ShopForm: FormGroup;
  CurrencyForm: FormGroup;
  DecimalForm: FormGroup;
  SetupcostForm: FormGroup;
  shiftOpenedForm: FormGroup;
  purchasejournal: FormGroup;
  setupcostJournal: FormGroup;
  currenysetup: boolean;
  decimalsetup: boolean;
  setupcostsetup: boolean;
  payoutdata:any;
  refilldata:any;
  paycreditdata:any;
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  emailPattern ="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  alphanumericpattern = "^$|^[A-Za-z0-9]+";
  websitepattern ="^((http|https|ftp):\/\/(www\.)?|www\.)[a-zA-Z0-9\_\-]+\.([a-zA-Z]{2,4}|[a-zA-Z]{2}\.[a-zA-Z]{2})(\/[a-zA-Z0-9\-\._\?\&=,'\+%\$#~]*)*$";
  constructor(public menuItems: MenuItems, private http: Http, private router: Router,private dashcomp: DashboardComponent,
    private formBuilder: FormBuilder, private adservice: adminService, private sanitizer: DomSanitizer,private xRegisterServices: XRegisterServices,
    private app: AppComponent, private dateformat: dateFormatPipe, private shopedit: shopeditService, private notificationsComponent: NotificationsComponent) {

    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);
    this.username = sessionStorage.getItem("sessionID");
    //  this.menu = JSON.parse(sessionStorage.getItem("user"));
    //  this.item = this.menu[1];
    // console.log(this.menu[1]);
    // this.myNewList = Array.from(new Set(this.menu));
    // console.log(this.myNewList);
    this.taxSettingsfn();
    this.shopFormfn();
    this.currencyFormfn();
    this.deciamformfn();
    this.Setupcostformfn();
    this.setupcostjrnlfn();
    this.openregform();
  }

  taxSettingsfn() {
    this.taxSettingsForm = this.formBuilder.group({
      vat_gst: [''],
      igst: [''],
      ugst: [''],
      cgst: [''],
      sgst: [''],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      shoprefid: [AppComponent.locrefID1],
      purchasetax: [1],
      salestax: [1],
      countryrefid: [AppComponent.countryID],
      status: [1],
      stateid: []
    })
  }
  indgstflag: number;
  indiangstfn(event) {
    if (event == 2) {
      this.indgstflag = 1;
      this.taxSettingsForm.get('vat_gst').setValue(2);
      this.adservice.getStates(AppComponent.countryID).subscribe(data => this.state = data)
    } else if (event == 1) {
      this.indgstflag = 0;
      this.taxSettingsForm.get('vat_gst').setValue(1);
    } else if (event == 0) {
      this.indgstflag = 0;
      this.taxSettingsForm.get('vat_gst').setValue(0);
    }
  }



  savetaxsetting() {
    if (this.taxSettingsForm.get('igst').value) {
      this.taxSettingsForm.get('igst').setValue(1)
    } else {
      this.taxSettingsForm.get('igst').setValue('')
    }
    if (this.taxSettingsForm.get('ugst').value) {
      this.taxSettingsForm.get('ugst').setValue(1)
    } else {
      this.taxSettingsForm.get('ugst').setValue('')
    }
    if (this.taxSettingsForm.get('cgst').value) {
      this.taxSettingsForm.get('cgst').setValue(1)
    } else {
      this.taxSettingsForm.get('cgst').setValue('')
    }
    if (this.taxSettingsForm.get('sgst').value) {
      this.taxSettingsForm.get('sgst').setValue(1)
    } else {
      this.taxSettingsForm.get('sgst').setValue('')
    }
    this.adservice.Savetaxsettings(JSON.stringify(this.taxSettingsForm.value)).subscribe(data => { })
  }
  currsts: any;
  notifylists=[];
  ExpDescription:any;
  ngOnInit() {
    setTimeout(() => {
      this.app.getDecrypt();
      this.gettoken();
    
      this.adservice.getSetupstatus(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1,AppComponent.locrefID1).subscribe(
        data => { //this.firstpopup = true;this.payout=false;
          if (data == 1) {
            this.firstpopup = false;
            this.payout=true;
          }else if(data==null||data.length==0){
            this.firstpopup = true
            this.payout=false;
          }else{
            this.firstpopup = true
            this.payout=false;
          }
        }
      )





      /*  Shop Setip Form */
     
      this.shopid = AppComponent.locrefID1;
      this.shopedit.shopeditservice(AppComponent.locrefID1).subscribe(data => {

        this.ShopForm.patchValue(data.imagevalues)



      },
        err => {
          console.log('Error occured in shop edit ');
        });


      //get Country
      this.shopedit.getCountry().subscribe(data => this.countries = data,
        err => {
          console.log('Error Occured Get Country');
        });

      //Get Edit State
      this.shopedit.geteditStates(this.shopid).subscribe(data => {
        this.states = data,

          err => {
            console.log('Error Occured Get States');
          }
      });

      //Get edit City    
      this.shopedit.geteditCity(this.shopid).subscribe(data => this.cities = data,
        err => {
          console.log('Error Occured Get City');
        });



      // this.adservice.getShopName(AppComponent.locrefID1).subscribe(data => { 
      //   this.shop = data[0][1]
      // },err => {console.log(err)}); 


      this.adservice.getuserinfo(JSON.parse(sessionStorage.getItem("indvuserid"))).subscribe(data => { this.username = data[0][0] });

      this.adservice.receiveimage(JSON.parse(sessionStorage.getItem("indvuserid"))).subscribe(data => { this.viewimage(data) });

      this.adservice.getuserlogintime(JSON.parse(sessionStorage.getItem("indvuserid"))).subscribe(data => {
        this.userlastlogintime = data.lastVisit;
        this.userloginhistory = data.loginHistory;
      });

      this.adservice.getcurrencysts().subscribe(data => this.currsts = data)
      this.adservice.Getpaymentout(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,this.dateformat.transform05(Date.now())).subscribe(data => {
        this.payoutdata = data 
      },err=> {
          console.log('Error Occured View Picking');
      });
      setTimeout(() => {
        var editiontype=2;
        this.adservice.GetAllCreditAlerts(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
          this.paycreditdata = data
        },err=> {
            console.log('Error Occured View Picking');
        });

        this.adservice.GetRefillAlerts(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
          this.bindrefilldata(data);
        },err=> {
            console.log('Error Occured View Picking');
        });
        if(JSON.parse(sessionStorage.getItem("ranking"))>5){
          editiontype=2;
        }else{
          editiontype=1;
        }
        this.adservice.ViewClientNotifications(AppComponent.countryID,editiontype).subscribe(data => {
            this.notifylists=data;console.log("Notify: "+JSON.stringify(data)); },error => { console.log(error) });

        this.adservice.ViewClientRemainDays(sessionStorage.getItem('indvuserid')).subscribe(data => {
            this.ExpDescription=data[0];console.log("Expiry: "+JSON.stringify(data)); },error => { console.log(error) });    
       
        // this.http.get(this.baseResUrl2 + '/get-remaining-days/'+sessionStorage.getItem('indvuserid')).map(res => res.json())
        //     .subscribe(data => {this.expdays = data[0];this.exptime= data[1];this.currentusercount=data[2][0];
        //       this.usercurrency=data[2][1];this.remaindays=data[0].split(" ")[0];
        //     }, err => console.log("error on getcountry"));

      },1200);

      this.menu = JSON.parse(sessionStorage.getItem("auth"));
      this.modLabel = JSON.parse(sessionStorage.getItem("labels"));

      this.messageCondition = false;

      this.getIP();
    }, 2000);

  }

  getrefills1(){
    this.adservice.GetRefillAlerts(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.bindrefilldata(data);
    },err=> {
        console.log('Error Occured View Picking');
    });
  }

  bindrefilldata(data){
    //this.refilldata[this.refilldata.map((x, i) => [i, x]).filter(x => x.flag == false)[0][0]] = true;
    this.refilldata=[];
    for(let i=0;i<data.length;i++){
      this.refilldata.push({
        flag:false,
        custid:data[i][3],
        cusname:data[i][5],
        invid:data[i][0],
        invno:data[i][1],
        invdate:data[i][2],
        rdays:parseFloat(data[i][4]).toFixed(2),
      })
    }
  }

  selectrefill(indx){
    if(this.refilldata[indx].flag){
      this.refilldata[indx].flag=false;
    }else{
      this.refilldata[indx].flag=true;
    }
  }

  selectallrefill(event){
    let data=this.refilldata;
    if(event.target.checked){
      for(let i=0;i<data.length;i++){
        this.refilldata[i].flag=true
      }
    }else{
      for(let i=0;i<data.length;i++){
        this.refilldata[i].flag=false;
      }
    }
  }

  getState() {
    //Get States 
    this.shopedit.getStates(this.ShopForm.get('country').value).subscribe(data => {
      this.states = data,
        err => {
          console.log('Error Occured Get States');
        }
    });
  }
  getCity() {
    //Get City 
    this.shopedit.getCity(this.ShopForm.get('state').value).subscribe(data => {
      this.cities = data,
        err => {
          console.log('Error Occured Get City');
        }
    });
  }

  characterlength(){

    if(this.ShopForm.get('shopname').value.length > 29){
      this.notificationsComponent.addToast({ title: 'Alert Shopname', msg: 'You reached maximum character limit 30!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      document.getElementById("shopvalid").blur();
      return false;
    }
    if(this.ShopForm.get('ownername').value.length > 39){
      this.notificationsComponent.addToast({ title: 'Alert Ownername', msg: 'You reached maximum character limit 40!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      document.getElementById("ownervalid").blur();
      return false
    }
    if(this.ShopForm.get('tinno').value!=null && this.ShopForm.get('tinno').value.length > 15){
      this.notificationsComponent.addToast({ title: 'Alert Gstno', msg: 'You reached maximum character limit 16!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      document.getElementById("tinovalid").blur();
      return false
    }
    if(this.ShopForm.get('mobileno').value.length > 14){
      this.notificationsComponent.addToast({ title: 'Alert Mobile', msg: 'You reached maximum character limit 15!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      document.getElementById("mobilevalid").blur();
      return false
    }
    if(this.ShopForm.get('dlno').value!=null && this.ShopForm.get('dlno').value.length > 15){
      this.notificationsComponent.addToast({ title: 'Alert DlNo', msg: 'You reached maximum character limit 16!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      document.getElementById("dlnovalid").blur();
      return false
    }

    if(this.ShopForm.get('state').value == '' || this.ShopForm.get('state').value == null){
  
      this.notificationsComponent.addToast({ title: 'Alert State', msg: 'Please Select State!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      
      return false
    }
    if(this.ShopForm.get('city').value == '' || this.ShopForm.get('city').value == null){
      this.notificationsComponent.addToast({ title: 'Alert City', msg: 'Please Select city!!', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
   
      return false
    }
    return true;
  }



  shopFormfn() {
    this.ShopForm = this.formBuilder.group({
      shopname: ['',[Validators.pattern(this.textPattern)]],
      ownername: ['',[Validators.pattern(this.textPattern)]],
      tinno: ['',[Validators.pattern(this.alphanumericpattern)]],
      address1: [''],
      state: [''],
      city: [''],
      country: [''],
      mobileno: ['',[Validators.pattern("[+0-9]*")]],
      emailid: ['',[Validators.pattern(this.emailPattern)]],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1],
      id: [''],
      address2:[''],
      dlno:[''],
      website:['',[Validators.pattern(this.websitepattern)]]
    })
  }

  currencyFormfn() {
    this.CurrencyForm = this.formBuilder.group({
      id: [''],
      countryrefid: [AppComponent.countryID],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      shoprefid: [AppComponent.locrefID1],
      currencyrefid: [''],
      status: [1]
    })
  }

  deciamformfn() {
    this.DecimalForm = this.formBuilder.group({
      decimaltwo: [true],
      decimalthree: [false],
      roundedabove: [0],
      roundedbelow: [0],
      expectedamt: [true],
      roundoffamt: [false],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1],
      clientcdate: [AppComponent.date],
      status: [1]
    })
  }

  Setupcostformfn() {
    this.SetupcostForm = this.formBuilder.group({
      opencashbalance: [0.00,[Validators.pattern(this.textnumbers)]],
      buildingcost: [0.00,[Validators.pattern(this.textnumbers)]],
      advleadsedeposit: [0.00,[Validators.pattern(this.textnumbers)]],
      regfee: [0.00,[Validators.pattern(this.textnumbers)]],
      electriclighting: [0.00,[Validators.pattern(this.textnumbers)]],
      furnishcarpentry: [0.00,[Validators.pattern(this.textnumbers)]],
      fridge: [0.00,[Validators.pattern(this.textnumbers)]],
      aircondition: [0.00,[Validators.pattern(this.textnumbers)]],
      displayboard: [0.00,[Validators.pattern(this.textnumbers)]],
      computerperipherals: [0.00,[Validators.pattern(this.textnumbers)]],
      others1: [0.00,[Validators.pattern(this.textnumbers)]],
      others2: [0.00,[Validators.pattern(this.textnumbers)]],
      others3: [0.00,[Validators.pattern(this.textnumbers)]],
      others4: [0.00,[Validators.pattern(this.textnumbers)]],
      others5: [0.00,[Validators.pattern(this.textnumbers)]],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1],
      clientcdate: [AppComponent.date],
      status:[1],
      totalsetupcost:[0.00,[Validators.pattern(this.textnumbers)]]
    })
  }

  setupcostjrnlfn(){
    this.setupcostJournal = this.formBuilder.group({
      creditaccount: [34, []],
      debitaccount: [,[]],
      debitamount: [],
      creditamount: [],
      craccname: ['Furniture&Equiments', []],
    //  craccname: ['Purchase Account', []],
      invoiceno: [],
      invoicebalamt: [],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [],
      jrnltype: [11, []],
      jrnlname: ['BusinessCost', []],
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
  }
  
  saveshopsetup() {
    let shopflag = this.characterlength();
    this.ShopForm.get('companyrefid').setValue(AppComponent.companyID);
    this.ShopForm.get('branchrefid').setValue(AppComponent.branchID);
    this.ShopForm.get('locname').setValue(AppComponent.locRefName1);
    this.ShopForm.get('locrefid').setValue(AppComponent.locrefID1);
    if(shopflag){
      this.shopedit.updateShoprecord(JSON.stringify(this.ShopForm.value)).subscribe(data => {
        if (data) {
          this.shopsetup = false;
          this.currenysetup = true;
        }
      })
    }
  }
  
  addtotalcost(){
    
    let totalcost = parseFloat( this.SetupcostForm.get('opencashbalance').value) +
    parseFloat(this.SetupcostForm.get('buildingcost').value) +
    parseFloat(this.SetupcostForm.get('advleadsedeposit').value) +
    parseFloat(this.SetupcostForm.get('regfee').value) +
    parseFloat(this.SetupcostForm.get('electriclighting').value) +
    parseFloat( this.SetupcostForm.get('furnishcarpentry').value) +
    parseFloat( this.SetupcostForm.get('fridge').value) +
    parseFloat( this.SetupcostForm.get('aircondition').value) +
    parseFloat(  this.SetupcostForm.get('displayboard').value) +
    parseFloat( this.SetupcostForm.get('others1').value) +
    parseFloat(  this.SetupcostForm.get('others2').value) +
    parseFloat( this.SetupcostForm.get('others3').value) +
    parseFloat( this.SetupcostForm.get('others4').value) +
    parseFloat( this.SetupcostForm.get('others5').value )

    this.SetupcostForm.get('totalsetupcost').setValue(totalcost)
  }

  savecurrencysetup() {
    this.CurrencyForm.get('companyrefid').setValue(AppComponent.companyID);
    this.CurrencyForm.get('branchrefid').setValue(AppComponent.branchID);
    this.CurrencyForm.get('shoprefid').setValue(AppComponent.locrefID1);
    this.adservice.saveCurrencysetup(JSON.stringify(this.CurrencyForm.value)).subscribe(data => {
      if (data) {
        this.currenysetup = false;
        this.decimalsetup = true;
      }
    },
      err => {
        if (err.status == 400) {
          this.notificationsComponent.addToast({ title: 'Message', msg: ' Already Exsits..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          this.currenysetup = false;
          this.decimalsetup = true;
        }
      })
  }

  savesetupcost() {
    this.setupcostJournal.get('creditamount').setValue(this.SetupcostForm.get('totalsetupcost').value);
    this.SetupcostForm.get('companyrefid').setValue(AppComponent.companyID);
    this.SetupcostForm.get('branchrefid').setValue(AppComponent.branchID);
    this.SetupcostForm.get('locname').setValue(AppComponent.locRefName1);
    this.SetupcostForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.adservice.SaveSetupcost(JSON.stringify(this.SetupcostForm.value)).subscribe(data => {
      if (data) {
        this.setupcostsetup = false;
        this.adservice.saveSetcostJournal(JSON.stringify(this.setupcostJournal.value)).subscribe(data => {
          console.log("Journal Response"+data);
        })
      }
    })
  }

  savedecimalsetup() {
    if (this.DecimalForm.get('decimaltwo').value) {
      this.DecimalForm.get('decimaltwo').setValue(1);
    } else {
      this.DecimalForm.get('decimaltwo').setValue('');
    }
    if (this.DecimalForm.get('decimalthree').value) {
      this.DecimalForm.get('decimalthree').setValue(1);
    } else {
      this.DecimalForm.get('decimalthree').setValue('');
    }
    this.DecimalForm.get('companyrefid').setValue(AppComponent.companyID);
    this.DecimalForm.get('branchrefid').setValue(AppComponent.branchID);
    this.DecimalForm.get('locname').setValue(AppComponent.locRefName1);
    this.DecimalForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.adservice.savedecimalsetup(JSON.stringify(this.DecimalForm.value)).subscribe(data => {
      if (data) {
        this.decimalsetup = false,
          this.setupcostsetup = true;
      }
    })
  }

  count1: number;
  count2: number;
  count3: number;
  count4: number;
  count5: number;
  othersfn(data) {
 
    if(data ==1){
      this.count1 = data;
    }else if(data ==2){
      this.count2 = data;
    }else if(data ==3){
      this.count3 = data;
    }else if(data ==4){
      this.count4 = data;
    }else if(data ==5){
      this.count5 = data;
    }else if(data > 5){
      this.notificationsComponent.addToast({ title: 'Message', msg: ' You reached max value', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
  }
  delothersfn(data) {
   
    if(data ==1){
      this.count1 = 0;
    }else if(data ==2){
      this.count2 = 0;
    }else if(data ==3){
      this.count3 = 0;
    }else if(data ==4){
      this.count4 = 0;
    }else if(data ==5){
      this.count5 = 0;
    }else if(data > 5){
      this.notificationsComponent.addToast({ title: 'Message', msg: ' Nothing Delete', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
  }

  decimalcheckbox(event, id) {
    if (event.target.checked) {
      if (id == 1) {
        this.DecimalForm.get('decimalthree').setValue(false);
      }
      else if (id == 2) {
        this.DecimalForm.get('decimaltwo').setValue(false);
      }
    } else {
      this.DecimalForm.get('decimaltwo').setValue(false);
      this.DecimalForm.get('decimalthree').setValue(false);
    }
  }
  roundenable: number = 0;
  roundedcheckbox2(event, id) {
    if (event.target.checked) {
      if (id == 1) {
        this.DecimalForm.get('roundoffamt').setValue(false);
        this.DecimalForm.get('roundedbelow').setValue(0);
        this.DecimalForm.get('roundedabove').setValue(0);
      }
      else if (id == 2) {
        this.DecimalForm.get('expectedamt').setValue(false);
        this.DecimalForm.get('roundedbelow').setValue(1);
        this.DecimalForm.get('roundedabove').setValue(1);
      }
    } else {
      this.DecimalForm.get('expectedamt').setValue(false);
      this.DecimalForm.get('roundoffamt').setValue(false);
    }
  }
  // roundedcheckbox1(event, id) {
  //   if (event.target.checked) {
  //     if (id == 1) {
  //       this.DecimalForm.get('roundedbelow').setValue(false);
  //     }
  //     else if (id == 2) {
  //       this.DecimalForm.get('roundedabove').setValue(false);
  //     }
  //   } else {
  //     this.DecimalForm.get('roundedabove').setValue(false);
  //     this.DecimalForm.get('roundedbelow').setValue(false);
  //   }
  // }

  gettoken() {
    this.adservice.getShopName(AppComponent.locrefID1).subscribe(data => {
      this.shop = data[0][1];
      if(data!=null || data.length>0){
        this.dashcomp.shopname=data[0][1]
        this.dashcomp.shopcityname=data[0][2]
      }
      
    }, err => {
      if (err.message == "USER_DETECTED") {
        this.openNewLoginSwal();
      } else if (err.error == "invalid_token") {
        sessionStorage.removeItem("acctoken");
        sessionStorage.removeItem("indvuserid");
        sessionStorage.removeItem("ranking");
        let params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', sessionStorage.getItem("reftoken"));
        this.adservice.userauthentication(params.toString()).subscribe(data => {
          sessionStorage.setItem("acctoken", data.access_token),
            sessionStorage.setItem("indvuserid", data.general);
          sessionStorage.setItem('ranking', data.editionranking);
        },
          err => {
            if (err.error == "invalid_token") {
              this.openConfirmsSwal1();
              // alert("SESSION TIMEOUT");
              // this.router.navigate(['userlogin/login']); 
            }
            console.log("invalid_token")
          })
        //this.login.onSubmit();
      }
    });
  }

  openConfirmsSwal1() {
    swal({
      title: 'SESSION TIMEOUT !....',
      text: "Back to Login",
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#002e86',
      cancelButtonColor: '#dd333382',
      confirmButtonText: 'Back to Login'
    }).then(() => {
      this.router.navigate(['/userlogin/login']);
    }).catch(swal.noop);
  }

  openNewLoginSwal() {
    swal({
      title: 'NEW LOGIN DETECTED!...',
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#002e86',
      cancelButtonColor: '#dd333382',
      confirmButtonText: 'Exit'
    }).then(() => {
      this.router.navigate(['/userlogin/login']);
    }).catch(swal.noop);
  }

  getIP() {
    this.adservice.getIPAddress().subscribe(data => {
      this.ip = JSON.stringify(data);
    });
  }

  private readonly imageType: any = 'data:image/*;base64,';

  viewimage(data) {
    this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
  }


  devicedetails() {

    this.deviceObj = {

      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      date: this.dateformat.transform05(Date.now()),
      ipaddress: this.ip,
      browsertype: this.app.browser,
      ostype: this.app.os,
      osversion: this.app.osversion,
      devicetype: this.app.devicetype,
      event: "Exit",
      description: '',
      apiname: '',
      starttime: '',
      endtime: this.dateformat.transform06(),

    };

  }

  sessiondetails() {

    this.sessiondetail = {

      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      date: this.dateformat.transform05(Date.now()),
      logintime: localStorage.getItem("logintime"),
      ipaddress: this.app.ipAddress,
      logouttime: this.dateformat.transform06(),
    };

  }

  devicecall() {

    this.devicedetails();
    this.deviceObj.apiname = "api/logout";
    this.deviceObj.description = "User Logout";
    this.adservice.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => { });

  }


  logoutdetails() {
    this.sessiondetails();
    this.adservice.sessiondetails(JSON.stringify(this.sessiondetail)).subscribe(data => { });
  }

  openConfirmsSwal() {
    swal({
      title: 'Are you sure you want to Logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#002e86',
      cancelButtonColor: '#dd333382',
      confirmButtonText: 'Yes'
    }).then(() => {

      this.devicecall();
      this.logoutdetails();
      this.router.navigate(['/userlogin/login']);

    }).catch(swal.noop);
  }


  onClickedOutside(e: Event) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }

  // onClicked3(e: Event) {  //selva
  //   if (this.windowWidth > 768 && this.toggleOn && this.verticalNavType !== 'collapsed') {

  //     this.toggleOn = true;
  //     this.verticalNavType = 'collapsed';
  //   }
  // }


  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    this.setMenuAttributs(this.windowWidth);
  }

  setMenuAttributs(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'collapsed';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  searchFriendList(event) {
    const search = (this.search_friends.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    const friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
    Array.prototype.forEach.call(friendList, function (elements, index) {
      search_input = (elements.innerHTML).toLowerCase();
      search_parent = (elements.parentNode).parentNode;
      if (search_input.indexOf(search) !== -1) {
        search_parent.classList.add('show');
        search_parent.classList.remove('hide');
      } else {
        search_parent.classList.add('hide');
        search_parent.classList.remove('show');
      }
    });
  }

  //Open Register Process
  openregflag:boolean=false;
  openregform(){
    this.shiftOpenedForm = this.formBuilder.group({
      companyid: [AppComponent.companyID, []],
      branchid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      suserid:[sessionStorage.getItem('indvuserid')],
      employeeid:[],
      counterid:['opt1',[]],
      logintime:[this.dateformat.transform04()],
      openbalance: ['',Validators.pattern("[0-9]*")],
      additionalamount: ['',[Validators.pattern("[0-9]*")]],
      openregdetails:['',[]]
    });

    this.purchasejournal = this.formBuilder.group({
      debitaccount: ['', []],
      creditaccount: ['', []],
      debitamount: [0, []],
      creditamount: [0, []],
      craccname: ['Add Cash', []],
      draccname: ['', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [9, []],
      jrnlname: ['Shift Open', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: ['', []],
      invoicetype: ['', []],
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
  }

  shiftvalidate(){
    let counterno=this.shiftOpenedForm.get('counterid').value;
    let openbal=this.shiftOpenedForm.get('openbalance').value;
    let closedbal=this.shiftOpenedForm.get('additionalamount').value;
    let notes=this.shiftOpenedForm.get('openregdetails').value;
    if(counterno=='opt1'|| counterno== '' || counterno == null || counterno == undefined){
        this.notificationsComponent.addToast({ title: 'Alert', msg: 'Select Counter No..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
    }else if(closedbal==''|| closedbal== null || closedbal == undefined){
        this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Opening Balance if not enter Zero!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
    }else if(openbal==''|| openbal== null || openbal == undefined){
        this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Additional Balance if not enter Zero!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
    }else if(notes==''|| notes== null || notes == undefined){
        this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Something on Notes!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
    }
    return true;
}

saveprocess:boolean=false;
SaveOpenRegister() {
    let valflag=this.shiftvalidate();
    if(valflag){
        this.saveprocess=true;
        this.xRegisterServices.xOpenRegisterSave(JSON.stringify(this.shiftOpenedForm.value)).subscribe(data => {
            if (data) {
                this.saveprocess=false;
                this.openregflag=false
                this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved SuccessFully', timeout: 2000, theme: 'default', position: 'top-right', type: 'success' });
                localStorage.setItem("shiftlogintime", this.shiftOpenedForm.get('logintime').value);
                this.purchasejournal.get('creditamount').setValue(this.shiftOpenedForm.get('openbalance').value);
                this.xRegisterServices.xOpenRegisterAccountSave(JSON.stringify(this.purchasejournal.value)).subscribe(data => {
                });
                setTimeout(() => {
                    this.shiftOpenedForm.reset();
                    this.purchasejournal.reset();
                    //this.ngOnInit();
                },3200);
            }else{
                this.saveprocess=false;
                this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }     
        });
    }
}

  toggleChat() {
    this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
  }

  toggleChatInner() {
    this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
  }

  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    } else {
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'collapsed' : 'expanded';
    }
  }

  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

  onScroll(event) {
    this.isScrolled = false;
  }

  goBack(): void {

    //sessionStorage.clear();
    // window.location.replace('userlogin/login');
    sessionStorage.clear();
    this.router.navigate(['userlogin/login']);
  }

  logout() {
    if (confirm("Are You Sure you Want to Logout!?")) {
      sessionStorage.clear();
      localStorage.removeItem("u1s2e3r4");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("moduleLabel");
      this.router.navigate(['userlogin/login']);
    }
  }

  getNotification() {
    let notification = JSON.parse(localStorage.getItem("Sucess-Notify"));
    if (notification == '' || notification == null) {
      this.noMessage = "No Notifications";
      this.errormessageCondition = true;
      this.messageCondition = false;
    }
    else {
      this.messageCondition = true;
      this.module = notification[0];
      this.message = notification[1];
      this.date = notification[2];
      this.errormessageCondition = false;
    }
    setTimeout(() => {
      localStorage.removeItem("Sucess-Notify");
      this.messageCondition = false;
    }, 5000);
  }

  // clickinsidemenu() {
  //   if (this.verticalNavType != "expanded") {
  //     this.verticalNavType = "expanded";
  //     //selva
  //   }

  // }

  //full scrren open
  fullscreen: boolean = false;
  openFullscreen() {
    //let elem=document.getElementById("pcoded");
    this.fullscreen = !this.fullscreen;
    let elem = document.documentElement;
    if (this.fullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

  }


  cartitemdatas = [];
  cartitems() {
    let cartdata = JSON.parse(sessionStorage.getItem("cartitems"));
    if (cartdata == null || cartdata == '' || cartdata == undefined) {
      this.cartitemdatas = [];
    } else {
      this.cartitemdatas = cartdata;
    }
  }


  Languagetranslate(lid:any){
    localStorage.setItem("language",lid);
    window.location.reload();
  }



}
