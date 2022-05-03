import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout.component';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
import { Router } from '@angular/router';
declare var Razorpay: any;

@Component({
  selector: 'app-cartitems',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.css'],
  providers:[NotificationsComponent]
})
export class CartitemsComponent implements OnInit {
  cartdata=[];
  baseResUrl2 = environment.backend.paymentUrl;
  exptime:any=0;
  constructor(private adminlay: AdminLayoutComponent, private notificationsComponent: NotificationsComponent, 
    private http:Http,private router: Router) { }

  CountryID:any;
  plantype:any;
  gifLoad:boolean=true;
  ngOnInit() {
    this.cartdata=JSON.parse(sessionStorage.getItem("cartitems"));
    this.CountryID=AppComponent.countryID;
    this.gifLoad=true;
    this.calculations();
    this.http.get(this.baseResUrl2 + '/get-remaining-days/'+sessionStorage.getItem('indvuserid')).map(res => res.json())
    .subscribe(data => {this.exptime= data[1]},
      err => console.log("error on getcountry"));
    setTimeout(() => {
      this.http.get(this.baseResUrl2 + '/get-plandetails/'+sessionStorage.getItem('indvuserid')).map(res => res.json())
      .subscribe(data => {  this.plantype=data[0][4]}, 
        err => console.log("error on getcountry"));
      setTimeout(() => {
        this.gifLoad=false;
      }, 1000);
    },1200);
    
    // this.SalesinvoiceForm = this.formBuilder.group({
    //   newproduct: this.formBuilder.array([]),
    // })
   
  }

  removeitem(indx){
    this.cartdata.splice(indx,1);
    sessionStorage.setItem('cartitems',JSON.stringify(this.cartdata));
    this.adminlay.cartitems();
    this.calculations();
  }

  subtotal:any=0;
  usercount:any=0;
 
  calculations(){
      this.subtotal=0;
      let cartdata=JSON.parse(sessionStorage.getItem("cartitems"));
      if(cartdata!=null||cartdata!=''||cartdata!=undefined){
        for(let i=0;i<cartdata.length;i++){
          //this.subtotal+=cartdata[i].itemqty*cartdata[i].itemrate+parseInt(cartdata[i].itemtax);
          this.subtotal+=parseFloat(cartdata[i].itemtotal)
          if(cartdata[i].itemname=="Additional Users"){
            this.usercount=cartdata[i].itemqty
          }
        }
        this.subtotal=(Math.ceil(this.subtotal)).toFixed(2);
      }
  }

  getbuytype;
  razorplanid;
  starttime;
  endtime;
  amount;
  currency;
  editionranking:any;
  payment(){
    this.editionranking = sessionStorage.getItem('ranking');
    this.getbuytype=event;
    if(this.subtotal>0){
      this.http.get(this.baseResUrl2 + '/get-razorpayplanid/'+this.editionranking+'/'+AppComponent.countryID+'/'+this.plantype).map(res => res.json()).subscribe(data => {
        if(data != null){
          this.razorplanid = data[0][0],
          this.starttime = data[0][1],
          this.endtime = this.exptime,
          this.amount = parseInt(this.subtotal),
          this.currency = data[0][4]
          this.savesubcription();
        }else{
          err => console.log("error on get-razorpayplanid",err);
        }
      })
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Make a Total', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
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
          "notes_key_2":"Cart Items",
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
    addonslist:any=[];
    subscribeid:any;
    openEvent(data) {
      this.subscribeid=data[0][0];
      var options = {
        "key": "rzp_live_DLJiaXRnr8NSGv", "subscription_id": data[0][0],
        "name": data[0][2],
        "description":"Medeil POS Plan",
        "image": "http://vanuston.com/images/vanuston%20images/sliderimages/roundlogo.png",
        'handler': this.getstatus.bind(this),
        "modal": {
          "ondismiss": function(){
              alert("Payment Cancelled");
              window.location.replace('http://localhost:4200/#/userlogin/login');
            }
          },
        "prefill": { "name": data[0][1], "email": data[0][1] },
        "notes": { "note_key_1": sessionStorage.getItem("indvuserid"), "note_key_2": "Make it so." },
        "theme": { "color": "#5076bb" }
      };
      //event.preventDefault();
      var rzp1 = new Razorpay(options);
      //let element: HTMLElement = document.getElementById('rzpbutton1') as HTMLElement;
      //element.click();
      rzp1.open();
      this.underprocess=true;
    }

    paymentstatus:any;
    getstatus(response){
      setTimeout(() => {
        this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy'+ '/' + sessionStorage.getItem('indvuserid')+'/'+ response.razorpay_subscription_id)
        .map(res => res.json()).subscribe(paymentdata => {this.paymentstatus=paymentdata[0];
          if(paymentdata[0]=="completed"){
              this.paysuccess();
            }else{
            setTimeout(() => {
              this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy' + '/' + sessionStorage.getItem('indvuserid')+'/'+response.razorpay_subscription_id)
              .map(res => res.json()).subscribe(paymentdata => {
                if(paymentdata[0]=="completed"){
                  this.paysuccess();
                }else{
                  setTimeout(() => {
                    this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy' + '/' + sessionStorage.getItem('indvuserid')+'/'+ response.razorpay_subscription_id)
                    .map(res => res.json()).subscribe(paymentdata => {
                      if(paymentdata[0]=="completed"){
                        this.paysuccess();
                      }else{
                        console.log("Payment Will be Initiated or Failed");
                        this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Payment will be Failed', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
                        setTimeout(() => {
                          window.location.replace('https://secure.medeil.io/medeilpos/#/userlogin/login');
                        },1200);
                      }
                    });
                  }, 7500); 
                }  
              });
            }, 7000); 
          }
        },err=>{console.log(err);
          setTimeout(() => {
            this.http.get(this.baseResUrl2 + '/razorpay-payment-statusbuy' + '/' + sessionStorage.getItem('indvuserid')+'/'+ response.razorpay_subscription_id)
            .map(res => res.json()).subscribe(paymentdata => {
              if(paymentdata[0]=="completed"){
                this.paysuccess();
              }
            });
          }, 3800); 
        });
      }, 7000); 

       //send Addons List
       setTimeout(() => {
        let cartdata=JSON.parse(sessionStorage.getItem("cartitems"));
        if(cartdata!=null||cartdata!=''||cartdata!=undefined){
          this.addonslist=[];
          for(let i=0;i<cartdata.length;i++){
            this.addonslist.push({
              countryid:AppComponent.countryID,
              companyid:AppComponent.companyID,
              userid:sessionStorage.getItem('indvuserid'),
              status:0,
              qty:cartdata[i].itemqty,
              productdetails:cartdata[i].itemname,
              amt:cartdata[i].itemrate,
              taxamt:cartdata[i].itemtax,
              razorpayplanid:response.razorpay_subscription_id
            })
          };

          setTimeout(() => {
            this.http.post(this.baseResUrl2 + '/create-drug-addons',this.addonslist).map(res => res.json())
            .subscribe(addonsdata => {});
          }, 900);
        }
      }, 1000);
    }
    
    paysuccess(){
      let cartdata=JSON.parse(sessionStorage.getItem("cartitems"));
      this.statuschange=true;
      let element: HTMLElement = document.getElementById('mouseclick') as HTMLElement;
      element.click();
      for(let i=0;i<cartdata.length;i++){
        if(cartdata[i].itemname=="Additional Users"){
          this.updateuser();
        }else if(cartdata[i].itemname=="Drug Specify"){
          this.drugspecify(cartdata[i].itemtotal);
        }else if(cartdata[i].itemname=="Customize Bill"){
          this.customizebill();
        }
      }
    }

    updateuser(){
      this.statuschange=true;
      // let element: HTMLElement = document.getElementById('mouseclick') as HTMLElement;
      // element.click();
      this.http.get(this.baseResUrl2 + '/update-usercount'+ '/' + AppComponent.companyID + '/' + this.usercount)
            .map(res => res.json()).subscribe(data => {
              if(data){
                this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'User Count Updated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                setTimeout(() => {
                  sessionStorage.removeItem('cartitems');
                  this.adminlay.cartitems();
                  this.router.navigate(['/dashboard']);
                },1800);
              }
          
            });
    }

    drugspecify(totamount){
      let drugaddons={
        userid:sessionStorage.getItem('indvuserid'),
        employeeid:sessionStorage.getItem('indvuserid'),
        drugspecification:true,
        drugspecificationamt:totamount,
        drugspecificationstatus:"completed" //this.paymentstatus
      }
      this.http.post(this.baseResUrl2 + '/update-drug-addons',drugaddons).map(res => res.json()).subscribe(addonsdata => {
        if(addonsdata){
          this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Drug Specify Created Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        }
      });
    }

    customizebill(){
      alert("Cuztomize Bill Call");
    }
    

}
