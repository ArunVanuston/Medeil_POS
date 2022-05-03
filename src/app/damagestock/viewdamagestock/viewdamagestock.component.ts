import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { DamagestockService } from '../damagestock.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import swal from 'sweetalert2';
import { TranslateService } from 'ng2-translate';  
@Component({
  selector: 'app-viewdamagestock',
  templateUrl: './viewdamagestock.component.html',
  providers: [DamagestockService]
})

export class viewDamageComponent implements OnInit {
  @Input() searchText;
  // data: Array<any>;
  eid: any;
  number;


  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;

  constructor(public translate: TranslateService,private viewdama: DamagestockService, private router: Router) {translate.setDefaultLang('en');
    // this.data = new Array<any>();
  }
  
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    setTimeout(() => {
    this.viewdama.viewDamage(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => { this.data = data },
      error => {
        console.log('Error ocuured On viewDamage()');
      });
      this.gifFail=false;
    },3000);
  }

  /* EDIT PURCHASE INVOICE */
  editDamage(id: any)//Error Method
  {
    this.eid = id;
    this.router.navigate(['/DamageStock/editdamagestock'], { queryParams: this.eid, skipLocationChange: true });
  }

  /* DELETE PURCHASE INVOICE  */
  deletedamagestock(id: number) {
    
    this.viewdama.deletedamastock(id).subscribe(data =>
      error => {
        console.log('Error Occured  From DeleteDamage')
      });
    this.ngOnInit();
    
  }

  viewhq(): void {
    this.router.navigate(['/DamageStock/viewhq']);
  }




  RemoveConfirmsSwal(i) {
    swal({
      title: 'You want Delete this?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(() => {
     
      this.deletedamagestock(i);

      // this.router.navigate(['/userlogin/login']);
     
    }).catch(swal.noop);
  }
}








































