import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { EditionService } from '../edition.service';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
@Component({
  selector: 'app-editiondetails',
  templateUrl: './editiondetails.component.html',
  styleUrls: ['./editiondetails.component.css'],
  providers: [NotificationsComponent]
})
export class EditiondetailsComponent implements OnInit {
  eId: any;
  subDomainID: any;
  moduleAssignForm: any;
  modulelist = [];
  submodulelist = [];
  dropdownSettings1 = {};
  selectedItems=[];
  selectedItems1=[];
 // dropdownSettings2 = {};
  submitted = false;
  i;
  
  deviceObj;
  editionID: any;
  sub: any;
  roleid: any;
  public returnFlag: boolean = false;
  selectsubmodulelist=[];
  fetchedsubmodulelist=[];
  constructor(private editionService: EditionService, private notificationsComponent: NotificationsComponent,private appComponent: AppComponent, private dateformat: dateFormatPipe,
    private router: ActivatedRoute, private formBuilder: FormBuilder, private routers: Router) {
    
  }

  ngOnInit() {
    this.moduleAssignForm = this.formBuilder.group({
      editionid: ['', []],
      subdomainrefid: ['', []],
      moduleid: ['', []],
      submoduleid: ['', []],
      editionname: ['', []],
      subdomainname: ['', []],
      lableallcheck:[false,[]],
      moduleallcheck:[false,[]],
      submoduleallcheck:[false,[]],
      lablearray: this.formBuilder.array([]),
      modulearray: this.formBuilder.array([]),
      submodulearray: this.formBuilder.array([]),
    });
    this.sub = this.router.queryParams.subscribe(params => {
       this.eId = +params['editionId'];
    //   this.subDomainID = +params['subDomainID'];
    });

    this.moduleAssignForm.get('editionid').setValue(this.eId);
    // this.editionService.checkEditionid(this.eId).subscribe(data => {
    //   this.editionID = data;
    // },err => {
    //     console.log('Console Error On getModules()');
    // });

    // this.moduleAssignForm.get('subdomainrefid').setValue(this.subDomainID);
    //**Get Edition**//
    this.editionService.getEditionname(this.eId).subscribe(data => {
      this.moduleAssignForm.get('editionname').setValue(data[0][0]),  //.toString()
      this.roleid = data[0][1]
    },err => {
        console.log('Error Occured On getEditionname()');
    });
    //**Get Sub-Domain**//
    // this.editionService.getSubdomainname(this.subDomainID).subscribe(data => {
    //   this.moduleAssignForm.get('subdomainname').setValue(data.toString())
    // },
    //   err => {
    //     console.log('Error Occured On getSubdomainname()');
    //   });

    //**GET LABLE LIST**//
    this.editionService.getLableslist(this.eId).subscribe(data => { this.setLableList(data) },
      err => {console.log('Error Occured On getModulelist()')});

    this.editionService.getSelectedSubModuleList(this.eId).subscribe(data => { this.setselectsubmodulelist(data) });

  }

 

  setLableList(data){
    const control = <FormArray>this.moduleAssignForm.controls['lablearray'];
    for (let i = 0; i < data.length; i++) {
      control.insert(0, this.formBuilder.group({
        lablecheck:[false,[]],
        lablename: [data[i], []],
      }));
    }
  }

  setselectsubmodulelist(data){
    for (let i = 0; i < data.length; i++) {
      this.fetchedsubmodulelist.push(data[i][0]);
    }
  }

  /** Get MODULE Info**/
  labelnames=[];
  modulenames=[];
  loadModules(lindex){
    const control1 = <FormArray>this.moduleAssignForm.controls['modulearray'];
    const control2 = <FormArray>this.moduleAssignForm.controls['submodulearray'];
    control1.controls=[]; control2.controls=[]; this.labelnames=[]; this.modulenames=[];
    this.moduleAssignForm.get('moduleallcheck').setValue(false);this.moduleAssignForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.moduleAssignForm.controls['lablearray'];
    control.value[lindex].lablecheck=!control.value[lindex].lablecheck;
    let lablevalue=control.value;
      for(let i=0; i< control.length; i++){
        if(lablevalue[i].lablecheck){
          this.editionService.getModulelist(this.moduleAssignForm.get('editionid').value,lablevalue[i].lablename).subscribe(data => { this.setModuleList(data); },
          error => {
            console.log('Error Occured On getsubModulelist()')
          });
        }else{
          this.moduleAssignForm.get('lableallcheck').setValue(false);
        }
      }
  }

  //Load All Modules
  loadAllModules(event){
    const control1 = <FormArray>this.moduleAssignForm.controls['modulearray'];
    const control2 = <FormArray>this.moduleAssignForm.controls['submodulearray'];
    control1.controls=[]; control2.controls=[]; this.labelnames=[]; this.modulenames=[];
    this.moduleAssignForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.moduleAssignForm.controls['lablearray'];
    let lablevalue=control.value;
    if(event.target.checked){
      this.moduleAssignForm.get('lableallcheck').setValue(true);
        for(let i=0; i< control.length; i++){
          lablevalue[i].lablecheck=true;
          control.patchValue(lablevalue);
          if(lablevalue[i].lablecheck){
            this.editionService.getModulelist(this.moduleAssignForm.get('editionid').value,lablevalue[i].lablename).subscribe(data => { this.setModuleList(data); },
            error => {
              console.log('Error Occured On getsubModulelist()')
            });
          }
        }
    }else{
      this.moduleAssignForm.get('lableallcheck').setValue(false);
      for(let i=0; i< control.length; i++){
        lablevalue[i].lablecheck=false;
        control.patchValue(lablevalue);
      }
    }
  }

  setModuleList(data: any) {
    const control = <FormArray>this.moduleAssignForm.controls['modulearray'];
    for (let i = 0; i < data.length; i++) {
      control.push(this.formBuilder.group({
        modulecheck:[false,[]],
        moduleid:[data[i][0],[]],
        modulename: [data[i][1], []],
      }));
      if(i==0){
        this.labelnames.push({ lindex:1, lname: data[0][2] });
        }else{
        this.labelnames.push({ lindex:0, lname: data[0][2] });
      } 
    }
  }


  loadsubmodules(moduleindex){
    const control1 = <FormArray>this.moduleAssignForm.controls['submodulearray'];
    control1.controls=[]; this.modulenames=[]; this.moduleAssignForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.moduleAssignForm.controls['modulearray'];
    control.value[moduleindex].modulecheck=!control.value[moduleindex].modulecheck;
    let modulevalue=control.value;
    for(let i=0; i< control.length; i++){
      if(modulevalue[i].modulecheck==true){
        this.editionService.getsubModulelist(this.moduleAssignForm.get('editionid').value,modulevalue[i].moduleid).subscribe(data => { 
          this.setsubModuleList(data) },error => { console.log('Error Occured On getsubModulelist()')
          });
      }else{
        this.moduleAssignForm.get('moduleallcheck').setValue(false);
      }
    }
  }

  //Select All Modules
  loadallsubmodules(event){
    const control1 = <FormArray>this.moduleAssignForm.controls['submodulearray'];
    control1.controls=[]; this.modulenames=[]; this.moduleAssignForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.moduleAssignForm.controls['modulearray'];
    let modulevalue=control.value;
    if(event.target.checked){
      this.moduleAssignForm.get('moduleallcheck').setValue(true);
      for(let i=0; i< control.length; i++){
        modulevalue[i].modulecheck=true;
        control.patchValue(modulevalue);
        if(modulevalue[i].modulecheck==true){
          this.editionService.getsubModulelist(this.moduleAssignForm.get('editionid').value,modulevalue[i].moduleid).subscribe(data => { 
            this.setsubModuleList(data) },error => { console.log('Error Occured On getsubModulelist()')
            });
        }
      }
    }else{
      this.moduleAssignForm.get('moduleallcheck').setValue(false);
      for(let i=0; i< control.length; i++){
        modulevalue[i].modulecheck=false;
        control.patchValue(modulevalue);
      }
    }
  }

  // for (let i = 0; i < data.length; i++) {
  //   control.push(this.formBuilder.group({
  //     submodulecheck:[false,[]],
  //     submoduleid:[data[i][0],[]],
  //     submodulename: [data[i][1],[]],
  //     moduleid:[data[i][2],[]],
  //     //disablevalue:[1,[]]
  //   }));
  //   if(i==0){
  //     this.modulenames.push({ mindex:1, mname: data[0][3] });
  //     }else{
  //       this.modulenames.push({ mindex:0, mname: data[0][3] });
  //   } 
  // }
  setsubModuleList(data: any) {
    const control = <FormArray>this.moduleAssignForm.controls['submodulearray'];
    for (let i = 0; i < data.length; i++) {
      let found = false;
      if(i==0){
        this.modulenames.push({ mindex:1, mname: data[0][3] });
        }else{
        this.modulenames.push({ mindex:0, mname: data[0][3] });
      } 
      for(let j=0; j< this.fetchedsubmodulelist.length; j++){
        if(data[i][0]==this.fetchedsubmodulelist[j]){
            found=true;
            control.push(this.formBuilder.group({
              submodulecheck:[false,[]],
              submoduleid:[data[i][0],[]],
              submodulename: [data[i][1],[]],
              moduleid:[data[i][2],[]],
              disablevalue:[1,[]]
            }));
            break;
        }
      }
      if(found== false){
        control.push(this.formBuilder.group({
          submodulecheck:[false,[]],
          submoduleid:[data[i][0],[]],
          submodulename: [data[i][1],[]],
          moduleid:[data[i][2],[]],
          disablevalue:[0,[]]
        }));
      } 
    }
  }

  selectallsubmodules(event){
    const control = <FormArray>this.moduleAssignForm.controls['submodulearray'];
    let submodulesvalue=control.value;
    if(event.target.checked){
      for(let i=0; i< control.length; i++){
        if(submodulesvalue[i].disablevalue==0){
          submodulesvalue[i].submodulecheck=true;
          control.patchValue(submodulesvalue);
        }
      }
    }else{
      for(let i=0; i< control.length; i++){
          submodulesvalue[i].submodulecheck=false;
          control.patchValue(submodulesvalue);
      }
    }
  }


  justInitiate() {
    this.deviceObj = {
      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      ipaddress: this.appComponent.ipAddress,
      browsertype: this.appComponent.browser,
      ostype: this.appComponent.os,
      osversion: this.appComponent.osversion,
      devicetype: this.appComponent.devicetype,
      apiname: '',
      description: '',
      clientcdate: this.dateformat.transform04()
    };
  }

  sendlists=[];
  finallists=[];
  checkedsubmodules=[];
  saveprocess:boolean=false;
  savemodules(){
    this.sendlists=[];
    this.finallists=[];
    this.checkedsubmodules=[];
    const control = <FormArray>this.moduleAssignForm.controls['submodulearray'];
    let submodulevalues= control.value;
    let eID = this.moduleAssignForm.get("editionid").value;
    if(control.length>0){
      for (let i = 0; i < control.length; i++) {
        if(submodulevalues[i].submodulecheck==true){
              this.checkedsubmodules.push({moduleid:submodulevalues[i].moduleid,submoduleid:submodulevalues[i].submoduleid,submodulename:submodulevalues[i].submodulename})
        }
      }
      if(this.checkedsubmodules.length>0){
        let prevmodules=this.fetchedsubmodulelist;
        for(let i=0;i<this.checkedsubmodules.length;i++){ this.sendlists.push(this.checkedsubmodules[i].submoduleid) };//change
        let array3 = this.sendlists.filter(function(obj) {  return prevmodules.indexOf(obj) == -1 });
        for(let m=0 ;m<array3.length;m++){
          let subindx= this.checkedsubmodules.findIndex(p => p.submoduleid==array3[m]);
          let moduleid=this.checkedsubmodules[subindx].moduleid;
          this.finallists.push({submoduleid:array3[m],moduleid:moduleid,editionid:eID,roleid:this.roleid})
        }
          if(this.finallists.length>0){
            this.saveprocess=true;
            this.editionService.createControl(JSON.stringify(this.finallists)).subscribe(data => {
              if(data){
                  this.editionService.SaveRoleControl(JSON.stringify(this.finallists)).subscribe(data => {
                  if(data){
                    this.saveprocess=false;
                    this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Module Assign Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                    setTimeout(() => { this.routers.navigate(['/Edition/ViewEdition']) },1300);  
                    //this.ngOnInit();
                  }
                  else{
                    this.saveprocess=false;
                    this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module not Assigned', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                  }
              })       
              }else{
                this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module not Assigned', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              }
            },err => {
              this.saveprocess=false;
              let splitmsg=err._body.split(" ");
              //alert(splitmsg[5]+splitmsg[5].split("'")[1]);
              if(splitmsg[5].split("'")[1]=='moduleid,userrefid'){
              this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Module Assigned Succesfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              //setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1300);      
              }else{
                this.saveprocess=false;
                this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module not Assigned', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                //setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1000);
              }
            });
          }else{
            this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Selected Submodules are Already Assigned Select Else', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            control.controls=[];
          }
        }else{
          this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Submodules not Selected', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
      
      }else{
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Submodules not Listed', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
  }

  moduleid;
  submoduleid;
  pushmodule =[];
  onSubmit(): any {
    this.moduleid = this.moduleAssignForm.get('moduleid').value;
    this.submoduleid = this.moduleAssignForm.get('submoduleid').value;
    for(let m =0 ;m<this.submoduleid.length;m++){
      this.pushmodule.push({
        submoduleid:this.submoduleid[m].id,moduleid:this.submoduleid[m].moduleid,editionid:this.eId,roleid:this.roleid
      })
    }
    this.submitted = true;
    this.returnFlag = this.validation();
    if (this.returnFlag == true) {
      this.editionService.createControl(JSON.stringify(this.pushmodule)).subscribe(data => {
        if (data) {
      this.editionService.SaveRoleControl(JSON.stringify(this.pushmodule)).subscribe(
  data => {
    if(data){
      this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Module Assign Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.ngOnInit();
    }
    else{
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module Is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  })

          this.justInitiate();
          this.deviceObj.apiname = "api/saveAssignmodule";
          this.deviceObj.description="Edition Created";
    
          this.editionService.deviceDetails(JSON.stringify(this.deviceObj))
            .subscribe(data => { },
              errorCode => console.log(errorCode));






       //   this.routers.navigate(['Edition/ViewEdition']);
        }
        else{
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module Is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' }); 
        }
      },
        err => {
          if(err.status == 400){
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module Is Exist!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });  
          }
          console.log('Error Occured On createControl()');
        });
    }
  }





  validation(): boolean {
    if (this.moduleAssignForm.get('moduleid').value == null || this.moduleAssignForm.get('moduleid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module Is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.moduleAssignForm.get('submoduleid').value == null || this.moduleAssignForm.get('submoduleid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Module Is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }
  viewEdition() {
    this.routers.navigate(['Edition/ViewEdition']);
  }

}






