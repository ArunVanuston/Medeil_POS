import { Component, OnInit } from '@angular/core';
import { Url } from 'url';
import { FormBuilder, FormArray } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { PrescriptionService } from './prescription.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
  providers: [PrescriptionService,NotificationsComponent]
})
export class PrescriptionComponent implements OnInit {
  prescForm: any;
  imgurl;
  solist: any;
  searchProducts = [];
  prodcode: any;
  empname: any;
  id: any;
  constructor(private router: Router,private fb: FormBuilder,private route:ActivatedRoute, private prescrepservice: PrescriptionService,private notificationsComponent: NotificationsComponent) {
    this.prescForm = this.fb.group({
      pdigitalizedno: ['', []],
      salesorderid: ['', []],
      salesorderno: ['', []],
      patientname: ['', []],
      patientid: ['', []],
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
      imageurl:['',[]],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      prescproduct: this.fb.array([

      ])
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imgurl = "assets/images/prescription.png";
    this.prescForm.get('salesorderid').setValue('opt1');
    this.prescrepservice.getsolist(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(
      data => {
        this.solist = data
      }
    )

    this.prescrepservice.getemplist(AppComponent.companyID, AppComponent.branchID,AppComponent.locRefName1, AppComponent.locrefID1).subscribe(
      data => {
        this.empname = data
      }
    )

    this.prescrepservice.getprecdetails( this.id).subscribe(
      data => {this.imgurl = data[0][0],this.prescForm.get('patientname').setValue(data[0][1]),
      this.prescForm.get('gender').setValue(data[0][2]),this.prescForm.get('patientid').setValue(data[0][3]),
      this.prescForm.get('imageurl').setValue(this.imgurl)}
    )
    
  }
  getpresdetails(){
    this.prescrepservice.getprecdetails(this.prescForm.get('salesorderid').value).subscribe(
      data => {this.imgurl = data[0][0],this.prescForm.get('patientname').setValue(data[0][1]),
      this.prescForm.get('gender').setValue(data[0][2]),this.prescForm.get('patientid').setValue(data[0][3]),
      this.prescForm.get('imageurl').setValue(this.imgurl)}
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
  getproductcode(){
    this.prescrepservice.getproduct(AppComponent.companyID,this.prescForm.get('drugproductid').value).subscribe(
      data => {
        this.prodcode = data[0][1]
      }
    )
  }
  getproduct() {
    const getData = <FormArray>this.prescForm.controls['prescproduct'];
    getData.push(this.getproductinfo(
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

  getproductinfo(a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any) {
    return this.fb.group({
      pdigirefno: '',
      drugproductname: a9,
      drugproductid:a2,
      qty: a3,
      days: a4,
      morning: a5,
      afternoon: a6,
      evening: a7,
      night: a8,
      food: '',
      status: '',
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
reject(){
  this.prescrepservice.rectionservice(AppComponent.companyID, AppComponent.branchID,AppComponent.locRefName1, AppComponent.locrefID1,this.prescForm.get('salesorderid').value).subscribe(
    error => {
      console.log("Prescription has been Rejected")
    }
  )
}
onSubmit() {
  const getData = <FormArray>this.prescForm.controls['prescproduct'];
  let data: any = getData.value
  // this.PackingForm.get('totalitem').setValue(data.length);
  this.prescrepservice.saveprescptionlist(JSON.stringify(this.prescForm.value)).subscribe(
    data => {
      if (data == true) {
        const getData = this.prescForm.controls['prescproduct'];
        this.prescrepservice.saveprescptionprod(JSON.stringify(getData.value)).subscribe(
          data => {
            if (data == true) {
              this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Data Saved Successfully.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              setTimeout(() => {
                this.router.navigate(['PrescriptionDGT/ViewPrescription']);
              }, 2000);
            this.ngOnInit();
            }
            else {
              this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Prescription Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }
          },
          error => console.log("Error occurs in saveprescptionlist()"))
      }
    },
    error => console.log("Error occurs in saveprescptionprod()"))
}
}
