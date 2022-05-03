import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { TaxsettingsService } from '../taxsettings.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-addtaxtype',
  templateUrl: './addtaxtype.component.html',
  styleUrls: ['./addtaxtype.component.css'],
  providers:[TaxsettingsService]
})
export class AddtaxtypeComponent implements OnInit {
  taxtypeForm: any;
  country = [];
  validation: any;
  constructor(private taxsettingsService: TaxsettingsService, private fb: FormBuilder, private appComponent: AppComponent) {
    this.taxtypeForm = this.fb.group({
      //for gstsetting table
      countryrefid: ['', []],
      vat_gst: ['', []],
    });

  }

  ngOnInit() {

    this.taxsettingsService.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error on Taxtype country')
      });
  }

  

  taxtypeValidation(): boolean {
    if (this.fb.group = '' || null) {
      return false;
    }
    return true;
  }




  onSubmit() {
    this.validation = this.taxtypeValidation();
    if (this.validation == true) {
      this.taxsettingsService.savetaxtype(JSON.stringify(this.taxtypeForm.value)).subscribe();//for taxsetting save
    }
  }

}
