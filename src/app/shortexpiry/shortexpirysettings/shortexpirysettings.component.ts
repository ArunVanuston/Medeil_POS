import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { ShortexpiryService } from '../shortexpiry.service';
import { TranslateService } from 'ng2-translate';  

import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-shortexpirysettings',
  templateUrl: './shortexpirysettings.component.html',
  styleUrls: ['./shortexpirysettings.component.css'],
  providers:[NotificationsComponent,ShortexpiryService]
})
export class ShortexpirysettingsComponent implements OnInit {
  parentMessage="sales";
  ShortexpirySettingsForm: FormGroup;
  data: any;
  shortex: any;
  day: any;
  month: any;
  year: any;
  current: string='Not Assign';
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  constructor(private formbuilder:FormBuilder,public translate: TranslateService,
              private appcomponent:AppComponent,
              private router:Router,
              private shortexpiryservice:ShortexpiryService,
              private notification:NotificationsComponent
              ) {translate.setDefaultLang('en'); }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.ShortexpirySettingsForm = this.formbuilder.group({
      no_days:[0,[Validators.required,Validators.pattern(this.textnumbers)]],
      no_month:[0,[Validators.required]],
      no_year:[0,[Validators.required]],
      expiryflag:[1,[]],
      companyrefid:[AppComponent.companyID,[]],
      branchrefid:[AppComponent.branchID,[]],
      locname:[AppComponent.locRefName1],
      locrefid:[AppComponent.locrefID1,[]] ,
      userid:[sessionStorage.getItem('indvuserid'),[]]
    });
    this.currentstatus();
    // this.shortexpiryservice.expstatus(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data=>{this.day=data[0],this.month=data[1],this.year=data[2]});
      // alert(this.day)});
  }

  dayscalc(){
    this.ShortexpirySettingsForm.get('expiryflag').setValue(1);
    this.ShortexpirySettingsForm.get('no_month').setValue(0);
    this.ShortexpirySettingsForm.get('no_year').setValue(0);
  }

  monthcalc(){
    let nofmonth=this.ShortexpirySettingsForm.get('no_month').value;
    this.ShortexpirySettingsForm.get('expiryflag').setValue(2);
    this.ShortexpirySettingsForm.get('no_days').setValue(nofmonth*31);
    this.ShortexpirySettingsForm.get('no_year').setValue(0);
  }

  yearcalc(){
    let nofyear=this.ShortexpirySettingsForm.get('no_year').value;
    this.ShortexpirySettingsForm.get('expiryflag').setValue(3);
    this.ShortexpirySettingsForm.get('no_days').setValue(nofyear*366);
    this.ShortexpirySettingsForm.get('no_month').setValue(nofyear*12);
  }

  saveprocess:boolean=false;
  onSubmit(){
    this.saveprocess=true;
    this.shortexpiryservice.savesettings(JSON.stringify(this.ShortexpirySettingsForm.value)).subscribe(data =>{data
      // this.shortex = data
      // alert(data)
      if(data == 1){
        // alert(data)
        this.saveprocess=false;
        this.notification.addToast({ title: 'Success', msg: 'Assign Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        setTimeout(() => {
          // this.router.navigate(['']);
          this.ngOnInit();
         }, 1200);
      }
      else{
        this.saveprocess=false;
        this.notification.addToast({ title: 'Error Message', msg: 'Settings Already Completed!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    },
    errorCode => {this.saveprocess=false; console.log(errorCode)});
      
  }
 


  private selectedLink: string="Days";        
  
    setradio(e: string): void   
  {  
  
        this.selectedLink = e;  
          
  }  
  
    isSelected(name: string): boolean   
  {  
  
        if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
            return false;  
  }  
  
        return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
 
      }   


    expiryflag:any;
    currentstatus(){
      this.shortexpiryservice.expstatus(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data=>{
        this.data=data,this.day=data[0][0],this.month=data[0][1],this.year=data[0][2],this.expiryflag=data[0][3]
       
        if(this.expiryflag == 1){
          this.current=this.day + ' Days'
        }else  if(this.expiryflag == 2 ){
          this.current=this.month + ' Months'
        }else if(this.expiryflag == 3){
          this.current=this.year + ' Years'
        }
        else if(data ==" "){
          this.current='Not Assign'
        }
      });
     
    }


    forarray=[];
    i=4;
    formethod(){
      for(this.i;this.i>=1;this.i--){
        // alert("I--"+this.i)
        for(let j=1;j<=this.i;j++){
          // alert("J--"+j)
          this.forarray.push(j);
        }
      }
    }
  
    formethod1(){
    let n = 4;
      for(this.i = 1;this.i<=n;this.i++){
        for(let j = n;j>=this.i;j--){
          this.forarray.push(j);
          console.log(this.forarray)
        }
        n-=1;
        console.log('\n')
      }
    }

}
