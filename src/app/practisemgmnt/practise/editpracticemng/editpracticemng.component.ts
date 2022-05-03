import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { PractiseComponent } from '../practise.component';
import { practiceService } from '../practise.service';

@Component({
  selector: 'app-editpracticemng',
  templateUrl: './editpracticemng.component.html',
  styleUrls: ['./editpracticemng.component.css'],
  providers:[practiceService,NotificationsComponent]
})
export class EditpracticemngComponent implements OnInit {
EditPractiseMng:FormGroup;
  editprac: any;
  doctorslist: any;
  patientlist: any;
  searchProducts: any[];
  proid: any;
  prodid: any;
 
  constructor(private appcomponent:AppComponent,
              private formbuilder:FormBuilder,
              private practise:practiceService,
              private notification:NotificationsComponent,
              private router:Router,
              private route:ActivatedRoute
             
              ) { }

  ngOnInit() {
    this.editprac = this.route.snapshot.paramMap.get('id');
    this.EditPractiseMng = this.formbuilder.group({
      choosetype: [1,[]],
      morning: [0,[]],
      afternoon: [0,[]],
      evening: [],
      night: [],
      productid: [],
      id:[parseInt(this.editprac),[]],
      mainpresno:[[],],
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
      consultationfee:[],
      remarks:[],
      editprescproduct: this.formbuilder.array([])
   

    });

this.practise.getpractisemng(this.editprac).subscribe(data =>{
  this.EditPractiseMng.patchValue(data[0]),
  err=>{
    console.log('Error occured od getpractise()')
  }
});

this.practise.getpractisemngproduct(this.editprac).subscribe(data =>{
  this.pracmngproduct(data),
  err=>{
    console.log('Error occured od getpractisemngproduct()')
  }
});
let getdoctors = { companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1 };
this.practise.getdoctors(JSON.stringify(getdoctors)).subscribe(data => { this.doctorslist = data },
  error => {
    console.log(error)
  });

this.practise.getCustomer(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.patientlist = data },
  error => {
    console.log(error)
  });

    
  }


  choosetype() {
    if (this.EditPractiseMng.get('choosetype').value == 1) {
      this.EditPractiseMng.get('morning').setValue(0);
      this.EditPractiseMng.get('afternoon').setValue(0);
      this.EditPractiseMng.get('evening').setValue(0);
      this.EditPractiseMng.get('night').setValue(1);
    }
    if (this.EditPractiseMng.get('choosetype').value == 2) {
      this.EditPractiseMng.get('morning').setValue(1);
      this.EditPractiseMng.get('afternoon').setValue(0);
      this.EditPractiseMng.get('evening').setValue(0);
      this.EditPractiseMng.get('night').setValue(1);
    }
    if (this.EditPractiseMng.get('choosetype').value == 3) {
      this.EditPractiseMng.get('morning').setValue(1);
      this.EditPractiseMng.get('afternoon').setValue(1);
      this.EditPractiseMng.get('evening').setValue(0);
      this.EditPractiseMng.get('night').setValue(1);
    }
    if (this.EditPractiseMng.get('choosetype').value == 4) {
      this.EditPractiseMng.get('morning').setValue(1);
      this.EditPractiseMng.get('afternoon').setValue(1);
      this.EditPractiseMng.get('evening').setValue(1);
      this.EditPractiseMng.get('night').setValue(1);
    }
  }

  stkqty;
  drugname;
  fetchqty() {

    let product = this.EditPractiseMng.get('productid').value;
    let subindx = this.searchProducts.findIndex(p => p.value == product);
    this.stkqty = this.searchProducts[subindx].qty;
    this.drugname = this.searchProducts[subindx].label;
    this.EditPractiseMng.get('stkqty').setValue(this.stkqty);
    alert(this.stkqty);
  }

  searchProduct(searchValue: any) {
    alert("searchprod"+searchValue)
    let searchdrugdata = { companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1, searchvalue: searchValue, searchid: 1 };
    this.practise.searchdrug(JSON.stringify(searchdrugdata)).subscribe(data => {
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

  fetchTableData() {
    const getData = <FormArray>this.EditPractiseMng.controls['editprescproduct'];
    //alert(this.EditPractiseMng.get('productid').value);
    getData.insert(0, this.formbuilder.group({
      productname:[this.drugname],
      drugproductid: [1],
      morning: [this.EditPractiseMng.get('morning').value],
      afternoon: [this.EditPractiseMng.get('afternoon').value],
      evening: [this.EditPractiseMng.get('evening').value],
      night: [this.EditPractiseMng.get('night').value],
      beforeafterfood: [this.EditPractiseMng.get('beforeafterfood').value],
      days: [this.EditPractiseMng.get('days').value],
      totalmedicine: [this.EditPractiseMng.get('totalmedicine').value],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1]
    }));
    // getData.push(
    //   this.formbuilder.group({
    //     productname:[this.drugname],
    //     drugproductid: [this.EditPractiseMng.get('productid').value],
    //     morning: [this.EditPractiseMng.get('morning').value],
    //     afternoon: [this.EditPractiseMng.get('afternoon').value],
    //     evening: [this.EditPractiseMng.get('evening').value],
    //     night: [this.EditPractiseMng.get('night').value],
    //     beforeafterfood: [this.EditPractiseMng.get('beforeafterfood').value],
    //     days: [this.EditPractiseMng.get('days').value],
    //     totalmedicine: [this.EditPractiseMng.get('totalmedicine').value],
    //     companyrefid: [AppComponent.companyID],
    //     branchrefid: [AppComponent.branchID],
    //     locname: [AppComponent.locRefName1],
    //     locrefid: [AppComponent.locrefID1]
    //   }))
  }



  pracmngproduct(data:any){
    alert(JSON.stringify(data));
    if(data !== null || data !== undefined){

      const getdata = <FormArray>this.EditPractiseMng.controls['editprescproduct']
      for(let k = 0;k < data.length ; k++){
        // let sourcedata = getdata.value;
        getdata.push(this.setpracprod(
          data[k][1],
          data[k][2],
          data[k][3],
          data[k][4],
          data[k][5],
          data[k][6],
          data[k][7],
          data[k][8],
          data[k][9]
        ));
      }

    }

  }
  setpracprod(prodid:any,prodname:any,qty:any,morning:any,aftnoon:any,evening:any,night:any,days:any,presproid:any){
    return this.formbuilder.group({
      drugproductid:prodid,
      productname:prodname,
      mainpresrefid:this.editprac,
      totalmedicine:qty,
      morning: morning,
      afternoon: aftnoon,
      evening: evening,
      night: night,
      days:days,
      id:presproid,
      companyrefid:AppComponent.companyID,
      branchrefid:AppComponent.branchID,
      locname:AppComponent.locRefName1,
      locrefid:AppComponent.locrefID1
      
     });
  }



  removerow(indexid) {
    const control = <FormArray>this.EditPractiseMng.controls['editprescproduct'];
    let setData=control.value;
    this.prodid = setData[indexid].productid
    this.practise.delproduct(this.editprac,this.prodid).subscribe(data=>{
      data
      err=>{
        console.log("Error occure in delproduct()");
      }
    })
    control.removeAt(indexid);
  
  }
onSubmit(){
// alert("on Submit")
  let getdata = this.EditPractiseMng.controls['editprescproduct'];
this.practise.saveeditform(JSON.stringify(this.EditPractiseMng.value)).subscribe(data =>{
  // alert("onsubmit2")
  if(data){
    this.practise.updatepresproduct(JSON.stringify(getdata.value)).subscribe(data=>{
      if(data){
        this.notification.addToast({ title: 'Sucess', msg: 'Data Updated Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
   
      }
      else{
        this.notification.addToast({ title: 'Error Message', msg: 'Presctise Not Update', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  
      }
    })
  }
  else{
    this.notification.addToast({ title: 'Error Message', msg: 'Presctise Not Update', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  
  }
             
})

}

}
