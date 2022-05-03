import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { TranslateService } from 'ng2-translate';
@Component({
  selector: 'app-roledetails',
  templateUrl: './roledetails.component.html',
  providers: [NotificationsComponent]
})
export class RoledetailsComponent implements OnInit {
  alertmsgs:any;
  parentMessage="role";
  @ViewChild("submod") smod: any;
  roleAssignForm: FormGroup;
  roleid: number;
  roleindx:any;
  
  selectsubmodulelist=[];
  fetchedsubmodulelist=[];
  dropdownSettings1 = {
    maxHeight: 300,
    singleSelection: false,
    text: "--- Select Module ---",
    badgeShowLimit: 1,
    classes: "myclass custom-class",
  };
  public reFlag: boolean = false;
  constructor(public translate: TranslateService,private editionService: RoleService, private route: ActivatedRoute,
    private notificationsComponent: NotificationsComponent, private router: Router,private formBuilder: FormBuilder) { translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    const moduleid = new FormControl();
    const submoduleid = new FormControl();
    const roleid = new FormControl();
    const rolename = new FormControl();
    const editionid=new FormControl();
    const lableallcheck=new FormControl();
    const moduleallcheck=new FormControl();
    const submoduleallcheck=new FormControl();
    this.roleAssignForm = new FormGroup({
      moduleid: moduleid,
      submoduleid: submoduleid,
      roleid: roleid,
      rolename: rolename,
      editionid:editionid,
      lableallcheck:lableallcheck,
      moduleallcheck:moduleallcheck,
      submoduleallcheck:submoduleallcheck,
      lablearray: this.formBuilder.array([]),
      modulearray: this.formBuilder.array([]),
      submodulearray: this.formBuilder.array([]),
      //for check purpose
      labelsample: this.formBuilder.array([]),
      modulesample: this.formBuilder.array([]),
      submodulesample: this.formBuilder.array([]),
    });

    this.route.params.subscribe(params => {this.roleAssignForm.get('roleid').setValue(this.roleid);
    this.roleid = +params['id'],this.roleindx = +params['rindex']});

    this.editionService.getRoleEditionID(this.roleid,this.roleindx).subscribe(data => {
      this.roleAssignForm.get('editionid').setValue(data[0][0])
      this.roleAssignForm.get('rolename').setValue(data[0][2]) 
    }, err => { console.log('Error Occured On getRoleName()')});

    this.editionService.getLabelList(sessionStorage.getItem('indvuserid')).then(data => { this.setlabellist(data) });
    //this.editionService.getModuleList(sessionStorage.getItem('indvuserid')).then(data => { this.setmodulelist(data) });
    this.editionService.getSelectedSubModuleList(this.roleid).subscribe(data => { this.setselectsubmodulelist(data) });

    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.editionService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }

  setlabellist(data){
    const control = <FormArray>this.roleAssignForm.controls['lablearray'];
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


  labelnames=[];
  modulenames=[];
  loadModules(labelindex){
    const control1 = <FormArray>this.roleAssignForm.controls['modulearray'];
    const control2 = <FormArray>this.roleAssignForm.controls['submodulearray'];
    control1.controls=[]; control2.controls=[]; this.labelnames=[]; this.modulenames=[];
    this.roleAssignForm.get('moduleallcheck').setValue(false);this.roleAssignForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.roleAssignForm.controls['lablearray'];
    control.value[labelindex].lablecheck=!control.value[labelindex].lablecheck;
    let lablevalue=control.value;
      for(let i=0; i< control.length; i++){
        if(lablevalue[i].lablecheck){
          this.editionService.getModuleList(sessionStorage.getItem('indvuserid'),lablevalue[i].lablename)
          .then(data => { this.setModuleList(data) });
        }else{
          this.roleAssignForm.get('lableallcheck').setValue(false);
        }
      }
  }

  //Load All Modules
  loadAllModules(event){
    const control1 = <FormArray>this.roleAssignForm.controls['modulearray'];
    const control2 = <FormArray>this.roleAssignForm.controls['submodulearray'];
    control1.controls=[]; control2.controls=[]; this.labelnames=[]; this.modulenames=[];
    this.roleAssignForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.roleAssignForm.controls['lablearray'];
    let lablevalue=control.value;
    if(event.target.checked){
      this.roleAssignForm.get('lableallcheck').setValue(true);
        for(let i=0; i< control.length; i++){
          lablevalue[i].lablecheck=true;
          control.patchValue(lablevalue);
          if(lablevalue[i].lablecheck){
            this.editionService.getModuleList(sessionStorage.getItem('indvuserid'),lablevalue[i].lablename)
            .then(data => { this.setModuleList(data) });
          }
        }
    }else{
      this.roleAssignForm.get('lableallcheck').setValue(false);
      for(let i=0; i< control.length; i++){
        lablevalue[i].lablecheck=false;
        control.patchValue(lablevalue);
      }
    }
  }


  setModuleList(data){
    const control = <FormArray>this.roleAssignForm.controls['modulearray'];
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
    const control1 = <FormArray>this.roleAssignForm.controls['submodulearray'];
    control1.controls=[]; this.modulenames=[]; this.roleAssignForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.roleAssignForm.controls['modulearray'];
    control.value[moduleindex].modulecheck=!control.value[moduleindex].modulecheck;
    let modulevalue=control.value;
    for(let i=0; i< control.length; i++){
      if(modulevalue[i].modulecheck==true){
        this.editionService.getSubModuleList(sessionStorage.getItem('indvuserid'),modulevalue[i].moduleid).subscribe(data => { 
          this.setsubModuleList(data) },error => { console.log('Error Occured On getsubModulelist()')
          });
      }else{
        this.roleAssignForm.get('moduleallcheck').setValue(false);
      }
    }
  }

  //Select All Modules
  loadallsubmodules(event){
    const control1 = <FormArray>this.roleAssignForm.controls['submodulearray'];
    control1.controls=[]; this.modulenames=[]; this.roleAssignForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.roleAssignForm.controls['modulearray'];
    let modulevalue=control.value;
    if(event.target.checked){
      this.roleAssignForm.get('moduleallcheck').setValue(true);
      for(let i=0; i< control.length; i++){
        modulevalue[i].modulecheck=true;
        control.patchValue(modulevalue);
        if(modulevalue[i].modulecheck==true){
          this.editionService.getSubModuleList(sessionStorage.getItem('indvuserid'),modulevalue[i].moduleid).subscribe(data => { 
            this.setsubModuleList(data) },error => { console.log('Error Occured On getsubModulelist()')
            });
        }
      }
    }else{
      this.roleAssignForm.get('moduleallcheck').setValue(false);
      for(let i=0; i< control.length; i++){
        modulevalue[i].modulecheck=false;
        control.patchValue(modulevalue);
      }
    }
    
  }

  setsubModuleList(data: any) {
    const control = <FormArray>this.roleAssignForm.controls['submodulearray'];
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
    const control = <FormArray>this.roleAssignForm.controls['submodulearray'];
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

  unselectallsubmodules(event){

  }

//  selesct duplicate or unque elemnts in array
unique=[];
removedup(){
   let array1=[2,3,5,7,10,12]
   let array2=[2,3,5,8]
   for(var i = 0; i < array1.length; i++){
     let found = false;
     for(var j = 0; j < array2.length; j++){ // j < is missed;
     if(array1[i] == array2[j]){
       found = true;
       break; 
     }
   }
   if(found == false){
   this.unique.push(array1[i]);
   } 
  }
}
//57,58,104,118,119,126"

  sendlists=[];
  finallists=[];
  checkedsubmodules=[];
  saveprocess:boolean=false;
  saveroles(){
    this.sendlists=[];
    this.finallists=[];
    this.checkedsubmodules=[];
    const control = <FormArray>this.roleAssignForm.controls['submodulearray'];
    let submodulevalues= control.value;
    let eID = this.roleAssignForm.get("editionid").value;
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
            this.editionService.AssignRoleModules(JSON.stringify(this.finallists)).subscribe(data => {
              if(data){
                this.saveprocess=false;
                this.notificationsComponent.addToast({ title: 'Success Message', msg: this.alertmsgs.role.roleassignedsuccesfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1300);         
              }else{
                this.saveprocess=false;
                this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.role.rolenotsssigned, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
              }
            },err => {
              let splitmsg=err._body.split(" ");
              //alert(splitmsg[5]+splitmsg[5].split("'")[1]);
              if(splitmsg[5].split("'")[1]=='moduleid,userrefid'){
              this.saveprocess=false;
              this.notificationsComponent.addToast({ title: 'Success Message', msg: this.alertmsgs.role.roleassignedsuccesfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1300);      
              }else{
                this.saveprocess=false;
                this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.role.rolenotsssigned, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1000);
              }
            });
          }else{
            this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.role.selectedsubmodulesarealreadyassignedselectelse, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            control.controls=[];
          }
        }else{
          this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.role.submodulesnotselected, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
      
      }else{
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.role.submodulesnotlisted, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
  }

 
  onSubmit() {
    this.sendlists=[];
    this.finallists=[];
    let submodules = this.roleAssignForm.get('submoduleid').value;
    let eID = this.roleAssignForm.get("editionid").value;
    if(submodules.length>0){
      let prevmodules=this.fetchedsubmodulelist;
      for(let i=0;i<submodules.length;i++){ this.sendlists.push(submodules[i].id) };
      let array3 = this.sendlists.filter(function(obj) {  return prevmodules.indexOf(obj) == -1 });
      for(let m=0 ;m<array3.length;m++){
        let subindx=submodules.findIndex(p => p.id==array3[m]);
        let moduleid=submodules[subindx].moduleid;
        this.finallists.push({submoduleid:array3[m],moduleid:moduleid,editionid:eID,roleid:this.roleid})
      }
      if(this.finallists.length>0){
        this.editionService.AssignRoleModules(JSON.stringify(this.finallists)).subscribe(data => {
          if(data){
            this.notificationsComponent.addToast({ title: 'Success Message', msg: this.alertmsgs.role.roleassignedsuccesfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1300);         
          }else{
            this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.role.rolenotsssigned, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
        },err => {
          let splitmsg=err._body.split(" ");
          //alert(splitmsg[5]+splitmsg[5].split("'")[1]);
          if(splitmsg[5].split("'")[1]=='moduleid,userrefid'){
          this.notificationsComponent.addToast({ title: 'Success Message', msg: this.alertmsgs.role.roleassignedsuccesfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1300);      
          }else{
            this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.role.rolenotsssigned, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1000);
          }
        });
      }else{
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.role.selectedsubmodulesarealreadyassignedselectelse, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        this.roleAssignForm.get('submoduleid').setValue('');
      }
    }else{
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: this.alertmsgs.role.selectsubmodules, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    
  }

  viewRole() {
    this.router.navigate(['Role/ViewRole']);
  }

  // menulabels=[];
  // modlabels=[];
  // getroles(){
  //   let modellabels = JSON.parse(sessionStorage.getItem("auth"));
  //   let menulabels = JSON.parse(sessionStorage.getItem("labels"));
  //   const control11 = <FormArray>this.roleAssignForm.controls['labelsample'];
  //   control11.controls=[];
  //   const control12 = <FormArray>this.roleAssignForm.controls['modulesample'];
  //   control12.controls=[];
  //   const control13 = <FormArray>this.roleAssignForm.controls['submodulesample'];
  //   for (let i = 0; i < menulabels.length; i++) {
  //     control11.insert(0, this.formBuilder.group({
  //       labelcheck:[false,[]],
  //       labelname: [menulabels[i], []],
  //     }));
  //   }
  //   for (let j = 0; j < modellabels.length; j++) {
  //     control12.insert(0, this.formBuilder.group({
  //       modulecheck:[false,[]],
  //       modulename: [modellabels[j][0], []],
  //     }));
  //     for (let k = 0; k < modellabels[j][1].length; k++) {
  //       control13.insert(0, this.formBuilder.group({
  //         submodulecheck:[false,[]],
  //         submodulename: [modellabels[j][1][k], []],
  //       }));
  //     }
  //   }
  // }

}
















