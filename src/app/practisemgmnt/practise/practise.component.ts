import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { practiceService } from './practise.service';

@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  providers: [practiceService]
})
export class PractiseComponent implements OnInit {

  url = '';
  result: any[];
  patientlist = [];
  doctorlist = [];
  itemlength = [{}, {}, {}, {}, {}];
  practiceForm: FormGroup;
  doctorslist = [];
  searchProducts = [];
  val: boolean;
  prodid: any;
  replaceindex: string;
  constructor(private fb: FormBuilder, private Service: practiceService,private notificationsComponent: NotificationsComponent) {
    this.practiceForm = this.fb.group({
      choosetype: [],
      morning: [],
      afternoon: [],
      evening: [],
      night: [],
      productid: [],
      stkqty: [],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1],
      diagnosis: [],
      weight: [],
      temperature: [],
      bloodsugar: [],
      bloodpressure: [],
      beforeafterfood: [],
      totalmedicine:[],
      days:[],
      patientid:[],
      doctorid:[],
      consultationfee:[0],
      prescriptionproduct: this.fb.array([])
    })
  }

  ngOnInit() {
    let getdoctors = { companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1 };
    this.Service.getdoctors(JSON.stringify(getdoctors)).subscribe(data => { this.doctorslist = data },
      error => {
        console.log(error)
      });

    this.Service.getCustomer(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.patientlist = data },
      error => {
        console.log(error)
      });
  }
  choosetype() {
    if (this.practiceForm.get('choosetype').value == 1) {
      this.practiceForm.get('morning').setValue(0);
      this.practiceForm.get('afternoon').setValue(0);
      this.practiceForm.get('evening').setValue(0);
      this.practiceForm.get('night').setValue(1);
    }
    if (this.practiceForm.get('choosetype').value == 2) {
      this.practiceForm.get('morning').setValue(1);
      this.practiceForm.get('afternoon').setValue(0);
      this.practiceForm.get('evening').setValue(0);
      this.practiceForm.get('night').setValue(1);
    }
    if (this.practiceForm.get('choosetype').value == 3) {
      this.practiceForm.get('morning').setValue(1);
      this.practiceForm.get('afternoon').setValue(1);
      this.practiceForm.get('evening').setValue(0);
      this.practiceForm.get('night').setValue(1);
    }
    if (this.practiceForm.get('choosetype').value == 4) {
      this.practiceForm.get('morning').setValue(1);
      this.practiceForm.get('afternoon').setValue(1);
      this.practiceForm.get('evening').setValue(1);
      this.practiceForm.get('night').setValue(1);
    }
  }

  searchProduct(searchValue: any) {
    let searchdrugdata = { companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1, searchvalue: searchValue, searchid: 1 };
    this.Service.searchdrug(JSON.stringify(searchdrugdata)).subscribe(data => {
      if (data.length > 0) {
        this.searchProducts = [];
        for (let j = 0; j < data.length; j++) {
          this.searchProducts.push({ value: data[j][1], label: data[j][0], qty: data[j][3] });
        }
      } else {
        this.searchProducts = [];
      }
    },
      error => { console.log(error); });
  }


  stkqty;
  drugname;
  fetchqty() {
    let product = this.practiceForm.get('productid').value;
    let subindx = this.searchProducts.findIndex(p => p.value == product);
    this.stkqty = this.searchProducts[subindx].qty;
    this.drugname = this.searchProducts[subindx].label;
    this.practiceForm.get('stkqty').setValue(this.stkqty);
  }

  fetchTableData() {
    const getData = <FormArray>this.practiceForm.controls['prescriptionproduct'];
    getData.push(
      this.fb.group({
        productname:[this.drugname],
        drugproductid: [this.practiceForm.get('productid').value],
        morning: [this.practiceForm.get('morning').value],
        afternoon: [this.practiceForm.get('afternoon').value],
        evening: [this.practiceForm.get('evening').value],
        night: [this.practiceForm.get('night').value],
        beforeafterfood: [this.practiceForm.get('beforeafterfood').value],
        days: [this.practiceForm.get('days').value],
        totalmedicine: [this.practiceForm.get('totalmedicine').value],
        companyrefid: [AppComponent.companyID],
        branchrefid: [AppComponent.branchID],
        locname: [AppComponent.locRefName1],
        locrefid: [AppComponent.locrefID1]
      })
    )
  }

  onSubmit(){
    this.val = this.validation();
if(this.val){
    const getData = <FormArray>this.practiceForm.controls['prescriptionproduct'];
    let setData = getData.value;
    this.Service.savePracticemgmt(this.practiceForm.value).subscribe(data => {
      if(data){
        this.Service.savePracticemgmtprod(setData).subscribe(data => {
          if(data){
            this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Data Saved Succesfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          }else{
            this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          }
        })
      }
    })
  }else{
    this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
         
  }
  
  }
  removerow(indexid) {
    const control = <FormArray>this.practiceForm.controls['prescriptionproduct'];
    control.removeAt(indexid);
    this.replaceindex = '';
   
  }

  validation(): boolean {

    // if (this.LoyalityForm.get('loyality_type').value == '' || this.LoyalityForm.get('loyality_type').value == null) {
    //   this.notification.addToast({ title: 'Error Message', msg: 'Enter Loyality Scheme Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (this.practiceForm.get('patientid').value == '' || this.practiceForm.get('patientid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Patient Name ..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.practiceForm.get('temperature').value == '' || this.practiceForm.get('temperature').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Patient Temperature..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.practiceForm.get('bloodpressure').value == '' || this.practiceForm.get('bloodpressure').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Patient Temperature..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.practiceForm.get('weight').value == '' || this.practiceForm.get('weight').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Weight Temperature..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.practiceForm.get('consultationfee').value == null || this.practiceForm.get('consultationfee').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Consultation Fee..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    return true;
  }

}
