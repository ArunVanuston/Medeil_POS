import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { BoundCallbackObservable } from 'rxjs/observable/BoundCallbackObservable';
import { BankService } from './bankreg.service';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-bankreg',
  templateUrl: './bankreg.component.html',
  styleUrls: ['./bankreg.component.css'],
  providers:[BankService]
})
export class BankregComponent implements OnInit {
  bankForm: FormGroup;
  constructor(public translate: TranslateService,private formbuilder: FormBuilder,private Service: BankService,private notificationsComponent:NotificationsComponent,private route: ActivatedRoute) { translate.setDefaultLang('en');
    this.bankForm = this.formbuilder.group({
      id: ['', []],
      accnumber: ['', []],
      accholder: ['', []],
      acctype: ['', []],
      opendate: ['', []],
      openingbal: ['', []],
      baltype: ['', []],
      accstatus: ['', []],
      bankname: ['', []],
      branch: ['', []],
      address1: ['', []],
      address2: ['', []],
      createdby: ['', []],
      createddate: ['', []],
      modifiedby: ['', []],
      modifieddate: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      shoprefid: [AppComponent.locrefID1, []],
      warehouserefid: ['', []],
      hospitalrefid: ['', []],
      Status: ['', []]
    })
  }
id;
  ngOnInit() {
     this.translate.use(localStorage.getItem('language'));
     this.id = this.route.snapshot.paramMap.get('id');
    
     if(this.id != null || undefined)
     this.Service.editBank(this.id).subscribe(data => {
       this.bankForm.patchValue(data)
     })
  }

onSubmit(){
    this.Service.saveBank(JSON.stringify(this.bankForm.value)).subscribe(data => {
      if (data) {
        this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      } else {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })
}

}
