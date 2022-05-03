import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { viewinvoiceService } from './viewPurchaseinvoice.services';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component'; 
import { TranslateService } from 'ng2-translate';  
@Component({
  selector: 'app-viewPurchaseinvoice',
  templateUrl: './viewPurchaseinvoice.component.html',
  providers: [viewinvoiceService]
})

export class viewinvoiceComponent implements OnInit {
  @Input() searchText;
  data: Array<any>;
  eid: any;
  number;
  gifFail: boolean=true;
  rowsOnPage:number=10;
  constructor(public translate: TranslateService,private viewPurc: viewinvoiceService, private router: Router) {translate.setDefaultLang('en');
    this.data = new Array<any>();
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    if (AppComponent.shopID != 0) {
      setTimeout(() => {
      this.viewPurc.viewPurchase(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => { this.data = data },
        error => {
          console.log('Error ocuured On viewPurchase()');
        });
        this.gifFail=false;
      },3000);
    }
    if (AppComponent.warehouseID != 0) {
      setTimeout(() => {
      this.viewPurc.viewPurchase(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => { this.data = data },
        error => {
          console.log('Error ocuured On viewPurchase()');
        });
        this.gifFail=false;
      },3000);
    }
    if (AppComponent.hospitalID != 0) {
      setTimeout(() => {
      this.viewPurc.viewPurchase(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => { this.data = data },
        error => {
          console.log('Error ocuured On viewPurchase()');
        });
        this.gifFail=false;
      },3000);
    }
  }
  /* EDIT PURCHASE INVOICE  */
  editPurvinvoice(id: any)//Error Method
  {
    this.eid = id;
    this.router.navigate(['/PurchaseInvoice/editPurchaseinvoice'], { queryParams: this.eid, skipLocationChange: true });
  }

  /* DELETE PURCHASE INVOICE  */
  deletePurvinvoice(id: number) {

    var answer = confirm("Delete data?");
    if (answer) {
    this.viewPurc.deletePurc(id).subscribe(data =>
      error => {
        console.log('Error Occured  From DeletePurvinvoice')
      });
    /** Reload The paeg After Delete Invoice
    this.viewPurc.viewPurchase().subscribe(data => { this.data = data },
      error => {
        console.log('Error ocuured On viewPurchase()');
      }
    );**/
    this.ngOnInit();
    }
  }
}