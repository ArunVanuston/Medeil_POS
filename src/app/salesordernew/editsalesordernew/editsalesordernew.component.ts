import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { salesOrderServicenew } from '../salesordernew.services';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from './../../notifications/notifications.datepipe';
declare var $: any;
import { AppComponent } from '../../app.component';
import { TranslateService } from 'ng2-translate'; 
@Component({
  selector: 'app-editSalesOrder',
  templateUrl: './editsalesordernew.component.html',
  styleUrls: ['./editsalesordernew.component.css']
})

export class editsalesOrderComponentnew implements OnInit {
  parentMessage="sales";
  itemlength=[{},{},{},{},{}]
  @ViewChild("qty") qty: any;
  salesOrderForm: any;
  searchProducts = [];
  patientlist = [];
  sotype = [];
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  pattern: any = '^[0-9]+(\.[0-9]{1,3})?$';
  id: any;
  deviceForm: FormGroup;
  deviceObj: any;
  starttime: any;
  endtime: any;

  constructor(public translate: TranslateService,private salesOrderService: salesOrderServicenew, private dateformat: dateFormatPipe,private notificationsComponent: NotificationsComponent,
    private fb: FormBuilder, private rout: ActivatedRoute, private route: Router, private appComponent: AppComponent) { translate.setDefaultLang('en');
   
      this.salesOrderForm = this.fb.group({
      id: this.id,
      orderdate: ['',[]],
      drugproductid: ['', []],
      deliverytype: ['', []],
      patientid: ['', []],
      mobileno:['',[]],
      quantity: ['', [Validators.pattern(this.textnumbers)]],
      salesorderno: ['', []],
      totalitem: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      clientcdate: ['', []],
      sotype: ['',[]],
      eDetails: this.fb.array([
      ]),

    });


  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.starttime=this.dateformat.transform06();

    this.id = this.rout.snapshot.paramMap.get('id');
    this.salesOrderForm.get('deliverytype').setValue('opt1');
    this.salesOrderForm.get('patientid').setValue('opt1');

    this.salesOrderService.editSalesdata(this.id).subscribe(data => {
      this.salesOrderForm.patchValue(data);
    //  this.salesOrderForm.get('orderdate').setValue(data.orderdate);
    
      this.salesOrderService.patientList(this.salesOrderForm.get('companyrefid').value, this.salesOrderForm.get('branchrefid').value, this.salesOrderForm.get('locrefid').value, this.salesOrderForm.get('locname').value).subscribe(data => { this.patientlist = data },
        err => {
          console.log('Error occured On patientList()');
        });
        this.salesOrderService.getsotype().subscribe(data => this.sotype = data,
          err => {
            console.log('Error Occured ');
           });
     
      if (data !== null || data !== '') {
        this.salesOrderService.editSalesOrderRecord(this.id).subscribe(data => {
          this.editprdoductData(data),
            err => {
              console.log('Error occured On editSalesdata()');
            }
        })
      }
    },
      err => {
        console.log('Error occured On editSalesOrderRecord()');
      });
  //    alert(this.salesOrderForm.get('orderdate').value);
  }

  searchProduct(searchValue:any){
    let searchdrugdata = { companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1, searchvalue: searchValue, searchid:1 };
    this.salesOrderService.searchdrug(JSON.stringify(searchdrugdata)).subscribe(data => {
      if (data.length > 0) {
        this.searchProducts = [];
        for (let j = 0; j < data.length; j++) {
          this.searchProducts.push({ value: data[j][1], label: data[j][0] });
        }
      } else {
        this.searchProducts = [];
      }
    },
      error => { console.log(error); });
  }

  searchProduct1(searchValue: any) {
    this.salesOrderService.searchProduct(searchValue, this.salesOrderForm.get('companyrefid').value, this.salesOrderForm.get('branchrefid').value, this.salesOrderForm.get('locrefid').value, this.salesOrderForm.get('locname').value).subscribe(data => {
      this.searchProducts = [];
      for (let j = 0; j < data.length; j++) {
        this.searchProducts.push({ value: data[j][0], label: data[j][1] });
      }
    },
      err => {
        console.log('Error occured On searchProduct()');
      });
  }

  setFocus() {
    this.qty.nativeElement.focus();
  }

  getProductInfo() {
    if (this.salesOrderForm.get('drugproductid').value == '' || this.salesOrderForm.get('drugproductid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    } else {
      this.salesOrderService.getsalesProdcut(this.salesOrderForm.get('drugproductid').value).subscribe(data => { this.getProoductData(data) });
    }
  }


  inc = 0;
  getProoductData(data: any) {
    let flag: number = 0;
    if (data !== null || data !== undefined) {

      const getData = <FormArray>this.salesOrderForm.controls['eDetails'];

      for (let k = 0; k < data.length; k++) {
        let sourceData = getData.value;
        for (let c = 0; c < sourceData.length; c++) {
          if (data[k][3] == sourceData[c].drugproductid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[k][0].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          this.salesOrderForm.get('quantity').setValue('');
        }
        else {
          getData.push(this.setProoductData(
            data[k][0],
            data[k][1],
            data[k][2],
            data[k][3]
          ));
          this.inc += 1;
          this.salesOrderForm.get('quantity').setValue('');
          this.searchProducts = [];
        }
      }
    }
  }



  setProoductData(d0: any, d1: any, d2: any, d3: any) {
    return this.fb.group({
      ID: this.inc,
      sno: this.inc + 1,
      productname: d0,
      dosage: d1,
      formulation: d2,
      totalqty: this.salesOrderForm.get('quantity').value,
      drugproductid: d3,
      boxqty: 0,
      stripqty: 0,
      tabletqty: 0,
      salesorderrefid: this.id
    });
  }
 
  flag1:boolean = false;
  removeRow(index: number) {
    const getData = <FormArray>this.salesOrderForm.controls['eDetails'];
    getData.removeAt(index)
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
       getData.reset();
    }
  }

  public flag: boolean = false;
  saveprocess:boolean=false;
  onSubmit() {
    this.flag = this.salesOrderValidation();
    if (this.flag == true) {
      this.saveprocess=true;
      this.salesOrderForm.get('clientcdate').setValue(AppComponent.date);
      const getData = this.salesOrderForm.controls['eDetails'];
      this.salesOrderForm.get('totalitem').setValue(getData.length);
      this.salesOrderService.updateSalesorder(JSON.stringify(this.salesOrderForm.value)).subscribe(data => {
        if (data == true) {
          this.salesOrderService.updateSaleRecord(JSON.stringify(getData.value)).subscribe(data => {
            if (data == true) {
              this.saveprocess=false;
              this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Data Updated Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              this.route.navigate(['SalesOrder/SalesOrderHistory']);
            }
          });
        } else {
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SalesOrder Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },
        err => {
          this.saveprocess=false;
          console.log('Error Occured On createSalesorder()');
        })
    }
  }

  salesOrderValidation(): boolean {
    if (this.salesOrderForm.get('orderdate').value == '' || this.salesOrderForm.get('orderdate').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Required Order Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.salesOrderForm.get('patientid').value == 'opt1' || this.salesOrderForm.get('patientid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Required Patient name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }


  print(): void {

  }



  editprdoductData(data: any) {


    if (data !== null || data !== undefined) {

      const getData = <FormArray>this.salesOrderForm.controls['eDetails'];

      for (let s = 0; s < data.length; s++) {



        getData.push(this.getEditdata(
          data[s][0],
          data[s][1],
          data[s][2],
          data[s][3],
          data[s][4],
          data[s][5],
          data[s][6],
          data[s][7]
        ));
        this.inc += 1;
      }
    }
  }


  getEditdata(s0: any, s1: any, s2: any, s3: any, s4: any, s5: any, s6: any, s7: any): any {
    return this.fb.group({
      ID: this.inc,
      sno: this.inc + 1,
      productname: s0,
      dosage: s1,
      formulation: s2,
      boxqty: s3,
      stripqty: s4,
      tabletqty: s5,
      totalqty: s6,
      drugproductid: s7,
      salesorderrefid: this.id,
    
    });
  }

  goBack() {
    this.route.navigate(['SalesOrder/SalesOrderHistory']);
  }
}