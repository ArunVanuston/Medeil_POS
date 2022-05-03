import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { PrintqrSettingService } from '../printqrsettings.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-printsettingssave',
  templateUrl: './printsettingssave.component.html',
  styleUrls: ['./printsettingssave.component.css']
})
export class PrintsettingssaveComponent implements OnInit {
  printForm: FormGroup;
  printforms=[];

  constructor(private formBuilder: FormBuilder, private printservice:PrintqrSettingService, private notificationsComponent: NotificationsComponent,
    private router: Router) { }

  ngOnInit() {
    this.printForm = this.formBuilder.group({   
      printarray: this.formBuilder.array([]),
    });

    this.printservice.viewdefaultforms().subscribe(data => {
      this.bindprint(data);
    },err => { console.log(err)});
    
  }

  bindprint(data) {
    const control = <FormArray>this.printForm.controls['printarray'];
    control.controls = [];
    for (let i= data.length-1; i>=0; i--) {
      control.insert(0, this.formBuilder.group({
        printid:[0,[]],
        formid:[data[i][0],[]],
        formname: [data[i][1], []],
        printtypeid: [1, []],
        printtype: ['Basic', []],
        printlabelid:[0,[]],
        printlabel:['Sample',[]],
        companyid: [AppComponent.companyID, []],
        branchid: [AppComponent.branchID, []],
        locname: [AppComponent.locRefName1, []],
        locrefid: [AppComponent.locrefID1, []], 
      }));
    }

  }

  savesettings(){
    const control = <FormArray>this.printForm.controls['printarray'];
    let printvalues=control.value;
      if(control.length>0){
        this.printservice.saveprintsettings(JSON.stringify(printvalues)).subscribe(data => {
          if(data){
            this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Created Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
            setTimeout(() => {
              this.router.navigate(['psettings/viewprintsettings']);
            }, 1500);
          }else{
            this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          }
        },err => { console.log(err);
          let errmsg=err._body.split(":")[1];
          if(errmsg.split(" ")[1]=="entry"){
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Data Already Created', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
            setTimeout(() => {
              this.router.navigate(['psettings/viewprintsettings']);
            }, 1500);
          }});
      }else{
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Values to Create', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      }
    }

}
