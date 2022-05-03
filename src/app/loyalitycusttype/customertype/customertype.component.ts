import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/core/src/util';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { loyalitycusttypeService } from '../loyalitycusttype.service';


@Component({
  selector: 'app-customertype',
  templateUrl: './customertype.component.html',
  styleUrls: ['./customertype.component.css'],
  providers:[loyalitycusttypeService]
})
export class CustomertypeComponent implements OnInit {
  parentMessage='sales';
  custtypelist: any;
  flag: boolean;

  constructor(private formbuilder:FormBuilder,
              private loyalityservice:loyalitycusttypeService,
              private appcomponent:AppComponent,
              private notification:NotificationsComponent,
              private dateformate:dateFormatPipe
              ) { }
CusttypeForm:FormGroup;
  ngOnInit() {
    this.CusttypeForm =this.formbuilder.group({
      custtype: this.formbuilder.array([])

    })

    this.insertnewloyaltyrow();

    // this.loyalityservice.getcusttype(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
    //   this.custtypelist = data
    // })

  }


  private selectedLink: string="Amount";        
  
  setradio(e: string): void{  
      this.selectedLink = e;        
     }  
  isSelected(name: string): boolean   
     {  
      if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
       }  
      return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
    }   


    
    initloyaltyarray() {
      return this.formbuilder.group({
        // cust_type_id:['',[]],
        cust_type:['',[]],
        min_loyality:[0,[]],
        min_amount:[0,[]],
        status:[0,[]],
        /*Login Details */
        companyrefid : [AppComponent.companyID,[]],
        branchrefid : [AppComponent.branchID,[]],
        locname : [AppComponent.locRefName1,[]],
        locrefid : [AppComponent.locrefID1,[]],
        clientcdate: [this.dateformate.transform04(), []],
      });
    }
  

         
insertnewloyaltyrow() {
  this.initloyaltyarray();
  const control = <FormArray>this.CusttypeForm.controls['custtype'];
  control.push(this.initloyaltyarray());
}

removenewloyaltyrow(indexid){
  const control = <FormArray>this.CusttypeForm.controls['custtype'];
  control.removeAt(indexid);
}

saveprocess:boolean=false;
onSubmit(){ 
  this.flag = this.validation() ;  
   
if(this.flag == true){
  const control = <FormArray>this.CusttypeForm.controls['custtype'];
  this.saveprocess= true;
  this.loyalityservice.datasave(JSON.stringify(control.value)).subscribe(data =>{
    data
    if(data == true){
      this.notification.addToast({ title: 'Success', msg: 'Data Saved successfuly  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
   this.saveprocess = false;
   this.ngOnInit();
    }
    else{
      this.notification.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  })}
}

  validation():boolean{
    const control = <FormArray>this.CusttypeForm.controls['custtype'];
    let setdata = control.value;
   
    for(let i=0;i<setdata.length;i++){
      // alert(this.selectedLink)
      if(this.selectedLink == 'Amount' ){
        setdata[i].min_loyality = 0
       
     
      if (setdata[i].min_amount == '' || setdata[i].min_amount == null) {
        this.notification.addToast({ title: 'Error Message', msg: 'Enter Minimum Amount..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
    }
      else{
       
     
      // alert(setdata[i].min_loyality)
      if (setdata[i].min_loyality == '' || setdata[i].min_loyality == null) {
        this.notification.addToast({ title: 'Error Message', msg: 'Enter Minimum Loyality..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
    }
      if (setdata[i].cust_type == null || setdata[i].cust_type == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'Enter Customer Type..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
      return true;
     }    
  }
}
