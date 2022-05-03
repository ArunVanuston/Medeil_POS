import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ModulerankService } from './modulerank.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulerank',
  templateUrl: './modulerank.component.html',
  styleUrls: ['./modulerank.component.css'],
  providers: [ModulerankService]
})

export class ModulerankComponent implements OnInit {
  parentMessage="sales";
  itemlength=[{},{},{},{},{}]
  data = [];
  modulelist = [];
  selobj;
  modulerankForm: FormGroup;
  duplicatereturn: boolean;
  basicreturn: boolean;
  saveprocess:boolean=false;
  constructor(private formBuilder: FormBuilder, private modulerank: ModulerankService,
    private notificationsComponent: NotificationsComponent,private router: Router) {

    this.modulerankForm = this.formBuilder.group({

      id: ['', []],
      foldername: ['', []],
      moduleDetails: this.formBuilder.array([]),
    });

  }

  ngOnInit() {

    this.modulerankForm.get('id').setValue(sessionStorage.getItem('indvuserid'));
    this.modulerankForm.get('foldername').setValue('opt1');
    this.getfolders();

  }

  getfolders() {

    this.modulerank.getfolders(JSON.stringify(this.modulerankForm.value)).subscribe(data => { this.modulelist = data },
      errorCode => console.log(errorCode));

  }

  getmodules() {

    this.modulerank.getmodules(this.modulerankForm.get('id').value,
      this.modulerankForm.get('foldername').value).subscribe(data => {(this.pushTableData(data))},
        err => {
          console.log('Error Occured Get getModules');
        });

  }

  pushTableData(data: any) {
    
    const getData = <FormArray>this.modulerankForm.controls['moduleDetails'];
    getData.controls=[];
   
    for (let i = 0; i < data.length ; i++) {
        getData.push(this.showPOdata(
          data[i][0],
          data[i][1],
          data[i][2],
          data[i][3],

        ));

    }

  }

  showPOdata(uid: any, mid: any, modulename: any,ranking: any) {

    return this.formBuilder.group({
      suserrefid: uid,
      moduleid: mid,
      modulename:modulename,
      ranking: ranking,
    });
  }

  onSubmit() {

    this.basicreturn = this.basicValidation();

    if (this.basicreturn == false) {

      this.notificationsComponent.addToast({ title: 'Warning', msg: 'Check Listed Basic Validation...', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }

    else {

      this.dupicateValidation();

    }

  }


  basicValidation(): boolean {

    var basicbool: boolean = true;

    const saveData = <FormArray>this.modulerankForm.controls['moduleDetails'];

    let getData = saveData.value;

    for (var i = 0; i < getData.length; i++) {
      if (getData[i].ranking == '' || getData[i].ranking==null) {

        basicbool = false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Ranking Value Not to be Empty ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

      }

      else if (getData[i].ranking == 0) {


        basicbool = false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Ranking Value Not to be Zero ... Start Count 1', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }

      else if (getData[i].ranking > getData.length) {


        basicbool = false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Ranking Value Not More Your Module Count ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

      }

    }

    return basicbool;

  }


  dupicateValidation() {

    var duplicatebool: boolean = true;

    const saveData = <FormArray>this.modulerankForm.controls['moduleDetails'];
    let getData = saveData.value;

    let length = getData.length;

    for (var i = 0; i < length; i++) {

      for (var k = i + 1; k < length; k++) {

        if (getData[i].ranking == getData[k].ranking) {

          duplicatebool = false;
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Duplicate Ranking Value Occur ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

        }

      }

    }

    if (duplicatebool == true) {
      this.saveprocess=true;
      const saveData = <FormArray>this.modulerankForm.controls['moduleDetails'];
      let setdata = saveData.value
      this.modulerank.saverank(JSON.stringify(setdata)).subscribe(data => {

        if (data == true) {  
          this.saveprocess=false; 
          this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved Successfully...', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          const getData = <FormArray>this.modulerankForm.controls['moduleDetails'];
          getData.controls=[];
          this.ngOnInit();
        }
        else{
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },
        error => {
          this.saveprocess=false;
          console.log("Error createPurchaseOrderProduct");
        });

    }

  }
  //duplicate validation end


}