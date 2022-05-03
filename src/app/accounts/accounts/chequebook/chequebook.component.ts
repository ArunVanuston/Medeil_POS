import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { ChequeService } from './chequebook.service';

@Component({
  selector: 'app-chequebook',
  templateUrl: './chequebook.component.html',
  styleUrls: ['./chequebook.component.css'],
  providers: [ChequeService]
})
export class ChequebookComponent implements OnInit {
  chequeForm:FormGroup;
  bankdetails = [];
  constructor(private fb:FormBuilder,private Service: ChequeService,private notificationsComponent:NotificationsComponent,private route: ActivatedRoute) { }

  ngOnInit() {
    this.chequeForm = this.fb.group({
      accno:[],
      chqbookno:[],
      startno:[],
      endno:[],
      noofcheques:[],
      issueddate:[],
      bankname:[],
      branch:[],
      remarks:[],
      companyrefid:[AppComponent.companyID],
      branchrefid:[AppComponent.branchID],
      shoprefid:[AppComponent.locrefID1]  
    })

    this.Service.viewBank(AppComponent.companyID,AppComponent.branchID,AppComponent.locrefID1).subscribe(data => {
      this.bankdetails = data
    })
  }
  onSubmit(){
    this.Service.saveCheque(JSON.stringify(this.chequeForm.value)).subscribe(data => {
      if (data) {
        this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      } else {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })
}

getbank(event){
  let subindx = this.bankdetails.findIndex(p => p[0] == event);
  this.chequeForm.get('bankname').setValue(this.bankdetails[subindx][1]);
  this.chequeForm.get('accno').setValue(this.bankdetails[subindx][2]);
  this.chequeForm.get('branch').setValue(this.bankdetails[subindx][3]);
}


}
