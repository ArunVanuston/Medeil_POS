import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DecimalService } from './decimalsetting.service'; 
import { TranslateService } from 'ng2-translate';   

@Component({
  selector: 'app-decimalsetting',
  templateUrl: './decimalsetting.component.html',
  styleUrls: ['./decimalsetting.component.css'],
  providers:[DecimalService]
})
export class DecimalsettingComponent implements OnInit {
  parentMessage="sales";
 roundenable:number =0;
 DecimalForm: FormGroup;
 decimalsts: any;
  constructor(public translate: TranslateService,private formbuilder: FormBuilder,private service: DecimalService,private notificationsComponent: NotificationsComponent) {
    translate.setDefaultLang('en');
     this.DecimalForm = this.formbuilder.group({
      decimaltwo: [false],
      decimalthree: [false],
      roundedabove: [0],
      roundedbelow: [0],
      expectedamt: [false],
      roundoffamt: [false],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1],
      clientcdate: [AppComponent.date],
      status: [1],
      id:['']
    })
   }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
       this.service.getDecimalsts(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
         this.decimalsts = data,this.DecimalForm.get('id').setValue(data[0][4])
         if(this.decimalsts[0][0] == 1){
           this.DecimalForm.get('decimaltwo').setValue(true)
         }else if(this.decimalsts[0][1] == 1){
           this.DecimalForm.get('decimalthree').setValue(true)
         }
         if(this.decimalsts[0][2] == 1){
            this.DecimalForm.get('roundoffamt').setValue(true);
            this.DecimalForm.get('roundedbelow').setValue(1);
            this.DecimalForm.get('roundedabove').setValue(1);
         }else if(this.decimalsts[0][3] == 1){
          this.DecimalForm.get('roundoffamt').setValue(true);
          this.DecimalForm.get('roundedbelow').setValue(1);
          this.DecimalForm.get('roundedabove').setValue(1);
         }else{
          this.DecimalForm.get('expectedamt').setValue(true);
          this.DecimalForm.get('roundedbelow').setValue(0);
          this.DecimalForm.get('roundedabove').setValue(0);
         }
       })
  }
  decimalcheckbox(event, id) {
    if (event.target.checked) {
      if (id == 1) {
        this.DecimalForm.get('decimalthree').setValue(false);
      }
      else if (id == 2) {
        this.DecimalForm.get('decimaltwo').setValue(false);
      }
    } else {
      this.DecimalForm.get('decimaltwo').setValue(false);
      this.DecimalForm.get('decimalthree').setValue(false);
    }
  }

  roundedcheckbox2(event, id) {
    if (event.target.checked) {
      if (id == 1) {
        this.DecimalForm.get('roundoffamt').setValue(false);
        this.DecimalForm.get('roundedbelow').setValue(0);
        this.DecimalForm.get('roundedabove').setValue(0);
      }
      else if (id == 2) {
        this.DecimalForm.get('expectedamt').setValue(false);
        this.DecimalForm.get('roundedbelow').setValue(1);
        this.DecimalForm.get('roundedabove').setValue(1);
      }
    } else {
      this.DecimalForm.get('expectedamt').setValue(false);
      this.DecimalForm.get('roundoffamt').setValue(false);
    }
  }
  // roundedcheckbox1(event, id) {
  //   if (event.target.checked) {
  //     if (id == 1) {
  //       this.DecimalForm.get('roundedbelow').setValue(false);
  //     }
  //     else if (id == 2) {
  //       this.DecimalForm.get('roundedabove').setValue(false);
  //     }
  //   } else {
  //     this.DecimalForm.get('roundedabove').setValue(false);
  //     this.DecimalForm.get('roundedbelow').setValue(false);
  //   }
  // }

  saveprocess:boolean=false;
  savedecimalsetup() {
    // if (this.DecimalForm.get('decimaltwo').value) {
    //   this.DecimalForm.get('decimaltwo').setValue(1);
    // } else {
    //   this.DecimalForm.get('decimaltwo').setValue('');
    // }
    // if (this.DecimalForm.get('decimalthree').value) {
    //   this.DecimalForm.get('decimalthree').setValue(1);
    // } else {
    //   this.DecimalForm.get('decimalthree').setValue('');
    // }
    // if (this.DecimalForm.get('roundedabove').value) {
    //   this.DecimalForm.get('roundedabove').setValue(1);
    // } else {
    //   this.DecimalForm.get('roundedabove').setValue('');
    // }
    // if (this.DecimalForm.get('roundedbelow').value) {
    //   this.DecimalForm.get('roundedbelow').setValue(1);
    // } else {
    //   this.DecimalForm.get('roundedbelow').setValue('');
    // }
     if (this.DecimalForm.get('decimaltwo').value) {
      this.DecimalForm.get('decimaltwo').setValue(1);
    } else {
      this.DecimalForm.get('decimaltwo').setValue('');
    }
    if (this.DecimalForm.get('decimalthree').value) {
      this.DecimalForm.get('decimalthree').setValue(1);
    } else {
      this.DecimalForm.get('decimalthree').setValue('');
    }
    this.saveprocess=true;
    this.service.savedecimalsetup(JSON.stringify(this.DecimalForm.value)).subscribe(data => {
      if (data) {
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: ' Data Saved Sucessfully....', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      }
      else {
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })
  }
}
