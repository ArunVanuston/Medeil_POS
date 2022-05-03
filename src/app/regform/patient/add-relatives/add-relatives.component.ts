import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators } from '@angular/forms'
import { AddrealtivesService } from './add-relatives.service';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-add-relatives',
  templateUrl: './add-relatives.component.html',
  styleUrls: ['./add-relatives.component.css'],
  providers:[AddrealtivesService,NotificationsComponent]
})
export class AddRelativesComponent implements OnInit {
  Email  =    "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  relativesForm:any;
  patienname: any;
  patcont: any;
  constructor(private formbuilder:FormBuilder,private router:Router,private notification:NotificationsComponent, 
    private relativesservice: AddrealtivesService) {
    this.relativesForm = formbuilder.group({
    
      mobile:['',[]],
      storedfrom:['',[]],
      patientrefid:['',[]],
      companyrefid:['',[]],
      locname:['',[]],
      branchrefid:['',[]],
      locrefid:['',[]],
      relativedetails:this.formbuilder.array([])
     
    })
   }

  ngOnInit() {

    this.relativesForm.get('companyrefid').setValue(AppComponent.companyID);
    this.relativesForm.get('branchrefid').setValue(AppComponent.branchID);
    this.relativesForm.get('locname').setValue(AppComponent.locRefName1);
    this.relativesForm.get('locrefid').setValue(AppComponent.locrefID1);

    this.relativesservice.getcustomers(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{ this.patienname =data},
    
      err =>{ console.log('Error Occured ') });

    // this.loadrelatives();
    this.insertnewrelativerow();

}

getcont(){
  this.relativesservice.getcontact(this.relativesForm.get('patientrefid').value).subscribe(data => {
    this.patcont = data
    this.relativesForm.get('mobile').setValue(data[0][1])},
    err =>{
      console.log('error occured');
    
  });
  // Validators.pattern(this.Email),Validators.required
}

initformarray() {
  return this.formbuilder.group({
      first_name:['',[Validators.required]], 
      last_name:['',[]], 
      contactno:['',[]], 
      address:['',[]], 
      relationship:['',[Validators.required]], 
      age:['',[]],
      sex:['',[]],
	    dob:['',[]],
      email:['',[]],
      companyrefid:[AppComponent.companyID,[]],
      branchrefid:[AppComponent.branchID,[]],
      locname:[AppComponent.locRefName1,[]],
      locrefid:[AppComponent.locrefID1,[]]
    
  });
}

loadrelatives() {

  this.initformarray();
  const control = <FormArray>this.relativesForm.controls['relativedetails'];
  control.controls = [];
  control.push(this.initformarray());

}

addrelatives(event) {
    if(event.keyCode==9){
      this.initformarray();
      const control = <FormArray>this.relativesForm.controls['relativedetails'];
      control.push(this.initformarray());
    }
    
}

       
insertnewrelativerow() {
  this.initformarray();
  const control = <FormArray>this.relativesForm.controls['relativedetails'];
  control.push(this.initformarray());
}

removenewrelativerow(indexid){
  const control = <FormArray>this.relativesForm.controls['relativedetails'];
  control.removeAt(indexid);
}



// removeRow(index: number) {
//   // alert("RemoveRow" + index);
 
//   const getData = <FormArray>this.relativesForm.controls['relativedetails'];
//   let setData = getData.value;
  
  
//   getData.removeAt(index);
//   // this.getSum();
//   let removeVal = getData.value;
//   // if (removeVal == null || removeVal == '') {
//   //   // this.relativesForm.reset();
//   //   // this.ngOnInit();
//   // }
  
// }


valid:any;
storevalues=[];
flag :boolean=false;
  onSubmit(){
    this.flag = this.patValidation();
   if(this.flag){
    const getdata = <FormArray> this.relativesForm.controls['relativedetails'];
   
    for(let i=0;i<getdata.length;i++){
      this.storevalues.push({patientrefid:parseInt(this.relativesForm.get('patientrefid').value), companyrefid:parseInt(AppComponent.companyID),
      branchrefid:parseInt(AppComponent.branchID),locname:parseInt(AppComponent.locRefName1),locrefid:parseInt(AppComponent.locrefID1), first_name: getdata.value[i].first_name, last_name: getdata.value[i].last_name, 
      contactno: getdata.value[i].contactno, address: getdata.value[i].address,age: parseInt(getdata.value[i].age),sex: getdata.value[i].sex,dob: getdata.value[i].dob,email: getdata.value[i].email, relationship: getdata.value[i].relationship});
    }
   
  this.relativesservice.savepatientdet(JSON.stringify(this.storevalues)).subscribe(data =>{this.valid=data
    if(this.valid==1){
      this.notification.addToast({ title: 'Success Msg', msg: 'Data Saved Successfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      getdata.controls=[];
      this.ngOnInit();
      
    }
    else{
      this.notification.addToast({ title: 'Error Msg', msg: 'Data not Saved..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
   
  
  });
  
}


 
}
patValidation(): boolean {
 
  if (this.relativesForm.get('patientrefid').value == '' || this.relativesForm.get('patientrefid').value == null) {
    this.notification.addToast({ title: 'Error', msg: 'Select Patient Name.', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    return false;
  }
  return true;
}




}
