import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { DamagestockService } from '../damagestock.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-viewhq',
  templateUrl: './viewhq.component.html',
  styleUrls: ['./viewhq.component.css'],
  providers: [DamagestockService]
})
export class ViewhqComponent implements OnInit {
  @Input() searchText;
  data: Array<any>;
  eid: any;
  number;
  constructor(private viewdama: DamagestockService, private router: Router) {
    this.data = new Array<any>();
  }
  ngOnInit() {


    this.viewdama.viewhqDamage(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => { this.data = data },
      error => {
        console.log('Error ocuured On viewDamage()');
      }

    );
  }
  /* EDIT PURCHASE INVOICE */
  editDamage(id: any)//Error Method
  {
    this.eid = id;
    this.router.navigate(['/DamageStock/viewdamagestockhq'], { queryParams: this.eid, skipLocationChange: true });
  }

  /* DELETE PURCHASE INVOICE  */
  deleteDamage(id: number) {
    this.viewdama.deletedamastock(id).subscribe(data =>
      error => {
        console.log('Error Occured  From DeleteDamage')
      });
    /** Reload The paeg After Delete Invoice
    this.viewPurc.viewPurchase().subscribe(data => { this.data = data },
      error => {
        console.log('Error ocuured On viewPurchase()');
      }
    );
     viewhq(): void{
    this.router.navigate(['/damagestock/viewdamagestockhq']);
  }
    **/
    this.ngOnInit();
  }

}
