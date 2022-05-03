import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { BannedDrugService } from '../banneddruglist.service';
//@Auther DesingRaja
@Component({
  selector: 'app-addbanneddrug',
  templateUrl: './addbanneddrug.component.html',
  styleUrls: ['./addbanneddrug.component.css'],
  providers:[NotificationsComponent]
})
export class AddbanneddrugComponent implements OnInit {
AddBannedDrug:FormGroup;
selobj:any;


// @ViewChild('alert', {  }) alert: ElementRef;

public data: any;
public rowsOnPage: number = 20;
public filterQuery: string = "";
public sortBy: string = "";
public sortOrder: string = "desc";
gifFail: boolean=true;
  updatedrug: any;
  flag: any;

  extcolm=[{},{},{},{},{}];
  constructor(private router:Router,
              private formbuilder:FormBuilder,
              private appcomponent:AppComponent,
              private notification:NotificationsComponent,
              private bannedservice:BannedDrugService) {

                
    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, boxdispflag: AppComponent.BoxDispFlag,
      stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

               }

  ngOnInit() {
    this.AddBannedDrug = this.formbuilder.group({
      drugid:['',],
      genericid:['',[]],
      bannedfrom:['',[]],
      reason:['',[]]
    })

    this.data=[];
  }

  
  searchstock(searchvalue){
    let searchdrugdata = { countryrefid: this.selobj.countryrefid, searchvalue };
    this.bannedservice.searchdrug(JSON.stringify(searchdrugdata)).subscribe(data => { 
      if(data.length>0){
        this.pushallstocks(data);
      }
    }, error => { console.log(error); });

  }

  stockitems=[];
  pushallstocks(data) {
    this.stockitems = [];
    for (let i = 0; i < data.length; i++) {
      this.stockitems.push({ value: data[i][3], label: data[i][4]})
    }
  }

  getproducts(){
    // alert(this.AddBannedDrug.get('genericid').value);
    this.bannedservice.getproduct(this.AddBannedDrug.get('genericid').value,AppComponent.countryID).subscribe(data => {this.data = data
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'Generic Not Listed..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }
bannedreason:any;
  onSubmit(){
    this.bannedreason = this.AddBannedDrug.get('reason').value;
    this.flag = this.validation();
  
    // alert(this.flag)
    if(this.flag == true){
    this.bannedservice.drugbanned(this.AddBannedDrug.get('genericid').value,AppComponent.countryID,this.AddBannedDrug.get('bannedfrom').value,this.bannedreason).subscribe(data =>{this.updatedrug = data
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'Error..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      this.notification.addToast({ title: 'Sucess Message', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.ngOnInit;
      // this.AddBannedDrug.reset();
    });
  
  }
  else{
    this.notification.addToast({ title: 'Error Message', msg: 'Check the Values..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  }

  }

  // closeAlert() {
  //   this.alert.nativeElement.classList.remove('show');
  // }

  validation(): boolean {
    if (this.AddBannedDrug.get('genericid').value == " " || this.AddBannedDrug.get('genericid').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Search and Select Generic Value..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.AddBannedDrug.get('bannedfrom').value == " " || this.AddBannedDrug.get('bannedfrom').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Please Select Banned Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.AddBannedDrug.get('reason').value == null || this.AddBannedDrug.get('reason').value == " ") {
      this.notification.addToast({ title: 'Error Message', msg: 'Please Enter the Reason for Banned..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

}
