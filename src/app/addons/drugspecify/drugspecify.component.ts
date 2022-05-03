import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { addonsService } from '../addons.service';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout.component';

@Component({
  selector: 'app-drugspecify',
  templateUrl: './drugspecify.component.html',
  styleUrls: ['./drugspecify.component.css'],
  providers:[addonsService,NotificationsComponent]
})
export class DrugspecifyComponent implements OnInit {
  drugspecifyForm: FormGroup;
  employeelist=[];
  salesinvproducts=[];
  constructor(private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent,private addonservice:addonsService,
    private adminlay: AdminLayoutComponent) { }

  ngOnInit() {

    this.drugspecifyForm = this.formBuilder.group({
      companyid: [AppComponent.companyID, []],
      employeeid: ['opt1', []],
      drugid:['',[]],
      drugproducts: this.formBuilder.array([]),
    });

    this.addonservice.getemployeelist(sessionStorage.getItem('indvuserid')).subscribe(data => { alert(JSON.stringify(data)),
      this.employeelist=data
    },error => { console.log(error); });


  }

  searchdrug(searchvalue,searchid) {
   
    let customerid = this.drugspecifyForm.get('employeeid').value;
  
      if (searchvalue.length > 0) {

        if (customerid == 'opt1' || customerid == null || customerid == undefined){
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First you Select Employee', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        } else{
        let searchdrugdata = { companyid: 15, branchrefid: 12, locname: 1, locrefid: 18, searchvalue, searchid };
              this.addonservice.searchdrug(JSON.stringify(searchdrugdata)).subscribe(data => { 
                if(data.length>0){ 
                  this.salesinvproducts=[];
                  this.salesinvproducts = data;
                } else{
                  this.salesinvproducts=[];
                  this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
                }},
                error => { console.log(error); });
        }
      }
     
  }

  i:any;
  insertproducts(data) {
   const control = <FormArray>this.drugspecifyForm.controls['drugproducts'];
     for (this.i = 0; this.i < 1; this.i++) {
           control.insert(0, this.formBuilder.group({
             companyid: [AppComponent.companyID, []],
             userid: [sessionStorage.getItem('indvuserid'), []],
             employeeid:[this.drugspecifyForm.get('employeeid').value,[]],
             subscriptiondays:[300],
             stockid:[data[10],[]],
             drugid:[data[1],[]],
             drugname:[data[0],[]],
             type:["Drug Specify",[]],
             amount:[230,[]],
             status:[1,[]],
             paymentstatus:[true,[]]
            /*Login Details */
           }));
         }
    this.salesinvproducts=[];
 }

 cartitems=[];
 totalamount:any=0;
 savedrugspecify(){
  const control = <FormArray>this.drugspecifyForm.controls['drugproducts'];
  if(control.length>0){
      sessionStorage.setItem("drugspecifyitems",JSON.stringify(control.value));
      for (this.i = 0; this.i < control.length; this.i++) {
        this.totalamount+=control.value[this.i].amount;
      }
      let getcartitems=JSON.parse(sessionStorage.getItem('cartitems'));
      if(getcartitems==null||getcartitems==''||getcartitems==undefined){
        this.cartitems.push({
          itemname:'Drug Specify',
          itemqty:control.length,
          itemrate:(parseInt(this.totalamount)/control.length).toFixed(1),
          itemtotal:parseInt(this.totalamount),
          itempic:"assets/images/poptab.jpg"
        });
        sessionStorage.setItem("cartitems",JSON.stringify(this.cartitems))
        this.adminlay.cartitems();
      }else{
        getcartitems.push({
          itemname:'Drug Specify',
          itemqty:control.length,
          itemrate:(parseInt(this.totalamount)/control.length).toFixed(1),
          itemtotal:parseInt(this.totalamount),
          itempic:"assets/images/poptab.jpg"
        });
        sessionStorage.setItem("cartitems",JSON.stringify(getcartitems))
        this.adminlay.cartitems();
      }
    
     
  }
 }

 removerow(indexid) {
  const control = <FormArray>this.drugspecifyForm.controls['drugproducts'];
  control.removeAt(indexid);
  }


}
