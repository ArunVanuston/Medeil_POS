import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-addonsbuy',
  templateUrl: './addonsbuy.component.html',
  styleUrls: ['./addonsbuy.component.css']
})
export class AddonsbuyComponent implements OnInit {

  constructor(private adminlay: AdminLayoutComponent,private notificationsComponent: NotificationsComponent) { }

  ngOnInit() {
  }
  showaddons:number=0;
  addonspaginate(pageno){
    this.showaddons=pageno;
  }

  drugspecifyinitial=[];
  drugspecifycart(){
  //this.createaddonsrecord();
  let getcartitems=JSON.parse(sessionStorage.getItem('cartitems'));
    if(getcartitems==null||getcartitems==''||getcartitems==undefined){
      this.drugspecifyinitial.push({ itemname:'Drug Specify', itemqty:1, itemrate:(580).toFixed(2), itemtotal:(580+(580/100)*18).toFixed(2), itemtax:((580/100)*18).toFixed(2), itempic:"assets/images/addons/drug1.png" });
      sessionStorage.setItem('cartitems',JSON.stringify(this.drugspecifyinitial));
      this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Added Cart SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.adminlay.cartitems();
    }else{
      let vari=false;
      for(let i=0;i<getcartitems.length;i++){
        if(getcartitems[i].itemname=="Drug Specify"){
          vari=true;
          this.adminlay.cartitems();
          break;
        }
      }
      if(vari){
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Already added in Cart ', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }else{
        getcartitems.push({ itemname:'Drug Specify', itemqty:1, itemrate:(580).toFixed(2), itemtotal:(580+(580/100)*18).toFixed(2), itemtax:((580/100)*18).toFixed(2), itempic:"assets/images/addons/drug1.png" })
          sessionStorage.setItem('cartitems',JSON.stringify(getcartitems));
          this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Added Cart SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.adminlay.cartitems();
        }
    }
  }

  druginteractinitial=[];
  druginteractcart(){
    //this.createaddonsrecord();
    let getcartitems=JSON.parse(sessionStorage.getItem('cartitems'));
      if(getcartitems==null||getcartitems==''||getcartitems==undefined){
        this.druginteractinitial.push({ itemname:'Drug Interaction', itemqty:1, itemrate:(450).toFixed(2), itemtotal:(450+(450/100)*18).toFixed(2), itemtax:((450/100)*18).toFixed(2), itempic:"assets/images/addons/drug3.png" });
        sessionStorage.setItem('cartitems',JSON.stringify(this.druginteractinitial));
        this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Added Cart SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.adminlay.cartitems();
      }else{
        let vari=false;
        for(let i=0;i<getcartitems.length;i++){
          if(getcartitems[i].itemname=="Drug Interaction"){
            vari=true;
            this.adminlay.cartitems();
            break;
          }
        }
        if(vari){
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Already added in Cart ', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }else{
          getcartitems.push({ itemname:'Drug Interaction', itemqty:1, itemrate:(450).toFixed(2), itemtotal:(450+(450/100)*18).toFixed(2), itemtax:((450/100)*18).toFixed(2), itempic:"assets/images/addons/drug3.png" })
            sessionStorage.setItem('cartitems',JSON.stringify(getcartitems));
            this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Added Cart SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            this.adminlay.cartitems();
          }
      }
  }

  // createaddonsrecord(){
  //   let drugaddons={
  //     countryid:AppComponent.countryID,
  //     companyid:AppComponent.companyID,
  //     productid:this.productid,
  //     userid:sessionStorage.getItem('indvuserid'),
  //     employeeid:0,
  //     subscriptiondays:this.expdays,
  //     planid:this.planidd,
  //     status:0,
  //   }
  //   this.http.post(this.baseResUrl2 + '/create-drug-addons',drugaddons).map(res => res.json()).subscribe(addonsdata => {
  //     if(addonsdata){
  //       //this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Created', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
  //     }
  //   });
  // }

}
