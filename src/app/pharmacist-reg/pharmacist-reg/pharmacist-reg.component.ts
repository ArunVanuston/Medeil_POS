import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { pharmacistregService } from '../Pharmacistreg.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
// import {DocumentEditorComponent, PrintService} from '@syncfusion/ej2-angular-documenteditor';

/**@Author Desing Raja**/
@Component({
  selector: 'app-pharmacist-reg',
  templateUrl: './pharmacist-reg.component.html',
  styleUrls: ['./pharmacist-reg.component.css'],
  providers:[NotificationsComponent]
})
export class PharmacistRegComponent implements OnInit {
  Pharmreg:FormGroup;
  schedule: any;
  

  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
 
  

  constructor(private formbulder:FormBuilder,
              private router:Router,
              private appcomponent:AppComponent,
              private phamregservice:pharmacistregService,
              private notification:NotificationsComponent) { 
                this.Pharmreg =this.formbulder.group({

                  companyrefid:[,[]],
                  branchrefid:[,[]],
                  locname:[,[]],
                  locrefid:[,[]],
                  scheduleid:[,[]],
                  fromdate:[,[]],
                  todate:[,[]]

                })
              }



  ngOnInit() {
    this.Pharmreg.get('companyrefid').setValue(AppComponent.companyID);
    this.Pharmreg.get('branchrefid').setValue(AppComponent.branchID);
    this.Pharmreg.get('locname').setValue(AppComponent.locRefName)
    this.Pharmreg.get('locrefid').setValue(AppComponent.locrefID1);  
    this.Pharmreg.get('scheduleid').setValue("opt1"); 
    this.phamregservice.getschedule().subscribe(data => {
      this.schedule = data
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'Country not listed..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });


    setTimeout(() => {
      
 
    this.phamregservice.getallschedule(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
     this.data = data
     this.gifFail=false;
      })
    }, 3000);
  }

  getscheduledata(){
   
    this.phamregservice.getscheduler(this.Pharmreg.get('scheduleid').value,this.Pharmreg.get('fromdate').value,this.Pharmreg.get('todate').value,AppComponent.companyID,AppComponent.locrefID1).subscribe(data => {this.data =data
    
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: 'Country not listed..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });

   
  }
  
  public onPrint() :void {
    window.print();
}

reportlink(){
  this.router.navigate(['PharmacistRegReport/PharmacistRegisterReport']);
}


}
