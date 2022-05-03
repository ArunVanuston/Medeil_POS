import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FolderrankService } from './folderranking.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { UserloginService } from 'app/userlogin/userlogin.service';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout.component';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-folderranking',
  templateUrl: './folderranking.component.html',
  styleUrls: ['./folderranking.component.css'],
  providers: [UserloginService,FolderrankService]
})

export class FolderrankingComponent implements OnInit {
  parentMessage="sales";
  itemlength=[{},{},{},{},{}]
  data = [];
  selobj;
  userid: any;
  folderrankForm: FormGroup;
  duplicatereturn: boolean;
  saveprocess:boolean=false;
  constructor(private formBuilder: FormBuilder, private folderrank: FolderrankService,private loginService: UserloginService,
  private notificationsComponent: NotificationsComponent,private adminlay: AdminLayoutComponent,private router: Router) {

    this.folderrankForm = this.formBuilder.group({

      folderDetails: this.formBuilder.array([
      ]),
    });

  }

  ngOnInit() {

    this.userid =sessionStorage.getItem('indvuserid');
    this.saverank();

  }

  saverank() {


    const getData = <FormArray>this.folderrankForm.controls['folderDetails'];
    getData.controls = [];

    this.folderrank.getfolders(this.userid).subscribe(data => {(this.pushTableData(data)) },
      errorCode => console.log(errorCode));

  }


  pushTableData(data: any) {

    const getData = <FormArray>this.folderrankForm.controls['folderDetails'];

    for (let i = 0; i < data.length ; i++) {

        getData.push(this.showPOdata(
          data[i][0],
          data[i][1],
          data[i][2],
        ));

      }

  }

  showPOdata(foldername: any, uid: any,rank: any) {
    return this.formBuilder.group({
      label: foldername,
      suserrefid: uid,
      ranking: rank,
    });
  }

  onSubmit() {
    let basicreturn = this.basicValidation();
    if (basicreturn == false) {
      this.notificationsComponent.addToast({ title: 'Warning', msg: 'Check Listed Basic Validation...', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }else {
      this.dupicateValidation();
    }
  }


  basicValidation(): boolean {
    var basicbool: boolean = true;
    const saveData = <FormArray>this.folderrankForm.controls['folderDetails'];
    let getData = saveData.value;
    for (var i = 0; i < getData.length; i++) {
      if (getData[i].ranking == ''|| getData[i].ranking == null || getData[i].ranking == 0) {
        basicbool = false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Ranking Value '+[i+1]+' Not to be Empty or Zero...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        break;
      }else if (getData[i].ranking > getData.length) {
        basicbool = false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Ranking Value '+[i+1]+' Not More Your Module Count ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        break;
      }
    }
    return basicbool;
  }


  dupicateValidation() {
    var duplicatebool: boolean = true;
    const saveData = <FormArray>this.folderrankForm.controls['folderDetails'];
    let getData = saveData.value;

    let length = getData.length;
    for (var i = 0; i < length; i++) {
      for (var k = i + 1; k < length; k++) {
        if (getData[i].ranking == getData[k].ranking){
          duplicatebool = false;
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Duplicate Ranking '+[i+1]+' Value Occur ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          break;
        }
      }
    }

    if (duplicatebool == true) {
      this.saveprocess=true;
      const saveData = <FormArray>this.folderrankForm.controls['folderDetails'];

      this.folderrank.saverank(JSON.stringify(saveData.value)).subscribe(data => { 
        if(data==true){
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved Successfully...', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.refreshmodules();
          //this.router.navigate(['/userlogin/login']);
        }else{
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

refreshmodules(){
  let acctoken = jwt_decode(sessionStorage.getItem("acctoken"));
  var postdata = { username: acctoken.user_name, companyrefid: acctoken.companyid }
  this.loginService.getAuthorities(JSON.stringify(postdata)).subscribe(
    data => {
      sessionStorage.setItem("auth",JSON.stringify(data.modules));
      sessionStorage.setItem("labels",JSON.stringify(data.labels));
      if (data == null) {
        alert("Not Assigned")
      }
      else {
        //sessionStorage.setItem("ranking",JSON.stringify(this.editionranking));
        this.adminlay.menu = JSON.parse(sessionStorage.getItem("auth"));
        this.adminlay.modLabel = JSON.parse(sessionStorage.getItem("labels"));
        this.router.navigate(['/GeneralSettings/GeneralSettings']);      
      }
    },
    err => {
      sessionStorage.removeItem("moduleLabel")
      console.log("invalid_token"+err)
    }
  )
}


}

