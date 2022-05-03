import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { finacialsetting } from './finacialsettings.service'; 
import { TranslateService } from 'ng2-translate';   

@Component({
  selector: 'app-finacialsettings',
  templateUrl: './finacialsettings.component.html',
  styleUrls: ['./finacialsettings.component.css'],
  providers:[finacialsetting]
})
export class FinacialsettingsComponent implements OnInit {
  FinacialForm: FormGroup;
  parentMessage="sales";
  constructor(public translate: TranslateService,private formbuilder: FormBuilder,private service: finacialsetting,private notificationsComponent: NotificationsComponent) {
    translate.setDefaultLang('en');
   }
  
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.FinacialForm = this.formbuilder.group({
      startingyear:[''],
      endingyear:[''],
      companyrefid:[AppComponent.companyID],
      branchrefid:[AppComponent.branchID],
      locname:[AppComponent.locRefName1],
      locrefid:[AppComponent.locrefID1],
      countryrefid:[AppComponent.countryID],
      status:[1]
    })
  }

saveprocess:boolean=false;
 onSubmit(){
   this.saveprocess=true;
   this.service.saveFinacialyear(this.FinacialForm.value).subscribe(data => {
    if (data) {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Sucess Message', msg: ' Data Saved Sucessfully....', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.ngOnInit();
    }
    else {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
   })
 }

}
