import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { ManualbillingService } from '../manualbilling.service';

@Component({
  selector: 'app-manualsalesorder',
  templateUrl: './manualsalesorder.component.html',
  styleUrls: ['./manualsalesorder.component.css'],
  providers: [ManualbillingService]
})

export class ManualsalesorderComponent implements OnInit {
  ManualSalesOrderForm: FormGroup;
  constructor(private manualservice:ManualbillingService,private formBuilder: FormBuilder,private dateformat: dateFormatPipe,
    private notificationsComponent: NotificationsComponent,private router: Router) { }
  fixedlength:number=2;
  manualinvcustomers:any=[];
  manualprodlength=[{},{},{}];
  plandetails:any=[];
  ngOnInit() {
    this.ManualSalesOrderForm = this.formBuilder.group({
      /*Basic Deatils */
      billdate: [this.dateformat.transformnew(Date.now()), []],
      customerrefid: ['', []],
      customername:['',[]],
      productname:['',[]],
      email:['',[]],
      phonenumber:['',[]],
      countryid:['',[]],
      domainid:['',[]],
      subdomainid:['',[]],
      editionid:['',[]],
      planid:['',[]],
      planname:['',[]],
      planamount:['',[]],
      roleid:['',[]],
      totalitems:[1,[]],    //qty
      description:['',[]],

      //Amount fields
      paidamount: [(0).toFixed(this.fixedlength), []],   //Received Amount
      balanceamount: [(0).toFixed(this.fixedlength), []],
      grandtotal: [(0).toFixed(this.fixedlength), []],
      totalamount: [(0).toFixed(this.fixedlength), []],
      totaldiscount: [(0).toFixed(this.fixedlength), []],

      //Payment Details
      paymentmode: [1, []],
      paymentlink: ['', []],
      onlinecheck: [true, []],
      offlinecheck: [false, []],
      /*for Search Select options */
      // totalqty: [0, []],
      
      /*Payment Mode */
      // cashcheck: [true, []],
      // creditcheck: [false, []],
      // debitcheck: [false, []],
      // multiplecheck: [false, []],
      // cashamt: [0.00, []],
      // creditcardamt: [0.00, []],
      // debitcardamt: [0.00, []],
      // paymenttype: ['Cash', []],
     
      
      /*Login Details */
      createdby: [sessionStorage.getItem('indvuserid'), []],

      /*form arrays Tables*/
      //invoice: this.formBuilder.array([])
    });

    this.manualservice.GetManualCustomers().subscribe(data => {this.bindmanualcustomers(data)});
  }

  bindmanualcustomers(data){
    this.manualinvcustomers = [];
    for (let i = 0; i < data.length; i++) {
      this.manualinvcustomers.push({ value: data[i].id, label:data[i].customername+' - '+data[i].emailid+' - '+data[i].phoneno,  
      editionid:data[i].editionid,roleid:data[i].roleid, planid:data[i].planid, countryid:data[i].countryid, domainid:data[i].domainid, emailid:data[i].emailid,
      subdomainid:data[i].subdomainid, verticalid:data[i].verticalid,ranking:data[i].ranking,customername:data[i].customername,shopname:data[i].shopname,phoneno:data[i].phoneno});
    }
  }

  getinvcustomerinfo(){
    let custid = this.ManualSalesOrderForm.get('customerrefid').value;
    let subindx= this.manualinvcustomers.findIndex(p => p.value==custid);
    this.manualservice.GetManualPlanDetails(this.manualinvcustomers[subindx].planid).subscribe(plandata => {
    this.plandetails=plandata;
    this.ManualSalesOrderForm.patchValue({
      customername:this.manualinvcustomers[subindx].customername,
      email:this.manualinvcustomers[subindx].emailid,
      phonenumber:this.manualinvcustomers[subindx].phoneno,
      countryid:this.manualinvcustomers[subindx].countryid,
      domainid:this.manualinvcustomers[subindx].domainid,
      subdomainid:this.manualinvcustomers[subindx].subdomainid,
      editionid:this.manualinvcustomers[subindx].editionid,
      planid:this.manualinvcustomers[subindx].planid,
      planname:plandata[0][0],
      planamount:parseFloat(plandata[0][1]).toFixed(2),
      grandtotal:parseFloat(plandata[0][1]).toFixed(2),
      totalamount:parseFloat(plandata[0][1]).toFixed(2),
      roleid:this.manualinvcustomers[subindx].roleid,
      productname:plandata[0][0]
    });
    });
  }

  setpaymode(event,index){
    if(event.target.checked){
      this.ManualSalesOrderForm.get('paymentmode').setValue(index);
      if(index==1){
        this.ManualSalesOrderForm.get('onlinecheck').setValue(true);
        this.ManualSalesOrderForm.get('offlinecheck').setValue(false);
      }else{
        this.ManualSalesOrderForm.get('offlinecheck').setValue(true);
        this.ManualSalesOrderForm.get('onlinecheck').setValue(false);
      }
    }
  }

  disccalc(){
    var plamount=this.ManualSalesOrderForm.get('planamount').value;
    var discamt=this.ManualSalesOrderForm.get('totaldiscount').value;
    this.ManualSalesOrderForm.get('paidamount').setValue((0).toFixed(this.fixedlength));
    this.ManualSalesOrderForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
    if(plamount<=0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Plan Amount not to be a Zero...', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      this.ManualSalesOrderForm.get('grandtotal').setValue((0).toFixed(this.fixedlength));
      this.ManualSalesOrderForm.get('totalamount').setValue((0).toFixed(this.fixedlength));
    }else if(discamt>plamount){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Discount Amount > Plan Amount', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      this.ManualSalesOrderForm.get('grandtotal').setValue(plamount);
      this.ManualSalesOrderForm.get('totalamount').setValue(plamount);
    }else{
      var totalcalc=plamount-discamt;
      this.ManualSalesOrderForm.get('grandtotal').setValue((totalcalc).toFixed(this.fixedlength));
      this.ManualSalesOrderForm.get('totalamount').setValue((totalcalc).toFixed(this.fixedlength));
    }
  }

  calbalance(){
    var paidamt=this.ManualSalesOrderForm.get('paidamount').value;
    var grandtotal=this.ManualSalesOrderForm.get('grandtotal').value;
    if(grandtotal<=0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Grand Total not to be Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      this.ManualSalesOrderForm.get('paidamount').setValue((0).toFixed(this.fixedlength));
      this.ManualSalesOrderForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
    }else if(paidamt<grandtotal){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Received Amount less than Total', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      this.ManualSalesOrderForm.get('paidamount').setValue((0).toFixed(this.fixedlength));
      this.ManualSalesOrderForm.get('balanceamount').setValue((0).toFixed(this.fixedlength));
    }else{
      var balamount=parseFloat(paidamt)-parseFloat(grandtotal);
      this.ManualSalesOrderForm.get('balanceamount').setValue((balamount).toFixed(this.fixedlength));
    }
  }

  savesalesordervalidate(){
    var grandtotal=this.ManualSalesOrderForm.get('grandtotal').value;
    var paidamt=this.ManualSalesOrderForm.get('paidamount').value;
    var paylink=this.ManualSalesOrderForm.get('paymentlink').value;
    if(grandtotal<=0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Grand Total not to be Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(paidamt<=0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Received Amount not to be Zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(paylink==''||paylink==null||paylink==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Payment Link not to be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  savesalesorder(){
    let valflag=this.savesalesordervalidate();
    if(valflag){
      var grandtotal=this.ManualSalesOrderForm.get('grandtotal').value;
      var totalamt=this.ManualSalesOrderForm.get('totalamount').value;
      var plamount=this.ManualSalesOrderForm.get('planamount').value;
      var discamt=this.ManualSalesOrderForm.get('totaldiscount').value;
      var paidamt=this.ManualSalesOrderForm.get('paidamount').value;
      var balamount=  this.ManualSalesOrderForm.get('balanceamount').value;
      this.ManualSalesOrderForm.get('grandtotal').setValue(parseInt(grandtotal));
      this.ManualSalesOrderForm.get('totalamount').setValue(parseInt(totalamt));
      this.ManualSalesOrderForm.get('planamount').setValue(parseInt(plamount));
      this.ManualSalesOrderForm.get('totaldiscount').setValue(parseInt(discamt));
      this.ManualSalesOrderForm.get('paidamount').setValue(parseInt(paidamt));
      this.ManualSalesOrderForm.get('balanceamount').setValue(parseInt(balamount));
      //this.ManualSalesOrderForm.get('createdby').setValue(parseInt(sessionStorage.getItem('indvuserid')));
      this.manualservice.savesalesorder(this.ManualSalesOrderForm.value).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'Sucess MSG', msg: 'Data Saved Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          setTimeout(() => {
            this.router.navigate(['ManualBilling/ManualSalesOrderList']);
          }, 1350);
        }
      },err=>{console.log(err);
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
    }
  }

}
