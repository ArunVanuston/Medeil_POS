import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { TaxsettingsService } from '../taxsettings.service';

@Component({
  selector: 'app-addtax',
  templateUrl: './addtax.component.html',
  styleUrls: ['./addtax.component.css'],
  providers:[TaxsettingsService,NotificationsComponent]
})
export class AddtaxComponent implements OnInit {
  taxSettingsForm:FormGroup;
  constructor(private formBuilder: FormBuilder,private service: TaxsettingsService,private notificationsComponent: NotificationsComponent) { 
    this.taxSettingsfn();
  }
  taxtype;
  taxid;
  ngOnInit() {
   this.service.fetchTaxsettings(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
     this.taxtype = data[0][1],this.taxSettingsForm.get('id').setValue(data[0][0])
   })
  }
  taxSettingsfn() {
    this.taxSettingsForm = this.formBuilder.group({
      vat_gst:[''],
      igst:[''],
      ugst:[''],
      cgst:[''],
      sgst:[''],
      companyrefid:[AppComponent.companyID],
      branchrefid:[AppComponent.branchID],
      shoprefid:[AppComponent.locrefID1],
      purchasetax:[1],
      salestax:[1],
      countryrefid:[AppComponent.countryID],
      status:[1],
      stateid:[],
      id:['']
    })
  }

  indgstflag:number;
  state:any;

  indiangstfn(event){
    if(event == 2){
      this.indgstflag = 1;
      this.taxSettingsForm.get('vat_gst').setValue(2);
      this.service.getStates(AppComponent.countryID).subscribe(data => this.state = data)
    }else if(event == 1){
      this.indgstflag = 0;
      this.taxSettingsForm.get('vat_gst').setValue(1);
    }else if(event == 0){
      this.indgstflag = 0;
      this.taxSettingsForm.get('vat_gst').setValue(0);
    }
  }



  savetaxsetting(){
    // if(this.taxSettingsForm.get('igst').value){
    //   this.taxSettingsForm.get('igst').setValue(1)
    // }else{
    //   this.taxSettingsForm.get('igst').setValue('')
    // }
    // if(this.taxSettingsForm.get('ugst').value){
    //   this.taxSettingsForm.get('ugst').setValue(1)
    // }else{
    //   this.taxSettingsForm.get('ugst').setValue('')
    // }
    // if(this.taxSettingsForm.get('cgst').value){
    //   this.taxSettingsForm.get('cgst').setValue(1)
    // }else{
    //   this.taxSettingsForm.get('cgst').setValue('')
    // }
    // if(this.taxSettingsForm.get('sgst').value){
    //   this.taxSettingsForm.get('sgst').setValue(1)
    // }else{
    //   this.taxSettingsForm.get('sgst').setValue('')
    // }
    this.service.Savetaxsettings(JSON.stringify(this.taxSettingsForm.value)).subscribe(data => {
      if(data){
   this.notificationsComponent.addToast({ title: 'Sucess Message', msg: ' Data Saved Sucessfully....', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      }
    })
  }
}
