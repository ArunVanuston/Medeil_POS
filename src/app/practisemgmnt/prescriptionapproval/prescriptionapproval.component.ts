import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';
import { PrescriptionService } from '../prescription/prescription.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { PrescriptionApprovalService } from './prescriptionapproval.service';

@Component({
  selector: 'app-prescriptionapproval',
  templateUrl: './prescriptionapproval.component.html',
  styleUrls: ['./prescriptionapproval.component.css'],
  providers: [PrescriptionApprovalService, NotificationsComponent]
})
export class PrescriptionapprovalComponent implements OnInit {
  prescForm: any;
  imgurl;
  prescrplist: any;
  searchProducts = [];
  prodcode: any;
  empname: any;
  constructor(private router: Router, private fb: FormBuilder, private prescrepservice: PrescriptionApprovalService, private notificationsComponent: NotificationsComponent) {
    this.prescForm = this.fb.group({
      pdigitalizedno: ['', []],
      pdigitalizedid: ['', []],
      salesorderid: ['', []],
      salesorderno: ['', []],
      patientname: ['', []],
      doctorname: ['', []],
      age: ['', []],
      gender: ['', []],
      createddate: ['', []],
      createdby: ['', []],
      modifiedby: ['', []],
      modifieddate: ['', []],
      emprefid: ['', []],
      remarks: ['', []],
      drugproductid: ['', []],
      qty: ['', []],
      days: ['', []],
      morning: ['', []],
      afternoon: ['', []],
      evening: ['', []],
      night: ['', []],
      employeename: ['', []],
      imageurl: ['', []],
      approvsts:['0',[]],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      prescproduct: this.fb.array([

      ])
    })
  }

  ngOnInit() {
    this.imgurl = "assets/images/prescription.png";
    this.prescForm.get('salesorderid').setValue('opt1');
    this.prescrepservice.getprescriptionlist(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(
      data => {
        this.prescrplist = data
      }
    )

    this.prescrepservice.getemplist(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(
      data => {
        this.empname = data
      }
    )
  }
  getpresdetails() {
    this.prescrepservice.getprecdetails(this.prescForm.get('salesorderid').value).subscribe(
      data => {
      this.imgurl = data[0][0], this.prescForm.get('patientname').setValue(data[0][1]),
        this.prescForm.get('gender').setValue(data[0][2])
      }
    )
  }
  searchProduct(searchValue: any) {
    this.prescrepservice.getsearchproduct(this.prescForm.get('companyrefid').value, this.prescForm.get('branchrefid').value, this.prescForm.get('locrefid').value, this.prescForm.get('locname').value, searchValue).subscribe(data => {
      this.searchProducts = [];
      for (let j = 0; j < data.length; j++) {
        this.searchProducts.push({ value: data[j][0], label: data[j][1] });
      }
    },
      err => {
        console.log('Error occured On searchProduct()');
      });
  }
  getproductcode() {
    this.prescrepservice.getproduct(AppComponent.companyID, this.prescForm.get('drugproductid').value).subscribe(
      data => {
        this.prodcode = data[0][1]
      }
    )
  }
  getprescpfield() {
    this.prescrepservice.getprescripfield(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.prescForm.get('pdigitalizedid').value).subscribe(
      data => {
        this.getprescptionfielddata(data)
      }
    )

  }
  getprescptionfielddata(data) {
    for (let p = 0; p < data.length; p++) {
      this.prescForm.patchValue(this.getfieldinfo(
        // this.prescForm.get('drugproductid').value,
        // this.prescForm.get('qty').value, this.prescForm.get('days').value,
        // this.prescForm.get('morning').value, this.prescForm.get('afternoon').value,
        // this.prescForm.get('evening').value, this.prescForm.get('night').value,
        // this.prodcode
        data[p][0],
        data[p][1],
        data[p][2],
        data[p][3],
        data[p][4],
        data[p][5],
        data[p][6],
        data[p][7],
        data[p][8],
        data[p][9]
      ))
    }
    this.imgurl = this.prescForm.get('imageurl').value;
  }
  getfieldinfo(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any, a10: any) {
    return {
      salesorderid: a1,
      patientname: a2,
      doctorname: a3,
      age: a4,
      gender: a5,
      remarks: a6,
      emprefid: a7,
      employeename: a8,
      imageurl: a9,
      patientid: a10,
      pdigitalizedrefid:this.prescForm.get('pdigitalizedid').value,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1
    }

  }
  getproductservice() {
    this.prescrepservice.getprescrippro(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.prescForm.get('pdigitalizedid').value).subscribe(
      data => {
        this.getproduct(data);
      }
    )
  }
  getproductfield() {
    const getData = <FormArray>this.prescForm.controls['prescproduct'];
    getData.push(this.getproductfieldinfo(
      this.prescForm.get('drugproductid').value,
      this.prescForm.get('qty').value, this.prescForm.get('days').value,
      this.prescForm.get('morning').value, this.prescForm.get('afternoon').value,
      this.prescForm.get('evening').value, this.prescForm.get('night').value,
      this.prodcode
    ))
    this.prescForm.get('drugproductid').setValue('');
    this.prescForm.get('qty').setValue('');
    this.prescForm.get('days').setValue('');
    this.prescForm.get('morning').setValue('');
    this.prescForm.get('afternoon').setValue('');
    this.prescForm.get('evening').setValue('');
    this.prescForm.get('night').setValue('');
  }
  getproductfieldinfo(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any) {
    return this.fb.group({
      pdigirefno: '',
      drugproductname: a8,
      drugproductid: a1,
      qty: a2,
      days: a3,
      morning: a4,
      afternoon: a5,
      evening: a6,
      night: a7,
      food: '',
      status: '',
      pdigitalizedrefid:this.prescForm.get('pdigitalizedid').value,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1
    })

  }
  getproduct(data) {
    const getData = <FormArray>this.prescForm.controls['prescproduct'];
    getData.controls = [];
    for (let p = 0; p < data.length; p++) {
      getData.push(this.getproductinfo(
        // this.prescForm.get('drugproductid').value,
        // this.prescForm.get('qty').value, this.prescForm.get('days').value,
        // this.prescForm.get('morning').value, this.prescForm.get('afternoon').value,
        // this.prescForm.get('evening').value, this.prescForm.get('night').value,
        // this.prodcode
        data[p][0],
        data[p][1],
        data[p][2],
        data[p][3],
        data[p][4],
        data[p][5],
        data[p][6],
        data[p][7],
        data[p][8]

      ))
      this.prescForm.get('drugproductid').setValue('');
      this.prescForm.get('qty').setValue('');
      this.prescForm.get('days').setValue('');
      this.prescForm.get('morning').setValue('');
      this.prescForm.get('afternoon').setValue('');
      this.prescForm.get('evening').setValue('');
      this.prescForm.get('night').setValue('');
    }
  }
  getproductinfo(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any) {
    return this.fb.group({
      pdigirefno: '',
      drugproductname: a9,
      drugproductid: a1,
      qty: a2,
      days: a3,
      morning: a4,
      afternoon: a5,
      evening: a6,
      night: a7,
      food: a8,
      status: '',
      pdigitalizedrefid:this.prescForm.get('pdigitalizedid').value,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1
    })

  }

  imgwidth = 460;
  imgheight = 420;

  zoomin() {

    this.imgwidth += 12;
    this.imgheight += 12;
  }

  zoomout() {

    this.imgwidth += -12;
    this.imgheight += -12;
  }

  // onSubmit(){
  //   this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Data Saved Successfully.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

  //   this.ngOnInit();
  // }
  onSubmit() {
    const getData = <FormArray>this.prescForm.controls['prescproduct'];
    let data: any = getData.value
    // this.PackingForm.get('totalitem').setValue(data.length);
    this.prescrepservice.checkprescptionlist(JSON.stringify(this.prescForm.value)).subscribe(
      data => {
        if (data == true) {
          const getData = this.prescForm.controls['prescproduct'];
          this.prescrepservice.checkprescptionprod(JSON.stringify(getData.value)).subscribe(
            data => {
              if (data == true) {
                this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Data Saved Successfully.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                setTimeout(() => {
                  this.router.navigate(['PrescriptionDGT/ViewPrescription']);
                }, 2000);
                this.ngOnInit();
              
              }
              else {
                this.notificationsComponent.addToast({ title: 'Error Message', msg: 'prescription Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
              }
            },
            error => console.log("Error occurs in saveprescptionlist()"))
        }
      },
      error => console.log("Error occurs in saveprescptionprod()"));
  }
}
