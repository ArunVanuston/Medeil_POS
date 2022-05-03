import { Component, OnInit } from '@angular/core';
import { CurrencySettingService } from '../currencysetting.service';
import { FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { from } from 'rxjs/observable/from';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',

  providers: [NotificationsComponent]
})
export class AddcurrencyComponent implements OnInit {
  currencysettingForm: any;

  currency = [];
  country = [];
  returnValid: any;
  selectedcurr: any;
  currsts: any;
  constructor(private currencySettingService: CurrencySettingService, private fb: FormBuilder, private notificationsComponent: NotificationsComponent, private appComponent: AppComponent) {
    this.currencysettingForm = this.fb.group({
      id: [''],
      countryrefid: [AppComponent.countryID],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      shoprefid: [AppComponent.locrefID1],
      currencyrefid: [''],
      status: [1]
    })

  }

  ngOnInit() {
    // this.currencysettingForm.get('companyrefid').setValue(AppComponent.companyID);
    // this.currencySettingService.getCountry().subscribe(data => this.country = data,
    //   err => {
    //     console.log('Error on  setting country')
    //   });
    // this.currencysettingForm.get('countryrefid').setValue("0");

    this.currencySettingService.fetchCurrency(AppComponent.companyID,AppComponent.branchID,AppComponent.locrefID1).subscribe(data => {
      this.selectedcurr = data[0][2],this.currencysettingForm.get('id').setValue(data[0][0])
    })
    this.currencySettingService.getcurrencysts().subscribe(data => this.currsts = data)
  }
  getCurrenySymbol() {
    alert(this.currencysettingForm.get('countryrefid').value)
    this.currencySettingService.getCurreny(this.currencysettingForm.get('countryrefid').value).subscribe(data => this.currency = data,
      err => {
        console.log('Error on setting currency')
      });

    alert(this.currency)
  }

  onSubmit() {
    this.returnValid = this.currencyvalidation();
    if (this.returnValid == true) {

      this.currencySettingService.savecurrency(JSON.stringify(this.currencysettingForm.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));

    }

    else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  }
  currencyvalidation(): Boolean {
    return true;
  }

  savevalid(data: any) {

    if (data) {
      this.notificationsComponent.addToast({ title: 'Sucess Message', msg: ' Data Saved Sucessfully....', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    }
    else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
}
