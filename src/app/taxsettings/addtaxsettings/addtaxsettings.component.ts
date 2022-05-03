import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { TaxsettingsService } from '../taxsettings.service';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
@Component({
  selector: 'app-addtaxsettings',
  templateUrl: './addtaxsettings.component.html',
  styleUrls: ['./addtaxsettings.component.css'],
  providers: [NotificationsComponent, dateFormatPipe]
})
export class AddtaxsettingsComponent implements OnInit {
  taxForm: any;
  Send: any;
  country = [];
  company = [];
  branch = [];
  shopname = [];
  warehouse = [];
  hospital = [];
  gsttyposss: any;
  tax: any;
  validation: any;
  deviceObj;
  constructor(private taxsettingsService: TaxsettingsService, private dateformat: dateFormatPipe,private fb: FormBuilder, private appComponent: AppComponent, private notificationsComponent: NotificationsComponent) {



  }
  ngOnInit() {

    this.taxForm = this.fb.group({
      countryid: ['', []],
      companyrefid: ['', []],
      branchrefid: ['0', []],
      shoprefid: ['0', []],
      warehouserefid: ['0', []],
      hospitalrefid: ['0', []],
      locname: ['0', []],
      locrefid: ['0', []],
      vat: ['0', []],
      gst: ['0', []],
      sgst: ['0', []],
      cgst: ['0', []],
      igst: ['0', []],
      utgst: ['0', []],
      gsttype: ['', []],
      taxtype: ['', []],
    });

    this.taxsettingsService.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error on Tax setting country')
      });
    this.taxForm.get('countryid').setValue("0");

  }

  getgsttype() {
    this.gsttyposss = this.taxForm.get('gsttype').value;
  }
  getCompany() {

    this.taxsettingsService.getcompany(this.taxForm.get('countryid').value).subscribe(data => {
     
      this.company = data
    },
      err => {
        console.log('Error Occured Get Company');
      });
  }

  gettaxtype() {
    alert('Insidegettax')

    this.taxsettingsService.gettaxtypes(this.taxForm.get('companyrefid').value).subscribe(data => {
      this.settaxtype(data)

    },
      err => {
        console.log('Error Occured Get taxtype');
      });
  }

  settaxtype(data) {
    alert('datd' + data)
    alert('tax' + this.tax)
    this.taxForm.get('taxtype').setValue(data)
    this.tax = this.taxForm.get('taxtype').value
  }

  getShopname() {

    this.taxsettingsService.getshopname(this.taxForm.get('branchrefid').value).subscribe(data => {
      this.shopname = data
    },
      err => {
        console.log('Error Occured Get Shop');
      });
  }

  getWarehouse() {

    this.taxsettingsService.getwarehouse(this.taxForm.get('branchrefid').value).subscribe(data => {
      this.warehouse = data
    },
      err => {
        console.log('Error Occured Get Warehouse');
      });
  }

  getHospital() {

    this.taxsettingsService.gethospital(this.taxForm.get('branchrefid').value).subscribe(data => {
      this.hospital = data
    },
      err => {
        console.log('Error Occured Get Hospital');
      });
  }

  getRequest() {
    alert(HttpEventType)

  }
  taxValidation(): boolean {
    if (this.taxForm.get('countryid').value == '' || this.taxForm.get('countryid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Country', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.taxForm.get('companyrefid').value == '' || this.taxForm.get('companyrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Company Name Must Not Be Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    if (this.fb.group = '' || null) {
      return false;
    }


    return true;
  }

  justInitiate() {



    this.deviceObj = {
      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      ipaddress: this.appComponent.ipAddress,
      browsertype: this.appComponent.browser,
      ostype: this.appComponent.os,
      osversion: this.appComponent.osversion,
      devicetype: this.appComponent.devicetype,
      apiname: '',
      description: '',
      clientcdate: this.dateformat.transform04()

    };

  }

  onSubmit() {
    // alert('Inside onsubmit')
    // alert(this.taxForm.get('vat').value)

    this.validation = this.taxValidation();
    if (this.validation == true) {
      // alert(JSON.stringify(this.taxForm.value))

      this.taxsettingsService.savetax(JSON.stringify(this.taxForm.value)).subscribe(
        data => {



          this.justInitiate();
          this.deviceObj.apiname = "api/savetaxvalue";
          this.deviceObj.description="TaxSetting Created";
    
          this.taxsettingsService.deviceDetails(JSON.stringify(this.deviceObj))
            .subscribe(data => { },
              errorCode => console.log(errorCode));
    
    





        }



        // (result: any) => {
        //   let res = result.res;
        //   alert(res)
        //   if (res == true) {
        //     alert('Inside if')
        //     setTimeout(() => {
        //       alert('Inside settimeout')
        //       this.taxForm.reset();
        //       this.notificationsComponent.addToast({ title: 'Sucess Message', msg: ' Data Saved Sucessfully....', timeout: 5000, theme: 'default', position: 'top-right', type: 'sucess' });
        //     }, 1000);
        //     this.ngOnInit();
        //   }
        // }, (error: any) => {
        //   console.log(error['Errors getPurcmaintanance()']);
        // }
      );
      this.ngOnInit();

    }
    else {

      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Damage Data is Invalid....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }


  }

}


