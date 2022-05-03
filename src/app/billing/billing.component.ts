import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import swal from 'sweetalert2';
import { AppComponent } from 'app/app.component';
import { Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout.component';
import { UserloginService } from 'app/userlogin/userlogin.service';
import * as jwt_decode from 'jwt-decode';
import { NotificationsComponent } from 'app/notifications/notifications.component';
declare var Razorpay: any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers:[UserloginService,NotificationsComponent]
})
export class BillingComponent implements OnInit {
  @ViewChild('usercountchange') usercountchange: ElementRef;
  baseResUrl2:string;
  expdays:string = "25 Days";
  exptime:any;
  editionrank;
  editiontype;
  paymentdetails:any=[];
  currentusercount:any=0;
  usercurrency:any;
  planname:any='Free Edition';
  planamount:any=0;
  perdayamount:any=0;
  plantype:any=0;
  remaindays:any;
  addonslist=[
    ["assets/images/poptab.jpg","Add User",100],
    ["assets/images/poptab.jpg","Add Drug",100],
    ["assets/images/poptab.jpg","Add User",100],
    ["assets/images/poptab.jpg","Add Drug",100],
  ];
  //paymentslist
  paymentmode:any;
  paymentcard:any;
  paymentcardno:any;
  paymentmail:any;
  constructor(private http:Http,private router: Router, private route: ActivatedRoute,private adminlay: AdminLayoutComponent,
    private loginService: UserloginService, private notificationsComponent: NotificationsComponent) { 
  }
  
  productid:any;
  planidd:any;
  ngOnInit() {
    this.baseResUrl2 = environment.backend.paymentUrl;
    this.editionrank = sessionStorage.getItem('ranking');
    this.editionrankbuy == sessionStorage.getItem('ranking');

    this.http.get(this.baseResUrl2 + '/get-remaining-days/'+sessionStorage.getItem('indvuserid')).map(res => res.json())
    .subscribe(data => {this.expdays = data[0];this.exptime= data[1];this.currentusercount=data[2][0];
      this.usercurrency=data[2][1];this.remaindays=data[0].split(" ")[0];
    }, err => console.log("error on getcountry"));

    console.log(AppComponent.countryID);
    this.http.get(this.baseResUrl2 + '/get-plandetails/'+sessionStorage.getItem('indvuserid')).map(res => res.json())
    .subscribe(data => {this.planname=data[0][0];this.planamount=data[0][1];this.perdayamount=Math.ceil(data[0][3]);
      this.plantype=data[0][4];this.plantypebuy=data[0][4]},// this.plantype=2
      err => console.log("error on getcountry"));
    
    setTimeout(()=>{
      this.http.get(this.baseResUrl2 + '/viewuserdetails'+ '/' + sessionStorage.getItem('indvuserid'))
      .map(res => res.json()).subscribe(userdata => {
        this.productid=userdata[0][1],this.planidd=userdata[0][8] });
  
      this.http.get(this.baseResUrl2 + '/customer-buy-payment'+ '/' + sessionStorage.getItem('indvuserid'))
        .map(res => res.json()).subscribe(userdata => { 
        console.log(JSON.stringify(userdata));
        //this.paymentdetails=userdata[0];
        if(userdata.length>0 || userdata!==null||userdata!==''||userdata!==undefined){
          this.paymentmode=userdata[0][2]; this.paymentcard=userdata[0][0]; this.paymentcardno=userdata[0][1]; this.paymentmail=userdata[0][3];
        }
      });
  
    },2100);
    
      switch (sessionStorage.getItem('ranking')){
        case "1":this.editiontype = "Bronze Trial Edition";break;
        case "2":this.editiontype = "Silver Trial Edition";break;
        case "3":this.editiontype = "Gold Trial Edition";break;
        case "4":this.editiontype = "Platinum Trial Edition";break;
        case "5":this.editiontype = "Free Edition";break;
        case "6":this.editiontype = "Bronze Paid Edition";break;
        case "7":this.editiontype = "Silver Paid Edition";break;
        case "8":this.editiontype = "Gold Paid Edition";break;
        case "9":this.editiontype = "Platinum Paid Edition";break;
        default: this.editiontype = "*****";break;
      }
  }


  showbillings:boolean=false;
  chooseplan(){
      this.showbillings= !this.showbillings;
      if(this.showbillings){
        this.editionrank=sessionStorage.getItem('ranking');
        this.editionrankbuy=sessionStorage.getItem('ranking');
      }
    
  }


  // openbilling(){
  //   //this.perdayamount=(this.plandetails[1]/this.plandetails[7]).toFixed(2);
  //   let str=String(this.expdays);
    
  // }

  totalamount:any=(0).toFixed(2);
  usercount;
  calculateusers(usercount){
      //this.openbilling();
      this.totalamount=(usercount*this.perdayamount*this.remaindays).toFixed(2);
      this.usercount=usercount;
  }

  clearusers(){
    this.usercountchange.nativeElement.value="";
    this.totalamount=(0).toFixed(2);
  }

  editionrankbuy:any=0;
  plantypebuy:any=0;
  selplanamount:any=0;
  plantypechange(editionrank,plantype){
    this.editionrankbuy=editionrank;
    this.plantypebuy=plantype;
    this.http.get(this.baseResUrl2 + '/getPricingPlanDetails/'+ AppComponent.countryID + 
    '/' + editionrank + '/' + plantype).map(res => res.json()).subscribe(edata => {
      if(edata.length>0){
        this.selplanamount=edata[0][2];
      }else{this.selplanamount=0}
    },err => {console.log("error on getEditionid:"+err);this.selplanamount=0});
  }

getFree(){
this.openMyModal('effect-1');
}
openSuccessSwal() {
  swal({
    title: 'Good job!',
    text: "Data Saved Sucessfully",
   // type: 'success'
  }).catch(swal.noop);
  
}
openMyModal(event) {
  document.querySelector("#" + event).classList.add('md-show');
}
closeMyModal(event) {
  ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
}
razorplanid;
starttime;
endtime;
amount;
currency;
editionranking:any;
getbuy(event){
  if(this.editionrankbuy== 0 || this.editionrankbuy<=5){
    this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Plan Monthly or Yearly', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
  }else if(this.editionrankbuy!==event && this.plantypebuy!==0){
    this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Valid Plan', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
  }else if(this.editionrank==event && this.plantypebuy == this.plantype){
    this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Currently Use this Plan', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
  }else{
    this.editionranking=event;
    this.http.get(this.baseResUrl2 + '/get-razorpayplanid/'+event+'/'+AppComponent.countryID+'/'+this.plantypebuy).map(res => res.json()).subscribe(data => {
      if(data != null){
        this.razorplanid = data[0][0],
        this.starttime = data[0][1],
        this.endtime = data[0][2],
        this.amount = data[0][3],
        this.currency = data[0][4]
        this.savesubcription();
      }else{
        err => console.log("error on get-razorpayplanid",err);
      }
    })
  }
}

usercartitems=[];
addnewuser:boolean=false;
addusercart(){
  if(this.totalamount>0){
  var itemtotals=0;
  var taxtotals=0;
  let getcartitems=JSON.parse(sessionStorage.getItem('cartitems'));
  if(AppComponent.countryID==291){
    itemtotals=parseFloat(this.totalamount)+((this.totalamount/100)*18);
    taxtotals=(parseFloat(this.totalamount)/100)*18;
  }else{
    itemtotals=parseFloat(this.totalamount);
    taxtotals=0;
  }
    if(getcartitems==null||getcartitems==''||getcartitems==undefined){
      this.usercartitems.push({
        itemname:'Additional Users',
        itemqty:this.usercount,
        itemrate:(this.perdayamount*this.remaindays).toFixed(2),
        itemtotal:(itemtotals).toFixed(2),
        itemtax:(taxtotals).toFixed(2),
        itempic:"assets/images/addons/user.png"
        })
      sessionStorage.setItem('cartitems',JSON.stringify(this.usercartitems));
      this.addnewuser=false;
      this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Added Cart SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clearusers();
      this.adminlay.cartitems();
    }else{
      let vari=false;
      for(let i=0;i<getcartitems.length;i++){
        if(getcartitems[i].itemname=="Additional Users"){
          vari=true;
          this.adminlay.cartitems();
          break;
        }
      }
      if(vari){
        this.addnewuser=false;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Already added in Cart ', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        this.clearusers();
      }else{
        getcartitems.push({
          itemname:'Additional Users',
          itemqty:this.usercount,
          itemrate:(this.perdayamount*this.remaindays).toFixed(2),
          itemtotal:(itemtotals).toFixed(2),
          itemtax:(taxtotals).toFixed(2),
          itempic:"assets/images/addons/user.png"
          })
          sessionStorage.setItem('cartitems',JSON.stringify(getcartitems));
          this.addnewuser=false;
          this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Added Cart SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.clearusers();
          this.adminlay.cartitems();
      }
    }
  
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Must Add a User', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
  }
}


savesubcription(){
  var postdata = {
    
      "plan_id":this.razorplanid,
      "total_count":1,
      "quantity": 1,
      "customer_notify":1,
      "start_at":this.starttime,
      "expire_by": this.endtime,
      "addons":[
        {
          "item":{
            "name":"Delivery charges",
            "amount":this.amount+'00',
            "currency":this.currency
          }
        }
      ],
      "notes":{
        "notes_key_1":sessionStorage.getItem("indvuserid"),
        "notes_key_2":"Edition Upgrade",
      }
    }
    
  this.http.post(this.baseResUrl2 + '/Razorpaysubscriptions',postdata).map(res => res.json()).subscribe(data => {
    if(data){
      this.http.get(this.baseResUrl2 + '/generate-razorpay-script/'+sessionStorage.getItem("indvuserid")).map(res => res.json()).subscribe(data => {
        if(data){
          this.openEvent(data);
        }  
      })
    }
  })
}

  underprocess:boolean=false;
  statuschange:boolean=false;
  trialmail:any;
  subscription_id:any;
  openEvent(data) {
    this.subscription_id=data[0][0];
    this.trialmail= data[0][1];
    var options = {
      "key": "rzp_live_DLJiaXRnr8NSGv", "subscription_id": data[0][0],
      "name": data[0][2],
      "description":"Medeil POS Plan",
      "image": "http://vanuston.com/images/vanuston%20images/sliderimages/roundlogo.png",
      'handler': this.getstatus.bind(this),
      "modal": {
        "ondismiss": function(){
            alert("Payment Cancelled");
            window.location.replace('https://secure.medeil.io/medeilpos/#/userlogin/login');
          }
        },
      "prefill": { "name": data[0][1], "email": data[0][1] },
      "notes": { "note_key_1": sessionStorage.getItem("indvuserid"), "note_key_2": "Edition Upgrade" },
      "theme": { "color": "#5076bb" }
    };
    //event.preventDefault();
    var rzp1 = new Razorpay(options);
    //let element: HTMLElement = document.getElementById('rzpbutton1') as HTMLElement;
    //element.click();
    rzp1.open();
    this.underprocess=true;
   
  }

 
  getstatus(response){
    setTimeout(() => {
      this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy/' + sessionStorage.getItem("indvuserid")+'/'+response.razorpay_subscription_id)
      .map(res => res.json()).subscribe(paymentdata => {
        if(paymentdata[0]=="completed"){
          this.sendstatusdetails(response,paymentdata);
        }else{
         setTimeout(() => {
            this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy/'+ sessionStorage.getItem("indvuserid")+'/'+response.razorpay_subscription_id)
            .map(res => res.json()).subscribe(paymentdata => {
              if(paymentdata[0]=="completed"){
                this.sendstatusdetails(response,paymentdata);
              }else{
                setTimeout(() => {
                   this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy/'+ sessionStorage.getItem("indvuserid")+'/'+response.razorpay_subscription_id)
                   .map(res => res.json()).subscribe(paymentdata => {
                     //this.sendstatusdetails(response,paymentdata);
                     if(paymentdata[0]=="completed"){
                       this.sendstatusdetails(response,paymentdata);
                     }else{
                      this.underprocess=false; 
                      console.log("Payment Will be Initiated or Failed");
                      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Payment will be Failed', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
                      setTimeout(() => {
                        window.location.replace('https://secure.medeil.io/medeilpos/#/userlogin/login');
                      },1200)
                    }
                   });
                 }, 3800); 
               }
            });
          }, 5000); 
        }
      },err=>{console.log(err);
        setTimeout(() => {
          this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy/'+ sessionStorage.getItem("indvuserid")+'/'+response.razorpay_subscription_id)
          .map(res => res.json()).subscribe(paymentdata => {
            //this.sendstatusdetails(response,paymentdata);
            if(paymentdata[0]=="completed"){
              this.sendstatusdetails(response,paymentdata);
            }
          });
        }, 3800); 
      });
    }, 7000); 
  }

 
  sendstatusdetails(response,paymentdata){
    this.statuschange=true;
    let element: HTMLElement = document.getElementById('mouseclick') as HTMLElement;
    element.click();
    this.http.get(this.baseResUrl2 + '/get-editionandplanid/'+AppComponent.countryID+'/'+this.editionranking+'/'+this.plantypebuy)
          .map(res => res.json()).subscribe(editionplandata => {
          let statusdetails={
              "ranking":this.editionranking,
              "suserid":sessionStorage.getItem("indvuserid"),
              "razorpaysubid":response.razorpay_subscription_id,
              "razorpaypaymentstatus":paymentdata[0],
              "planid": editionplandata[0],
              "trialemailid":this.trialmail
            }
            this.http.post(this.baseResUrl2 + '/savetrialcustomer',statusdetails).map(res => res.json()).subscribe(trialcudata => {
              if(trialcudata){
                setTimeout(() => {
                  this.underprocess=false;      
                  this.refreshmodules();
                },2100)
              }
            });
          })
  }

  refreshmodules(){
    let acctoken = jwt_decode(sessionStorage.getItem("acctoken"));
    var postdata = { username: acctoken.user_name, companyrefid: acctoken.companyid }
    this.loginService.getAuthorities(JSON.stringify(postdata)).subscribe(
      data => {
        sessionStorage.setItem("auth",JSON.stringify(data.modules));
        sessionStorage.setItem("labels",JSON.stringify(data.labels));
        if (data == null) {
          alert("Not Assigned")
        }
        else {
          sessionStorage.setItem("ranking",JSON.stringify(this.editionranking));
          this.adminlay.menu = JSON.parse(sessionStorage.getItem("auth"));
          this.adminlay.modLabel = JSON.parse(sessionStorage.getItem("labels"));
          this.router.navigate(['/dashboard']);      
        }
      },
      err => {
        sessionStorage.removeItem("moduleLabel")
        console.log("invalid_token"+err)
      }
    )
  }

}
